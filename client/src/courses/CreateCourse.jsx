import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  margin-top: 3rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1.2rem;
  border: none;
  border-bottom: 2px solid black;
  margin-bottom: 1rem;
  width: 400px;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  font-size: 1.2rem;
  border: none;
  border-bottom: 2px solid black;
  margin-bottom: 1rem;
  width: 400px;
  resize: none;
`;

const CreateCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDetails, setCourseDetails] = useState("");

  const handleCourseTitleChange = (event) => {
    setCourseTitle(event.target.value);
  };

  const handleCourseDetailsChange = (event) => {
    setCourseDetails(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Course title:", courseTitle);
    console.log("Course details:", courseDetails);
  };

  return (
    <Container>
      <Navbar />
      <Title>Create Course</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="title">Course Title:</Label>
        <Input
          id="title"
          type="text"
          value={courseTitle}
          onChange={handleCourseTitleChange}
        />
        <Label htmlFor="details">Course Details:</Label>
        <TextArea
          id="details"
          rows="5"
          value={courseDetails}
          onChange={handleCourseDetailsChange}
        />
        <Button version="success" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default CreateCourse;
