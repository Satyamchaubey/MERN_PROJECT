const Post = require('../models/post');
const Comment = require('../models/comment'); 

module.exports.create = async (req, res) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success','Post Published!!')
        return res.redirect('back');
    } catch (err) {
        req.flash('error',err)
        return res.status(500).send("Internal Server Error");
        return res.redirect('/')
    }
}

module.exports.destroy = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            await Post.findByIdAndRemove(req.params.id);
            await Comment.deleteMany({ post: req.params.id });
            req.flash('success','Post & comments Deleted!');
        }
    } catch (error) {
        req.flash('error','You can not delete this post!')
        console.error("Error:", error);
    }
    return res.redirect('/');
}
