import React from 'react';
import { Link } from 'react-router-dom';
import CardBody from '../../components/card/CardBody';
import CardHeader from '../../components/card/CardHeader';

function TimetableCard({ id, title, body }) {
  return (
    <div className="card" style={{ margin: '20px' }}>
      <Link to={`/timetables/${id}`}>
        <CardHeader title={title} />
      </Link>
      <CardBody body={body} />
    </div>
  );
}

export default TimetableCard;
