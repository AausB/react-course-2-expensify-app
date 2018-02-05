import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  // to be tested: testCase
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense); // to be tested: use spy and toHaveBeenLastCalledWith
    this.props.history.push('/'); // to be tested: use spy and toHaveBeenLastCalledWith
  };

  // to be tested: testCase
  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id }); // to be tested: use spy and toHaveBeenLastCalledWith
    this.props.history.push('/');  // to be tested: use spy and toHaveBeenLastCalledWith
  };

  // to be tested: testCase
  render () { // to be tested: use snapshot
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>  
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onRemove}>Remove Expense</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
