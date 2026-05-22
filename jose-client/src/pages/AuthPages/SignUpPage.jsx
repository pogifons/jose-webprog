import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-2xl border-2 border-[color:rgba(27,26,22,0.14)] bg-[color:rgba(255,250,242,0.85)] px-4 py-3 text-sm text-[color:var(--pet-ink)] outline-none transition placeholder:text-[color:rgba(27,26,22,0.45)] focus:border-[color:var(--pet-ink)]';

const errorInputClasses =
  'mt-2 w-full rounded-2xl border-2 border-[color:#dc2626] bg-[color:rgba(255,250,242,0.85)] px-4 py-3 text-sm text-[color:var(--pet-ink)] outline-none transition placeholder:text-[color:rgba(27,26,22,0.45)] focus:border-[color:#dc2626]';

const actionButtonClassName = 'w-full justify-center rounded-2xl py-3 text-[11px] tracking-[0.24em]';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  contactNumber: '',
  age: '',
  password: '',
  confirmPassword: '',
  agreed: false,
};

const validateForm = (form) => {
  const errors = {};

  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required.';
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  }

  if (!form.email.trim()) {
    errors.email = 'Email address is required.';
  }

  if (!form.username.trim()) {
    errors.username = 'Username is required.';
  } else if (/\s/.test(form.username)) {
    errors.username = 'Username must not contain spaces.';
  }

  if (!form.password) {
    errors.password = 'Password is required.';
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  if (!form.contactNumber) {
    errors.contactNumber = 'Contact number is required.';
  } else if (!/^\d{11}$/.test(form.contactNumber)) {
    errors.contactNumber = 'Contact number must be exactly 11 digits.';
  }

  if (!form.age) {
    errors.age = 'Age is required.';
  } else if (!/^\d+$/.test(form.age)) {
    errors.age = 'Age must be a number only.';
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords must match.';
  }

  if (!form.agreed) {
    errors.agreed = 'Please agree to the terms before creating an account.';
  }

  return errors;
};

const SignUpPage = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    const nextForm = {
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    };

    setForm(nextForm);

    if (submitted) {
      setErrors(validateForm(nextForm));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setSubmitted(true);
    setErrors(nextErrors);
  };

  const fieldClassName = (fieldName) => (errors[fieldName] ? errorInputClasses : inputClasses);

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

        {submitted && Object.keys(errors).length === 0 ? (
          <div className="mt-6 rounded-2xl border-2 border-[color:rgba(22,101,52,0.45)] bg-[color:rgba(220,252,231,0.68)] px-4 py-3 text-sm font-semibold text-[color:#166534]">
            Account form is valid and ready to submit.
          </div>
        ) : null}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="text-sm font-semibold text-[color:var(--pet-ink)]">
                First name
              </label>
              <input
                id="first-name"
                name="firstName"
                type="text"
                placeholder="Jose"
                autoComplete="given-name"
                value={form.firstName}
                onChange={handleChange}
                className={fieldClassName('firstName')}
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby={errors.firstName ? 'signup-first-name-error' : undefined}
              />
              {errors.firstName ? (
                <p id="signup-first-name-error" className="mt-2 text-sm font-semibold text-red-700">
                  {errors.firstName}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="last-name" className="text-sm font-semibold text-[color:var(--pet-ink)]">
                Last name
              </label>
              <input
                id="last-name"
                name="lastName"
                type="text"
                placeholder="Robles"
                autoComplete="family-name"
                value={form.lastName}
                onChange={handleChange}
                className={fieldClassName('lastName')}
                aria-invalid={Boolean(errors.lastName)}
                aria-describedby={errors.lastName ? 'signup-last-name-error' : undefined}
              />
              {errors.lastName ? (
                <p id="signup-last-name-error" className="mt-2 text-sm font-semibold text-red-700">
                  {errors.lastName}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="signup-username" className="text-sm font-semibold text-[color:var(--pet-ink)]">
                Username
              </label>
              <input
                id="signup-username"
                name="username"
                type="text"
                placeholder="joseuser"
                autoComplete="username"
                value={form.username}
                onChange={handleChange}
                className={fieldClassName('username')}
                aria-invalid={Boolean(errors.username)}
                aria-describedby={errors.username ? 'signup-username-error' : undefined}
              />
              {errors.username ? (
                <p id="signup-username-error" className="mt-2 text-sm font-semibold text-red-700">
                  {errors.username}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="signup-email" className="text-sm font-semibold text-[color:var(--pet-ink)]">
                Email address
              </label>
              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className={fieldClassName('email')}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'signup-email-error' : undefined}
              />
              {errors.email ? (
                <p id="signup-email-error" className="mt-2 text-sm font-semibold text-red-700">
                  {errors.email}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="signup-contact" className="text-sm font-semibold text-[color:var(--pet-ink)]">
                Contact number
              </label>
              <input
                id="signup-contact"
                name="contactNumber"
                type="tel"
                inputMode="numeric"
                placeholder="09171234567"
                value={form.contactNumber}
                onChange={handleChange}
                className={fieldClassName('contactNumber')}
                aria-invalid={Boolean(errors.contactNumber)}
                aria-describedby={errors.contactNumber ? 'signup-contact-error' : undefined}
              />
              {errors.contactNumber ? (
                <p id="signup-contact-error" className="mt-2 text-sm font-semibold text-red-700">
                  {errors.contactNumber}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="signup-age" className="text-sm font-semibold text-[color:var(--pet-ink)]">
                Age
              </label>
              <input
                id="signup-age"
                name="age"
                type="text"
                inputMode="numeric"
                placeholder="25"
                value={form.age}
                onChange={handleChange}
                className={fieldClassName('age')}
                aria-invalid={Boolean(errors.age)}
                aria-describedby={errors.age ? 'signup-age-error' : undefined}
              />
              {errors.age ? (
                <p id="signup-age-error" className="mt-2 text-sm font-semibold text-red-700">
                  {errors.age}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="signup-password" className="text-sm font-semibold text-[color:var(--pet-ink)]">
                Password
              </label>
              <input
                id="signup-password"
                name="password"
                type="password"
                placeholder="At least 8 characters"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                className={fieldClassName('password')}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'signup-password-error' : undefined}
              />
              {errors.password ? (
                <p id="signup-password-error" className="mt-2 text-sm font-semibold text-red-700">
                  {errors.password}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="signup-confirm-password" className="text-sm font-semibold text-[color:var(--pet-ink)]">
                Confirm password
              </label>
              <input
                id="signup-confirm-password"
                name="confirmPassword"
                type="password"
                placeholder="Repeat password"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={fieldClassName('confirmPassword')}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={errors.confirmPassword ? 'signup-confirm-password-error' : undefined}
              />
              {errors.confirmPassword ? (
                <p id="signup-confirm-password-error" className="mt-2 text-sm font-semibold text-red-700">
                  {errors.confirmPassword}
                </p>
              ) : null}
            </div>
          </div>

          <label className="flex items-start gap-3 text-sm text-[color:rgba(27,26,22,0.72)]">
            <input
              name="agreed"
              type="checkbox"
              checked={form.agreed}
              onChange={handleChange}
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
          {errors.agreed ? (
            <p className="-mt-3 text-sm font-semibold text-red-700">{errors.agreed}</p>
          ) : null}

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
