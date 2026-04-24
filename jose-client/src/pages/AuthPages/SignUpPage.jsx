import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-2xl border-2 border-[color:rgba(27,26,22,0.14)] bg-[color:rgba(255,250,242,0.85)] px-4 py-3 text-sm text-[color:var(--pet-ink)] outline-none transition placeholder:text-[color:rgba(27,26,22,0.45)] focus:border-[color:var(--pet-ink)]';

const actionButtonClassName = 'w-full justify-center rounded-2xl py-3 text-[11px] tracking-[0.24em]';

const SignUpPage = () => {
  return (
    <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
      <div className="pet-card p-5 sm:p-6">
        <p className="pet-kicker">Join PetPals</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-[color:var(--pet-ink)] sm:text-4xl">
          Create your account
        </h1>
        <p className="mt-3 text-sm leading-7 text-[color:rgba(27,26,22,0.72)]">
          Get quick access to articles, collections, and future updates.
        </p>

        <form className="mt-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="text-sm font-semibold text-[color:var(--pet-ink)]">
                First name
              </label>
              <input
                id="first-name"
                type="text"
                placeholder="Jose"
                autoComplete="given-name"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="last-name" className="text-sm font-semibold text-[color:var(--pet-ink)]">
                Last name
              </label>
              <input
                id="last-name"
                type="text"
                placeholder="Robles"
                autoComplete="family-name"
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-email" className="text-sm font-semibold text-[color:var(--pet-ink)]">
              Email address
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className={inputClasses}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="signup-password" className="text-sm font-semibold text-[color:var(--pet-ink)]">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="signup-confirm-password" className="text-sm font-semibold text-[color:var(--pet-ink)]">
                Confirm password
              </label>
              <input
                id="signup-confirm-password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                className={inputClasses}
              />
            </div>
          </div>

          <label className="flex items-start gap-3 text-sm text-[color:rgba(27,26,22,0.72)]">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-[color:rgba(27,26,22,0.24)] accent-[color:var(--pet-ink)]"
            />
            <span>
              I agree to the{' '}
              <span className="font-semibold text-[color:var(--pet-ink)] underline underline-offset-4">
                Terms
              </span>{' '}
              and{' '}
              <span className="font-semibold text-[color:var(--pet-ink)] underline underline-offset-4">
                Privacy Policy
              </span>
              .
            </span>
          </label>

          <Button type="submit" variant="primary" className={actionButtonClassName}>
            Create account
          </Button>

          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            <Button type="button" variant="secondary" className={actionButtonClassName}>
              Sign up with Google
            </Button>
            <Button type="button" variant="secondary" className={actionButtonClassName}>
              Sign up with Apple
            </Button>
          </div>
        </form>

        <div
          className="mt-8 border-t pt-6 text-sm text-[color:rgba(27,26,22,0.72)]"
          style={{ borderColor: 'rgba(27,26,22,0.14)' }}
        >
          Already have an account?{' '}
          <Link
            to="/auth/signin"
            className="font-semibold text-[color:var(--pet-ink)] underline underline-offset-4 hover:no-underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;