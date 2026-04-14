import Button from '../components/button';
import ArticleList from '../components/ArticleList';
import articles from '../assets/styles/article-content.js';

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
        <p className="pet-kicker mb-3">
          Articles
        </p>
        <h1 className="pet-title max-w-xl">
        Caring for Pets Starts with Love
        </h1>
        <p className="pet-subtitle mt-4 max-w-lg">
        Read helpful tips and insights that will help you give your pets the love, care, and attention they truly deserve.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
        <div className="mb-6">
          <p className="pet-kicker">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[color:var(--pet-ink)]">
            Article card grid
          </h2>
        </div>

        <ArticleList articles={articles} />
      </section>
    </div>
  );
}

export default ArticleListPage;