import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

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

const averageAge = (
  rows.reduce((sum, row) => sum + (row.age || 0), 0) /
  rows.filter((row) => row.age !== null).length
).toFixed(1);

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
  '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': {
    outline: '2px solid rgba(43, 179, 209, 0.55)',
  },
};

function DashboardPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
        <p className="pet-kicker mb-3">Overview</p>
        <Typography variant="h4" component="h1" sx={{ color: 'var(--pet-ink)', fontWeight: 800 }}>
          Dashboard
        </Typography>
        <Typography className="pet-subtitle mt-3">
          Summary output using MUI sample rows and chart values, styled to match the landing pages.
        </Typography>
      </section>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Card sx={cardSx}>
          <CardContent>
            <p className="pet-kicker">Total Users</p>
            <Typography variant="h4" sx={{ mt: 1, color: 'var(--pet-ink)', fontWeight: 800 }}>
              {rows.length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={cardSx}>
          <CardContent>
            <p className="pet-kicker">Average Age</p>
            <Typography variant="h4" sx={{ mt: 1, color: 'var(--pet-ink)', fontWeight: 800 }}>
              {averageAge}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction={{ xs: 'column', xl: 'row' }} spacing={3}>
        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <p className="pet-kicker mb-4">Gauge Samples</p>
            <Stack direction="row" spacing={3}>
              <Gauge width={120} height={120} value={50} />
              <Gauge width={120} height={120} value={50} valueMin={10} valueMax={60} />
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ ...cardSx, flex: 2 }}>
          <CardContent>
            <p className="pet-kicker mb-4">Chart Samples</p>
            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
              <BarChart
                xAxis={[{ data: ['bar A', 'bar B', 'bar C'], scaleType: 'band' }]}
                series={[{ data: [2, 5, 3], color: '#ff7a59' }]}
                height={260}
              />
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'series A', color: '#ff7a59' },
                      { id: 1, value: 15, label: 'series B', color: '#2bb3d1' },
                      { id: 2, value: 20, label: 'series C', color: '#1b1a16' },
                    ],
                  },
                ]}
                width={260}
                height={260}
              />
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Card sx={cardSx}>
        <CardContent>
          <p className="pet-kicker mb-3">Users Overview</p>
          <Box sx={{ height: 400, width: '100%' }}>
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

export default DashboardPage;
