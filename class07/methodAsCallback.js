/**
 * This file demonstrates how to correctly bind this when passing in
 * a method from an object as a callback.
 *
 * This uses a RedactedFile object to motivate the example.
 *
 *  - a RedactedFile object keeps track of a fileName that contains
 *    sensitive data and a word that should be redacted (kept secret)
 *  - if you call printFile on a RedactedFile object, it'll print
 *    out the contents of the file with every occurrence of word replaced
 *    by SECRET
 *
 * For example, it should work like this.
 *
 * Assuming that sensitiveData.txt contains:
 *
 * I went to the pizza place next door...
 * and I ordered 1,000 slices of pineapple pizza.
 * 
 * var redacted = new RedactedFile('sensitiveData.txt', 'pizza');
 * redacted.printFile();
 *
 * The above code should print out:
 *
 * I went to the SECRET place next door...
 * and I ordered 1,000 slices of pineapple SECRET.
 *
 * However, in the initial version of this file, the output is incorrect!
 */

var fs = require('fs'); 

function RedactedFile(fileName, word) {
  this.fileName = fileName;
  this.word = word;
}

RedactedFile.prototype.printFile = function(disclaimerText) {

    // swap the commented and uncommented line below to see a version
    // that correctly binds this
    fs.readFile(this.fileName, this.handleRead); 
    // fs.readFile(this.fileName, this.handleRead.bind(this)); 
};

RedactedFile.prototype.handleRead = function(err, data) {
  // convert to string
  var s = data + '';

  // these next two lines replace a word in the file contents
  // with secret.
  //
  // however, without using bind (above) this.word is undefined
  // (when handleRead is called as a callback, it's invoked as a
  // regular function, so this refers to the global object
  var replacementPattern = new RegExp(this.word, "g");
  s = s.replace(replacementPattern, 'SECRET');

  console.log(s);
};

var redacted = new RedactedFile('sensitiveData.txt', 'pizza');

// method invocation, so this in printFile refers to object, redacted
redacted.printFile();
