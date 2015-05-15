'use strict'
var es     = require('event-stream')
var delay  = require('../index')
var client = require('cheerio-httpcli')

var list = [
    'http://qiita.com/advent-calendar/2011'
  , 'http://qiita.com/advent-calendar/2012'
  , 'http://qiita.com/advent-calendar/2013'
  , 'http://qiita.com/advent-calendar/2014'
]

es.readArray(list)
  .pipe(delay(1000))
  .pipe(fetchFromUrl())
  .pipe(getTitle())
  .pipe(es.stringify())
  .pipe(process.stdout)

function fetchFromUrl () {
    return es.map(function (url, cb) {
        client.fetch(url, {}, function (err, $, res) {
            cb(null, $)
        })
    })
}

function getTitle () {
    return es.map(function ($, cb) {
        cb(null, $('title').text())
    })
}
