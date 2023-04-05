const { default: mongoose } = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

// get all blogs
exports.getAllBlogsController = async (req, res) => {
    try {

        const blogs = await blogModel.find({}).populate("user");
        
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "No blogs found"
            })
        }

        return res.status(200).send({
            success: true,
            blogsCount: blogs.length,
            message: 'All Blogs Lists',
            blogs
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while getting blogs',
            error
        })
    }
};

// create blogs
exports.createBlogsController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        // validation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields',
            })
        }

        // searching for user 
        const existingUser = await userModel.findById(user);
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'No user found'
            })
        }

        const newBlog = new blogModel({ title, description, image, user });

        // creating session 
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);
        await existingUser.save({ session });
        await session.commitTransaction();

        // 
        await newBlog.save();
        return res.status(200).send({
            success: true,
            message: 'Blog Created',
            newBlog
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in creating blog',
            error
        })
    }
};

// update blogs
exports.updateBlogsController = async (req, res) => {
    try {

        const { title, description, image } = req.body;
        // getting id from params
        const { id } = req.params;
        const blog = await blogModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        );
        return res.status(200).send({
            success: true,
            message: "Blog Updated",
            blog,
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in updating blog',
            error
        })
    }
};

// get single blog
exports.singleBlogsController = async (req, res) => {
    try {
        // getting id from params
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'No blog with this id',
            });
        }
        return res.status(200).send({
            success: true,
            message: "Fetching single blog",
            blog,
        });

    } catch (error) {
        console.log(error, 'error');
        return res.status(400).send({
            success: false,
            message: 'Error in getting  single blog',
            error
        })
    }
};

// delete blogs
exports.deleteBlogsController = async (req, res) => {
    try {
        // getting id from params
        const { id } = req.params;
        const blog = await blogModel.findByIdAndDelete(id).populate('user');
        // deleting blog
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        // 
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'No blog with this id',
            });
        }
        return res.status(200).send({
            success: true,
            message: "Blog deleted",
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error in deleting blog',
            error
        })
    }
};  


// get user blog
exports.userBlogController = async (req, res) => {
try {

    // populate => to show all blogs of user
    const userBlog = await userModel.findById(req.params.id).populate("blogs")
    if(!userBlog){
        return res.status(404).send({
            success: false,
            message: 'No blog found with this id'
        })
    }

    return res.status(200).send({
        success: true,
        message: 'User Blogs',
        userBlog
    })
    
} catch (error) {
    console.log(error);
    return res.status(400).send({
        success: false,
        message: 'error in getting user blog',
        error
    })
}
}
