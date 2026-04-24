import Button from '../../components/Button';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="pet-kicker mb-3">Hero Section</p>
            <h1 className="pet-title max-w-xl">Meet My Beloved Pets</h1>
            <p className="pet-subtitle mt-4 max-w-lg">
              “A place where I share my pets’ daily life, adventures, and cutest moments.”
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="pet-card-soft border-dashed p-6">
            <div className="flex min-h-65 items-center justify-center overflow-hidden rounded-[1.25rem] bg-[color:rgba(27,26,22,0.06)]">
              <img
                src="/src/assets/styles/pictures/winter4.jpg"
                alt="Winter"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
        <div className="mb-6">
          <p className="pet-kicker">KPI Section</p>
          <h2 className="mt-2 text-2xl font-semibold text-[color:var(--pet-ink)]">
            Quick overview blocks
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pet-card">
            <p className="text-2xl font-bold text-[color:var(--pet-ink)]">3</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:rgba(27,26,22,0.62)]">
              Pets
            </p>
          </div>

          <div className="pet-card">
            <p className="text-2xl font-bold text-[color:var(--pet-ink)]">120</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:rgba(27,26,22,0.62)]">
              Photos
            </p>
          </div>

          <div className="pet-card">
            <p className="text-2xl font-bold text-[color:var(--pet-ink)]">5+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:rgba(27,26,22,0.62)]">
              Years Together
            </p>
          </div>

          <div className="pet-card">
            <p className="text-2xl font-bold text-[color:var(--pet-ink)]">04</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:rgba(27,26,22,0.62)]">
              Layouts
            </p>
          </div>
        </div>
      </section>

      <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
        <div className="mb-6">
          <p className="pet-kicker">Feature Cards</p>
          <h2 className="mt-2 text-2xl font-semibold text-[color:var(--pet-ink)]">MEET!</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="pet-card p-4">
            <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-[color:rgba(27,26,22,0.06)]">
              <img
                src="/src/assets/styles/pictures/jackson1.jpg"
                alt="Jackson"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[color:var(--pet-ink)]">Feature Card One</h3>
            <p className="mt-3 text-sm leading-6 text-[color:rgba(27,26,22,0.72)]">JACKSON.</p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          <article className="pet-card p-4">
            <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-[color:rgba(27,26,22,0.06)]">
              <img
                src="/src/assets/styles/pictures/winter2.jpg"
                alt="Winter"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[color:var(--pet-ink)]">Feature Card Two</h3>
            <p className="mt-3 text-sm leading-6 text-[color:rgba(27,26,22,0.72)]">WINTER.</p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          <article className="pet-card p-4">
            <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-[color:rgba(27,26,22,0.06)]">
              <img
                src="/src/assets/styles/pictures/boy1.jpg"
                alt="Boy"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[color:var(--pet-ink)]">Feature Card Three</h3>
            <p className="mt-3 text-sm leading-6 text-[color:rgba(27,26,22,0.72)]">BOY.</p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
