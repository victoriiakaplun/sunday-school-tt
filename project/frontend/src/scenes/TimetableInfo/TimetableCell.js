import React, { useState } from 'react';
import classNames from 'classnames';
import CardHeader from '../../components/card/CardHeader';
import CardBody from '../../components/card/CardBody';
import timeColumnStyles from './TimesColumn.scss';
import EventCreationModal from './EventCreationModal';

function TimetableCell({ attributes }) {
  const [isCreationModalActive, setCreationModalActive] = useState(false);

  const onClick = () => {
    setCreationModalActive(true);
  };

  const title = 'Meeting';
  const body = { name: 'Mr. Cat' };
  return (
    <>
      <div
        aria-hidden="true"
        role="button"
        tabIndex="0"
        className={classNames(timeColumnStyles.cell)}
        onClick={onClick}
      >
        <b>{title}</b>
        <span>{body.name}</span>
      </div>
      <EventCreationModal
        attributes={attributes}
        show={isCreationModalActive}
        title={title}
        onClose={() => setCreationModalActive(false)}
      />
    </>
  );
}

export default TimetableCell;
