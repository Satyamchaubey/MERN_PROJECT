const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try {
        const post = await Post.findById(req.body.post);

        if (post){
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            await post.save();
            req.flash('success','Comment Added!');

            return res.redirect('/');
        }
    } catch(err) {
        console.error("Error:", err);
        return res.status(500).send("Internal Server Error");
    }
}
module.exports.destroy = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (comment && comment.user == req.user.id) {
            const postId = comment.post;
            await Comment.deleteOne({ _id: req.params.id });
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            req.flash('success','Comment Deleted!')
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};
