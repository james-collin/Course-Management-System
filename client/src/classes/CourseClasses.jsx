import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Title = styled.div`
  font-size: xx-large;
  text-align: center;
  margin: 40px;
`;

const ClassName = styled.div`
  cursor: pointer;
  text-decoration: underline;
`;

function CourseClasses() {
  const { courseId } = useParams();
  const [classes, setClasses] = useState();
  const navigate = useNavigate();
  const demoColumns = ['Teacher', 'Total students', 'Ongoing'];
  const columnArea = {
    Teacher: '50%',
    'Total students': '25%',
    Ongoing: '25%',
  };

  const fetchClasses = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const uri = `/api/v1/course/${courseId}/class`;
    axios
      .get(uri, config)
      .then((res) => {
        setClasses(res.data.result);
        const response = res.data.result;
        const data = [];
        response.forEach((resp) => {
          data.push({
            class_id: resp.class_id,
            Teacher: (
              <ClassName
                onClick={() => navigate(`/class/details/${resp.class_id}`)}
              >
                {resp.teacher}
              </ClassName>
            ),
            course_id: resp.course_id,
            Ongoing: resp.isGoingOn ? 'Yes' : 'No',
            'Total students': resp.approved_students.length,
          });
        });
        setClasses(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <>
      <Title>Artificial Intelligence {courseId}</Title>
      <Table column={demoColumns} data={classes} area={columnArea} />
    </>
  );
}

export default CourseClasses;
