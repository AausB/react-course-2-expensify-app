import React from 'react';
import { shallow } from 'enzyme';

import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render ExpensesSummary with one expense correctly', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={12345} />);

  expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with multiple expenses correctly', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={10} expensesTotal={987654321} />);

  expect(wrapper).toMatchSnapshot();
});