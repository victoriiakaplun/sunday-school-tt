import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import EventCard from './EventCard';
import Columns from '../../components/columns/Columns';
import Column from '../../components/columns/Column';
import Divider from '../../components/divider/Divider';
import { fetchUserOrders } from '../../store/actions/user/userOrdersActions';
import Spinner from '../../components/spinner/Spinner';

const moment = require('moment');

function EventTimeline({ profileData, userOrders, error, loading, getUserOrders }) {
  useEffect(() => {
    if (profileData) {
      getUserOrders(profileData.id);
    }
  }, [profileData]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div />;
  }

  const upcomingEventsInfo = [];
  const previousEventsInfo = [];

  const now = moment();

  userOrders.forEach(order => {
    if (now.isBefore(order.Slot.start, 'hours')) {
      upcomingEventsInfo.push(order);
    }
    if (now.isAfter(order.Slot.start, 'hour')) {
      previousEventsInfo.push(order);
    }
  });

  return (
    <Columns>
      <Column>
        <Divider>Upcoming events</Divider>
        {upcomingEventsInfo.map(event => {
          const { id, Timetable, Slot, AttributeValue } = event;
          return (
            <EventCard
              key={id}
              title={Timetable.title}
              start={Slot.start}
              end={Slot.end}
              AttributeValue={AttributeValue}
            />
          );
        })}
        <Divider>Previous events</Divider>
        {previousEventsInfo.map(event => {
          const { id, Timetable, Slot, AttributeValue } = event;
          return (
            <EventCard
              key={id}
              title={Timetable.title}
              start={Slot.start}
              end={Slot.end}
              AttributeValue={AttributeValue}
            />
          );
        })}
      </Column>
    </Columns>
  );
}

const mapStateToProps = state => ({
  profileData: state.profile.profileData,
  userOrders: state.userOrders.userOrders,
  loading: state.userOrders.loading,
  error: state.userOrders.error,
});
const mapDispatchToProps = {
  getUserOrders: fetchUserOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventTimeline);
