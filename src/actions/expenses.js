import uuid from 'uuid';
import moment from 'moment';

import database from '../firebase/firebase';

// How SYNC action generators work:
//   component calls action generator
//   action generator returns object !!!
//   component dispatches object
//   redux store changes 

// How ASYNC action generators work:
//   component calls action generator
//   action generator returns function !!! 
//     -> redux thunk: middleware allows you to write action creators that return a function instead of an action.
//   component dispatches function (redux by default does not allow to dispatch function)
//   function runs (has the ability to dispatch other actions and do whatever it wants) 

// ADD_EXPENSE
// prior to redux-thunk:
//
// export const addExpense = (
//   {
//     description = '',
//     note = '',
//     amount = 0,
//     createdAt = moment().valueOf() // alex set now as default
//   } = {}
// ) => ({
//   type: 'ADD_EXPENSE',
//   expense: {
//     id: uuid(),
//     description,
//     note,
//     amount,
//     createdAt
//   }
// });

// ADD_EXPENSE
// with redux-thunk
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

// startAddExpense is the function that first writes to database and then to the store
//   returns a function
export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    
    // initialize data
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;

    const expense = {description, note, amount, createdAt};

    // add expense to database
    // return database... returns the promise chain to chain it with "then" in expenses.test.js
    return database.ref('expenses')
      .push(expense)
      .then((ref) => {
        // add expense to store
        dispatch(addExpense({
          id: ref.key, // id comes from firebase now
          ...expense  
        }));
      })
      .catch((error) => {
        // to be done
      });

  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET_EXPENSES
// set the expenses initially
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

// start SET_EXPENSES
// async call to database to fetch all expenses
export const startSetExpenses = () => {
  return (dispatch) => {
  // 1. Fetch all expense data once -> see example in firebase.js
    // return database.ref to use .then() in app.js
    return database.ref('expenses')
      .once('value')
      .then((snapshot) => {
        const expenses = [];

  // 2. Parse data into an array
        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
  // 3. Dispatch SET_EXPENSES
        dispatch(setExpenses(expenses));
      })
      .catch((error) => {
        console.log('db fetch failed:', error)
      });
  };
};
