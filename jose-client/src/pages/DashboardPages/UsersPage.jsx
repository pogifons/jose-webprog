import { useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import users from '../../data/users.json';

const createUserRows = () =>
  users.map((user, index) => ({
    id: index + 1,
    ...user,
    status: user.isActive ? 'active' : 'inactive',
  }));

const emptyUserForm = {
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

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 230 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'role', headerName: 'Role', width: 120 },
  { field: 'gender', headerName: 'Gender', width: 110 },
  { field: 'age', headerName: 'Age', width: 90 },
  { field: 'contactNumber', headerName: 'Contact number', width: 150 },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params) => (
      <Chip
        size="small"
        label={params.value === 'active' ? 'Active' : 'Inactive'}
        color={params.value === 'active' ? 'success' : 'default'}
        variant={params.value === 'active' ? 'filled' : 'outlined'}
      />
    ),
  },
];

const cardSx = {
  border: '2px solid var(--pet-border)',
  borderRadius: 3,
  background: 'linear-gradient(180deg, rgba(255, 250, 242, 0.94), rgba(255, 243, 224, 0.94))',
  boxShadow: 'var(--pet-shadow)',
};

const gridSx = {
  border: '2px solid rgba(27, 26, 22, 0.18)',
  borderRadius: 2,
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'rgba(255, 122, 89, 0.10)',
    color: 'var(--pet-ink)',
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: 'rgba(43, 179, 209, 0.08)',
  },
  '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': {
    outline: '2px solid rgba(43, 179, 209, 0.55)',
  },
};

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 1,
    backgroundColor: '#fff',
  },
};

const filterFieldSx = {
  minWidth: { xs: '100%', sm: 180 },
  '& .MuiOutlinedInput-root': {
    borderRadius: 3,
    backgroundColor: 'rgba(255, 250, 242, 0.88)',
  },
};

const validateUserForm = (form) => {
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
  }

  if (!form.role) {
    errors.role = 'Role is required.';
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

  return errors;
};

