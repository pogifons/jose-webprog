const Article = require('../models/Article');

const slugify = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const sanitizeArticle = (article) => {
  const articleObject = article.toObject ? article.toObject() : article;
  const { __v, ...safeArticle } = articleObject;
  const content = Array.isArray(safeArticle.content) && safeArticle.content.length > 0
    ? safeArticle.content
    : safeArticle.paragraphs || [];
  const isPublished =
    typeof safeArticle.isPublished === 'boolean'
      ? safeArticle.isPublished
      : safeArticle.status !== 'draft';

  return {
    ...safeArticle,
    id: String(safeArticle._id),
    name: safeArticle.name || safeArticle.slug || slugify(safeArticle.title),
    imageSrc: safeArticle.imageSrc || safeArticle.image || '',
    content,
    isPublished,
  };
};

const normalizeArticlePayload = (body) => {
  const title = String(body.title ?? '').trim();
  const name = slugify(body.name || title);
  const content = Array.isArray(body.content)
    ? body.content
    : String(body.content || '')
        .split(/\n{2,}|\r?\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

  return {
    name,
    title,
    imageSrc: String(body.imageSrc ?? '').trim(),
    content,
    isPublished:
      typeof body.isPublished === 'boolean' ? body.isPublished : true,
  };
};

const getArticles = async (req, res) => {
  try {
    const publishedQuery = {
      $or: [
        { isPublished: true },
        { isPublished: { $exists: false }, status: { $ne: 'draft' } },
      ],
    };
    const query = req.query.published === 'true' ? publishedQuery : {};
    const articles = await Article.find(query).sort({ createdAt: -1 });
    res.json(articles.map(sanitizeArticle));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleByName = async (req, res) => {
  try {
    const article = await Article.findOne({
      $and: [
        { $or: [{ name: req.params.name }, { slug: req.params.name }] },
        {
          $or: [
            { isPublished: true },
            { isPublished: { $exists: false }, status: { $ne: 'draft' } },
          ],
        },
      ],
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(sanitizeArticle(article));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const payload = normalizeArticlePayload(req.body);

    if (!payload.title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (!payload.name) {
      return res.status(400).json({ message: 'Slug is required' });
    }

    if (payload.content.length === 0) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const existingArticle = await Article.findOne({ name: payload.name });

    if (existingArticle) {
      return res.status(409).json({ message: 'Article slug already exists.' });
    }

    const article = await Article.create(payload);
    res.status(201).json(sanitizeArticle(article));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const payload = normalizeArticlePayload(req.body);

    if (!payload.title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (!payload.name) {
      return res.status(400).json({ message: 'Slug is required' });
    }

    if (payload.content.length === 0) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const existingArticle = await Article.findOne({
      name: payload.name,
      _id: { $ne: req.params.id },
    });

    if (existingArticle) {
      return res.status(409).json({ message: 'Article slug already exists.' });
    }

    const article = await Article.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(sanitizeArticle(article));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createArticle,
  deleteArticle,
  getArticleByName,
  getArticles,
  updateArticle,
};
