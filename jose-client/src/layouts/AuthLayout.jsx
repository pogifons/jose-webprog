import { Outlet } from 'react-router-dom';

const heroImageUrl =
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=2000&q=80';

const AuthLayout = () => {
  return (
    <section className="min-h-screen">
      <div className="grid min-h-screen w-full lg:grid-cols-[1.25fr_0.85fr]">
        <aside className="relative hidden lg:block">
          <img
            src={heroImageUrl}
            alt="Cute pet"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,250,242,0.35),transparent_55%),linear-gradient(to_bottom,rgba(27,26,22,0.10),rgba(27,26,22,0.35))]" />
          <div className="absolute bottom-0 left-0 right-0 p-10">
            <div className="max-w-xl rounded-3xl border-2 bg-[rgba(255,250,242,0.9)] p-6 shadow-[var(--pet-shadow)]" style={{ borderColor: 'rgba(27,26,22,0.18)' }}>
              <p className="pet-kicker">PetPals</p>
              <p className="mt-2 text-lg font-semibold text-[color:var(--pet-ink)]">
                A calmer way to read, save, and revisit pet care tips.
              </p>
              <p className="mt-2 text-sm leading-7 text-[color:rgba(27,26,22,0.72)]">
                Sign in to continue where you left off.
              </p>
            </div>
          </div>
        </aside>

        <main className="flex items-center justify-center bg-[color:var(--pet-paper)] px-6 py-10 sm:px-10 lg:px-12">
          <div className="w-full max-w-xl">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;