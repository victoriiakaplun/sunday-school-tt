import React, { useState } from 'react';
import isEmpty from 'lodash/fp/isEmpty';
import classNames from 'classnames';
import { connect } from 'react-redux';
import timeColumnStyles from '../TimetableInfo.scss';
import EventCreationModal from '../modal/EventCreationModal';
import EventShowModal from '../modal/EventShowModal';
import EventSingleConfirmModal from '../modal/EventSingleConfirmModal';
import EventMultiConfirmModal from '../modal/EventMultiConfirmModal';

function SlotCell({ slot, orders, profileData }) {
  const [isCreationModalActive, setCreationModalActive] = useState(false);
  const [isShowModalActive, setShowModalActive] = useState(false);
  const [isSingleConfirmModalActive, setSingleConfirmModalActive] = useState(false);
  const [isMultiConfirmModalActive, setMultiConfirmModalActive] = useState(false);

  const onCreationModalClick = () => {
    setCreationModalActive(true);
  };

  const onShowModalClick = () => {
    setShowModalActive(true);
  };

  const onSingleConfirmModalClick = () => {
    setSingleConfirmModalActive(true);
  };

  const onMultiConfirmModalClick = () => {
    setMultiConfirmModalActive(true);
  };

  const confirmedOrder = orders.find(order => order.status === 'CONFIRMED');
  const createdOrders = orders.filter(order => order.status === 'CREATED');
  const rejectedOrders = orders.filter(order => order.status === 'REJECTED');
  const isAdmin = profileData && profileData.role === 'admin';
  let onClick = onCreationModalClick;
  let orderClassName = timeColumnStyles.noOrders;
  let cellContent = null;
  let cellModal = (
    <EventCreationModal
      slot={slot}
      show={isCreationModalActive}
      onClose={() => setCreationModalActive(false)}
    />
  );

  if ((isEmpty(orders) || rejectedOrders) && isAdmin) {
    onClick = null;
    cellModal = null;
  }

  if (confirmedOrder) {
    onClick = onShowModalClick;
    orderClassName = timeColumnStyles.confirmedOrder;
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
        show={isShowModalActive}
        onClose={() => setShowModalActive(false)}
      />
    );
  } else if (createdOrders.length === 1) {
    onClick = onCreationModalClick;
    orderClassName = timeColumnStyles.createdOrder;
    cellContent = (
      <>
        <b>{createdOrders[0].User.name}</b>
        <span>{createdOrders[0].AttributeValue[0].value}</span>
      </>
    );
    if (isAdmin) {
      onClick = onSingleConfirmModalClick;
      cellModal = (
        <EventSingleConfirmModal
          slot={slot}
          order={createdOrders[0]}
          show={isSingleConfirmModalActive}
          onClose={() => setSingleConfirmModalActive(false)}
        />
      );
    }
  } else if (createdOrders.length > 1) {
    onClick = onCreationModalClick;
    orderClassName = timeColumnStyles.createdOrder;
    cellContent = (
      <>
        <b>{`${createdOrders.length} orders requests`}</b>
      </>
    );
    if (isAdmin) {
      onClick = onMultiConfirmModalClick;
      cellModal = (
        <EventMultiConfirmModal
          slot={slot}
          orders={createdOrders}
          show={isMultiConfirmModalActive}
          onClose={() => setMultiConfirmModalActive(false)}
        />
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

const mapStateToProps = state => ({
  profileData: state.profile.profileData,
});

export default connect(mapStateToProps, null)(SlotCell);