function UsersPage() {
  const [rows, setRows] = useState(createUserRows);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState(emptyUserForm);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const roleOptions = useMemo(
    () => [...new Set([...rows.map((user) => user.role), 'admin', 'editor', 'viewer'].filter(Boolean))],
    [rows]
  );

  const genderOptions = useMemo(
    () => [...new Set([...rows.map((user) => user.gender), 'female', 'male'].filter(Boolean))],
    [rows]
  );

  const filteredRows = useMemo(() => {
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
  }, [genderFilter, roleFilter, rows, searchTerm, statusFilter]);

  const handleAddDialogOpen = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setIsAddDialogOpen(false);
    setNewUser(emptyUserForm);
    setFormErrors({});
    setShowPassword(false);
  };

  const handleNewUserChange = (event) => {
    const { checked, name, type, value } = event.target;
    const nextUser = {
      ...newUser,
      [name]: type === 'checkbox' ? checked : value,
    };

    setNewUser(nextUser);

    if (Object.keys(formErrors).length > 0) {
      setFormErrors(validateUserForm(nextUser));
    }
  };

  const handleNewUserBlur = (event) => {
    const { name } = event.target;
    const nextErrors = validateUserForm(newUser);

    setFormErrors((currentErrors) => {
      const updatedErrors = { ...currentErrors };

      if (nextErrors[name]) {
        updatedErrors[name] = nextErrors[name];
      } else {
        delete updatedErrors[name];
      }

      return updatedErrors;
    });
  };

  const handleSaveUser = () => {
    const nextErrors = validateUserForm(newUser);
    setFormErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setRows((currentRows) => [
      ...currentRows,
      {
        ...newUser,
        id: currentRows.length > 0 ? Math.max(...currentRows.map((user) => user.id)) + 1 : 1,
        status: newUser.isActive ? 'active' : 'inactive',
      },
    ]);
    handleAddDialogClose();
  };

  const helperText = (fieldName, hint) => formErrors[fieldName] || hint;

  return (
    <div className="flex w-full flex-col gap-6">
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

      <Card sx={cardSx}>
        <CardContent>
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} sx={{ mb: 3 }}>
            <TextField
              label="Search users"
              placeholder="First name, last name, email, username"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              sx={{ flex: 1, ...filterFieldSx }}
            />

            <TextField
              select
              label="Role"
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              sx={filterFieldSx}
            >
              <MenuItem value="all">All roles</MenuItem>
              {roleOptions.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Gender"
              value={genderFilter}
              onChange={(event) => setGenderFilter(event.target.value)}
              sx={filterFieldSx}
            >
              <MenuItem value="all">All genders</MenuItem>
              {genderOptions.map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {gender}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              sx={filterFieldSx}
            >
              <MenuItem value="all">All statuses</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddDialogOpen}
              sx={{
                minWidth: { xs: '100%', sm: 150 },
                borderRadius: 999,
                px: 2.5,
                bgcolor: 'var(--pet-ink)',
                '&:hover': { bgcolor: 'rgba(27, 26, 22, 0.86)' },
              }}
            >
              Add User
            </Button>
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Showing {filteredRows.length} of {rows.length} users
          </Typography>

          <Box sx={{ height: 480, width: '100%' }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={gridSx}
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: 800 }}>Add User</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2.25} sx={{ pt: 1 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                name="firstName"
                label="First Name"
                value={newUser.firstName}
                onChange={handleNewUserChange}
                onBlur={handleNewUserBlur}
                error={Boolean(formErrors.firstName)}
                helperText={formErrors.firstName}
                required
                fullWidth
                sx={fieldSx}
              />
              <TextField
                name="lastName"
                label="Last Name"
                value={newUser.lastName}
                onChange={handleNewUserChange}
                onBlur={handleNewUserBlur}
                error={Boolean(formErrors.lastName)}
                helperText={formErrors.lastName}
                required
                fullWidth
                sx={fieldSx}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                name="age"
                label="Age"
                value={newUser.age}
                onChange={handleNewUserChange}
                onBlur={handleNewUserBlur}
                error={Boolean(formErrors.age)}
                helperText={helperText('age', 'Numbers only')}
                required
                fullWidth
                sx={fieldSx}
                inputProps={{ inputMode: 'numeric' }}
              />
              <TextField
                select
                name="gender"
                label="Gender"
                value={newUser.gender}
                onChange={handleNewUserChange}
                onBlur={handleNewUserBlur}
                error={Boolean(formErrors.gender)}
                helperText={formErrors.gender}
                required
                fullWidth
                sx={fieldSx}
              >
                <MenuItem value="female">female</MenuItem>
                <MenuItem value="male">male</MenuItem>
              </TextField>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                name="contactNumber"
                label="Contact Number"
                value={newUser.contactNumber}
                onChange={handleNewUserChange}
                onBlur={handleNewUserBlur}
                error={Boolean(formErrors.contactNumber)}
                helperText={helperText('contactNumber', 'Must be exactly 11 digits')}
                required
                fullWidth
                sx={fieldSx}
                inputProps={{ inputMode: 'numeric', maxLength: 11 }}
              />
              <TextField
                name="email"
                label="Email Address"
                type="email"
                value={newUser.email}
                onChange={handleNewUserChange}
                onBlur={handleNewUserBlur}
                error={Boolean(formErrors.email)}
                helperText={formErrors.email}
                required
                fullWidth
                sx={fieldSx}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                select
                name="role"
                label="Role"
                value={newUser.role}
                onChange={handleNewUserChange}
                onBlur={handleNewUserBlur}
                error={Boolean(formErrors.role)}
                helperText={formErrors.role}
                required
                fullWidth
                sx={fieldSx}
              >
                <MenuItem value="admin">admin</MenuItem>
                <MenuItem value="editor">editor</MenuItem>
                <MenuItem value="viewer">viewer</MenuItem>
              </TextField>
              <TextField
                name="username"
                label="Username"
                value={newUser.username}
                onChange={handleNewUserChange}
                onBlur={handleNewUserBlur}
                error={Boolean(formErrors.username)}
                helperText={helperText('username', 'No spaces allowed')}
                required
                fullWidth
                sx={fieldSx}
              />
            </Stack>

            <TextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={newUser.password}
              onChange={handleNewUserChange}
              onBlur={handleNewUserBlur}
              error={Boolean(formErrors.password)}
              helperText={helperText('password', 'At least 8 characters')}
              required
              fullWidth
              sx={fieldSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword((isVisible) => !isVisible)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              name="address"
              label="Address"
              value={newUser.address}
              onChange={handleNewUserChange}
              multiline
              rows={3}
              fullWidth
              sx={fieldSx}
            />

            <FormControlLabel
              control={
                <Switch
                  name="isActive"
                  checked={newUser.isActive}
                  onChange={handleNewUserChange}
                />
              }
              label={`User status: ${newUser.isActive ? 'Active' : 'Inactive'}`}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveUser}>
            Save User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UsersPage;
