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

const CreateCourse = (props) => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDetails, setCourseDetails] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courseCredit, setCourseCredit] = useState('');
  const [coursePreRequisit, setCoursePreRequisit] = useState();
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      course_id: courseId,
      title: courseTitle,
      description: courseDetails,
      credit: courseCredit,
      prerequisites:
        coursePreRequisit?.split(',').map((item) => item.trim()) || [],
    };
    const uri = '/api/v1/course';

    axios
      .post(uri, data)
      .then((res) => {
        toast({
          title: 'Course Created',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        props.onComplete();
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
      <Title>Create Course</Title>
      <Form onSubmit={handleSubmit}>
        <FlexRow>
          <FlexCol>
            <Label>Title:</Label>
            <Input
              id="title"
              type="text"
              value={courseTitle}
              placeholder="Artificial Intelligence"
              onChange={(e) => setCourseTitle(e.target.value)}
              required
            />
          </FlexCol>
          <FlexCol>
            <Label>Course Id:</Label>
            <Input
              id="id"
              type="text"
              placeholder="SWE123"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            />
          </FlexCol>
        </FlexRow>
        <FlexRow>
          <FlexCol>
            <Label>Credit:</Label>
            <Input
              id="credit"
              placeholder="4.00"
              type="number"
              value={courseCredit}
              required
              onChange={(e) => setCourseCredit(e.target.value)}
            />
          </FlexCol>
          <FlexCol>
            <Label>Pre-requisit:</Label>
            <Input
              id="pre-requisit"
              type="text"
              placeholder="SWE123, CSE350"
              value={coursePreRequisit}
              onChange={(e) => setCoursePreRequisit(e.target.value)}
            />
          </FlexCol>
        </FlexRow>
        <Label htmlFor="details">Course Details:</Label>
        <TextArea
          id="details"
          placeholder="Details"
          required
          rows="3"
          value={courseDetails}
          onChange={(e) => setCourseDetails(e.target.value)}
        />
        <ButtonContainer>
          <Button
            id="cancel"
            version="danger"
            onClick={() => props.hideModal()}
          >
            Cancel
          </Button>
          <Button id="create" version="success" type="submit">
            Create
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default CreateCourse;
