import Button from '../../components/Button';
import boy2 from '../../assets/styles/pictures/boy2.jpg';
import jackson2 from '../../assets/styles/pictures/jackson2.jpg';
import jacksonWinter1 from '../../assets/styles/pictures/jacksonwinter1.jpg';
import winter1 from '../../assets/styles/pictures/winter1.jpg';
import winter3 from '../../assets/styles/pictures/winter3.jpg';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="pet-card-soft border-dashed p-6">
            <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-[1.25rem] bg-[color:rgba(27,26,22,0.06)]">
              <img
                src={winter3}
                alt="Winter"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          <div>
            <p className="pet-kicker mb-3">About Section</p>
            <h1 className="pet-title max-w-xl">The Importance of Pets in Our Lives</h1>
            <p className="pet-subtitle mt-4 max-w-lg">
              Pets provide emotional support, reduce stress, and improve overall well-being. They teach
              us compassion, responsibility, and the value of caring for another life.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
        <div className="mb-6">
          <p className="pet-kicker">Profile Overview</p>
          <h2 className="mt-2 text-2xl font-semibold text-[color:var(--pet-ink)]">
            Quick summary blocks
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pet-card">
            <p className="text-2xl font-bold text-[color:var(--pet-ink)]">3</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:rgba(27,26,22,0.62)]">
              Vet Visits/year
            </p>
          </div>

          <div className="pet-card">
            <p className="text-2xl font-bold text-[color:var(--pet-ink)]">2</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:rgba(27,26,22,0.62)]">
              Baths/week
            </p>
          </div>

          <div className="pet-card">
            <p className="text-2xl font-bold text-[color:var(--pet-ink)]">100%</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:rgba(27,26,22,0.62)]">
              Love & Care
            </p>
          </div>

          <div className="pet-card">
            <p className="text-2xl font-bold text-[color:var(--pet-ink)]">5</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:rgba(27,26,22,0.62)]">
              Toys Collected
            </p>
          </div>
        </div>
      </section>

      <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="pet-kicker">Section Flow</p>
            <h2 className="mt-2 text-2xl font-semibold text-[color:var(--pet-ink)]">
              Stacked content wireframe
            </h2>

            <div className="mt-6 space-y-4">
              <article className="pet-card">
                <h3 className="text-lg font-semibold text-[color:var(--pet-ink)]">Intro Block</h3>
                <p className="mt-3 text-sm leading-6 text-[color:rgba(27,26,22,0.72)]">
                  Each of my pets has a unique personality, some are playful, some are calm, and some
                  are just pure chaos 😆
                </p>
              </article>

              <article className="pet-card">
                <h3 className="text-lg font-semibold text-[color:var(--pet-ink)]">Experience Block</h3>
                <p className="mt-3 text-sm leading-6 text-[color:rgba(27,26,22,0.72)]">
                  Over time, I’ve learned their habits, moods, and how they express love in their own
                  way.
                </p>
              </article>

              <article className="pet-card">
                <h3 className="text-lg font-semibold text-[color:var(--pet-ink)]">Details Block</h3>
                <p className="mt-3 text-sm leading-6 text-[color:rgba(27,26,22,0.72)]">
                  From zoomies at night to sleeping all day, these little behaviors make them special.
                </p>
              </article>
            </div>
          </div>

          <div className="pet-card">
            <p className="pet-kicker">Visual Grid</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[1.25rem] bg-[color:rgba(27,26,22,0.06)]">
                <img
                  src={jackson2}
                  alt="Jackson"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[1.25rem] bg-[color:rgba(27,26,22,0.06)]">
                <img
                  src={boy2}
                  alt="Boy"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[1.25rem] bg-[color:rgba(27,26,22,0.06)]">
                <img
                  src={winter1}
                  alt="Winter"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[1.25rem] bg-[color:rgba(27,26,22,0.06)]">
                <img
                  src={jacksonWinter1}
                  alt="Jackson and Winter"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <Button className="mt-5">View Section</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
