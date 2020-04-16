import React from 'react';
import Field from '../../components/Field';
import Button from '../../components/Button';

function RegisterForm() {
  /* const [inputData, setInputData] = useState({
    name: '',
    email: '',
    password: '',
  });
*/
  /* const onHandleInput = event => {
    setInputData({
      [event.target.name]: event.target.value,
    });
    console.log(inputData);
  }; */

  return (
    <form>
      <Field type="text" placeholder="Name">
        Name
      </Field>
      <Field type="email" placeholder="Email">
        Email
      </Field>
      <Field type="password" placeholder="Must be more than 8 symbols">
        Password
      </Field>
      <div className="field is-grouped is-grouped-centered">
        <Button>Confirm</Button>
      </div>
    </form>
  );
}

export default RegisterForm;
