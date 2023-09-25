const post = require('../models/post');
const User = require('../models/user');

module.exports.home = async (req, res) => {
    try {
        const posts = await post.find({})
            .populate('user')
            .populate({
                path:'comments',
                populate:{
                    path:'user'
                }
            })

        const users = await User.find({}); // Retrieve users

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.error("Error in home page:", err);
        return res.status(500).send("Internal Server Error");
    }
}