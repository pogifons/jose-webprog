import { Link, useRouteError } from 'react-router-dom';
import Button from '../components/button';

function NotFoundPage() {
  const error = useRouteError();
  const imageSrc = new URL('../assets/styles/pictures/pagenotfound.png', import.meta.url).href;

  return (
    <div className="min-h-[70vh] w-full py-10">
      <div className="pet-container mx-auto flex max-w-3xl flex-col items-center">
        <p className="pet-kicker">
          404
        </p>
        <h1 className="mt-3 text-center text-3xl font-bold leading-tight text-[color:var(--pet-ink)] sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-xl text-center text-sm leading-7 text-[color:rgba(27,26,22,0.72)] sm:text-base">
          The page you’re looking for doesn’t exist, or the link is broken.
        </p>

        <div className="mt-8 w-full overflow-hidden rounded-3xl border-2 bg-[color:rgba(27,26,22,0.04)]" style={{ borderColor: 'var(--pet-border)' }}>
          <img
            src={imageSrc}
            alt="404 page not found"
            className="h-auto w-full object-cover"
            loading="lazy"
          />
        </div>

        {error ? (
          <div
            className="mt-6 w-full max-w-3xl rounded-2xl border bg-[color:rgba(255,250,242,0.9)] p-4 text-xs text-[color:rgba(27,26,22,0.82)]"
            style={{ borderColor: 'rgba(27,26,22,0.14)' }}
          >
            <p className="font-semibold text-[color:var(--pet-ink)]">Details</p>
            <pre className="mt-2 overflow-auto whitespace-pre-wrap break-words">
{String(error?.statusText || error?.message || error)}
            </pre>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/">
            <Button>Back home</Button>
          </Link>
          <Link to="/articles">
            <Button variant="primary">Browse articles</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage