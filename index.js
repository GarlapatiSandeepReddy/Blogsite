import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));   

function Blog(title, post){
    this.title = title;
    this.post = post;
}

var blogs = []

app.get("/", (req, res) =>{
    res.render("index.ejs",{blogs : blogs});
});

app.get("/create", (req, res) =>{
    res.render("create.ejs");
});

app.post("/create", (req, res) =>{
    console.log(req.body);
    blogs.push(new Blog(req.body["title"], req.body["post"]));
    console.log(blogs);
    res.render("create.ejs", {flag : true});
});

app.post("/view", (req, res) =>{
    let blogPage = parseInt(req.body["blogPage"]);
    let blogPost = blogs[blogPage];
    res.render("view.ejs", {blogPage : blogPage, title : blogPost.title, post : blogPost.post});
});

app.post("/update", (req, res) =>{
    let blogPage = parseInt(req.body["blogPage"]);
    if(req.body["flag"]){
        console.log("flag is set");
        console.log(req.body);
        blogs[blogPage].title = req.body["title"];
        blogs[blogPage].post = req.body["post"];
        res.render("update.ejs", {flag : true});
    }else{
        console.log("flag isn't set yet" + req.body["flag"]);
        res.render("update.ejs", {blogPage : blogPage});
    }
    
});

app.post("/delete", (req, res) =>{
    console.log("In the delete post request.");
    let blogPage = parseInt(req.body["blogPage"]);
    let title = blogs[blogPage].title;
    blogs.splice(blogPage);
    console.log(blogs);
    console.log(blogs.length);
    res.render("delete.ejs", {title : title});
})

app.listen(port, () =>{
    console.log("Server started on port " + port);
});