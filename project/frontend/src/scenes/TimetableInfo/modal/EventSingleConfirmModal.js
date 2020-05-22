import React from 'react';
import { connect } from 'react-redux';
import BaseModal from '../../../components/modal/BaseModal';
import ModalTitle from '../../../components/modal/ModalTitle';
import ModalBody from '../../../components/modal/ModalBody';
import ModalFooter from '../../../components/modal/ModalFooter';
import CenteredButtonBox from '../../../components/button/CenteredButtonBox';
import Button from '../../../components/button/Button';
import { ordersError, update } from '../../../store/actions/order/allOrdersActions';
import EventConfirmModalBody from './EventConfirmModalBody';

const moment = require('moment');

function EventSingleConfirmModal({ slot, order, show, onClose, updateOrder }) {
  if (!show) {
    return null;
  }

  const slotDate = moment(slot).format('LL');
  const slotStartTime = moment(slot.start).format('HH:mm');
  const slotEndTime = moment(slot.end).format('HH:mm');

  const title = `${slotDate} ${slotStartTime} - ${slotEndTime}`;

  const onOrderUpdate = status => {
    updateOrder(status, order.id);
  };

  return (
    <BaseModal onClose={onClose}>
      <ModalTitle>{title}</ModalTitle>
      <ModalBody>
        <EventConfirmModalBody order={order} />
      </ModalBody>
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

export default connect(null, mapDispatchToProps)(EventSingleConfirmModal);
