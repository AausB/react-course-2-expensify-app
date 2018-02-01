import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  // to be tested: testCase
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense); // to be tested: use spy and toHaveBeenLastCalledWith
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
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
