import React from 'react';
import { Link } from 'react-router-dom';
import CardBody from '../../components/card/CardBody';
import CardHeader from '../../components/card/cardHeader/CardHeader';
import Card from '../../components/card/Card';

function TimetableCard({ id, title, body }) {
  return (
    <Card>
      <Link to={`/timetables/${id}`}>
        <CardHeader>{title}</CardHeader>
      </Link>
      <CardBody body={body} />
    </Card>
  );
}

export default TimetableCard;
