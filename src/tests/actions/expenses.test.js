import consfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {startAddExpense, addExpense, editExpense, removeExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = consfigureStore([thunk]);

test('should setup remove expense action object', () => {
  const action = removeExpense({id: '123abc'});

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

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

// SKIP
test.skip('should setup add expense action object with DEFAULT values', () => {
  const expenseDefaults =   {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };

  const action = addExpense();

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseDefaults,
      id: expect.any(String)
    }
  });
});