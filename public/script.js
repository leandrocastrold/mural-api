let posts = [];

// Controllers
const getAll = () => {
    fetch("http://localhost:3000/api/all")
        .then(res => res.json()).then(json => {
            posts = JSON.parse(json);
            fillPosts();
        })
}

const newPost = () => {
    let title = document.getElementById("title").value;
    let description = document.getElementById("desc").value;
    let post = { title, description };

    if (validatePost(post)) {
        const options = {
            method: "POST",
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify(post)
        }

        fetch("http://localhost:3000/api/new", options)
            .then(res => console.log(res));
            cleanFormFields();
        getAll();
    } else {
        alert("Título e descrição não podem estar em branco!")
    }
}

const deletePost = (id) => {

    if (confirm("Deseja realmente apagar esse post?")) {
        const options = {
            method: "DELETE",
        }
        fetch(`http://localhost:3000/api/delete/${id}`, options)
            .then(res => console.log(res));
            getAll();
    }
}

//Utilities 
const cleanFormFields = () => {
    document.getElementById("title").value = '';
    document.getElementById("desc").value = '';
}

const fillPosts = () => {
    let htmlPost = ''
    
    if (posts.length > 0) {
        posts.forEach(post => {
            htmlPost += ` 
            <button class="btn btn-sm btn-danger" onclick='deletePost(${post.id})' >Apagar</button> 
                <div class="card mb-3">
                <div class="card-header"> 
                <h5 class="card-title">#${post.id} - ${post.title}</h5>
                </div> 
                    <div class="card-body">
                        <p class="card-text">
                        ${post.description}
                        </p>
                    
                    </div>
                </div>`
        })
    } else {
        htmlPost = '<h5>Sem novas publicações</h5> <hr>'
    }

    document.getElementById('posts').innerHTML = htmlPost;
}

const validatePost = (post) => {
    if (post.title.trim() == '') {
        return false;
    }
    if (post.description.trim() == '') {
        return false;
    }
    return true;
}


getAll();

