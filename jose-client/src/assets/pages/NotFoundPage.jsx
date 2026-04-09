import { Link, useRouteError } from 'react-router-dom';
import Button from '../components/button';

function NotFoundPage() {
  const error = useRouteError();
  const imageSrc = new URL('../styles/pictures/pagenotfound.png', import.meta.url).href;

  return (
    <div className="min-h-[70vh] w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          404
        </p>
        <h1 className="mt-3 text-center text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-xl text-center text-sm leading-7 text-zinc-600 sm:text-base">
          The page you’re looking for doesn’t exist, or the link is broken.
        </p>

        <div className="mt-8 w-full overflow-hidden rounded-3xl border-2 border-zinc-900 bg-zinc-100">
          <img
            src={imageSrc}
            alt="404 page not found"
            className="h-auto w-full object-cover"
            loading="lazy"
          />
        </div>

        {error ? (
          <div className="mt-6 w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-4 text-xs text-zinc-700">
            <p className="font-semibold text-zinc-900">Details</p>
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
            <Button className="bg-white">Browse articles</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage