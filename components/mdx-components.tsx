import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  a: (props) => (
    <a {...props} className="font-medium text-brand-sea underline decoration-brand-sea/30 underline-offset-4 transition-colors hover:text-brand" />
  ),
  blockquote: (props) => <blockquote {...props} />,
  table: (props) => <table {...props} className="w-full text-sm" />,
};
