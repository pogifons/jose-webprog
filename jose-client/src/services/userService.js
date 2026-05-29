import constants, { EMPTY_USER_FORM, getUserStatus, normalizeUser, USER_GENDERS, USER_ROLES } from '../constants';

const CURRENT_USER_STORAGE_KEY = 'petpals.currentUser';
const AUTH_TOKEN_STORAGE_KEY = 'petpals.token';

const requestJson = async (path, options = {}) => {
  const response = await fetch(`${constants.HOST}/users${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }

  return data;
};

export const fetchUsers = async () => {
  const users = await requestJson('/');
  return users.map(normalizeUser);
};

export const createUser = async (user) => normalizeUser(await requestJson('/', {
  method: 'POST',
  body: JSON.stringify(user),
}));

export const updateUser = async (id, user) => normalizeUser(await requestJson(`/${id}`, {
  method: 'PUT',
  body: JSON.stringify(user),
}));

export const deleteUser = (id) => requestJson(`/${id}`, { method: 'DELETE' });

export const loginUser = (credentials) =>
  requestJson('/login', { method: 'POST', body: JSON.stringify(credentials) });

export const createUserRows = fetchUsers;

export const createUserOptions = (rows, fieldName, fallbackOptions) => [
  ...new Set([...rows.map((user) => user[fieldName]), ...fallbackOptions].filter(Boolean)),
];

export const filterUsers = ({ genderFilter, roleFilter, rows, searchTerm, statusFilter }) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return rows.filter((user) => {
    const matchesSearch =
      !normalizedSearch ||
      [user.firstName, user.lastName, user.email, user.username]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch);

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesGender = genderFilter === 'all' || user.gender === genderFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });
};

export const toUserForm = (user) => ({
  ...EMPTY_USER_FORM,
  firstName: user.firstName ?? '',
  lastName: user.lastName ?? '',
  age: user.age ?? '',
  gender: user.gender ?? '',
  contactNumber: user.contactNumber ?? '',
  email: user.email ?? '',
  role: user.role ?? '',
  username: user.username ?? '',
  password: '',
  address: user.address ?? '',
  isActive: Boolean(user.isActive),
});

export const saveUserRow = async ({ form, rows, selectedUserId }) => {
  const payload = {
    ...form,
    email: form.email.trim().toLowerCase(),
    username: form.username.trim().toLowerCase(),
    role: form.role.trim().toLowerCase(),
    gender: form.gender.trim().toLowerCase(),
    address: form.address.trim() || 'Not provided',
    status: getUserStatus(form.isActive),
  };

  if (!payload.password) {
    delete payload.password;
  }

  if (selectedUserId) {
    const updatedUser = await updateUser(selectedUserId, payload);
    return rows.map((user) => (user.id === selectedUserId ? updatedUser : user));
  }

  const createdUser = await createUser(payload);
  return [createdUser, ...rows];
};

export const toggleUserStatus = async (rows, userId) => {
  const user = rows.find((currentUser) => currentUser.id === userId);

  if (!user) {
    return rows;
  }

  const updatedUser = await updateUser(userId, {
    ...user,
    isActive: !user.isActive,
  });

  return rows.map((currentUser) => (currentUser.id === userId ? updatedUser : currentUser));
};

export const registerUser = async (form) =>
  createUser({
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    age: form.age.trim(),
    gender: form.gender || 'female',
    contactNumber: form.contactNumber.trim(),
    email: form.email.trim().toLowerCase(),
    role: 'viewer',
    username: form.username.trim().toLowerCase(),
    password: form.password,
    address: form.address?.trim() || 'Not provided',
    isActive: true,
  });

export const authenticateUser = async ({ email, password }) => {
  const data = await loginUser({
    email: email.trim().toLowerCase(),
    password,
  });
  const user = normalizeUser(data.user);

  localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, data.token);

  return user;
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_STORAGE_KEY) || 'null');
  } catch {
    return null;
  }
};

export const clearCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
};

export const defaultRoleOptions = USER_ROLES;
export const defaultGenderOptions = USER_GENDERS;
