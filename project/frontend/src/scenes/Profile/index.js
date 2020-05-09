import React from 'react';
import Header from '../../components/header/Header';
import ProfileForm from './ProfileForm';

function Profile({ history }) {
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
