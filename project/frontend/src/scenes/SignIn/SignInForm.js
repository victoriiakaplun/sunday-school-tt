import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Field from '../../components/form/Field';
import Button from '../../components/button/Button';
import CenteredButtonBox from '../../components/button/CenteredButtonBox';
import { login } from '../../store/actions/authActions';
import Form from '../../components/form/Form';

function SignInForm({ loginUser, isAuth }) {
  const [inputData, setInputData] = useState({
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

  const onSubmit = () => {
    loginUser(inputData);
  };

  if (isAuth) {
    history.push('/');
  }

  return (
    <Form>
      <Field
        type="email"
        name="email"
        value={inputData.email}
        placeholder="Email"
        onChange={onHandleInput}
      >
        Email
      </Field>
      <Field
        type="password"
        name="password"
        value={inputData.password}
        placeholder="Password"
        onChange={onHandleInput}
      >
        Password
      </Field>
      <CenteredButtonBox>
        <Button onClick={onSubmit}>Sign in</Button>
      </CenteredButtonBox>
    </Form>
  );
}

const mapStateToProps = state => ({
  isAuth: Boolean(state.profile.profileData),
});

const mapDispatchToProps = {
  loginUser: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
