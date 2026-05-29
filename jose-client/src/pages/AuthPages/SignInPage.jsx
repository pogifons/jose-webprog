import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { authenticateUser } from '../../services/userService';

const inputClasses =
  'mt-2 w-full rounded-2xl border-2 border-[color:rgba(27,26,22,0.14)] bg-[color:rgba(255,250,242,0.85)] px-4 py-3 text-sm text-[color:var(--pet-ink)] outline-none transition placeholder:text-[color:rgba(27,26,22,0.45)] focus:border-[color:var(--pet-ink)]';

const actionButtonClassName = 'w-full justify-center rounded-2xl py-3 text-[11px] tracking-[0.24em]';

const SignInPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setError('');
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await authenticateUser(form);
      navigate('/dashboard');
    } catch (authError) {
      setError(authError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
      <div className="pet-card p-5 sm:p-6">
        <p className="pet-kicker">Welcome back</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-[color:var(--pet-ink)] sm:text-4xl">
          Sign in
        </h1>
        <p className="mt-3 text-sm leading-7 text-[color:rgba(27,26,22,0.72)]">
          Continue reading and saving your favorite pet tips.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSignIn}>
          {error ? (
            <div className="rounded-2xl border-2 border-[color:rgba(220,38,38,0.35)] bg-[color:rgba(254,226,226,0.7)] px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}

          <div>
            <label htmlFor="signin-email" className="text-sm font-semibold text-[color:var(--pet-ink)]">
              Email address
            </label>
            <input
              id="signin-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label htmlFor="signin-password" className="text-sm font-semibold text-[color:var(--pet-ink)]">
              Password
            </label>
            <input
              id="signin-password"
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-[color:rgba(27,26,22,0.72)]">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-[color:rgba(27,26,22,0.24)] accent-[color:var(--pet-ink)]"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="text-left text-sm font-semibold text-[color:var(--pet-ink)] underline underline-offset-4 hover:no-underline"
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit" variant="primary" className={actionButtonClassName}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div
          className="mt-8 border-t pt-6 text-sm text-[color:rgba(27,26,22,0.72)]"
          style={{ borderColor: 'rgba(27,26,22,0.14)' }}
        >
          New here?{' '}
          <Link
            to="/auth/signup"
            className="font-semibold text-[color:var(--pet-ink)] underline underline-offset-4 hover:no-underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
