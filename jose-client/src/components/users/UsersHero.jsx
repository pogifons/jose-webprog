import { Typography } from '@mui/material';

function UsersHero() {
  return (
    <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
      <p className="pet-kicker mb-3">Users</p>
      <Typography variant="h4" component="h1" sx={{ color: 'var(--pet-ink)', fontWeight: 800 }}>
        User Details
      </Typography>
      <Typography className="pet-subtitle mt-3">
        Search by name, email, or username, then narrow the table by role, gender, and account
        status.
      </Typography>
    </section>
  );
}

export default UsersHero;
