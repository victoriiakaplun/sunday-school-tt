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

  return timetables.map(({ id, title, slotSize, startDate, endDate }) => {
    return <Card key={id} title={title} body={{ slotSize, startDate, endDate }} />;
  });
}

export default TimetablesList;
