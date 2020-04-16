import React from 'react';
import Field from '../../components/Field';
import Button from '../../components/Button';

function ProfileForm() {
  return (
    <form>
      <Field type="text" placeholder="Name">
        Name
      </Field>
      <Field type="email" placeholder="Email">
        Email
      </Field>
      <div className="field is-grouped is-grouped-centered">
        <Button>Save</Button>
      </div>
    </form>
  );
}

export default ProfileForm;
