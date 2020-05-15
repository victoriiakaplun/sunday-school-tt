import React from 'react';
import BaseModal from './BaseModal';
import ModalTitle from './ModalTitle';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import CenteredButtonBox from '../../components/button/CenteredButtonBox';
import Button from '../../components/button/Button';
import Field from '../../components/form/Field';

function EventCreationModal({ title, show, fieldOptions, onClose, onPlaceOrder, onInput }) {
  if (!show) {
    return null;
  }
  return (
    <BaseModal>
      <ModalTitle>{title}</ModalTitle>
      <ModalBody>
        {fieldOptions.map(option => {
          return (
            <Field
              type={option.type}
              name={option.name}
              placeholder={option.placeholder}
              value={option.value}
              onChange={onInput}
            >
              {option.name}
            </Field>
          );
        })}
        * - required attribute
      </ModalBody>
      <ModalFooter>
        <CenteredButtonBox>
          <Button type="is-success" onClick={onPlaceOrder} />
          <Button type="is-light" onClick={onClose} />
        </CenteredButtonBox>
      </ModalFooter>
    </BaseModal>
  );
}

export default EventCreationModal;
