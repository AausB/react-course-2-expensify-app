import {addExpense, editExpense, removeExpense} from '../../actions/expenses';

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
  const expenseData = {
    description: 'test description',
    amount: 123456,
    createdAt: 1000,
    note: 'test note'
  };

  const action = addExpense(expenseData);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String) // use expeect.any() becausee uuid() creates new value oneach call
    } 
  });
});

test('should setup add expense action object with DEFAULT values', () => {
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