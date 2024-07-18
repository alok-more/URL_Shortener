const shortid = require('shortid');
const url = require('../models/url')

async function generateNewShortUrl (req, res){
    const body = req.body;
    console.log("🚀 ~ generateNewShortUrl ~ body:", body)
    if(!body.url) return res.status(401).json({error: "URL is required"});
    const shortId = shortid();
    console.log("🚀 ~ generateNewShortUrl ~ shortId:", shortId)
    await url.create({
        shortId: shortId,
        redirectURL: body.url, 
        visitedHistory: [],
    });
    return res.json({id: shortId});
};

async function getAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await url.findOne({shortId});
    return res.json({
        totalClicks: result.visitedHistory.length,
        analytics: result.visitedHistory
    });
} 

// async function visitedTimeHistory (req, res){
//     const shortId = req.params.shortId;
//     const entry = await url.findOneAndUpdate({
//         shortId,
//     }, 
//     {
//         $push: {
//             visitedHistory:{timestamp: Date.now()}   
//         },                                                                
//     })
//     res.redirectURL(entry.redirectURL)
// };



module.exports = {
    generateNewShortUrl,
    // visitedTimeHistory
    getAnalytics,
}