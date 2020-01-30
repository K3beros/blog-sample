const Post = require('../database/models/Post')

const createPost = (req, res) => {
    const {username, title, description, content} = req.body;
    
    Post.create({username, title, description, content}, (err, post) => {
        if(err){
            console.log(err)
        }
        console.log(post)
        return
        
    } )
    res.redirect('/');
}

module.exports = createPost;