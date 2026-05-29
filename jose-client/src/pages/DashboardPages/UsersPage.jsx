import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { EMPTY_USER_FORM, validateUserForm } from '../../constants';
import UserFilters from '../../components/users/UserFilters';
import UserFormDialog from '../../components/users/UserFormDialog';
import UsersHero from '../../components/users/UsersHero';
import UsersTable from '../../components/users/UsersTable';
import { cardSx } from '../../components/users/userStyles';
import {
  createUserOptions,
  defaultGenderOptions,
  defaultRoleOptions,
  fetchUsers,
  filterUsers,
  saveUserRow,
  toUserForm,
  toggleUserStatus,
} from '../../services/userService';

function UsersPage() {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [form, setForm] = useState(EMPTY_USER_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [pageError, setPageError] = useState('');
  const [saveError, setSaveError] = useState('');

  const isEditMode = Boolean(selectedUserId);

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        setIsLoading(true);
        setPageError('');
        const users = await fetchUsers();

        if (isMounted) {
          setRows(users);
        }
      } catch (error) {
        if (isMounted) {
          setPageError(error.message || 'Unable to load users.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const roleOptions = useMemo(
    () => createUserOptions(rows, 'role', defaultRoleOptions),
    [rows]
  );

  const genderOptions = useMemo(
    () => createUserOptions(rows, 'gender', defaultGenderOptions),
    [rows]
  );

  const filteredRows = useMemo(
    () =>
      filterUsers({
        genderFilter,
        roleFilter,
        rows,
        searchTerm,
        statusFilter,
      }),
    [genderFilter, roleFilter, rows, searchTerm, statusFilter]
  );

  const getFormErrors = (nextForm) =>
    validateUserForm(nextForm, { requirePassword: !selectedUserId });

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedUserId(null);
    setForm(EMPTY_USER_FORM);
    setFormErrors({});
    setShowPassword(false);
    setSaveError('');
  };

  const handleAddUser = () => {
    setSelectedUserId(null);
    setForm(EMPTY_USER_FORM);
    setFormErrors({});
    setShowPassword(false);
    setSaveError('');
    setIsDialogOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUserId(user.id);
    setForm(toUserForm(user));
    setFormErrors({});
    setShowPassword(false);
    setSaveError('');
    setIsDialogOpen(true);
  };

  const handleFormChange = (event) => {
    const { checked, name, type, value } = event.target;
    const nextForm = {
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    };

    setForm(nextForm);
    setSaveError('');

    if (Object.keys(formErrors).length > 0) {
      setFormErrors(getFormErrors(nextForm));
    }
  };

  const handleFieldBlur = (event) => {
    const { name } = event.target;
    const nextErrors = getFormErrors(form);

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

  const handleSaveUser = async () => {
    const nextErrors = getFormErrors(form);
    setFormErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setIsSaving(true);
      setPageError('');
      const nextRows = await saveUserRow({ form, rows, selectedUserId });
      setRows(nextRows);
      handleDialogClose();
    } catch (error) {
      setSaveError(error.message || 'Unable to save user.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      setPageError('');
      const nextRows = await toggleUserStatus(rows, userId);
      setRows(nextRows);
    } catch (error) {
      setPageError(error.message || 'Unable to update user status.');
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <UsersHero />

      <Card sx={cardSx}>
        <CardContent>
          <UserFilters
            genderFilter={genderFilter}
            genderOptions={genderOptions}
            onAddUser={handleAddUser}
            onGenderFilterChange={setGenderFilter}
            onRoleFilterChange={setRoleFilter}
            onSearchChange={setSearchTerm}
            onStatusFilterChange={setStatusFilter}
            roleFilter={roleFilter}
            roleOptions={roleOptions}
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />

          {pageError ? (
            <Typography color="error" sx={{ mb: 2, fontWeight: 700 }}>
              {pageError}
            </Typography>
          ) : null}

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {isLoading ? 'Loading users...' : `Showing ${filteredRows.length} of ${rows.length} users`}
          </Typography>

          <UsersTable
            onEditUser={handleEditUser}
            onToggleStatus={handleToggleStatus}
            rows={filteredRows}
          />
        </CardContent>
      </Card>

      <UserFormDialog
        errors={formErrors}
        form={form}
        isEditMode={isEditMode}
        isSaving={isSaving}
        onChange={handleFormChange}
        onClose={handleDialogClose}
        onFieldBlur={handleFieldBlur}
        onSave={handleSaveUser}
        saveError={saveError}
        onTogglePassword={() => setShowPassword((isVisible) => !isVisible)}
        open={isDialogOpen}
        showPassword={showPassword}
      />
    </div>
  );
}

export default UsersPage;
