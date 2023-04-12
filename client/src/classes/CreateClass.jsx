import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import {
  FlexCol,
  FlexRow,
  Form,
  Input,
  Label,
  TextArea,
} from '../components/Utils';
import WeekdayTimePicker from '../components/WeekdayTimePicker';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 24px;
`;

const FullDiv = styled.div`
  width: 100%;
`;

const CreateClass = (props) => {
  const [teacher, setTeacher] = useState('');
  const [description, setDescription] = useState('');
  const [schedules, setSchedules] = useState([]);
  const params = useParams();
  const { courseId } = params;
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      teacher,
      description,
      course_id: courseId,
      schedules,
    };
    const uri = `/api/v1/class`;

    axios
      .post(uri, data)
      .then((res) => {
        toast({
          title: 'Class Created',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: err.response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });

    props.hideModal();
  };

  return (
    <Container>
      <Title>Create Class</Title>
      <Form onSubmit={handleSubmit}>
        <FullDiv>
          <FlexCol>
            <Label>Teacher:</Label>
            <Input
              id="teacher"
              type="text"
              value={teacher}
              placeholder="Artificial Intelligence"
              onChange={(e) => setTeacher(e.target.value)}
              required
            />
          </FlexCol>
        </FullDiv>
        <FlexCol>
          <Label htmlFor="details">Course Details:</Label>
          <TextArea
            id="description"
            placeholder="Details"
            required
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FlexCol>
        <FlexCol>
          <Label>Add Schedule:</Label>
          <WeekdayTimePicker
            schedules={schedules}
            setSchedules={setSchedules}
          />
        </FlexCol>
        <ButtonContainer>
          <Button version="danger" onClick={() => props.hideModal()}>
            Cancel
          </Button>
          <Button version="success" type="submit">
            Create
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default CreateClass;
