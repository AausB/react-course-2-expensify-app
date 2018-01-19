import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';

import { ExpenseListFilters } from '../../components/ExpenseListFilters';

import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();

  wrapper = shallow(
    <ExpenseListFilters 
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const value = 'rent';

  wrapper.find('input').simulate('change', {
    target: { value }
  });

  expect(setTextFilter).toHaveBeenLastCalledWith(value); 
});

test('should sort by date', () => {
  const value = 'date';

  // altFilters is sort by amount
  wrapper.setProps({
    filters: altFilters
  });

  wrapper.find('select').simulate('change', {
    target: { value }
  });

  expect(sortByDate).toHaveBeenCalled(); 
});

test('should sort by amount', () => {
  const value = 'amount';

  wrapper.find('select').simulate('change', {
    target: { value }
  });

  expect(sortByAmount).toHaveBeenCalled(); 
});

test('should handle date change', () => {
  const startDate = moment();
  const endDate = moment().add(3, 'days');

  wrapper.find(DateRangePicker).prop('onDatesChange')({ startDate, endDate });

  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus change', () => {
  const calendarFocused = "startDate";

  wrapper.find(DateRangePicker).prop('onFocusChange')(calendarFocused); // onFocusChange returns the handler this.onFocusChange: call handler with "startDate"
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});


