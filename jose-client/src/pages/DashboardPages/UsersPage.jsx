import { DataGrid } from '@mui/x-data-grid';
import { Box, Card, CardContent, Typography } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
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

function UsersPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
        <p className="pet-kicker mb-3">Users</p>
        <Typography variant="h4" component="h1" sx={{ color: 'var(--pet-ink)', fontWeight: 800 }}>
          User Details
        </Typography>
        <Typography className="pet-subtitle mt-3">
          User list table using MUI X Data Grid sample rows, styled with the landing page theme.
        </Typography>
      </section>

      <Card sx={cardSx}>
        <CardContent>
          <Box sx={{ height: 430, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={gridSx}
            />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default UsersPage;
