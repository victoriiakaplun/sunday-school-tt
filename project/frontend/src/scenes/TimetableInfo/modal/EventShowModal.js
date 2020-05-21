import React from 'react';
import { v4 as uuid } from 'uuid';
import ModalTitle from '../../../components/modal/ModalTitle';
import ModalBody from '../../../components/modal/ModalBody';
import ModalFooter from '../../../components/modal/ModalFooter';
import CenteredButtonBox from '../../../components/button/CenteredButtonBox';
import Button from '../../../components/button/Button';
import BaseModal from '../../../components/modal/BaseModal';

const moment = require('moment');

function EventShowModal({ slot, show, order, onClose }) {
  console.log(order);
  if (!show) {
    return null;
  }

  const slotDate = moment(slot).format('LL');
  const slotStartTime = moment(slot.start).format('HH:mm');
  const slotEndTime = moment(slot.end).format('HH:mm');

  const title = `${slotDate} ${slotStartTime} - ${slotEndTime}`;
  const userName = order.User.name;
  const orderedByValues = (
    <div>
      <b>Ordered by: </b>
      <span>{userName}</span>
    </div>
  );
  const attrValues = order.AttributeValue.map(attr => (
    <div key={uuid()}>
      <b>{`${attr.Attribute.title}: `}</b>
      <span>{attr.value}</span>
    </div>
  ));

  return (
    <BaseModal onClose={onClose}>
      <ModalTitle>{title}</ModalTitle>
      <ModalBody>{[orderedByValues, ...attrValues]}</ModalBody>
      <ModalFooter>
        <CenteredButtonBox>
          <Button type="is-light" onClick={onClose}>
            Ok
          </Button>
        </CenteredButtonBox>
      </ModalFooter>
    </BaseModal>
  );
}
export default EventShowModal;
