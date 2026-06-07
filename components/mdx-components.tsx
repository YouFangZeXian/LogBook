import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  a: (props) => (
    <a
      {...props}
      className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-strong"
    />
  ),
  blockquote: (props) => <blockquote {...props} />,
  table: (props) => <table {...props} className="w-full text-sm" />,
};
