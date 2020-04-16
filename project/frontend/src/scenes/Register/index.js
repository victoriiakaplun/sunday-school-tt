import React from 'react';
import Header from '../../components/header/Header';
import RegisterForm from './RegisterForm';

function Register() {
  return (
    <div className="columns is-centered">
      <div className="column is-half is-center">
        <Header>Register</Header>
        <RegisterForm />
      </div>
    </div>
  );
}
export default Register;
