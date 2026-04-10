import { Link, Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-zinc-100 text-zinc-900">
      <NavBar />
      <main className="flex-1 pb-16 pt-20">
        <Outlet />
      </main>

      <footer className="border-t-2 border-zinc-900 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                PetPals
              </p>
              <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-600">
                Simple articles and tips to help you care for your pets—feeding, grooming,
                health, and playtime.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-zinc-900">Pages</p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600">
                <li>
                  <Link className="hover:text-zinc-900" to="/">Home</Link>
                </li>
                <li>
                  <Link className="hover:text-zinc-900" to="/about">About</Link>
                </li>
                <li>
                  <Link className="hover:text-zinc-900" to="/articles">Articles</Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-zinc-900">Contact</p>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Have an idea for a new article? Send it our way.
              </p>
              <a
                className="mt-3 inline-flex text-sm font-semibold text-zinc-900 underline underline-offset-4 hover:no-underline"
                href="mailto:hello@petpals.example"
              >
                hello@petpals.example
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center">
            <p className="text-xs text-zinc-500">
              © {year} PetPals. All rights reserved.
            </p>
            <p className="text-xs text-zinc-500">
              Built with React + Vite.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;