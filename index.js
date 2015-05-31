var through   = require('through2')
var semaphore = require('./lib/semaphore')

module.exports = function delay (/* [capacity,] msec */) {
    var args    = [].slice.apply(arguments)
    var timeout = args.pop()
    var sem     = semaphore(args.shift())

    var s = through.obj(function _write (data, enc, done) {
        var me = this
        sem.wait(function () {
            setTimeout(sem.signal, timeout)
            me.push(data)
            done()
        })
    }, function _end (done) {
        var me = this
        sem.wait(function () {
            me.push(null)
            done()
            sem.signal()
        })
    })

    return s
}
