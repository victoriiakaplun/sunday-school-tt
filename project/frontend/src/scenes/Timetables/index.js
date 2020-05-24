import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Button from '../../components/button/Button';
import TimetablesList from './TimetablesList';
import CenteredButtonBox from '../../components/button/CenteredButtonBox';
import Columns from '../../components/columns/Columns';
import Column from '../../components/columns/Column';
import Spinner from '../../components/spinner/Spinner';

function Timetables({ profileData, loading, error }) {
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <div />;
  }

  const isAdmin = profileData && profileData.role === 'admin';

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
  loading: state.profile.loading,
  error: state.profile.error,
});

export default connect(mapStateToProps, null)(Timetables);
