import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Columns from '../../components/columns/Columns';
import Column from '../../components/columns/Column';
import TimetableSettings from './TimetableSettings';
import SlotSettings from './SlotSettings';
import CenteredButtonBox from '../../components/button/CenteredButtonBox';
import Button from '../../components/button/Button';
import Subheader from '../../components/subheader/Subheader';
import Form from '../../components/form/Form';
import SlotAttribute from './SlotAttribute';
import { createTimetable } from '../../store/actions/timetable/createTimetableActions';

function TimetableCreation({ create }) {
  const [creationTimetableData, setCreationTimetableData] = useState({
    title: '',
    start: '',
    end: '',
    slot_size: 'HOUR',
  });
  const [creationAttributesData, setCreationAttributesData] = useState([
    {
      id: uuid(),
      title: '',
      type: 'STRING',
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
    creationAttributesData.find(item => item.id === id)[event.target.name] = event.target.value;
    setCreationAttributesData([...creationAttributesData]);
  };

  const onAttributeRequiredChange = (event, id) => {
    creationAttributesData.find(item => item.id === id).required = event.target.checked;
    setCreationAttributesData([...creationAttributesData]);
  };

  const onSave = () => {
    const body = {
      ...creationTimetableData,
      attributes: creationAttributesData.map(attr => ({ ...attr, id: undefined })),
    };
    create(body);
  };

  const onAddAttribute = () => {
    setCreationAttributesData([
      ...creationAttributesData,
      { id: uuid(), title: '', type: 'STRING', required: false },
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
              return (
                <SlotAttribute
                  key={a.id}
                  attribute={a}
                  onInput={onAttributeChange}
                  onChecked={onAttributeRequiredChange}
                />
              );
            })}
            <Button type="is-light" onClick={onAddAttribute}>
              + Add attribute
            </Button>
            <CenteredButtonBox>
              <div className="buttons">
                <Button onClick={onSave}>Save</Button>
                <Link to="/timetables">
                  <Button type="is-light">Cancel</Button>
                </Link>
              </div>
            </CenteredButtonBox>
          </Form>
        </Column>
      </Columns>
    </div>
  );
}

const mapStateToProps = state => ({
  error: state.timetableCreation.error,
  timetable: state.timetableCreation.timetable,
  loading: state.timetableCreation.loading,
});

const mapDispatchToProps = {
  create: createTimetable,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimetableCreation);
