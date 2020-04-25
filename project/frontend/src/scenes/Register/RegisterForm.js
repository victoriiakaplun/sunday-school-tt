import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Field from '../../components/Field';
import Button from '../../components/button/Button';
import { register } from '../../service/TimetableAPI';
import CenteredButtonBox from '../../components/button/CenteredButtonBox';

function RegisterForm() {
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

  const onHandleSubmit = async event => {
    const data = await register(inputData);
    if (data) {
      history.push('/signin');
    }
    event.preventDefault();
  };

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

export default RegisterForm;
