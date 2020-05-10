import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Field from '../../components/Field';
import Button from '../../components/button/Button';
import CenteredButtonBox from '../../components/button/CenteredButtonBox';
import Spinner from '../../components/Spinner';
import { getUserProfile, updateUserProfile } from '../../store/actions/profileActions';

function ProfileForm({ updateProfile, profileData, error, loading }) {
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
  });
  useEffect(() => {
    setInputData({ name: profileData.name, email: profileData.email });
  }, [profileData]);

  const onInput = event => {
    setInputData({
      [event.target.name]: event.target.value,
    });
  };
  const onSave = () => {
    updateProfile(inputData, profileData.id);
  };

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <form>
      <Field type="text" name="name" placeholder="Name" value={inputData.name} onChange={onInput}>
        Name
      </Field>
      <Field
        type="email"
        name="email"
        placeholder="Email"
        value={inputData.email}
        onChange={onInput}
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
  profileData: state.profile.profileData,
  loading: state.profile.loading,
  error: state.profile.error,
});

const mapDispatchToProps = {
  updateProfile: updateUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
