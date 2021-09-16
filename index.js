// const means never changes - short for constant
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

require('dotenv').config()

const MongoUtil = require("./MongoUtil.js");

async function main() {
    /* 1. SETUP EXPRESS */
    let app = express();

    // 1B. SETUP VIEW ENGINE
    app.set("view engine", "hbs");
    
    var helpers = require("handlebars-helpers")({
        handlebars: hbs.handlebars
      });

    // 1C. SETUP STATIC FOLDER
    app.use(express.static("public"));

    // 1D. SETUP WAX ON (FOR TEMPLATE INHERITANCE)
    wax.on(hbs.handlebars);
    wax.setLayoutPath("./views/layouts");

    // 1E. ENABLE FORMS
    app.use(express.urlencoded({ extended: false }));

    // 1F. Connect to Mongo
    // Database name
    await MongoUtil.connect(process.env.MONGO_URL, "sample_airbnb");

    // Routes
    app.get("/", async (req, res) => {
        let db = MongoUtil.getDB();
        let records = await db
            .collection("listingsAndReviews")
            .find({
                'beds':2,
            })
            .limit(6)
            .toArray();
            res.render('index.hbs', {records});
    })

    app.get("/test", async (req, res) => {
        res.send('test');
    })

    app.listen(3000, ()=>{console.log("Server started")});

}

main()
