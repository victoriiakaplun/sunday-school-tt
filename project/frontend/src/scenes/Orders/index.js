import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import Column from '../../components/columns/Column';
import Columns from '../../components/columns/Columns';
import TimetableOrdersList from './TimetableOrdersList';

function Orders({ profileData }) {
  const history = useHistory();

  if (profileData && profileData.role !== 'admin') {
    history.push('/');
  }
  return (
    <Columns>
      <Column>
        <Header>Orders</Header>
        <TimetableOrdersList />
      </Column>
    </Columns>
  );
}

const mapStateToProps = state => ({
  profileData: state.profile.profileData,
});

export default connect(mapStateToProps, null)(Orders);
