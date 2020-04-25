import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import Field from '../../components/Field';
import Button from '../../components/button/Button';
import CenteredButtonBox from '../../components/button/CenteredButtonBox';
import { UserContext } from '../../App/context/userContext';
import { update } from '../../service/TimetableAPI';
import { addNotification } from '../../store/actions/notificationActions';

function ProfileForm() {
  const { user, setUser } = useContext(UserContext);

  const [inputData, setInputData] = useState({
    name: user.name,
    email: user.email,
  });

  const dispatch = useDispatch();

  const onHandleInput = event => {
    setInputData({
      [event.target.name]: event.target.value,
    });
  };

  function notify() {
    dispatch(addNotification({ message: 'Profile data successfully updated!' }));
  }

  const onSave = async event => {
    const data = await update(inputData, user.id);
    if (data) {
      setUser({ id: data.id, name: data.name, email: data.email, isAdmin: data.role === 'admin' });
      setInputData({ name: data.name, email: data.email });
      notify();
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
