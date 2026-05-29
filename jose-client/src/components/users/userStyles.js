export const cardSx = {
  border: '2px solid var(--pet-border)',
  borderRadius: 3,
  background: 'linear-gradient(180deg, rgba(255, 250, 242, 0.94), rgba(255, 243, 224, 0.94))',
  boxShadow: 'var(--pet-shadow)',
};

export const filterFieldSx = {
  minWidth: { xs: '100%', sm: 180 },
  '& .MuiOutlinedInput-root': {
    borderRadius: 3,
    backgroundColor: 'rgba(255, 250, 242, 0.88)',
  },
};

export const gridSx = {
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

export const dialogSx = {
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(27, 26, 22, 0.52)',
  },
  '& .MuiDialog-paper': {
    overflow: 'hidden',
    border: '2px solid var(--pet-border)',
    borderRadius: 3,
    background: 'linear-gradient(180deg, rgba(255, 250, 242, 0.98), rgba(255, 243, 224, 0.98))',
    boxShadow: '0 18px 44px rgba(27, 26, 22, 0.22)',
  },
};

export const dialogTitleSx = {
  px: { xs: 2.5, sm: 3 },
  py: 2.25,
  borderBottom: '2px solid rgba(27, 26, 22, 0.12)',
  background:
    'linear-gradient(135deg, rgba(255, 122, 89, 0.18), rgba(43, 179, 209, 0.12) 52%, rgba(255, 250, 242, 0.76))',
};

export const dialogContentSx = {
  px: { xs: 2.5, sm: 3 },
  py: 3,
  borderColor: 'rgba(27, 26, 22, 0.12)',
};

export const dialogActionsSx = {
  px: { xs: 2.5, sm: 3 },
  py: 2,
  gap: 1.5,
  borderTop: '2px solid rgba(27, 26, 22, 0.12)',
  background: 'rgba(255, 250, 242, 0.86)',
};

export const modalFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    backgroundColor: 'rgba(255, 250, 242, 0.94)',
    '& fieldset': {
      borderColor: 'rgba(27, 26, 22, 0.22)',
      borderWidth: 2,
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 122, 89, 0.72)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--pet-accent-2)',
      boxShadow: '0 0 0 3px rgba(43, 179, 209, 0.16)',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'var(--pet-ink)',
  },
  '& .MuiFormHelperText-root': {
    mx: 0,
    color: 'rgba(27, 26, 22, 0.62)',
  },
};

export const modalSectionSx = {
  p: { xs: 2, sm: 2.25 },
  border: '2px solid rgba(27, 26, 22, 0.12)',
  borderRadius: 2,
  background: 'rgba(255, 250, 242, 0.68)',
};

export const sectionHeadingSx = {
  mb: 1.5,
  color: 'var(--pet-muted)',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
};
