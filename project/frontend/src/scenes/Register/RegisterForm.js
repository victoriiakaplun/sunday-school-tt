import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Field from '../../components/Field';
import Button from '../../components/button/Button';
import { register } from '../../store/actions/registerActions';
import CenteredButtonBox from '../../components/button/CenteredButtonBox';

function RegisterForm({ registerUser, isAuth, error, isRegistered }) {
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const history = useHistory();

  const onHandleInput = event => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };

  const onHandleSubmit = () => {
    registerUser(inputData);
  };

  if (isAuth) {
    history.push('/');
  }

  if (isRegistered) {
    history.push('/signin');
  }

  if (error) {
    return <div />;
  }

  return (
    <form>
      <Field
        type="text"
        name="name"
        placeholder="Name"
        value={inputData.name}
        onChange={onHandleInput}
      >
        Name
      </Field>
      <Field
        type="email"
        name="email"
        placeholder="Email"
        value={inputData.email}
        onChange={onHandleInput}
      >
        Email
      </Field>
      <Field
        type="password"
        name="password"
        placeholder="Must be more than 8 symbols"
        value={inputData.password}
        onChange={onHandleInput}
      >
        Password
      </Field>
      <CenteredButtonBox>
        <Button onClick={onHandleSubmit}>Confirm</Button>
      </CenteredButtonBox>
    </form>
  );
}

const mapStateToProps = state => ({
  isAuth: state.authenticaion.isAuth,
  error: state.reg.error,
  isRegistered: state.reg.isRegistered,
});

const mapDispatchToProps = {
  registerUser: register,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
