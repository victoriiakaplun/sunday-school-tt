import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Field from '../../components/Field';
import Button from '../../components/button/Button';
import CenteredButtonBox from '../../components/button/CenteredButtonBox';
import { login } from '../../service/TimetableAPI';
import { UserContext } from '../../App/context/userContext';

function SignInForm() {
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();
  const { setUser } = useContext(UserContext);

  const onHandleInput = event => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };

  const onHandleSubmit = async event => {
    const data = await login(inputData);
    if (data) {
      setUser({ id: data.id, name: data.name, email: data.email, isAdmin: data.role === 'admin' });
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
      <CenteredButtonBox>
        <Button onClick={onHandleSubmit}>Sign in</Button>
      </CenteredButtonBox>
    </form>
  );
}

export default SignInForm;
