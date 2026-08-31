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
        />
      )}

      {description && (
        <div className="mb-16">
          <p className="text-lg text-neutral-600 max-w-3xl">
            {description}
          </p>
        </div>
      )}
    </>
  );
}
