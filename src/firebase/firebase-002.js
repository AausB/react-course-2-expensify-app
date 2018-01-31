// CHECK ALSO firebase-001.js !!!!

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

// database().ref('notes').push({
//   title: 'Note 2',
//   body: 'This is my note 2'
// });

// database().ref('notes/-L3mY0qfO-Cjz7KcQgca')
//   .update({
//     body: 'Changed body of note 1'
//   })
//   .then(() => console.log('updated'))
//   .catch((error) => console.log('update:', error));

database().ref('notes/-L3mY0qfO-Cjz7KcQgca')
  .remove()
  .then(() => console.log('updated'))
  .catch((error) => console.log('update:', error));

// const firebaseNotes = {
//   notes: {
//     '266sduf': {
//       title: 'Note 1',
//       body: 'This is my note 1'
//     },
//     'ksjlkjfl898': {
//       title: 'Note 2',
//       body: 'This is my note 2'
//     }
//   }
// };

// // firebase does not support arrays
// const notes = [{
//   id: '266sduf',
//   title: 'Note 1',
//   body: 'This is my note 1'
// }, {
//   id: 'ksjlkjfl898',
//   title: 'Note 2',
//   body: 'This is my note 2'
// }];

// database().ref('notes')
//   .set(notes)
//   .then(() => console.log('data set().'))
//   .catch((e) => console.log('set()', error));