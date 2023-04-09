import React from "react";
import styled from "styled-components";
import Button from "../components/Button";

const CourseContainer = styled.div`
  display: flex;
  margin: 120px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const CourseCard = styled.div`
  width: 360px;
  height: 400px;
  border-radius: 10px;
  margin: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-flow: column;
`;

const CourseHeading = styled.div`
  height: 60px;
  font-size: x-large;
  margin: 8px;
  overflow: hidden;
`;

const CourseButtons = styled.div`
  display: flex;
  padding: 16px;
  gap: 16px;
  margin-top: auto;
`;

const CourseBody = styled.div`
  border-top: 1px solid;
  height: 260px;
  padding: 8px;
  overflow: hidden;
`;

function Courses() {
  return (
    <CourseContainer>
      <CourseCard>
        <CourseHeading>
          This is course headingThis is course headingThis is course heading
        </CourseHeading>
        <CourseBody>
          this is course details this is course details this is course details
          this is course details this is course details this is course details
          this is course details this is course details this is course details
          this is course details this is course details this is course details
          this is course details this is course detailsthis is course details
          this is course details this is course details this is course details
          this is course details this is course details this is course details
          this is course details this is course details this is course details
          this is course details this is course details this is course details
          this is course details this is course details this is course details
          this is course details this is course details this is course details
          this is course details this is course details this is course details
        </CourseBody>
        <CourseButtons>
          <Button version={"success"}>Enroll</Button>
          <Button version={"secondary"}>Enroll</Button>
        </CourseButtons>
      </CourseCard>
      <CourseCard></CourseCard>
      <CourseCard></CourseCard>
      <CourseCard></CourseCard>
      <CourseCard></CourseCard>
      <CourseCard></CourseCard>
      <CourseCard></CourseCard>
    </CourseContainer>
  );
}

export default Courses;
