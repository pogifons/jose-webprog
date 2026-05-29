const express = require('express');

const {
  createArticle,
  deleteArticle,
  getArticleByName,
  getArticles,
  updateArticle,
} = require('../controllers/articleController');

const router = express.Router();

router.route('/').get(getArticles).post(createArticle);
router.route('/slug/:name').get(getArticleByName);
router.route('/:id').put(updateArticle).delete(deleteArticle);

module.exports = router;
