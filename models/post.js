const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //including the array of ids of all comments in this post schema itself
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
},{
    timestamps:true
})

const Post = mongoose.model("Post",postSchema)
console.log("connect post to db");
module.exports = Post;