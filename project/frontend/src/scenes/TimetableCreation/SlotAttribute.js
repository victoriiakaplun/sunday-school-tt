import React from 'react';
import { v4 as uuid } from 'uuid';
import Field from '../../components/form/Field';
import Select from '../../components/form/Select';
import Checkbox from '../../components/form/Checkbox';

function SlotAttribute({ attribute, onInput, onChecked }) {
  const selectOptions = [
    {
      id: uuid(),
      label: 'STRING',
      value: 'STRING',
    },
    {
      id: uuid(),
      label: 'NUMBER',
      value: 'NUMBER',
    },
    {
      id: uuid(),
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
