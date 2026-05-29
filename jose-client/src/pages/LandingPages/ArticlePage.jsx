import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { fetchArticleByName } from '../../services/articleStore';

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadArticle = async () => {
      try {
        setIsLoading(true);
        setPageError('');
        const articleRow = await fetchArticleByName(name);

        if (isMounted) {
          setArticle(articleRow);
        }
      } catch (error) {
        if (isMounted) {
          setPageError(error.message || 'Article not found');
          setArticle(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadArticle();

    return () => {
      isMounted = false;
    };
  }, [name]);

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-[color:var(--pet-ink)]">Loading article...</h1>
          </div>
        </section>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-[color:var(--pet-ink)]">Article not found</h1>
            {pageError ? (
              <p className="mt-3 text-sm font-semibold text-red-600">{pageError}</p>
            ) : null}
            <Button to="/articles" className="mt-6">
              Back to Articles
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/articles">← Back to Articles</Button>
          </div>
          <p className="pet-kicker mb-3">Article</p>
          <h1 className="text-3xl font-bold leading-tight text-[color:var(--pet-ink)] sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-2 text-sm text-[color:rgba(27,26,22,0.62)]">
            {article.name
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </p>
        </div>
      </section>

      <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
        <div className="mx-auto max-w-3xl">
          <div
            className="relative mb-8 flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] border-2 bg-[color:rgba(27,26,22,0.04)]"
            style={{ borderColor: 'rgba(27,26,22,0.14)' }}
          >
            {article.imageSrc ? (
              <img
                src={article.imageSrc}
                alt={article.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div
                className="h-24 w-24 border-2 bg-[color:rgba(27,26,22,0.04)]"
                style={{ borderColor: 'rgba(27,26,22,0.18)' }}
              />
            )}
          </div>

          <div className="prose prose-sm max-w-none space-y-4 text-[color:rgba(27,26,22,0.82)]">
            {article.content.map((paragraph, index) => (
              <p key={index} className="whitespace-pre-wrap text-base leading-7">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t-2 pt-6" style={{ borderColor: 'var(--pet-border)' }}>
            <Button to="/articles">Back to Articles</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;
