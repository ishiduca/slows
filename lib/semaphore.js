module.exports = function semaphore (n) {
    var capacity = n || 1
    var current  = 0
    var queue    = []

    return {
        wait:   wait
      , signal: signal
    }

    function wait (f) {
        ;(current < capacity) ? f() : queue.push(f)
        current += 1
    }

    function signal () {
        if (current > 0) {
            current -= 1
            ;(typeof queue[0] === 'function') && queue.shift()()
        }
    }
}
