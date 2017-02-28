var Promise = function() {
    EventEmitter.call(this)
};

util.inherits(Promise, EventEmitter);

Promise.prototype.then = function(fulfilledHandler, errorHandler, progressHandler) {
    if (typeof fulfilledHandler === 'function') {
        this.once('success', fulfilledHandler)
    }

    if (typeof errorHandler === 'function') {
        this.once('error', errorHandler)
    }

    if (typeof progressHandler === 'function') {
        this.on('progress', progressHandler)
    }

    return this
};

var Deferred = function() {
    this.state = 'unfulfilled';
    this.promise = new Promise();
};

Deferred.prototype.resolve = function(obj) {
    this.state = 'fulfilled';
    this.promise.emit('success', obj)
};

Deferred.prototype.reject = function(err) {
    this.state = 'failed';
    this.promise.emit('error', err)
};

Deferred.prototype.progress = function(data) {
    this.promise.emit('progress', data)
};

/* 实现简单的链式调用 */
var promisify = function(res) {
    var deferred = new Deferred();
    var result = '';

    res.on('data', function(chunk) {
        result += chunk;
        deferred.progress(chunk)
    });

    res.on('end', function() {
        deferred.resolve(result)
    });

    res.on('error', function(err) {
        deferred.reject(err)
    });

    return deferred.promise;
};

/* 调用示例 */
promisify(res).then(function() {
    // Done
}, function(err) {
    // Error
}, function(chunk) {
    // progress
    console.log('BODY: ' + chunk)
});
