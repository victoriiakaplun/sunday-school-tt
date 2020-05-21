import React from 'react';
import CardHeader from '../../components/card/CardHeader';
import Card from '../../components/card/Card';
import CardBody from '../../components/card/CardBody';

const moment = require('moment');

function TimetableOrdersCard({ timetable, ordersAmount }) {
  const isContainsOrders = ordersAmount > 0;

  const cardHeaderValue = isContainsOrders
    ? `${ordersAmount} orders awaiting approval`
    : 'No orders requested';

  const headerType = isContainsOrders ? 'awaiting' : 'noRequests';

  const { title, slotSize, start, end } = timetable;

  const startMoment = moment(start).format('LL');
  const endMoment = moment(end).format('LL');

  const cardBody = {
    title,
    type: slotSize,
    period: `${startMoment}  -  ${endMoment};`,
  };

  return (
    <Card>
      <CardHeader type={headerType}>{cardHeaderValue}</CardHeader>
      <CardBody body={cardBody} />
    </Card>
  );
}

export default TimetableOrdersCard;
