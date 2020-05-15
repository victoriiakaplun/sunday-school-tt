import React from 'react';
import Field from '../../components/form/Field';
import Select from '../../components/form/Select';
import Checkbox from '../../components/form/Checkbox';

function SlotAttribute({ attribute, onInput, onChecked }) {
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
        value={attribute.title}
        onChange={event => onInput(event, attribute.id)}
      >
        Attribute title
      </Field>
      <div>
        Attribute type
        <Select
          options={selectOptions}
          onChange={event => onInput(event, attribute.id)}
          name="type"
        />
      </div>
      <Checkbox
        onChange={event => onChecked(event, attribute.id)}
        name="required"
        value={attribute.required}
        placeholder="Required"
      >
        Required
      </Checkbox>
    </div>
  );
}

export default SlotAttribute;
