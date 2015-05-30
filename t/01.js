var test  = require('tape')
var es    = require('event-stream')
var delay = require('../')

test('delay(100)', function (t) {
    var spy = []
    var d   = delay(100)

    d.pipe(es.map(function (data, cb) {
        spy.push(data)
        cb(null, data)
    })).on('end', function () {
        t.deepEqual(['a', 'b', 'c', 'd', 'e', 'g', 'f', 'x', 'end'], spy
          , '["a", "b", "c", "d", "e", "g", "f", "x", "end"]')
        t.end()
    })

    ;('abcdegfx').split('').forEach(function (c) {
        d.write(c)
    })
    d.end('end')

    setTimeout(function () {
        t.deepEqual(['a'], spy, '50msec after spy == ["a"]')
    }, 50)

    setTimeout(function () {
        t.deepEqual(['a', 'b'], spy, '150msec after spy == ["a", "b"]')
    }, 150)

    setTimeout(function () {
        t.deepEqual(['a', 'b', 'c', 'd', 'e', 'g', 'f', 'x'], spy
          , '750msec after spy == ["a", "b", "c", "d", "e", "g", "f", "x"]')
    }, 750)

    setTimeout(function () {
        t.deepEqual(['a', 'b', 'c', 'd', 'e', 'g', 'f', 'x', 'end'], spy
          , '850msec after spy == ["a", "b", "c", "d", "e", "g", "f", "x", "end"]')
    }, 850)
})

test('delay(3, 100)', function (t) {
    var spy = []
    var d   = delay(3, 100)

    setTimeout(function () {
        t.deepEqual(['a', 'b', 'c'], spy, '50msec after spy == ["a", "b", "c"]')
    }, 50)

    setTimeout(function () {
        t.deepEqual(['a', 'b', 'c', 'd', 'e', 'g'], spy,
          '150msec after spy == ["a", "b", "c", "d", "e", "g"]')
    }, 150)

    es.readArray(('abcdegfx').split(''))
      .pipe(delay(3, 100))
      .on('data', function (data) {
        spy.push(data)
      })
      .on('end', function () {
        t.deepEqual(['a', 'b', 'c', 'd', 'e', 'g', 'f', 'x'], spy
          , '["a", "b", "c", "d", "e", "g", "f", "x"]')
        t.end()
      })
})
