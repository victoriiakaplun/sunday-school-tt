import React from 'react';
import ModalTitle from './ModalTitle';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import CenteredButtonBox from '../../components/button/CenteredButtonBox';
import Button from '../../components/button/Button';
import BaseModal from './BaseModal';

function EventModal({ period, orderedBy, name, show, onClose }) {
  if (!show) {
    return null;
  }
  return (
    <BaseModal>
      <ModalTitle title={period} />
      <ModalBody>
        OrderedBy:
        {`${orderedBy}`}
        Name:
        {`${name}`}
      </ModalBody>
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
export default EventModal;
