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
  deviceType?: string[];
  relatedTools?: string[];
  difficulty?: string;
  estimatedTime?: string;
  route?: string;
};

export type Article = ArticleFrontmatter & {
  slug: string;
  excerpt: string;
  content: string;
  readingTime: string;
  categoryName: string;
  toc: TocItem[];
};

export type SearchEntry = {
  type: "article" | "category" | "resource" | "page";
  title: string;
  description: string;
  href: string;
  keywords: string[];
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
  const relatedTools =
    frontmatter.relatedTools ??
    frontmatter.tags.filter((tag) =>
      /ChatGPT|Claude|Cursor|Codex|Apple|Gift|Perplexity|Gemini/i.test(tag),
    );
  const deviceType =
    frontmatter.deviceType ??
    (frontmatter.category === "apple-id"
      ? ["iPhone / iPad", "Mac"]
      : frontmatter.category === "dev-tools"
        ? ["Windows", "Mac"]
        : frontmatter.category === "payment"
          ? ["iPhone / iPad", "Windows", "Mac"]
          : ["Windows", "Mac", "iPhone / iPad", "Android"]);

  return {
    ...frontmatter,
    deviceType,
    relatedTools,
    difficulty: frontmatter.difficulty ?? "入门",
    estimatedTime: frontmatter.estimatedTime ?? `${Math.max(8, Math.round(stats.minutes * 4))} 分钟`,
    route: frontmatter.route ?? categoryMap[frontmatter.category].shortName,
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

export function getSearchEntries(): SearchEntry[] {
  const articleEntries = getAllArticles().map((article) => ({
    type: "article" as const,
    title: article.title,
    description: article.description,
    href: `/articles/${article.slug}`,
    keywords: [article.categoryName, ...article.tags],
  }));

  const categoryEntries = Object.values(categoryMap).map((category) => ({
    type: "category" as const,
    title: category.name,
    description: category.description,
    href: `/category/${category.slug}`,
    keywords: [category.shortName],
  }));

  const pageEntries: SearchEntry[] = [
    {
      type: "page",
      title: "第一次使用海外 AI 工具，从这里开始",
      description: "登船指南，按步骤理解工具、账号、支付和风险。",
      href: "/start",
      keywords: ["新手", "路线图", "登船指南", "开始"],
    },
    {
      type: "page",
      title: "船坞 — AI 工具发现",
      description: "按玩法分类发现 AI 工具：AI 开发、搜索、音乐、视频、设计、办公、自动化、变现和海外服务。",
      href: "/tools",
      keywords: ["工具发现", "AI工具", "船坞", "分类", "AI开发"],
    },
    {
      type: "page",
      title: "补给站 — 账号、支付、订阅",
      description: "解决海外 AI 工具的账号注册、支付方式、订阅方案和常见问题。",
      href: "/resources",
      keywords: ["账号", "支付", "订阅", "补给", "Apple ID"],
    },
    {
      type: "page",
      title: "航线推荐页",
      description: "根据设备和当前状态生成推荐航线。",
      href: "/routes",
      keywords: ["航线", "推荐", "设备", "进度"],
    },
    {
      type: "page",
      title: "新大陆",
      description: "新 AI 工具、免费额度、新玩法和支线入口。",
      href: "/discoveries",
      keywords: ["新工具", "新大陆", "AI 音乐", "AI 视频"],
    },
    {
      type: "page",
      title: "投稿与勘误",
      description: "提交投稿、补充、纠错和问题反馈。",
      href: "/contribute",
      keywords: ["投稿", "勘误", "纠错", "反馈"],
    },
    {
      type: "page",
      title: "船员档案",
      description: "查看航海里程、投稿数量和船员身份。",
      href: "/crew",
      keywords: ["船员", "航海里程", "身份"],
    },
  ];

  return [...articleEntries, ...categoryEntries, ...pageEntries];
}
