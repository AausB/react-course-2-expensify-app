import React from 'react';
import { connect } from 'react-redux';

import { startLogin } from '../actions/auth';

// destructure props object : { startLogin }
export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p>It's time to get your expenses under control.</p>
      <button className="button" onClick={startLogin}>Login with Google</button> 
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

// the connected component as default export
export default connect(undefined, mapDispatchToProps)(LoginPage);
