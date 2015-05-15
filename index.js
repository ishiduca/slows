var through   = require('through')
var semaphore = require('./lib/semaphore')

module.exports = function delay (/* [capacity,] msec */) {
    var args    = [].slice.apply(arguments)
    var timeout = args.pop()
    var sem     = semaphore(args.shift())

    var s = through(function onData (data) {
        sem.wait(function () {
            setTimeout(sem.signal, timeout)
            s.queue(data)
        })
    }, function onEnd () {
        sem.wait(function () {
            s.queue(null)
            sem.signal()
        })
    })

    return s
}
