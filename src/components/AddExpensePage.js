import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

// named export for testing without connect()
export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.addExpense(expense); // to be tested
    this.props.history.push('/'); // to be tested
  };

  // to be tested
  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

// for the testing:
// use mapDispatchToProps by connect()
// you can use the dispatch funtion as a property
// abstract the dispathc function away from the component itself
const mapDispatchToProps = (dispatch) => ({
    addExpense: (expense) => dispatch(addExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
