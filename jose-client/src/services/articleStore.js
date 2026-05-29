import constants from '../constants';
import articlesSeed from '../data/article-content';

const ARTICLES_STORAGE_KEY = 'petpals.articles.fallback';

const slugify = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const normalizeArticle = (article, index = 0) => ({
  ...article,
  id: article.id ?? article._id ?? index + 1,
  name: article.name || slugify(article.title || `article-${index + 1}`),
  title: article.title || 'Untitled Article',
  imageSrc: article.imageSrc || '',
  content: Array.isArray(article.content)
    ? article.content
    : String(article.content || '')
        .split(/\n{2,}|\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean),
  isPublished: typeof article.isPublished === 'boolean' ? article.isPublished : true,
});

const getSeedArticles = () =>
  articlesSeed.map((article, index) =>
    normalizeArticle({
      ...article,
      id: `seed-${index + 1}`,
      isPublished: true,
    }, index)
  );

const mergeWithSeedArticles = (apiArticles) => {
  const normalizedApiArticles = apiArticles.map(normalizeArticle);
  const apiArticleNames = new Set(
    normalizedApiArticles.map((article) => article.name.trim().toLowerCase())
  );
  const seedArticles = getSeedArticles().filter(
    (article) => !apiArticleNames.has(article.name.trim().toLowerCase())
  );

  return [...normalizedApiArticles, ...seedArticles];
};

const getFallbackArticles = () => {
  try {
    const storedArticles = JSON.parse(localStorage.getItem(ARTICLES_STORAGE_KEY) || 'null');

    if (Array.isArray(storedArticles)) {
      return mergeWithSeedArticles(storedArticles);
    }
  } catch {
    // Ignore broken fallback cache and use the default articles.
  }

  return getSeedArticles();
};

const setFallbackArticles = (articles) => {
  const normalizedArticles = articles.map(normalizeArticle);
  localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(normalizedArticles));
  return normalizedArticles;
};

const requestJson = async (path, options = {}) => {
  const response = await fetch(`${constants.HOST}/articles${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Article request failed.');
  }

  return data;
};

export const fetchArticles = async () => {
  try {
    const articles = await requestJson('/');
    return articles.map(normalizeArticle);
  } catch {
    return getFallbackArticles();
  }
};

export const fetchPublishedArticles = async () => {
  try {
    const articles = await requestJson('/?published=true');
    return mergeWithSeedArticles(articles);
  } catch {
    return getFallbackArticles().filter((article) => article.isPublished);
  }
};

export const fetchArticleByName = async (name) => {
  try {
    return normalizeArticle(await requestJson(`/slug/${encodeURIComponent(name)}`));
  } catch (error) {
    const seedArticle = getSeedArticles().find(
      (article) => article.name.trim().toLowerCase() === String(name).trim().toLowerCase()
    );

    if (seedArticle) {
      return seedArticle;
    }

    throw error;
  }
};

export const createArticle = async (article) =>
  normalizeArticle(await requestJson('/', {
    method: 'POST',
    body: JSON.stringify(article),
  }));

export const updateArticle = async (id, article) =>
  normalizeArticle(await requestJson(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(article),
  }));

export const deleteArticle = (id) => requestJson(`/${id}`, { method: 'DELETE' });

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

export const saveArticle = async ({ articles, form, selectedArticleId }) => {
  const payload = {
    ...form,
    name: form.name.trim() || slugify(form.title),
    title: form.title.trim(),
    imageSrc: form.imageSrc.trim(),
    content: form.content,
  };

  if (selectedArticleId) {
    try {
      const updatedArticle = await updateArticle(selectedArticleId, payload);
      return articles.map((article) =>
        article.id === selectedArticleId ? updatedArticle : article
      );
    } catch {
      return setFallbackArticles(
        articles.map((article) =>
          article.id === selectedArticleId
            ? normalizeArticle({ ...article, ...payload, id: selectedArticleId })
            : article
        )
      );
    }
  }

  try {
    const createdArticle = await createArticle(payload);
    return [createdArticle, ...articles];
  } catch {
    return setFallbackArticles([
      normalizeArticle({
        ...payload,
        id: `fallback-${Date.now()}`,
      }),
      ...articles,
    ]);
  }
};

export const toggleArticlePublished = async (articles, articleId) => {
  const article = articles.find((currentArticle) => currentArticle.id === articleId);

  if (!article) {
    return articles;
  }

  try {
    const updatedArticle = await updateArticle(articleId, {
      ...article,
      isPublished: !article.isPublished,
    });

    return articles.map((currentArticle) =>
      currentArticle.id === articleId ? updatedArticle : currentArticle
    );
  } catch {
    return setFallbackArticles(
      articles.map((currentArticle) =>
        currentArticle.id === articleId
          ? { ...currentArticle, isPublished: !currentArticle.isPublished }
          : currentArticle
      )
    );
  }
};

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
