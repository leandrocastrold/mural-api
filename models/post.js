module.exports = {

    posts: [],

    getAll() {
        return this.posts;
    },

    newPost(title, description) {
        id = this.posts.length+1;
        this.posts.push({ id, title, description });
        
    },

    deletePost(id) {
        for (i = 0; i < this.posts.length; i++) {
        if (this.posts[i].id == id) {
            this.posts.splice(i, 1);
            console.log("Post apagado com sucesso!")
        } 
        }
    }

}
