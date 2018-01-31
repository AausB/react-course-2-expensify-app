// * as objectName
// get access to all named exports of objectName with i.e. objectName.addUser() or so
import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCI8rgNZVUlX0X1nXxanGeIAtY5CUoRET8",
  authDomain: "lx-expensify.firebaseapp.com",
  databaseURL: "https://lx-expensify.firebaseio.com",
  projectId: "lx-expensify",
  storageBucket: "lx-expensify.appspot.com",
  messagingSenderId: "104147375801"
};

firebase.initializeApp(config);

const database = firebase.database;

// test connection writing a single object to the database
// check with browser @ https://console.firebase.google.com/project/lx-expensify/database/lx-expensify/data
// .ref(): provides a reference to a specific part of our database
database().ref().set({
  name: 'Alex',
  age: 33,
  stressLevel: 6,
  job: {
    title: 'Software developer',
    company: 'Google'
  },
  isSingle: true,
  location: {
    city: 'Phili',
    country: 'USA'
  }
}).then(() => {
  console.log('Data is saved');
}).catch((error) => {
  console.log('This failed:', error);
});

// database().ref().set('This is my data');

// // only update a part of the database by database.ref('')
// database().ref('age').set(27);
// database().ref('location/city').set('Berlin');

// add a new property 'attributes' to the database object
database().ref('attributes').set({
  height: 180,
  weight: 99
}).then(() => {
  console.log('Data is added');
}).catch((error) => {
  console.log('Add data failed:', error);
});

// Challenge
database().ref()
  .update({
    stressLevel: 9,
    'job/company': 'Amazon',
    'location/city': 'Seattle'
  })
  .then(() => {
    console.log('challenge update done.')
  })
  .catch((error) => {
    console.log('challenge update:', error);
  });

// // UPDATE
// // Writes multiple values to the Database at once.
// // You can add, update, remove values with one call at the root level
// // nested properties are not updated but removed if not explicitly mentioned
// // update needs to be called with an object
// database().ref().update({
//   name: 'Caro', // update
//   age: 21, //update
//   job: 'Singer', // add
//   isSingle: null, // remove 
//   'location/city': 'Frankfurt' // nested update
// });

// // console.log('I made a request to change the data.');

// database().ref('isSingle')
//   .remove()
//   .then(function() {
//     console.log("Remove succeeded.")
//   })
//   .catch(function(error) {
//     console.log("Remove failed: " + error.message)
//   });

// // remove all data from database  
// database().ref()
//   .remove()
//   .then(function() {
//     console.log("Remove succeeded.")
//   })
//   .catch(function(error) {
//     console.log("Remove failed: " + error.message)
//   });

// // BETTER USE .remove()
// // .set(null) is equivalent to .remove()
// database().ref('isSingle')
//   .set(null)
//   .then(() => {
//     console.log('removed with set(null)');
//   })
//   .catch((error) => {
//     console.log('set(null)', error);
//   });