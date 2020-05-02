import React, { useEffect, useState } from 'react';
import { getAllTimetables } from '../../service/TimetableAPI';
import Card from '../../components/card/Card';

function TimetablesList() {
  const [timetables, setTimetables] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllTimetables();
      setTimetables(result);
    };
    fetchData();
  }, []);

  // eslint-disable-next-line camelcase
  return timetables.map(({ id, title, slot_size, start_date, end_date }) => {
    return <Card key={id} title={title} body={{ slot_size, start_date, end_date }} />;
  });
}

export default TimetablesList;
