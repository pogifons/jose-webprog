import { memo, useMemo } from 'react';
import { Box, Button, Chip, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { gridSx } from './userStyles';

const baseColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 230 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'role', headerName: 'Role', width: 120 },
  { field: 'gender', headerName: 'Gender', width: 110 },
  { field: 'age', headerName: 'Age', width: 90 },
  { field: 'contactNumber', headerName: 'Contact number', width: 150 },
];

const UsersTable = memo(function UsersTable({ onEditUser, onToggleStatus, rows }) {
  const columns = useMemo(
    () => [
      ...baseColumns,
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
      {
        field: 'actions',
        headerName: 'Actions',
        width: 210,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: ({ row }) => (
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', height: '100%' }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => onEditUser(row)}
              sx={{
                minWidth: 58,
                borderRadius: 1,
                borderColor: 'var(--pet-accent-2)',
                color: 'var(--pet-accent-2)',
                fontSize: 11,
                fontWeight: 800,
                '&:hover': {
                  borderColor: 'var(--pet-accent-2)',
                  bgcolor: 'rgba(43, 179, 209, 0.10)',
                },
              }}
            >
              Edit
            </Button>

            <Button
              size="small"
              variant="contained"
              onClick={() => onToggleStatus(row.id)}
              sx={{
                minWidth: 84,
                borderRadius: 1,
                bgcolor: row.isActive ? 'var(--pet-accent)' : '#2e7d32',
                color: '#fff',
                fontSize: 11,
                fontWeight: 800,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: row.isActive ? '#e66342' : '#256b2b',
                  boxShadow: 'none',
                },
              }}
            >
              {row.isActive ? 'Disable' : 'Activate'}
            </Button>
          </Stack>
        ),
      },
    ],
    [onEditUser, onToggleStatus]
  );

  return (
    <Box sx={{ height: 480, width: '100%' }}>
      <DataGrid
        rows={rows}
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
  );
});

export default UsersTable;
