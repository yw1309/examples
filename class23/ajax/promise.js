/*
promise is an object that represents an async task
* fetching a url
* writing a file
* etc.
* reading the battery status <--- this exists!
*/
/*
promise can be:
1. fulfilled --> the async task completed successfully
2. rejected --> the async task did not complete successfully
*/

var promise = new Promise(function(fulfill, reject) {
    fulfill('complete!!!!');
    // some async task
    // call fulfill if success
    // call reject if not succssful
});

promise.then(console.log);












