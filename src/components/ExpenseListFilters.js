import React from 'react';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate); // test with spy
    this.props.setEndDate(endDate); // test with spy
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  }

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);  // test with spy
  };

  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();  // test with spy
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();  // test with spy
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.filters.text}
          onChange={this.onTextChange}
        />
        <select
          value={this.props.filters.sortBy}
          onChange={this.onSortChange}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          startDateId={'startDateId'}
          endDateId={'endDateId'}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          showClearDates={true}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate),
  sortByAmount: () => dispatch(sortByAmount),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

const mapStateToProps = (state) => ({
  filters: state.filters
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
