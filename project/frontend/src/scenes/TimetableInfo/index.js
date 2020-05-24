import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Header from '../../components/header/Header';
import TimetableDetailsBox from './TimetableDetailsBox';
import SlotCell from './cell/SlotCell';
import TimetableContainer from './TimetableContainer';
import TimetableColumn from './column/TimetableColumn';
import TimesColumn from './column/TimesColumn';
import Cell from './cell/Cell';
import { fetchTimetableOrders } from '../../store/actions/timetable/timetableOrdersActions';
import { fetchTimetable } from '../../store/actions/timetable/timetableActions';
import Spinner from '../../components/spinner/Spinner';

const moment = require('moment');

function TimetableInfo({
  timetable,
  loading,
  error,
  getTimetableOrders,
  getTimetable,
  timetableOrders,
}) {
  const { id } = useParams();
  const parsedId = Number.parseInt(id, 10);

  useEffect(() => {
    getTimetable(parsedId);
    getTimetableOrders(parsedId);
  }, [parsedId]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div />;
  }

  const { title, start, end, slotSize, Slot, Attribute } = timetable;
  const daysSlots = [];

  for (let m = moment(start); m.diff(moment(end), 'days') <= 0; m.add(1, 'days')) {
    daysSlots.push({ day: m.format('LL'), slots: [<Cell key={uuid()}>{m.format('LL')}</Cell>] });
  }

  daysSlots.forEach(d => {
    Slot.forEach(slot => {
      if (moment(d.day).isSame(slot.start, 'days')) {
        const objIndex = daysSlots.findIndex(obj => moment(obj.day).isSame(slot.start, 'days'));
        const slotOrders = timetableOrders.filter(order => order.Slot.id === slot.id);
        daysSlots[objIndex].slots.push(<SlotCell key={slot.id} slot={slot} orders={slotOrders} />);
      }
    });
  });

  return (
    <div>
      <Header>Timetable details</Header>
      <TimetableDetailsBox info={{ title, start, end, slotSize, Attribute }} />
      <TimetableContainer>
        <TimesColumn />
        {daysSlots.map(day => {
          return <TimetableColumn key={uuid()}>{day.slots}</TimetableColumn>;
        })}
      </TimetableContainer>
    </div>
  );
}

const mapStateToProps = state => ({
  timetable: state.timetable.timetable,
  profile: state.profile.profileData,
  loading: state.timetable.loading || state.timetableOrders.loading || state.profile.loading,
  error: state.timetable.error || state.timetableOrders.error || state.profile.error,
  timetableOrders: state.timetableOrders.timetableOrders,
});

const mapDispatchToProps = {
  getTimetableOrders: fetchTimetableOrders,
  getTimetable: fetchTimetable,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimetableInfo);
