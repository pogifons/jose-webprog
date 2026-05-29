import articlesSeed from '../data/article-content';

const ARTICLES_STORAGE_KEY = 'petpals.articles';

const slugify = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const normalizeArticle = (article, index = 0) => ({
  id: article.id ?? index + 1,
  name: article.name || slugify(article.title || `article-${index + 1}`),
  title: article.title || 'Untitled Article',
  imageSrc: article.imageSrc || '',
  content: Array.isArray(article.content)
    ? article.content
    : String(article.content || '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
  isPublished: typeof article.isPublished === 'boolean' ? article.isPublished : true,
});

export const getStoredArticles = () => {
  try {
    const storedArticles = JSON.parse(localStorage.getItem(ARTICLES_STORAGE_KEY) || 'null');
    return Array.isArray(storedArticles)
      ? storedArticles.map(normalizeArticle)
      : articlesSeed.map(normalizeArticle);
  } catch {
    return articlesSeed.map(normalizeArticle);
  }
};

export const setStoredArticles = (articles) => {
  const normalizedArticles = articles.map(normalizeArticle);
  localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(normalizedArticles));
  return normalizedArticles;
};

export const getPublishedArticles = () =>
  getStoredArticles().filter((article) => article.isPublished);

export const getArticleByName = (name) =>
  getPublishedArticles().find((article) => article.name === name);

export const filterArticles = (articles, searchTerm) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  if (!normalizedSearch) {
    return articles;
  }

  return articles.filter((article) =>
    [article.name, article.title, article.content.join(' ')]
      .join(' ')
      .toLowerCase()
      .includes(normalizedSearch)
  );
};

export const toArticleForm = (article) => ({
  title: article.title ?? '',
  name: article.name ?? '',
  imageSrc: article.imageSrc ?? '',
  content: Array.isArray(article.content) ? article.content.join('\n\n') : '',
  isPublished: typeof article.isPublished === 'boolean' ? article.isPublished : true,
});

export const emptyArticleForm = {
  title: '',
  name: '',
  imageSrc: '',
  content: '',
  isPublished: true,
};

export const saveArticle = ({ articles, form, selectedArticleId }) => {
  const article = normalizeArticle({
    ...form,
    name: form.name.trim() || slugify(form.title),
    content: form.content,
  });

  if (selectedArticleId) {
    return setStoredArticles(
      articles.map((currentArticle) =>
        currentArticle.id === selectedArticleId
          ? {
              ...article,
              id: selectedArticleId,
            }
          : currentArticle
      )
    );
  }

  return setStoredArticles([
    ...articles,
    {
      ...article,
      id: articles.length > 0 ? Math.max(...articles.map((item) => item.id)) + 1 : 1,
    },
  ]);
};

export const toggleArticlePublished = (articles, articleId) =>
  setStoredArticles(
    articles.map((article) =>
      article.id === articleId
        ? {
            ...article,
            isPublished: !article.isPublished,
          }
        : article
    )
  );

export const validateArticleForm = (form) => {
  const errors = {};

  if (!form.title.trim()) {
    errors.title = 'Title is required.';
  }

  if (!form.content.trim()) {
    errors.content = 'Content is required.';
  }

  return errors;
};
