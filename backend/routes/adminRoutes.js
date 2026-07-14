const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const MenuItem = require('../models/MenuItem');
const Deal = require('../models/Deal');
const Order = require('../models/Order');
const Settings = require('../models/Settings');
const Gallery = require('../models/Gallery');
const Review = require('../models/Review');
const { cloudinary } = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware');

// Apply protection to all admin routes
router.use(protect);

// Helper to upload buffer to Cloudinary
const streamUpload = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { folder: folder },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(buffer);
  });
};

// --- MENU ITEMS ---
router.post('/menuitems', upload.array('images', 5), async (req, res) => {
  try {
    const images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await streamUpload(file.buffer, 'dubai_fast_food/menu');
        images.push({ url: result.secure_url, publicId: result.public_id });
      }
    }

    const newItem = new MenuItem({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
      sizes: req.body.sizes ? JSON.parse(req.body.sizes) : [],
      images: images,
      isFeatured: req.body.isFeatured === 'true'
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/menuitems/:id', upload.array('images', 5), async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.name = req.body.name || item.name;
    item.description = req.body.description || item.description;
    item.price = req.body.price || item.price;
    item.category = req.body.category || item.category;
    if (req.body.tags) item.tags = JSON.parse(req.body.tags);
    if (req.body.sizes) item.sizes = JSON.parse(req.body.sizes);
    if (req.body.isFeatured !== undefined) item.isFeatured = req.body.isFeatured === 'true';

    if (req.body.imagesToDelete) {
      const toDelete = JSON.parse(req.body.imagesToDelete);
      for (const publicId of toDelete) {
        if (publicId) {
          console.log(`Attempting to delete image from Cloudinary with publicId: ${publicId}`);
          try {
            const result = await cloudinary.uploader.destroy(publicId);
            console.log(`Cloudinary destroy result:`, result);
            item.images = item.images.filter(img => img.publicId !== publicId);
            if (item.imagePublicId === publicId) {
              item.image = undefined;
              item.imagePublicId = undefined;
            }
          } catch (delErr) {
            console.error(`Failed to delete image from Cloudinary:`, delErr);
          }
        }
      }
    }

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await streamUpload(file.buffer, 'dubai_fast_food/menu');
        item.images.push({ url: result.secure_url, publicId: result.public_id });
      }
    }

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/menuitems/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Delete all images from Cloudinary
    for (const image of item.images) {
      if (image.publicId) {
        await cloudinary.uploader.destroy(image.publicId);
      }
    }

    // Handle backward compatibility image
    if (item.imagePublicId) {
      await cloudinary.uploader.destroy(item.imagePublicId);
    }

    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- DEALS ---
router.post('/deals', upload.array('images', 5), async (req, res) => {
  try {
    const images = [];
    
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await streamUpload(file.buffer, 'dubai_fast_food/deals');
        images.push({ url: result.secure_url, publicId: result.public_id });
      }
    }

    const newDeal = new Deal({
      dealNumber: req.body.dealNumber,
      name: req.body.name,
      price: req.body.price,
      includedItems: req.body.includedItems ? JSON.parse(req.body.includedItems) : [],
      isFeatured: req.body.isFeatured === 'true',
      images: images
    });

    await newDeal.save();
    res.status(201).json(newDeal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/deals/:id', upload.array('images', 5), async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) return res.status(404).json({ message: 'Deal not found' });

    deal.dealNumber = req.body.dealNumber || deal.dealNumber;
    deal.name = req.body.name || deal.name;
    deal.price = req.body.price || deal.price;
    if (req.body.includedItems) {
      deal.includedItems = JSON.parse(req.body.includedItems);
    }
    if (req.body.isFeatured !== undefined) {
      deal.isFeatured = req.body.isFeatured === 'true';
    }

    if (req.body.imagesToDelete) {
      const toDelete = JSON.parse(req.body.imagesToDelete);
      for (const publicId of toDelete) {
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId);
            deal.images = deal.images.filter(img => img.publicId !== publicId);
            if (deal.imagePublicId === publicId) {
              deal.image = undefined;
              deal.imagePublicId = undefined;
            }
          } catch (delErr) {
            console.error(`Failed to delete deal image from Cloudinary:`, delErr);
          }
        }
      }
    }

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await streamUpload(file.buffer, 'dubai_fast_food/deals');
        deal.images.push({ url: result.secure_url, publicId: result.public_id });
      }
    }

    await deal.save();
    res.json(deal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/deals/:id', async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (deal.imagePublicId) {
      await cloudinary.uploader.destroy(deal.imagePublicId);
    }
    if (deal.images && deal.images.length > 0) {
      for (const img of deal.images) {
        if (img.publicId) await cloudinary.uploader.destroy(img.publicId);
      }
    }
    await Deal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deal deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- SETTINGS ---
