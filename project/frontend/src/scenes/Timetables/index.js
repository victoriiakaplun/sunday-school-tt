import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import Button from '../../components/button/Button';
import TimetablesList from './TimetablesList';
import CenteredButtonBox from '../../components/button/CenteredButtonBox';
import Columns from '../../components/Columns';
import Column from '../../components/Column';
import { getUserProfile } from '../../store/actions/profileActions';

function Timetables({ profileData, getProfile }) {
  const { role } = profileData;
  const isAdmin = role === 'admin';

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const button = (
    <CenteredButtonBox>
      <Button>+ Create timetable</Button>
    </CenteredButtonBox>
  );

  return (
    <Columns>
      <Column>
        {isAdmin && button}
        <Header>Available timetables</Header>
        <TimetablesList />
      </Column>
    </Columns>
  );
}

const mapStateToProps = state => ({
  profileData: state.profile.profileData,
});

const mapDispatchToProps = {
  getProfile: getUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timetables);
