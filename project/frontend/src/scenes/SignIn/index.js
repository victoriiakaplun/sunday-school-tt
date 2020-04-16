import React from 'react';
import Header from '../../components/header/Header';
import SignInForm from './SignInForm';

function SignIn() {
  return (
    <div className="columns is-centered">
      <div className="column is-half is-center">
        <Header>Sign In</Header>
        <SignInForm />
      </div>
    </div>
  );
}
export default SignIn;
