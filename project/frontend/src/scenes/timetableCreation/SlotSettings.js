import React from 'react';
import { v4 as uuid } from 'uuid';
import Select from '../../components/form/Select';

function SlotSettings({ onInput, slotSize }) {
  const options = [
    { id: uuid(), label: 'HOUR', value: 'HOUR' },
    { id: uuid(), label: 'DAY', value: 'DAY' },
  ];
  return (
    <div>
      Slot size
      <Select options={options} value={slotSize} name="slot_size" onChange={onInput} />
    </div>
  );
}

export default SlotSettings;
