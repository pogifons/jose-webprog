import { Link } from 'react-router-dom';
import Button from './Button';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article key={article.name} className="pet-card flex h-full flex-col p-4">
          <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-[color:rgba(27,26,22,0.06)]">
            {article.imageSrc ? (
              <img
                src={article.imageSrc}
                alt={article.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-12 w-12 border-2 bg-[color:rgba(27,26,22,0.04)]" style={{ borderColor: 'rgba(27,26,22,0.18)' }} />
            )}
          </div>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:rgba(27,26,22,0.62)]">
            Article {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-[color:var(--pet-ink)]">
            {article.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[color:rgba(27,26,22,0.72)]">
            {article.content[0].substring(0, 150)}...
          </p>
          <Link to={`/articles/${article.name}`} className="mt-auto">
            <Button className="mt-4">Read More</Button>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;