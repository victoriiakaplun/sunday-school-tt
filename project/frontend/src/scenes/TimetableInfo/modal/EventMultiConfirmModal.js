import React, { useState } from 'react';
import { connect } from 'react-redux';
import { update } from '../../../store/actions/order/allOrdersActions';
import BaseModal from '../../../components/modal/BaseModal';
import ModalTitle from '../../../components/modal/ModalTitle';
import ModalBody from '../../../components/modal/ModalBody';
import ModalFooter from '../../../components/modal/ModalFooter';
import CenteredButtonBox from '../../../components/button/CenteredButtonBox';
import Button from '../../../components/button/Button';
import EventConfirmModalBody from './EventConfirmModalBody';
import Radio from '../../../components/form/Radio';

const moment = require('moment');

function EventMultiConfirmModal({ slot, orders, show, onClose, updateOrder }) {
  const [selectedOrderId, setSelectedOrderId] = useState();
  if (!show) {
    return null;
  }

  console.log(orders);

  const slotDate = moment(slot).format('LL');
  const slotStartTime = moment(slot.start).format('HH:mm');
  const slotEndTime = moment(slot.end).format('HH:mm');

  const title = `${slotDate} ${slotStartTime} - ${slotEndTime}`;

  const onRadioChange = event => {
    setSelectedOrderId(event.target.value);
  };

  const body = orders.map(order => {
    return (
      <div key={order.id}>
        <Radio key={order.id} value={order.id} name="order" onChange={onRadioChange}>
          <EventConfirmModalBody key={order.id} order={order} />
        </Radio>
      </div>
    );
  });

  const onOrderUpdate = status => {
    updateOrder(status, selectedOrderId);
  };

  return (
    <BaseModal onClose={onClose}>
      <ModalTitle>{title}</ModalTitle>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>
        <CenteredButtonBox>
          <Button onClick={() => onOrderUpdate({ status: 'CONFIRMED' })}>Confirm</Button>
          <Button type="is-danger" onClick={() => onOrderUpdate({ status: 'REJECTED' })}>
            Reject
          </Button>
          <Button type="is-light" onClick={onClose}>
            Cancel
          </Button>
        </CenteredButtonBox>
      </ModalFooter>
    </BaseModal>
  );
}

const mapDispatchToProps = {
  updateOrder: update,
};
export default connect(null, mapDispatchToProps)(EventMultiConfirmModal);
