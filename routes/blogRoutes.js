const express = require('express');

const { createBlogsController, updateBlogsController, singleBlogsController, deleteBlogsController, getAllBlogsController, userBlogController } = require('../controllers/blogControllers');


// router object
const router = express.Router();

// routes

// Get || all blogs
router.get('/all-blogs', getAllBlogsController)

// Post || create blog
router.post('/create-blog', createBlogsController)

// Put || create blog
router.put('/update-blog/:id', updateBlogsController)

// Get || single blog
router.get('/get-blog/:id', singleBlogsController)

// delete || create blog
router.delete('/delete-blog/:id', deleteBlogsController)


// get || userblog
router.get('/user-blog/:id' , userBlogController);

module.exports = router;