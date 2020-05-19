import React, { useState } from 'react';
import classNames from 'classnames';
import timeColumnStyles from '../TimetableInfo.scss';
import EventCreationModal from '../modal/EventCreationModal';

function SlotCell({ slot }) {
  const [isCreationModalActive, setCreationModalActive] = useState(false);

  const onClick = () => {
    setCreationModalActive(true);
  };

  return (
    <>
      <div
        aria-hidden="true"
        role="button"
        tabIndex="0"
        className={classNames(timeColumnStyles.cell)}
        onClick={onClick}
      >
        <b>{slot.id}</b>
        <span>{slot.id}</span>
      </div>
      <EventCreationModal
        slot={slot}
        show={isCreationModalActive}
        onClose={() => setCreationModalActive(false)}
      />
    </>
  );
}

export default SlotCell;