router.post('/settings', upload.fields([{ name: 'heroImage', maxCount: 1 }, { name: 'heroFloatingImages', maxCount: 10 }]), async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    if (req.body.announcementText !== undefined) {
      settings.announcementText = req.body.announcementText;
    }
    if (req.body.facebook !== undefined) {
      if(!settings.socialLinks) settings.socialLinks = {};
      settings.socialLinks.facebook = req.body.facebook;
    }
    if (req.body.instagram !== undefined) {
      if(!settings.socialLinks) settings.socialLinks = {};
      settings.socialLinks.instagram = req.body.instagram;
    }
    if (req.body.tiktok !== undefined) {
      if(!settings.socialLinks) settings.socialLinks = {};
      settings.socialLinks.tiktok = req.body.tiktok;
    }

    if (req.body.deleteHeroImage === 'true') {
      if (settings.heroImagePublicId) {
        try { await cloudinary.uploader.destroy(settings.heroImagePublicId); } catch(e) { console.error("Error deleting image", e); }
      }
      settings.heroImage = '';
      settings.heroImagePublicId = '';
    }

    if (req.body.deleteHeroFloatingImage === 'true') {
      if (settings.heroFloatingImagePublicId) {
        try { await cloudinary.uploader.destroy(settings.heroFloatingImagePublicId); } catch(e) { console.error("Error deleting image", e); }
      }
      settings.heroFloatingImage = '';
      settings.heroFloatingImagePublicId = '';
    }

    if (req.body.heroFloatingImagesToDelete) {
      const toDelete = JSON.parse(req.body.heroFloatingImagesToDelete);
      for (const publicId of toDelete) {
        if (publicId) {
          try { await cloudinary.uploader.destroy(publicId); } catch(e) { console.error("Error deleting floating image", e); }
          settings.heroFloatingImages = settings.heroFloatingImages.filter(img => img.publicId !== publicId);
          // Also clear backward compatibility image if it matches
          if (settings.heroFloatingImagePublicId === publicId) {
            settings.heroFloatingImage = '';
            settings.heroFloatingImagePublicId = '';
          }
        }
      }
    }

    if (req.files) {
      if (req.files.heroImage && req.files.heroImage[0]) {
        if (settings.heroImagePublicId) {
          try { await cloudinary.uploader.destroy(settings.heroImagePublicId); } catch(e) {}
        }
        const result = await streamUpload(req.files.heroImage[0].buffer, 'dubai_fast_food/settings');
        settings.heroImage = result.secure_url;
        settings.heroImagePublicId = result.public_id;
      }

      if (req.files.heroFloatingImages && req.files.heroFloatingImages.length > 0) {
        for (const file of req.files.heroFloatingImages) {
          const result = await streamUpload(file.buffer, 'dubai_fast_food/settings');
          settings.heroFloatingImages.push({ url: result.secure_url, publicId: result.public_id });
        }
      }
    }

    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- GALLERY ---
router.post('/gallery', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'No images provided' });

    const sectionName = req.body.section || 'General';
    let galleryCat = await Gallery.findOne({ section: sectionName });
    
    if (!galleryCat) {
      galleryCat = new Gallery({ section: sectionName, images: [] });
    }

    for (const file of req.files) {
      const result = await streamUpload(file.buffer, 'dubai_fast_food/gallery');
      galleryCat.images.push({ url: result.secure_url, publicId: result.public_id });
    }

    await galleryCat.save();
    res.status(201).json(galleryCat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/gallery/:sectionId/image/:imageId', async (req, res) => {
  try {
    const galleryCat = await Gallery.findById(req.params.sectionId);
    if (!galleryCat) return res.status(404).json({ message: 'Gallery category not found' });

    const imageToDel = galleryCat.images.id(req.params.imageId);
    if (imageToDel) {
      if (imageToDel.publicId) {
        await cloudinary.uploader.destroy(imageToDel.publicId);
      }
      galleryCat.images.pull({ _id: req.params.imageId });
      await galleryCat.save();
    }
    
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/gallery/:id', async (req, res) => {
  try {
    const galleryCat = await Gallery.findById(req.params.id);
    if (galleryCat && galleryCat.images && galleryCat.images.length > 0) {
      for (const img of galleryCat.images) {
        if (img.publicId) await cloudinary.uploader.destroy(img.publicId);
      }
    }
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// --- ORDERS ---
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- REVIEWS ---
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/reviews/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// FeaturedItem routes have been removed in favor of isFeatured flag on Deals and MenuItems

const MenuCategory = require('../models/MenuCategory');
const HomeCategory = require('../models/HomeCategory');
const Filter = require('../models/Filter');

// --- MENU CATEGORIES ---
router.post('/categories/menu', async (req, res) => {
  try {
    const newCategory = new MenuCategory(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/categories/menu/:id', async (req, res) => {
  try {
    const updated = await MenuCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/categories/menu/:id', async (req, res) => {
  try {
    await MenuCategory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- HOME CATEGORIES ---
router.post('/categories/home', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const result = await streamUpload(req.file.buffer, 'dubai_fast_food/categories');
      data.image = result.secure_url;
      data.imagePublicId = result.public_id;
    }
    const newCat = new HomeCategory(data);
    await newCat.save();
    res.status(201).json(newCat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/categories/home/:id', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    const category = await HomeCategory.findById(req.params.id);
    
    if (req.file) {
      if (category.imagePublicId) {
        await cloudinary.uploader.destroy(category.imagePublicId);
      }
      const result = await streamUpload(req.file.buffer, 'dubai_fast_food/categories');
      data.image = result.secure_url;
      data.imagePublicId = result.public_id;
    }
    
    const updated = await HomeCategory.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/categories/home/:id', async (req, res) => {
  try {
    const category = await HomeCategory.findById(req.params.id);
    if (category && category.imagePublicId) {
      await cloudinary.uploader.destroy(category.imagePublicId);
    }
    await HomeCategory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Home category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- FILTERS ---
router.post('/filters', async (req, res) => {
  try {
    const newFilter = new Filter(req.body);
    await newFilter.save();
    res.status(201).json(newFilter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/filters/:id', async (req, res) => {
  try {
    await Filter.findByIdAndDelete(req.params.id);
    res.json({ message: 'Filter deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
