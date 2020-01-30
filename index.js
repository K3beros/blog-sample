
//Node modules
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')



//custom modules required
const Post = require('./database/models/Post')
const registerUser = require('./controllers/registerUser')
const loginUser    = require('./controllers/loginUser')
const createPost = require('./controllers/createPost')


const app = new express()

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true})


app.use(session({
    secret: 'secret', 
    resave: true,
    saveUninitialized: true
}))

app.use(express.static('public'))
app.use(expressEdge)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended : true} ))

app.set('views', `${__dirname}/views`)



const isLoggedIn = (req, res, next) => {
    if(req.session.user){
        
    }
}

//route for homepage
app.get('/',  async(req, res) => {

    const posts = await Post.find({})
    //console.log(posts)
    console.log(req.session)

    res.render('index', {
        posts: posts
    })
    
})

app.get('/about', (req, res) => {
    console.log(req.session)
    res.render('about')
})

app.get('/post', (req, res)=> {
    res.render('post')
})

app.post('/register', registerUser, (req, res)=> {
    console.log(req.body)
    res.redirect('/login')
})

app.post('/login', loginUser, (req, res)=> {
    console.log(req.body.session)
    res.render('/post/new')

})


app.get('/post/new', (req, res)=>{
    res.render('create')
})

app.post('/post/save', createPost, (req, res)=>{

    console.log(req.body);

    res.redirect('/');
    /*Post.create(req.body, (err, post)=>{
     res.redirect('/')
    })
    //console.log(req.body)
    res.redirect('/')*/
})

//to dynamically render post when the id is placed in the url
app.get('/post/:id', async(req, res) => {

    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
    console.log(req.params)
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/login', (req, res) => {
    console.log(req.params)
    res.render('login')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/logout', (req, res) => {
    delete req.session;
    res.redirect('/home')
})

app.get('*', (req, res)=> {
    res.status(404).send('Sorry your requested URL was not found')
})


app.listen(5200, () => {
    console.log('Server has started')
})