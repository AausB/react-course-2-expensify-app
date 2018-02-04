// CHECK ALSO firebase-001.js AND firebase-002.js !!!!

// * as objectName
// get access to all named exports of objectName with i.e. objectName.addUser() or so
import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  // apiKey: "AIzaSyCI8rgNZVUlX0X1nXxanGeIAtY5CUoRET8",
  // authDomain: "lx-expensify.firebaseapp.com",
  // databaseURL: "https://lx-expensify.firebaseio.com",
  // projectId: "lx-expensify",
  // storageBucket: "lx-expensify.appspot.com",
  // messagingSenderId: "104147375801"
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain:  process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// named exports; database as default export
export { firebase, googleAuthProvider, database as default };

//
// firebase examples from chapter 14:
// **********************************
//
// // child_removed
// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// },
// (error) => {
//   console.log('db child_removed failed:', error)
// }
// );

// // child_changed
// database.ref('expenses').on('child_changed', (childSnapshot, prevChildKey) => {
//   console.log('Prev child key:', prevChildKey);
//   console.log(childSnapshot.key, childSnapshot.val());
//   },
//   (error) => {
//     console.log('db child_changed failed:', error)
//   }
// );

// // child_added
// database.ref('expenses').on('child_added', (childSnapshot, prevChildKey) => {
//   console.log('Prev child key:', prevChildKey);
//   console.log(childSnapshot.key, childSnapshot.val());
//   },
//   (error) => {
//     console.log('db child_added failed:', error)
//   }
// );

// // database.ref('expenses')
// //   .once('value')
// //   .then((snapshot) => {
// //     const expenses = [];

// //     snapshot.forEach((childSnapshot) => {
// //       expenses.push({
// //         id: childSnapshot.key,
// //         ...childSnapshot.val()
// //       });
// //     });

// //     console.log('Expenses:', expenses);
// //   })
// //   .catch((error) => {
// //     console.log('db fetch failed:', error)
// //   });


// // // challenge
// // database.ref('expenses').on('value', (snapshot) => {
// //     const expenses = [];

// //     snapshot.forEach((childSnapshot) => {
// //       expenses.push({
// //         id: childSnapshot.key,
// //         ...childSnapshot.val()
// //       });
// //     });

// //     console.log('Expenses:', expenses);
// //   },
// //   (error) => {
// //     console.log('db fetch failed:', error)
// //   }
// // );

// // // Alex:
// // const expenses = [
// //   {
// //     description: 'Description 1',
// //     note: 'Note 1',
// //     amount: 1,
// //     createdAt: 1
// //   }, {
// //     description: 'Description 2',
// //     note: 'Note 2',
// //     amount: 2,
// //     createdAt: 2
// //   }, {
// //     description: 'Description 3',
// //     note: 'Note 3',
// //     amount: 3,
// //     createdAt: 3
// //   }
// // ];

// // expenses.map((expense) => {
// //   const newExpenseRef = database().ref('expenses').push(expense);
// //   console.log(newExpenseRef.toString());
// // });

// // // Andrew:
// // database.ref('expenses').push({
// //   description: 'Description 1',
// //   note: 'Note 1',
// //   amount: 1,
// //   createdAt: 1
// // });

// // database.ref('expenses').push({
// //   description: 'Description 2',
// //   note: 'Note 2',
// //   amount: 2,
// //   createdAt: 2
// // });

// // database.ref('expenses').push({
// //   description: 'Description 3',
// //   note: 'Note 3',
// //   amount: 3,
// //   createdAt: 3
// // });