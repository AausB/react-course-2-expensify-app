const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({name: 'Alex', age: 23});
  }, 2000);
  // reject('Something went wrong');
});

console.log('before');

// see the promises chaining
promise.then((data) => {
  console.log('1', data);

  return 'some data'; // returns just a string NOT a promise -> used as a parameter "str" in the follwing .then(str)
  // .then(str) will always run
}).then((str) => { // ...and the return from previous then is chained as an input to this then
  console.log('does this run?', str);
  return 123 // returns a number NOT a promise
}).then((input) => { // ...and the return from previous then is chained as an input to this then
  console.log(input);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('This is my other Promise');
    }, 2000);
  });
  // .then(str) will only run if the Promise resolves
  // .then(str) is the Promise success case
}).then((str) => {
  console.log('from Promise:', str);
}).catch((error) => {
  console.log('Error 1:', error);
});

// promise.then((data) => {
//   console.log('2', data);
// }).catch((error) => {
//   console.log('2', error);
// });

console.log('after');
