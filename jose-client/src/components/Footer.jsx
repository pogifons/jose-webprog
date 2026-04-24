import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t-2 bg-[color:var(--pet-paper)]"
      style={{ borderColor: 'var(--pet-border)' }}
    >
      <div className="pet-container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="pet-kicker">PetPals</p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-[color:rgba(27,26,22,0.72)]">
              Simple articles and tips to help you care for your pets—feeding, grooming, health,
              and playtime.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-[color:var(--pet-ink)]">Pages</p>
            <ul className="mt-3 space-y-2 text-sm text-[color:rgba(27,26,22,0.72)]">
              <li>
                <Link className="hover:underline hover:underline-offset-4" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:underline hover:underline-offset-4" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:underline hover:underline-offset-4" to="/articles">
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-[color:var(--pet-ink)]">Contact</p>
            <p className="mt-3 text-sm leading-7 text-[color:rgba(27,26,22,0.72)]">
              Have an idea for a new article? Send it our way.
            </p>
            <a
              className="mt-3 inline-flex text-sm font-semibold text-[color:var(--pet-ink)] underline underline-offset-4 hover:no-underline"
              href="mailto:hello@petpals.example"
            >
              hello@petpals.example
            </a>
          </div>
        </div>

        <div
          className="mt-10 flex flex-col items-start justify-between gap-3 border-t pt-6 sm:flex-row sm:items-center"
          style={{ borderColor: 'rgba(27,26,22,0.14)' }}
        >
          <p className="text-xs text-[color:rgba(27,26,22,0.56)]">© {year} PetPals. All rights reserved.</p>
          <p className="text-xs text-[color:rgba(27,26,22,0.56)]">Built with React + Vite.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
