// decorator
function cachify(oldFn) {
    var cache = {};
    var newFn = function() {
        var k = Array.prototype.join.call(arguments, ',');

        console.log("key", k);
        if(cache.hasOwnProperty(k)) {
            console.log('cache hit!!!!');
            return cache[k];
        } else {
            var res = oldFn.apply(null, arguments);
            cache[k] = res;
            return res;
        }
    };
    return newFn;
}

var cacheyParse = cachify(parseInt);
var res1 = cacheyParse("100", 2);
console.log(res1);
var res2 = cacheyParse("100", 2);
console.log(res2);






