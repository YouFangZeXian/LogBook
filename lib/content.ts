import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import GithubSlugger from "github-slugger";
import { unified } from "unified";
import { visit } from "unist-util-visit";

import { mdxComponents } from "@/components/mdx-components";
import { categoryMap, type CategorySlug } from "@/lib/site";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

export type TocItem = {
  value: string;
  url: string;
  depth: number;
};

export type ArticleFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  category: CategorySlug;
  tags: string[];
  featured?: boolean;
};

export type Article = ArticleFrontmatter & {
  slug: string;
  excerpt: string;
  content: string;
  readingTime: string;
  categoryName: string;
  toc: TocItem[];
};

function getArticleSlugs() {
  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function flattenText(node: unknown): string {
  if (!node || typeof node !== "object") {
    return "";
  }

  if ("value" in node && typeof node.value === "string") {
    return node.value;
  }

  if ("children" in node && Array.isArray(node.children)) {
    return node.children.map((child) => flattenText(child)).join("");
  }

  return "";
}

function buildToc(source: string): TocItem[] {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(source);
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  visit(tree, "heading", (node) => {
    if (!("depth" in node) || typeof node.depth !== "number") {
      return;
    }

    if (node.depth < 2 || node.depth > 3) {
      return;
    }

    const value = flattenText(node).trim();
    if (!value) {
      return;
    }

    items.push({
      value,
      url: `#${slugger.slug(value)}`,
      depth: node.depth,
    });
  });

  return items;
}

function parseArticle(slug: string): Article {
  const filePath = path.join(articlesDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);
  const frontmatter = data as ArticleFrontmatter;

  return {
    ...frontmatter,
    slug,
    content,
    excerpt: frontmatter.description,
    readingTime: `${Math.max(1, Math.round(stats.minutes))} 分钟`,
    categoryName: categoryMap[frontmatter.category].name,
    toc: buildToc(content),
  };
}

export function getAllArticles() {
  return getArticleSlugs()
    .map((slug) => parseArticle(slug))
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
}

export function getLatestArticles(limit = 6) {
  return getAllArticles().slice(0, limit);
}

export function getFeaturedArticles(limit = 4) {
  return getAllArticles()
    .filter((article) => article.featured)
    .slice(0, limit);
}

export function getArticleBySlug(slug: string) {
  const articles = getAllArticles();
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: CategorySlug) {
  return getAllArticles().filter((article) => article.category === category);
}

export function getRelatedArticles(article: Article, limit = 3) {
  return getAllArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      let score = 0;

      if (candidate.category === article.category) {
        score += 3;
      }

      score += candidate.tags.filter((tag) => article.tags.includes(tag)).length;

      return { candidate, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.candidate);
}

export async function renderArticle(content: string) {
  const { content: rendered } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: {
                className: ["anchor"],
                ariaLabel: "Heading anchor",
              },
              content: {
                type: "text",
                value: "#",
              },
            },
          ],
        ],
      },
    },
    components: mdxComponents,
  });

  return rendered;
}

export function getRecommendedArticles(slugs: string[]) {
  const articleMap = new Map(getAllArticles().map((article) => [article.slug, article]));
  return slugs
    .map((slug) => articleMap.get(slug))
    .filter((article): article is Article => Boolean(article));
}

export function getAllCategoryStats() {
  const articles = getAllArticles();
  return Object.values(categoryMap).map((category) => ({
    ...category,
    count: articles.filter((article) => article.category === category.slug).length,
  }));
}
