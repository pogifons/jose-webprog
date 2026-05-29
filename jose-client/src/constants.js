const HOST = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const USER_ROLES = ['admin', 'editor', 'viewer'];

export const USER_GENDERS = ['female', 'male'];

export const EMPTY_USER_FORM = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: '',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

export const getUserStatus = (isActive) => (isActive ? 'active' : 'inactive');

export const normalizeUser = (user) => ({
  ...user,
  id: user.id ?? user._id,
  email: String(user.email ?? '').trim().toLowerCase(),
  username: String(user.username ?? '').trim().toLowerCase(),
  role: String(user.type ?? user.role ?? 'viewer').trim().toLowerCase(),
  gender: String(user.gender ?? '').trim().toLowerCase(),
  isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
  status: getUserStatus(typeof user.isActive === 'boolean' ? user.isActive : true),
});

export const validateUserForm = (form, options = {}) => {
  const { requirePassword = true } = options;
  const errors = {};

  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required.';
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  }

  if (!form.age) {
    errors.age = 'Age is required.';
  } else if (!/^\d+$/.test(form.age)) {
    errors.age = 'Age must be a number only.';
  }

  if (!form.gender) {
    errors.gender = 'Gender is required.';
  }

  if (!form.contactNumber) {
    errors.contactNumber = 'Contact number is required.';
  } else if (!/^\d{11}$/.test(form.contactNumber)) {
    errors.contactNumber = 'Contact number must be exactly 11 digits.';
  }

  if (!form.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!form.role) {
    errors.role = 'Role is required.';
  }

  if (!form.username.trim()) {
    errors.username = 'Username is required.';
  } else if (/\s/.test(form.username)) {
    errors.username = 'Username must not contain spaces.';
  }

  if (requirePassword && !form.password) {
    errors.password = 'Password is required.';
  } else if (form.password && form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  return errors;
};

export default {
  HOST,
};
