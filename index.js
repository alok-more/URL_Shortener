const express = require('express');
const router = require('./routes/url')
const {mongoDB} = require('./connect.js');
const URL = require('./models/url.js');
const path = require('path');
const { url } = require('inspector');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoDB("mongodb://localhost:27017/shortUrl")
    .then(()=> console.log("MongoDB Conneted!!"))
    .catch((err) => console.log("Error to connect!!", err));

app.use("/url", router);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/home", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home',
        urls= allUrls);
})

app.get('/:shortId', async (req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    }, 
    {
        $push: {
            visitedHistory:{timestamp: Date.now()}   
        },                                                                
    })
    res.redirect(entry.redirectURL);
});

app.listen(8000, ()=>{
    console.log("Server Started!!!");
});