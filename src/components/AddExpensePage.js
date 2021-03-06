import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

// named export for testing without connect()
export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startAddExpense(expense); // to be tested
    this.props.history.push('/'); // to be tested
  };

  // to be tested
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Expense</h1>  
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
          onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

// for the testing:
// use mapDispatchToProps by connect()
// you can use the dispatch funtion as a property
// abstract the dispathc function away from the component itself
const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
