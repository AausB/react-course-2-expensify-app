import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly WITHOUT expense data', () => {
  const wrapper = shallow(<ExpenseForm />);

  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm correctly WITH expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);

  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid from submission', () => {
  const wrapper = shallow(<ExpenseForm />);

  // snapshot 1 before onSubmit
  expect(wrapper).toMatchSnapshot();

  wrapper.find('form').simulate('submit', { // simulate the onSubmit event
    preventDefault: () => {} // fake the e.preventDefault() in ExpenseForm onSubmit
  });

  // check if state.error.length > 0
  expect(wrapper.state('error').length).toBeGreaterThan(0);

  // snapshot 2 after onSubmit with invalid data
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const value = 'Test description'
  const wrapper = shallow(<ExpenseForm />);

  // get the first input element with enzyme .at()
  // simultate a change event
  // fake the e.target.value with the const value
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  }); 

  expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
  const value = 'Test note';
  const wrapper = shallow(<ExpenseForm />);

  // since there is only 1 textarea no need for .at(0)
  // simultate a change event
  // fake the e.target.value with the const value
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });

  expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
  const value = '123.45'
  const wrapper = shallow(<ExpenseForm />);

  // get the first input element with enzyme .at()
  // simultate a change event
  // fake the e.target.value with the const value
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  }); 

  expect(wrapper.state('amount')).toBe(value);
});

test('should NOT set amount if INvalid input', () => {
  const value = '123.4567'
  const wrapper = shallow(<ExpenseForm />);

  // get the first input element with enzyme .at()
  // simultate a change event
  // fake the e.target.value with the const value
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  }); 

  expect(wrapper.state('amount')).toBe('');  
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn(); // define spy function

  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);

  wrapper.find('form').simulate('submit', { // simulate the onSubmit event
    preventDefault: () => {} // fake the e.preventDefault() in ExpenseForm onSubmit
  });

  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  }); 
});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);

  // see: https://www.udemy.com/react-2nd-edition/learn/v4/questions/2967954
  // import 'react-dates/initialize';
  // import { SingleDatePicker } from 'react-dates';
  // wrapper.find(SingleDatePicker) instead of wrapper.find('SingleDatePicker')
  wrapper.find(SingleDatePicker).prop('onDateChange')(now); // onDateChange returns the handler this.onDateChange: call handler with now
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const focused = !wrapper.state('calendarFocused'); // get the reverse inital value

  wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused }); // onDateChange returns the handler this.onDateChange: call handler with now
  expect(wrapper.state('calendarFocused')).toBe(focused);
});