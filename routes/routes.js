const express = require('express');
const apiRoute = express.Router();
const post = require('../models/post')

apiRoute.use(express.json());
apiRoute.use(express.urlencoded({extended: false}));

apiRoute.get("/all", (req, res) => {
    res.json(JSON.stringify(post.getAll()));
})

apiRoute.post("/new", (req, res) => {

    let title = req.body.title;
    let description = req.body.description;

    post.newPost(title, description)
    res.send("Post adicionado com sucesso!");
})

apiRoute.delete("/delete/:id", (req, res) => {
    post.deletePost(req.params.id);
    res.send("Post apagado com sucesso!")
})

module.exports = apiRoute;