import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
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
import { USER_GENDERS, USER_ROLES } from '../../constants';
import {
  dialogActionsSx,
  dialogContentSx,
  dialogSx,
  dialogTitleSx,
  modalFieldSx,
  modalSectionSx,
  sectionHeadingSx,
} from './userStyles';

function UserFormDialog({
  errors,
  form,
  isEditMode,
  isSaving,
  onChange,
  onClose,
  onFieldBlur,
  onSave,
  saveError,
  onTogglePassword,
  open,
  showPassword,
}) {
  const helperText = (fieldName, hint) => errors[fieldName] || hint;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      keepMounted
      transitionDuration={{ enter: 120, exit: 90 }}
      sx={dialogSx}
    >
      <DialogTitle sx={dialogTitleSx}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 44,
              height: 44,
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
              border: '2px solid var(--pet-border)',
              borderRadius: '50%',
              color: 'var(--pet-paper)',
              bgcolor: 'var(--pet-ink)',
              boxShadow: '0 10px 20px rgba(27, 26, 22, 0.16)',
            }}
          >
            <PersonAddAlt1Icon />
          </Box>

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography className="pet-kicker" component="p">
              Users
            </Typography>
            <Typography variant="h5" component="h2" sx={{ color: 'var(--pet-ink)', fontWeight: 800 }}>
              {isEditMode ? 'Edit User' : 'Add User'}
            </Typography>
          </Box>

          <IconButton
            aria-label="Close user dialog"
            onClick={onClose}
            sx={{
              border: '2px solid rgba(27, 26, 22, 0.18)',
              color: 'var(--pet-ink)',
              bgcolor: 'rgba(255, 250, 242, 0.82)',
              '&:hover': { bgcolor: 'rgba(255, 122, 89, 0.14)' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers sx={dialogContentSx}>
        <Stack spacing={2}>
          {saveError ? (
            <Box
              sx={{
                px: 2,
                py: 1.5,
                border: '2px solid rgba(220, 38, 38, 0.28)',
                borderRadius: 2,
                bgcolor: 'rgba(254, 226, 226, 0.72)',
                color: '#b91c1c',
                fontWeight: 800,
              }}
            >
              {saveError}
            </Box>
          ) : null}

          <Box sx={modalSectionSx}>
            <Typography sx={sectionHeadingSx}>Personal details</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                name="firstName"
                label="First Name"
                value={form.firstName}
                onChange={onChange}
                onBlur={onFieldBlur}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
                required
                fullWidth
                sx={modalFieldSx}
              />
              <TextField
                name="lastName"
                label="Last Name"
                value={form.lastName}
                onChange={onChange}
                onBlur={onFieldBlur}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
                required
                fullWidth
                sx={modalFieldSx}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
              <TextField
                name="age"
                label="Age"
                value={form.age}
                onChange={onChange}
                onBlur={onFieldBlur}
                error={Boolean(errors.age)}
                helperText={helperText('age', 'Numbers only')}
                required
                fullWidth
                sx={modalFieldSx}
                inputProps={{ inputMode: 'numeric' }}
              />
              <TextField
                select
                name="gender"
                label="Gender"
                value={form.gender}
                onChange={onChange}
                onBlur={onFieldBlur}
                error={Boolean(errors.gender)}
                helperText={errors.gender}
                required
                fullWidth
                sx={modalFieldSx}
              >
                {USER_GENDERS.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Box>

          <Box sx={modalSectionSx}>
            <Typography sx={sectionHeadingSx}>Contact</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                name="contactNumber"
                label="Contact Number"
                value={form.contactNumber}
                onChange={onChange}
                onBlur={onFieldBlur}
                error={Boolean(errors.contactNumber)}
                helperText={helperText('contactNumber', 'Must be exactly 11 digits')}
                required
                fullWidth
                sx={modalFieldSx}
                inputProps={{ inputMode: 'numeric', maxLength: 11 }}
              />
              <TextField
                name="email"
                label="Email Address"
                type="email"
                value={form.email}
                onChange={onChange}
                onBlur={onFieldBlur}
                error={Boolean(errors.email)}
                helperText={errors.email}
                required
                fullWidth
                sx={modalFieldSx}
              />
            </Stack>
          </Box>

          <Box sx={modalSectionSx}>
            <Typography sx={sectionHeadingSx}>Account access</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                select
                name="role"
                label="Role"
                value={form.role}
                onChange={onChange}
                onBlur={onFieldBlur}
                error={Boolean(errors.role)}
                helperText={errors.role}
                required
                fullWidth
                sx={modalFieldSx}
              >
                {USER_ROLES.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="username"
                label="Username"
                value={form.username}
                onChange={onChange}
                onBlur={onFieldBlur}
                error={Boolean(errors.username)}
                helperText={helperText('username', 'No spaces allowed')}
                required
                fullWidth
                sx={modalFieldSx}
              />
            </Stack>

            <TextField
              name="password"
              label={isEditMode ? 'New Password' : 'Password'}
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={onChange}
              onBlur={onFieldBlur}
              error={Boolean(errors.password)}
              helperText={helperText('password', isEditMode ? 'Leave blank to keep current password' : 'At least 8 characters')}
              required={!isEditMode}
              fullWidth
              sx={{ mt: 2, ...modalFieldSx }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={onTogglePassword}
                      edge="end"
                      sx={{ color: 'var(--pet-ink)' }}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={modalSectionSx}>
            <Typography sx={sectionHeadingSx}>Address and status</Typography>
            <TextField
              name="address"
              label="Address"
              value={form.address}
              onChange={onChange}
              multiline
              rows={3}
              fullWidth
              sx={modalFieldSx}
            />

            <Box
              sx={{
                mt: 2,
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                border: '2px solid rgba(27, 26, 22, 0.12)',
                borderRadius: 2,
                bgcolor: form.isActive ? 'rgba(43, 179, 209, 0.10)' : 'rgba(27, 26, 22, 0.04)',
              }}
            >
              <Box>
                <Typography sx={{ color: 'var(--pet-ink)', fontWeight: 800 }}>
                  User status
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(27, 26, 22, 0.66)' }}>
                  {form.isActive ? 'Active account' : 'Inactive account'}
                </Typography>
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={onChange}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: 'var(--pet-accent-2)',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'var(--pet-accent-2)',
                      },
                    }}
                  />
                }
                label={form.isActive ? 'Active' : 'Inactive'}
                labelPlacement="start"
                sx={{ m: 0, color: 'var(--pet-ink)', fontWeight: 700 }}
              />
            </Box>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={dialogActionsSx}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: 999,
            px: 2.5,
            color: 'var(--pet-ink)',
            '&:hover': { bgcolor: 'rgba(255, 122, 89, 0.12)' },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onSave}
          disabled={isSaving}
          sx={{
            border: '2px solid var(--pet-border)',
            borderRadius: 999,
            px: 2.75,
            bgcolor: 'var(--pet-ink)',
            color: 'var(--pet-paper)',
            boxShadow: '0 12px 24px rgba(27, 26, 22, 0.18)',
            '&:hover': { bgcolor: 'rgba(27, 26, 22, 0.86)' },
            '&.Mui-disabled': {
              borderColor: 'rgba(27, 26, 22, 0.18)',
              bgcolor: 'rgba(27, 26, 22, 0.42)',
              color: 'rgba(255, 250, 242, 0.74)',
            },
          }}
        >
          {isSaving ? 'Saving...' : isEditMode ? 'Update User' : 'Save User'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserFormDialog;
