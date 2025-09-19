const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'banakriti/products',
    allowed_formats: ['jpg','jpeg','png','webp'],
    transformation: [{ width: 1200, crop: 'limit' }],
  },
});

module.exports = multer({ storage });
