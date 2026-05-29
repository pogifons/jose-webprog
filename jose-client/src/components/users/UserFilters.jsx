import AddIcon from '@mui/icons-material/Add';
import { Button, MenuItem, Stack, TextField } from '@mui/material';
import { filterFieldSx } from './userStyles';

function UserFilters({
  genderFilter,
  genderOptions,
  onAddUser,
  onGenderFilterChange,
  onRoleFilterChange,
  onSearchChange,
  onStatusFilterChange,
  roleFilter,
  roleOptions,
  searchTerm,
  statusFilter,
}) {
  return (
    <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} sx={{ mb: 3 }}>
      <TextField
        label="Search users"
        placeholder="First name, last name, email, username"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        sx={{ flex: 1, ...filterFieldSx }}
      />

      <TextField
        select
        label="Role"
        value={roleFilter}
        onChange={(event) => onRoleFilterChange(event.target.value)}
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
        onChange={(event) => onGenderFilterChange(event.target.value)}
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
        onChange={(event) => onStatusFilterChange(event.target.value)}
        sx={filterFieldSx}
      >
        <MenuItem value="all">All statuses</MenuItem>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
      </TextField>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddUser}
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
  );
}

export default UserFilters;
