import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';
import BaseModal from '../../components/modal/BaseModal';
import ModalTitle from '../../components/modal/ModalTitle';
import ModalBody from '../../components/modal/ModalBody';
import ModalFooter from '../../components/modal/ModalFooter';
import CenteredButtonBox from '../../components/button/CenteredButtonBox';
import Button from '../../components/button/Button';
import Field from '../../components/form/Field';

function EventCreationModal({ title, show, attributes, onClose }) {
  const [creationData, setCreationData] = useState([]);

  useEffect(() => {
    setCreationData(attributes.map(attr => ({ id: attr.id, value: '' })));
  }, [attributes]);

  const onChange = (event, id) => {
    const copy = Array.of(creationData);
    copy.find(item => item.id === id).value = event.target.value;
    setCreationData(copy);
  };

  const onPlaceOrder = () => {
    console.log('Data: ', creationData);
  };

  if (!show) {
    return null;
  }
  return (
    <BaseModal onClose={onClose}>
      <ModalTitle>{title}</ModalTitle>
      <ModalBody>
        {attributes.map(attribute => {
          const currentAttrValue = creationData.find(attr => attr.id === attribute.id);
          return (
            <Field
              key={attribute.id}
              type={attribute.type}
              name={attribute.title}
              placeholder={attribute.title}
              value={currentAttrValue.value}
              onChange={onChange}
            >
              {attribute.title}
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
  timetable: state.timetableCreation.timetable,
});

export default connect(mapStateToProps, null)(EventCreationModal);
