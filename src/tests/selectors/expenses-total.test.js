import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';


test('should return 0 if no expenses', () => {
  const expenses = [];
  const result = selectExpensesTotal(expenses);

  expect(result).toBe(0);
});


test('should correctly add up a single expense', () => {
  const singleExpense = [expenses[0]];
  
  const result = selectExpensesTotal(singleExpense);

  expect(result).toBe(195);
})


test('should correctly add up multiple expenses', () => {
  const result = selectExpensesTotal(expenses);

  expect(result).toBe(114195);
})