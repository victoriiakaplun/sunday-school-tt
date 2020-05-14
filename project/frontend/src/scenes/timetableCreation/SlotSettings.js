import React from 'react';
import Select from '../../components/form/Select';

function SlotSettings({ onInput, slotSize }) {
  const options = [
    { label: 'HOUR', value: 'HOUR' },
    { label: 'DAY', value: 'DAY' },
  ];
  return (
    <div>
      Slot size
      <Select options={options} value={slotSize} name="slot_size" onChange={onInput} />
    </div>
  );
}

export default SlotSettings;
