import React, { useState } from 'react';
import Field from '../../components/Field';
import Button from '../../components/Button';

function ProfileForm() {
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
  });

  const onHandleInput = event => {
    setInputData({
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form>
      <Field type="text" placeholder="Name" onChange={onHandleInput}>
        Name
      </Field>
      <Field type="email" placeholder="Email">
        Email
      </Field>
      <div className="field is-grouped is-grouped-centered" onChange={onHandleInput}>
        <Button>Save</Button>
      </div>
    </form>
  );
}

export default ProfileForm;
