import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Button from '../../components/button/Button';
import TimetablesList from './TimetablesList';
import CenteredButtonBox from '../../components/button/CenteredButtonBox';
import Columns from '../../components/columns/Columns';
import Column from '../../components/columns/Column';
import { getUserProfile } from '../../store/actions/user/profileActions';

function Timetables({ profileData }) {
  const { role } = profileData;

  const isAdmin = role === 'admin';

  const button = (
    <CenteredButtonBox>
      <Link to="/timetable-creation">
        <Button>+ Create timetable</Button>
      </Link>
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

export default connect(mapStateToProps)(Timetables);
