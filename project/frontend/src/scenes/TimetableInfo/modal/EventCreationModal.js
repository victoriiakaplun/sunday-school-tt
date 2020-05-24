import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import BaseModal from '../../../components/modal/BaseModal';
import ModalTitle from '../../../components/modal/ModalTitle';
import ModalBody from '../../../components/modal/ModalBody';
import ModalFooter from '../../../components/modal/ModalFooter';
import CenteredButtonBox from '../../../components/button/CenteredButtonBox';
import Button from '../../../components/button/Button';
import Field from '../../../components/form/Field';
import { addNotification } from '../../../store/actions/notification/notificationActions';
import { createOrder } from '../../../store/actions/timetable/timetableOrdersActions';

const moment = require('moment');

function EventCreationModal({ timetable, slot, show, onClose, notify, create }) {
  const { Attribute } = timetable;
  const [creationData, setCreationData] = useState([]);

  useEffect(() => {
    setCreationData(
      Attribute.map(attr => ({
        id: attr.id,
        type: attr.type,
        name: attr.title,
        required: attr.required,
        value: '',
      })),
    );
  }, [Attribute]);

  const onChange = (event, attrId) => {
    creationData.find(item => item.id === attrId).value = event.target.value;
    setCreationData([...creationData]);
  };

  const isValidateFields = () => {
    let isValid = true;
    creationData.forEach(attr => {
      if (attr.required && !attr.value) {
        isValid = false;
      }
    });
    return isValid;
  };
  const onPlaceOrder = () => {
    if (!isValidateFields()) {
      notify({ type: 'danger', message: 'Required field is empty!' });
    } else {
      const attributeValues = creationData.map(attr => {
        return { attribute_id: attr.id, value: attr.value };
      });
      const body = {
        timetable_id: timetable.id,
        slot_id: slot.id,
        attributeValues,
      };
      create(body);
    }
  };

  if (!show) {
    return null;
  }

  const slotDate = moment(slot).format('LL');
  const slotStartTime = moment(slot.start).format('HH:mm');
  const slotEndTime = moment(slot.end).format('HH:mm');

  const title = slotDate.concat(' ', slotStartTime, ' - ', slotEndTime);

  return (
    <BaseModal onClose={onClose}>
      <ModalTitle>{title}</ModalTitle>
      <ModalBody>
        {creationData.map(attr => {
          return (
            <Field
              key={attr.id}
              type={attr.type}
              name={attr.name}
              placeholder={attr.name}
              value={attr.value}
              onChange={event => onChange(event, attr.id)}
            >
              {attr.name + (attr.required === true ? ' *' : '')}
            </Field>
          );
        })}
        * - required attribute
      </ModalBody>
      <ModalFooter>
        <CenteredButtonBox>
          <Button type="is-success" onClick={onPlaceOrder}>
            Place order
          </Button>
          <Button type="is-light" onClick={onClose}>
            Close
          </Button>
        </CenteredButtonBox>
      </ModalFooter>
    </BaseModal>
  );
}

const mapStateToProps = state => ({
  timetable: state.timetable.timetable,
});
const mapDispatchToProps = {
  notify: addNotification,
  create: createOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventCreationModal);
