// this is where the routes for the app goes
module.exports = function (app) {
    
    // retrieve index page
    app.get("/", function (req, res) {
        res.render("index.html", {
            title: "hackathon: Road to web3"
        });
    });
}