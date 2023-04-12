import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  width: 70%;
  border-radius: 10px;
  margin: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-flow: column;
  margin: auto;
  margin-top: 40px;
  padding: 24px;
`;

const Title = styled.div`
  font-size: x-large;
  overflow: hidden;
`;

const ClassButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  margin-left: auto;
`;

const Details = styled.div`
  border-top: 1px solid;
  padding-top: 24px;
  overflow: hidden;
`;

const Header = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
`;

function ClassDetails() {
  const [details, setDetails] = useState();
  const params = useParams();
  const id = params.classId;
  useEffect(() => {
    const uri = `/api/v1/class/${id}`;
    axios
      .get(uri)
      .then((res) => {
        console.log(res);
        setDetails(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <>
      <Container>
        <Header>
          <Title>
            Course {details.course.title} - {details.course.course_id}
          </Title>
          <div>Teacher: {details.teacher}</div>
          <div>Total Students: {details.approved_students.length}</div>
          <div>Credit: {details.course.credit}</div>
          <div>Availability: {details.isGoingOn ? 'Yes' : 'No'}</div>
        </Header>
        <Details>{details.description} </Details>
        <ClassButtons>
          <Button version={'success'}>Enroll</Button>
          <Button version={'secondary'}>Enroll</Button>
        </ClassButtons>
      </Container>
    </>
  );
}

export default ClassDetails;
