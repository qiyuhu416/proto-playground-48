import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

interface ArticleHeaderProps {
  title: string;
  meta?: string;
  description?: string;
  heroImage?: string;
  heroAlt?: string;
}

export function ArticleHeader({
  title,
  meta,
  description,
  heroImage,
  heroAlt,
}: ArticleHeaderProps) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  return (
    <>
      {heroImage && (
        <img
          src={heroImage}
          alt={heroAlt || title}
          className="w-screen h-screen object-cover mb-16 -mx-6"
          // The cover image and the context box that follows are ONE section,
          // "Context" — the table of contents' first entry, pointing here.
          data-toc
          data-toc-title="Context"
        />
      )}

      {description && (
        <div className="mb-16">
          <p className="text-lg text-muted-foreground max-w-3xl">
            {description}
          </p>
        </div>
      )}
    </>
  );
}
