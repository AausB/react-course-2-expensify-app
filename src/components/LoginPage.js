import React from 'react';
import { connect } from 'react-redux';

import { startLogin } from '../actions/auth';

// destructure props object : { startLogin }
export const LoginPage = ({ startLogin }) => (
  <div>
    <button onClick={startLogin}>Login</button> 
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

// the connected component as default export
export default connect(undefined, mapDispatchToProps)(LoginPage);
