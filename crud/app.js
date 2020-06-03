const express = require('express')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
app.use(express.urlencoded());
app.use(express.json());
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'simple-blog';
var ObjectId = require('mongodb').ObjectID;


app.get('/', (req, res) => res.send('Hello World!'))
app.get('/posts', listPosts)
app.get('/post/:id', getById)
app.delete('/post/:id', deleteById)
app.post('/post', addPost)
app.put('/post/:id', updatePost)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

function getById(req, res) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        const db = client.db(dbName);
        var myquery = { _id: ObjectId(req.params.id) };
        db.collection("posts").findOne(myquery, function (err, post) {
            if (err) throw err;
            console.log("found post");
            console.log(post);
            res.send(post);
            client.close();
        });
    });
}
function deleteById(req, res) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        const db = client.db(dbName);
        var myquery = { _id: ObjectId(req.params.id) };
        db.collection("posts").deleteOne(myquery, function (err) {
            if (err) throw err;
            console.log("deleted successfully");
            res.send();
            client.close();
        });
    });
}

function listPosts(req, res, body) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        console.log('client connected');
        const db = client.db(dbName);

        db.collection('posts').find().toArray(function(err, posts) {
            if(err) throw err;
            res.send(posts)
            console.log(posts)
            client.close();
          });
       
    });
}

function addPost(req, res) {

    // Create a new MongoClient
    const client = new MongoClient(url);

    // Use connect method to connect to the Server
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
       
        const newPost = {
            title: req.body.title,
            author: req.body.author,
            date: req.body.date,
            text: req.body.text,
            tags: req.body.tags,
            imageURL: req.body.imageURL,
            status: req.body.status
        }
        
        // Get the documents collection
        const collection = db.collection('posts');
        // Insert some documents
        collection.insertOne(
            newPost
        , function (err, result) {
            if(err) throw err
            console.log("Inserted 3 documents into the collection");
            res.status(201)
            res.set('Location', 'post/' + result.insertedId)
            res.send(JSON.parse('{}'))
            client.close();
        });

    });
}
function updatePost(req, res) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        const db = client.db(dbName);
        var myquery = { _id: ObjectId(req.params.id) };
        db.collection("posts").updateOne (myquery, {$set: req.body}, function (err, post) {
            if (err) throw err;
            console.log("found post");
            console.log(post);
            res.set('Location', 'post/' + req.params.id)
            res.send(post);
            client.close();
        });
    });
}