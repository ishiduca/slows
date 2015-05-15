'use strict'
var es = require('event-stream')
var delay = require('../index')

es.readArray(("Streams come to us from the earliest days of unix and have proven themselves over the decades as a dependable way to compose large systems out of small components that do one thing well.").split(' '))
  .pipe(delay(3, 800)).on('end', console.log.bind(console, '[end]'))
  .pipe(es.stringify())
  .pipe(process.stdout)
