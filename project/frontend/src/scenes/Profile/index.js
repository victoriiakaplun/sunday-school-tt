import React, { useContext } from 'react';
import Header from '../../components/header/Header';
import ProfileForm from './ProfileForm';
import { UserContext } from '../../App/context/userContext';

function Profile({ history }) {
  const user = useContext(UserContext);

  return (
    <div className="columns is-centered">
      <div className="column is-half is-center">
        <Header>Profile Info</Header>
        <ProfileForm history={history} />
      </div>
    </div>
  );
}
export default Profile;
