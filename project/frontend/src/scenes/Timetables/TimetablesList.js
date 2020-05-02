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

  return timetables.map(({ id, title, slotSize, start, end }) => {
    return <Card key={id} title={title} body={{ slotSize, start, end }} />;
  });
}

export default TimetablesList;
