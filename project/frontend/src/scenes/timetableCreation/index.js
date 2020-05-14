import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Header from '../../components/header/Header';
import Columns from '../../components/Columns';
import Column from '../../components/Column';
import TimetableSettings from './TimetableSettings';
import SlotSettings from './SlotSettings';
import CenteredButtonBox from '../../components/button/CenteredButtonBox';
import Button from '../../components/button/Button';
import Subheader from '../../components/header/Subheader';
import Form from '../../components/form/Form';
import SlotAttribute from './SlotAttribute';

function TimetableCreation() {
  const [creationTimetableData, setCreationTimetableData] = useState({
    title: '',
    start: '',
    end: '',
    slot_size: '',
  });
  const [creationAttributesData, setCreationAttributesData] = useState([
    {
      id: uuid(),
      title: '',
      type: '',
      required: false,
    },
  ]);

  const onTimetableChange = event => {
    setCreationTimetableData({
      ...creationTimetableData,
      [event.target.name]: event.target.value,
    });
  };

  const onAttributeChange = (event, id) => {
    const newAttributeValues = {
      ...creationAttributesData[id],
      [event.target.name]: event.target.value,
    };
    const newAttributesData = [
      creationAttributesData.slice(0, id - 1),
      newAttributeValues,
      creationAttributesData.slice(id + 1, creationAttributesData.length - 1),
    ];
    setCreationAttributesData([newAttributesData]);
  };

  const onSave = () => {
    console.log(creationTimetableData);
    console.log(creationAttributesData);
  };

  const onAddAttribute = () => {
    setCreationAttributesData([
      ...creationAttributesData,
      { id: uuid(), title: '', type: '', required: false },
    ]);
  };

  return (
    <div>
      <Header>Create timetable</Header>
      <Columns>
        <Column>
          <Form>
            <Subheader>Timetable settings</Subheader>
            <TimetableSettings
              title={creationTimetableData.title}
              startRange={creationTimetableData.startRange}
              endRange={creationTimetableData.endRange}
              onInput={onTimetableChange}
            />
            <Subheader>Slot settings</Subheader>
            <SlotSettings slotSize={creationTimetableData.slot_size} onInput={onTimetableChange} />
            <Subheader>Slot attributes</Subheader>
            {creationAttributesData.map(a => {
              return <SlotAttribute key={uuid()} attribute={a} onInput={onAttributeChange} />;
            })}
            <Button type="is-light" onClick={onAddAttribute}>
              + Add attribute
            </Button>
            <CenteredButtonBox>
              <div className="buttons">
                <Button onClick={onSave}>Save</Button>
                <Button type="is-light">Cancel</Button>
              </div>
            </CenteredButtonBox>
          </Form>
        </Column>
      </Columns>
    </div>
  );
}

export default TimetableCreation;
