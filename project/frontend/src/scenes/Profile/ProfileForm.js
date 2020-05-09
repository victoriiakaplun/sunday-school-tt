import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Field from '../../components/Field';
import Button from '../../components/button/Button';
import CenteredButtonBox from '../../components/button/CenteredButtonBox';
import Spinner from '../../components/Spinner';
import { getUserProfile, updateUserProfile } from '../../store/actions/profileActions';

function ProfileForm({ getProfile, updateProfile, profileData, error, loading, isAuth }) {
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
  });
  useEffect(() => {
    getProfile();
    setInputData({ name: profileData.name, email: profileData.email });
  }, [getProfile]);
  const history = useHistory();
  const onHandleInput = event => {
    setInputData({
      [event.target.name]: event.target.value,
    });
  };
  const onSave = () => {
    updateProfile(inputData, profileData.id);
  };
  if (!isAuth) {
    history.push('/signin');
  }
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <div>Error</div>;
  }
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

const mapStateToProps = state => ({
  isAuth: state.authenticaion.isAuth,
  profileData: state.profile.profileData,
  loading: state.profile.loading,
  error: state.profile.error,
});

const mapDispatchToProps = {
  getProfile: getUserProfile,
  updateProfile: updateUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
