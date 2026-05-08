import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CardContent, Stack, Typography } from '@mui/material';

const cardSx = {
  border: '2px solid var(--pet-border)',
  borderRadius: 3,
  background: 'linear-gradient(180deg, rgba(255, 250, 242, 0.94), rgba(255, 243, 224, 0.94))',
  boxShadow: 'var(--pet-shadow)',
};

function ReportsPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
        <p className="pet-kicker mb-3">Charts</p>
        <Typography variant="h4" component="h1" sx={{ color: 'var(--pet-ink)', fontWeight: 800 }}>
          Reports
        </Typography>
        <Typography className="pet-subtitle mt-3">
          Data visualization using MUI X sample values with the PetPals landing page theme.
        </Typography>
      </section>

      <Stack direction={{ xs: 'column', xl: 'row' }} spacing={3}>
        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <p className="pet-kicker mb-4">Bar Chart</p>
            <BarChart
              xAxis={[
                {
                  id: 'barCategories',
                  data: ['bar A', 'bar B', 'bar C'],
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: [2, 5, 3],
                  color: '#ff7a59',
                },
              ]}
              height={300}
            />
          </CardContent>
        </Card>

        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <p className="pet-kicker mb-4">Pie Chart</p>
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
              height={300}
            />
          </CardContent>
        </Card>
      </Stack>

      <Card sx={cardSx}>
        <CardContent>
          <p className="pet-kicker mb-4">Line Chart</p>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                color: '#2bb3d1',
              },
            ]}
            height={300}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default ReportsPage;
