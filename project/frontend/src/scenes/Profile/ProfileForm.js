import React, { useContext, useState } from 'react';
import Field from '../../components/Field';
import Button from '../../components/Button';
import CenteredButtonBox from '../../components/CenteredButtonBox';
import { UserContext } from '../../App/context/userContext';
import { update } from '../../service/TimetableAPI';

function ProfileForm() {
  const { user, setUser } = useContext(UserContext);

  const [inputData, setInputData] = useState({
    name: user.name,
    email: user.email,
  });

  const onHandleInput = event => {
    setInputData({
      [event.target.name]: event.target.value,
    });
  };

  const onSave = async event => {
    const data = await update(inputData, user.id);
    if (data) {
      setUser({ id: data.id, name: data.name, email: data.email, isAdmin: data.role === 'admin' });
      setInputData({ name: data.name, email: data.email });
    }
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
      <CenteredButtonBox>
        <Button onClick={onSave}>Save</Button>
      </CenteredButtonBox>
    </form>
  );
}

export default ProfileForm;
