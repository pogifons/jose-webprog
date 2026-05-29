import { useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
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
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { cardSx, dialogActionsSx, dialogContentSx, dialogSx, dialogTitleSx, gridSx } from '../../components/users/userStyles';
import {
  emptyArticleForm,
  filterArticles,
  getStoredArticles,
  saveArticle,
  toggleArticlePublished,
  toArticleForm,
  validateArticleForm,
} from '../../services/articleStore';

function DashArticleListPage() {
  const [articles, setArticles] = useState(getStoredArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [form, setForm] = useState(emptyArticleForm);
  const [errors, setErrors] = useState({});

  const filteredArticles = useMemo(
    () => filterArticles(articles, searchTerm),
    [articles, searchTerm]
  );

  const openAddDialog = () => {
    setSelectedArticleId(null);
    setForm(emptyArticleForm);
    setErrors({});
    setIsDialogOpen(true);
  };

  const openEditDialog = (article) => {
    setSelectedArticleId(article.id);
    setForm(toArticleForm(article));
    setErrors({});
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedArticleId(null);
    setForm(emptyArticleForm);
    setErrors({});
    setIsDialogOpen(false);
  };

  const handleChange = (event) => {
    const { checked, name, type, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    const nextErrors = validateArticleForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setArticles((currentArticles) =>
      saveArticle({
        articles: currentArticles,
        form,
        selectedArticleId,
      })
    );
    closeDialog();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 260 },
    { field: 'name', headerName: 'Slug', flex: 0.8, minWidth: 180 },
    {
      field: 'content',
      headerName: 'Paragraphs',
      width: 120,
      valueGetter: (value, row) => row.content.length,
    },
    {
      field: 'isPublished',
      headerName: 'Status',
      width: 130,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isPublished ? 'Published' : 'Draft'}
          color={row.isPublished ? 'success' : 'default'}
          variant={row.isPublished ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 230,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', height: '100%' }}>
          <Button size="small" variant="outlined" onClick={() => openEditDialog(row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isPublished ? 'warning' : 'success'}
            onClick={() => setArticles((currentArticles) => toggleArticlePublished(currentArticles, row.id))}
          >
            {row.isPublished ? 'Unpublish' : 'Publish'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="pet-section rounded-3xl px-4 py-6 sm:py-8">
        <p className="pet-kicker mb-3">Articles</p>
        <Typography variant="h4" component="h1" sx={{ color: 'var(--pet-ink)', fontWeight: 800 }}>
          Article Details
        </Typography>
        <Typography className="pet-subtitle mt-3">
          Manage dashboard articles here. Published articles appear on the public Article List page.
        </Typography>
      </section>

      <Card sx={cardSx}>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
            <TextField
              label="Search articles"
              placeholder="Title, slug, or content"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={openAddDialog}
              sx={{
                minWidth: { xs: '100%', sm: 170 },
                borderRadius: 999,
                bgcolor: 'var(--pet-ink)',
                '&:hover': { bgcolor: 'rgba(27, 26, 22, 0.86)' },
              }}
            >
              Add Article
            </Button>
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Showing {filteredArticles.length} of {articles.length} articles
          </Typography>

          <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={filteredArticles}
              columns={columns}
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
              pageSizeOptions={[5, 10]}
              disableRowSelectionOnClick
              sx={gridSx}
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onClose={closeDialog} fullWidth maxWidth="md" sx={dialogSx}>
        <DialogTitle sx={dialogTitleSx}>
          <Typography variant="h5" component="h2" sx={{ color: 'var(--pet-ink)', fontWeight: 800 }}>
            {selectedArticleId ? 'Edit Article' : 'Add Article'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers sx={dialogContentSx}>
          <Stack spacing={2}>
            <TextField
              name="title"
              label="Title"
              value={form.title}
              onChange={handleChange}
              error={Boolean(errors.title)}
              helperText={errors.title}
              fullWidth
              required
            />
            <TextField
              name="name"
              label="Slug"
              value={form.name}
              onChange={handleChange}
              helperText="Leave blank to generate from title"
              fullWidth
            />
            <TextField
              name="imageSrc"
              label="Image URL"
              value={form.imageSrc}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="content"
              label="Content"
              value={form.content}
              onChange={handleChange}
              error={Boolean(errors.content)}
              helperText={errors.content || 'Separate paragraphs with a blank line'}
              multiline
              minRows={6}
              fullWidth
              required
            />
            <FormControlLabel
              control={
                <Switch
                  name="isPublished"
                  checked={form.isPublished}
                  onChange={handleChange}
                />
              }
              label={form.isPublished ? 'Published on ArticleListPage' : 'Save as draft'}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={dialogActionsSx}>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {selectedArticleId ? 'Update Article' : 'Save Article'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DashArticleListPage;
