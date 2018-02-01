import consfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from '../../actions/expenses';

import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = consfigureStore([thunk]);

beforeEach((done) => {
  const expensesData = {};

  // builds from the fixtures expenses array an expensesData object
  expenses.forEach(({id, description, note, amount, createdAt}) => {
    expensesData[id] = {description, note, amount, createdAt};
  });

  // write data to firebase
  // beforeEach waits until "done()"
  database.ref('expenses').set(expensesData).then(() => done());
});

//
// REMOVE EXPENSE
//
test('should setup remove expense action object', () => {
  const action = removeExpense({id: '123abc'});

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should remove expense from database (firebase)', (done) => {
  const store = createMockStore({});
  const id = expenses[1].id;

  store.dispatch(startRemoveExpense({id})).then(() => {
    // which actions are dispatched?
    const actions = store.getActions();

    expect(actions.length).toBe(1);
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });

    // check if you can read the deleted expense
    // return the promise to get rid of the nested then
    return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });

});

//
// EDIT EXPENSE
//
test('should setup edit expense action object', () => {
  const updates = {
    description: 'test description',
    amount: 123456,
    createdAt: 1000,
    note: 'test note'
  };

  const action = editExpense('123abc', updates);

  expect(action).toEqual({
    id: '123abc',
    type: 'EDIT_EXPENSE',
    updates: {
      description: 'test description',
      amount: 123456,
      createdAt: 1000,
      note: 'test note'
    }
  });
});

test('should edit/update expense from database (firebase)', (done) => {
  const store = createMockStore({});
  
  const id = expenses[0].id;

  const updates = {
    description: 'test description',
    amount: 123456,
    createdAt: 1000,
    note: 'test note'
  };

  store.dispatch(startEditExpense(id, updates)).then(() => {
    // which actions are dispatched?
    const actions = store.getActions();

    expect(actions.length).toBe(1);
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });

  return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(updates);
    done();
  });
});

//
// ADD EXPENSE
//
test('should setup add expense action object with PROVIDED values', () => {
  const action = addExpense(expenses[2]);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Test Description',
    amount: '12345',
    note: 'Test Note',
    createdAt: 1000
  };

  // startAddExpense returns 
  store.dispatch(startAddExpense(expenseData)).then(() => {
    // get the actions dispatched to this mock store (redux-mock-store)
    const actions = store.getActions();

    // we only expect 1 action to be dispatched
    expect(actions.length).toBe(1);
    
    // expect the add expense action with filled data
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String), // String is the String constructor function
        ...expenseData
      }
    });

    // grab the id from action[0].expense.id above
    // and fetch the value asingle time from database with .once('value)
    // return the Promise
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => { // success path from the returned database Promise
    expect(snapshot.val()).toEqual(expenseData);
    // call done() when resolving the once() promise
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };

  // startAddExpense returns 
  store.dispatch(startAddExpense({})).then(() => {
    // get the actions dispatched to this mock store (redux-mock-store)
    const actions = store.getActions();

    // we only expect 1 action to be dispatched
    expect(actions.length).toBe(1);
    
    // expect the add expense action with filled data
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String), // String is the String constructor function
        ...expenseDefaults
      }
    });

    // grab the id from action[0].expense.id above
    // and fetch the value asingle time from database with .once('value)
    // return the Promise
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => { // success path from the returned database Promise
    expect(snapshot.val()).toEqual(expenseDefaults);
    // call done() when resolving the once() promise
    done();
  });
});

//
// SET EXPENSES
//
test('should setup SET_EXPENSES action object with data', () => {
  // use the expenses array from fixtures/expenses.js
  const action = setExpenses(expenses);

  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from database (firebase)', (done) => {
  const store = createMockStore({});

  store.dispatch(startSetExpenses()).then(() => {
    // which actions are dispatched?
    const actions = store.getActions();

    expect(actions.length).toBe(1);
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses // all expenses from fixtures should be in the database (see beforeEach() above)
    });
    done();
  });
});