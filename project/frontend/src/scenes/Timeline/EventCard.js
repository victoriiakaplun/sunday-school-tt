import React from 'react';
import moment from 'moment';
import CardHeader from '../../components/card/cardHeader/CardHeader';
import Card from '../../components/card/Card';
import CardBody from '../../components/card/CardBody';

function EventCard({ title, start, end, AttributeValue }) {
  const slotDate = moment(start).format('LL');
  const slotStartTime = moment(start).format('HH:mm');
  const slotEndTime = moment(end).format('HH:mm');
  const periodValue = slotDate.concat(' ', slotStartTime, ' - ', slotEndTime);
  const cardBody = {
    period: periodValue,
  };

  AttributeValue.forEach(attrValue => {
    cardBody[attrValue.Attribute.title] = attrValue.value;
  });

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody body={cardBody} />
    </Card>
  );
}

export default EventCard;
