import React from 'react';

import Columns from '../../components/columns/Columns';

function TimetableDetailsBox({ info }) {
  const { title, start, end, slotSize, Attribute } = info;

  const requiredAttributesNames = [];
  const otherAttributesNames = [];

  Attribute.forEach(a => {
    if (a.required) {
      requiredAttributesNames.push(a.title);
    } else {
      otherAttributesNames.push(a.title);
    }
  });

  return (
    <Columns>
      <div className="is-one-third">
        <div>
          <strong>Name: </strong>
          {title}
        </div>
        <div>
          <strong>Type: </strong>
          {slotSize}
        </div>
        <div>
          <strong>Period: </strong>
          {`${start} - ${end}`}
        </div>
      </div>
      <div className="is-one-third">
        <div>
          <strong>Required order attributes: </strong>
          {requiredAttributesNames.join(', ')}
        </div>
        <div>
          <strong>Order attributes: </strong>
          {otherAttributesNames.join(', ')}
        </div>
      </div>
    </Columns>
  );
}

export default TimetableDetailsBox;
