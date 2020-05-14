import React from 'react';
import Field from '../../components/form/Field';
import Select from '../../components/form/Select';
import Checkbox from '../../components/form/Checkbox';

function SlotAttribute({ attribute, onInput }) {
  const { id, title, type, required } = attribute;
  const selectOptions = [
    {
      label: 'STRING',
      value: 'STRING',
    },
    {
      label: 'NUMBER',
      value: 'NUMBER',
    },
    {
      label: 'DATE',
      value: 'DATE',
    },
  ];
  return (
    <div>
      <Field
        type="text"
        name="title"
        placeholder="Attribute title"
        value={title}
        onChange={() => onInput(id)}
      >
        Attribute title
      </Field>
      <div>
        Attribute type
        <Select options={selectOptions} onChange={() => onInput(id)} value={type} name="type" />
      </div>
      <Checkbox
        onChange={() => onInput(id)}
        name="required"
        value={required}
        placeholder="Required"
      >
        Required
      </Checkbox>
    </div>
  );
}

export default SlotAttribute;
