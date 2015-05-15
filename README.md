# slows

delaying the flow of data at regular interval.

## usage

```js
var es    = require('event-stream')
var delay = require('slows')

var stream = delay(1000)

stream.on('end', console.log.bind(console, '[end]'))
  .pipe(es.stringify())
  .pipe(process.stdout)

array.forEach(function (data) {
    stream.write(data)
})
stream.end()
```

## api

### var stream = delay([capacity,] msec)

return __delay stream__

- `capacity` : limit the number of flow data at same time.
- `msec` : time to be delayed.

## test

```
npm run test
```

### for browser

```
npm run testling
```

## author

ishiduca@gmail.com

## license

MIT
