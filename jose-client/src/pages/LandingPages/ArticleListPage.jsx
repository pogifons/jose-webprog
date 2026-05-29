import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import ArticleList from '../../components/ArticleList';
import { fetchPublishedArticles } from '../../services/articleStore';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadArticles = async () => {
      try {
        setIsLoading(true);
        setPageError('');
        const articleRows = await fetchPublishedArticles();

        if (isMounted) {
          setArticles(articleRows);
        }
      } catch (error) {
        if (isMounted) {
          setPageError(error.message || 'Unable to load articles.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadArticles();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
        <p className="pet-kicker mb-3">Articles</p>
        <h1 className="pet-title max-w-xl">Caring for Pets Starts with Love</h1>
        <p className="pet-subtitle mt-4 max-w-lg">
          Read helpful tips and insights that will help you give your pets the love, care, and
          attention they truly deserve.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
        <div className="mb-6">
          <p className="pet-kicker">Featured Articles</p>
          <h2 className="mt-2 text-2xl font-semibold text-[color:var(--pet-ink)]">
            Article card grid
          </h2>
        </div>

        {pageError ? (
          <p className="text-sm font-semibold text-red-600">{pageError}</p>
        ) : isLoading ? (
          <p className="text-sm text-[color:rgba(27,26,22,0.72)]">Loading articles...</p>
        ) : articles.length > 0 ? (
          <ArticleList articles={articles} />
        ) : (
          <p className="text-sm text-[color:rgba(27,26,22,0.72)]">No published articles yet.</p>
        )}
      </section>
    </div>
  );
};

export default ArticleListPage;
