import React from 'react';
import Field from '../../components/Field';
import Button from '../../components/Button';

function SignInForm() {
  return (
    <form>
      <Field type="email" placeholder="Email">
        Email
      </Field>
      <Field type="password" placeholder="Password">
        Password
      </Field>
      <div className="field is-grouped is-grouped-centered">
        <Button>Sign in</Button>
      </div>
    </form>
  );
}

export default SignInForm;
