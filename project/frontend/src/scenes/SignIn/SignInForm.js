import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Field from '../../components/Field';
import Button from '../../components/Button';
import { login } from '../../service/TimetableAPI';

function SignInForm() {
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

  const onHandleSubmit = async event => {
    const data = await login(inputData);
    if (data) {
      history.push('/');
    }
    event.preventDefault();
  };

  return (
    <form>
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
      <div className="field is-grouped is-grouped-centered" onChange={onHandleInput}>
        <Button onClick={onHandleSubmit}>Sign in</Button>
      </div>
    </form>
  );
}

export default SignInForm;
