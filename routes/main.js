const nftEth = require('../util/nftEth.json')
const nftAvax = require('../util/nftAvax.json')
const nftPolygon = require('../util/nftPolygon.json')
// this is where the routes for the app goes
module.exports = function (app) {

    // retrieve index page
    app.get("/", function (req, res) {
        res.render("index.html", {
            title: "hackathon: Road to web3"
        });
    });

    app.get("/api/nft-eth", function (req, res) {
        res.send(nftEth)
    })

    app.get("/api/nft-avax", function (req, res) {
        res.send(nftAvax)
    })

    app.get("/api/nft-polygon", function (req, res) {
        res.send(nftPolygon)
    })
}
