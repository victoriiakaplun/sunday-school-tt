import React from 'react';

function EventConfirmModalBody({ order }) {
  const orderedByValues = (
    <div key={order.id}>
      <b>Ordered by: </b>
      <span>{order.User.name}</span>
    </div>
  );

  const attrValues = order.AttributeValue.map(attr => (
    <div key={attr.id}>
      <b>{`${attr.Attribute.title}: `}</b>
      <span>{attr.value}</span>
    </div>
  ));

  return <>{[orderedByValues, ...attrValues]}</>;
}

export default EventConfirmModalBody;
