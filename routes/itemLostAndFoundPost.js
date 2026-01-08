const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createItem, getAllItems, getItemById, getMyItems, updateItemStatus, searchItems } = require('../controllers/itemLostAndFoundPost.js');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Multer + Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lost-and-found',
    allowedFormats: ['jpg', 'jpeg', 'png', 'webp']
  }
});
const upload = multer({ storage });

const requireAuth = require('../middleware/auth');

// public routes
router.get('/search', searchItems);

router.get('/', getAllItems);
router.get('/:id', getItemById);

// protected routes
router.get('/my/items', requireAuth, getMyItems);
router.post('/', requireAuth, upload.single('image'), createItem);
router.patch('/:id', requireAuth, updateItemStatus);

module.exports = router;
