import React from 'react';
import Field from '../../components/form/Field';

function TimetableSettings({ title, startRange, endRange, onInput }) {
  return (
    <div>
      <Field type="text" name="title" placeholder="Timetable name" value={title} onChange={onInput}>
        Timetable name
      </Field>
      <Field
        type="date"
        name="start"
        placeholder="Start range"
        value={startRange}
        onChange={onInput}
      >
        Start range
      </Field>
      <Field type="date" name="end" placeholder="End range" value={endRange} onChange={onInput}>
        End range
      </Field>
    </div>
  );
}

export default TimetableSettings;
