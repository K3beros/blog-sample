const mongoose = require('mongoose')


const CreatePostSchema = new mongoose.Schema({

    title: {
        type: String
    }, 
    
    description: {
        type: String
    },
   
    content: {
        type:String
    },

    username: {
        type:String
    },

    createdAt: {
        type:Date,
        default: new Date() // lets you save the date without inputtng it
    }
})

const CreatePost = mongoose.model('Post', CreatePostSchema)

module.exports = CreatePost