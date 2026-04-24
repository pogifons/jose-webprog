import { Link } from 'react-router-dom';

const variantClasses = {
  primary: 'pet-button pet-button-primary',
  secondary: 'pet-button pet-button-secondary',
};

const Button = ({ children, to, type = 'button', variant = 'secondary', className = '' }) => {
  const classes = [variantClasses[variant] ?? variantClasses.secondary, className].join(' ').trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;
