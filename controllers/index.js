'use strict';

const express = require('express');
const router = express.Router();
const Article = require('../models/article');


router.get('/', function (req, res) {

    Article
        .find({})
        .where('saved').equals(false)
        .where('deleted').equals(false)
        .sort('-date')
        .limit(20)
        .exec(function (error, articles) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log(articles);
                let hbsObj = {
                    title: 'All the News That\'s Fit to Scrape',
                    subtitle: 'Hack the planet edition',
                    articles: articles
                };
                console.log("hbsObj: ", hbsObj.articles)
                res.render('index', hbsObj);
            }
        });
});

router.get('/saved', function (req, res) {
    Article
        .find({})
        .where('saved').equals(true)
        .where('deleted').equals(false)
        .populate('notes')
        .sort('-date')
        .exec(function (error, articles) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log(articles);
                let hbsObj = {
                    title: 'All the News That\'s Fit to Scrape',
                    subtitle: 'Saved Hacker News',
                    articles: articles
                };
                res.render("saved", hbsObj);
            }
        });
});


router.use('/api', require('./api'));

module.exports = router;