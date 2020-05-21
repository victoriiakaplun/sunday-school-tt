import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTimetables } from '../../store/actions/timetable/timetableActions';
import Spinner from '../../components/spinner/Spinner';
import TimetableOrdersCard from './TimetableOrdersCard';
import { fetchOrders } from '../../store/actions/order/allOrdersActions';

function TimetableOrdersList({ getTimetables, getOrders, orders, timetables, loading, error }) {
  useEffect(() => {
    getTimetables();
    getOrders();
  }, [getTimetables]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div />;
  }

  return timetables.map(timetable => {
    const { id, title, slotSize, start, end } = timetable;
    const timetableOrders = orders.filter(
      order => order.Timetable.id === timetable.id && order.status === 'CREATED',
    );
    const timetableOrdersAmount = timetableOrders.length;
    return (
      <TimetableOrdersCard
        key={id}
        timetable={{ id, title, slotSize, start, end }}
        ordersAmount={timetableOrdersAmount}
      />
    );
  });
}

const mapStateToProps = state => ({
  timetables: state.timetables.timetables,
  orders: state.orders.orders,
  loading: state.timetables.loading,
  error: state.timetables.error,
});

const mapDispatchToProps = {
  getTimetables: fetchTimetables,
  getOrders: fetchOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimetableOrdersList);
