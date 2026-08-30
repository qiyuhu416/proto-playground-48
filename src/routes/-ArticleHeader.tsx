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
      <div className="mb-16">
        {meta && (
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {meta}
          </span>
        )}
        <h1 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl">
            {description}
          </p>
        )}
      </div>

      {heroImage && (
        <img
          src={heroImage}
          alt={heroAlt || title}
          className="w-full h-[60vh] object-cover rounded-2xl mb-16 border border-neutral-200"
        />
      )}
    </>
  );
}
