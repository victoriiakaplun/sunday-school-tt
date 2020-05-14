import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Field from '../../components/form/Field';
import Button from '../../components/button/Button';
import { register } from '../../store/actions/registerActions';
import CenteredButtonBox from '../../components/button/CenteredButtonBox';
import Form from '../../components/form/Form';

function RegisterForm({ registerUser, isAuth, error, isRegistered }) {
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const history = useHistory();

  const onInput = event => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = () => {
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
    <Form>
      <Field type="text" name="name" placeholder="Name" value={inputData.name} onChange={onInput}>
        Name
      </Field>
      <Field
        type="email"
        name="email"
        placeholder="Email"
        value={inputData.email}
        onChange={onInput}
      >
        Email
      </Field>
      <Field
        type="password"
        name="password"
        placeholder="Must be more than 8 symbols"
        value={inputData.password}
        onChange={onInput}
      >
        Password
      </Field>
      <CenteredButtonBox>
        <Button onClick={onSubmit}>Confirm</Button>
      </CenteredButtonBox>
    </Form>
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
