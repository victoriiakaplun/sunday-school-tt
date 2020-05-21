import React, { useState } from 'react';
import classNames from 'classnames';
import timeColumnStyles from '../TimetableInfo.scss';
import EventCreationModal from '../modal/EventCreationModal';
import EventShowModal from '../modal/EventShowModal';
import EventConfirmModal from '../modal/EventConfirmModal';

function SlotCell({ slot, orders }) {
  const [isCreationModalActive, setCreationModalActive] = useState(false);

  const onClick = () => {
    setCreationModalActive(true);
  };

  const confirmedOrder = orders.find(order => order.status === 'CONFIRMED');
  const createdOrders = orders.filter(order => order.status === 'CREATED');
  let orderClassName;
  let cellContent;
  let cellModal;
  if (orders.length === 0) {
    orderClassName = timeColumnStyles.noOrders;
    cellContent = null;
    cellModal = (
      <EventCreationModal
        slot={slot}
        show={isCreationModalActive}
        onClose={() => setCreationModalActive(false)}
      />
    );
  } else if (confirmedOrder) {
    orderClassName = timeColumnStyles.confirmedOrder;
    const attributeValues = confirmedOrder.AttributeValue.map(attr => <span>{attr.value}</span>);
    cellContent = (
      <>
        <b>{confirmedOrder.User.name}</b>
        {confirmedOrder.AttributeValue[0].value}
      </>
    );
    cellModal = (
      <EventShowModal
        slot={slot}
        order={confirmedOrder}
        show={isCreationModalActive}
        onClose={() => setCreationModalActive(false)}
      />
    );
  } else {
    orderClassName = timeColumnStyles.createdOrder;
    cellModal = <EventConfirmModal />;
    if (createdOrders.length === 1) {
      cellContent = (
        <>
          <b>{createdOrders[0].User.name}</b>
          <span>{createdOrders[0].AttributeValue[0].value}</span>
        </>
      );
    } else {
      cellContent = (
        <>
          <b>Awaiting approval</b>
          <span>{`${createdOrders.length} orders requests`}</span>
        </>
      );
    }
  }

  return (
    <>
      <div
        aria-hidden="true"
        role="button"
        tabIndex="0"
        className={classNames(timeColumnStyles.cell, orderClassName)}
        onClick={onClick}
      >
        {cellContent}
      </div>
      {cellModal}
    </>
  );
}

export default SlotCell;
