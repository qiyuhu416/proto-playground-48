import { ReactNode } from "react";
import { ArticleHeading2 } from "./ArticleContent";

interface ArticleSectionProps {
  title: string;
  id?: string;
  children: ReactNode;
  description?: string;
}

export const ArticleSection = ({ title, id, children, description }: ArticleSectionProps) => (
  <section>
    <ArticleHeading2 id={id}>{title}</ArticleHeading2>
    {description && <p className="text-neutral-600 mb-6">{description}</p>}
    {children}
  </section>
);
