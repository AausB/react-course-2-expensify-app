import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

// load a locale
numeral.register('locale', 'de', {
  delimiters: {
      thousands: '.',
      decimal: ','
  },
  abbreviations: {
      thousand: 'tsd',
      million: 'm',
      billion: 'b',
      trillion: 't'
  },
  currency: {
      symbol: '€'
  }
});

// switch between locales
numeral.locale('de');

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>
      {numeral(amount / 100).format('$0,0.00')} - {moment(createdAt).format('DD.MM.YYYY, HH:mm:ss')}</p>
  </div>
);

export default ExpenseListItem;
