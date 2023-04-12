import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Modal from '../components/Modal';
import CreateCourse from './CreateCourse';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseContainer = styled.div`
  display: flex;
  margin: 60px;
  flex-wrap: wrap;
`;

const CourseCard = styled.div`
  width: 360px;
  height: 200px;
  border-radius: 10px;
  margin: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-flow: column;
`;

const CourseHeading = styled.div`
  height: 60px;
  font-size: xx-large;
  font-weight: 600;
  overflow: hidden;
`;

const CourseButtons = styled.div`
  display: flex;
  padding-left: 16px;
  gap: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState();
  const navigate = useNavigate();

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchCourses = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const uri = '/api/v1/course/';
    axios
      .get(uri, config)
      .then((res) => {
        setCourses(res.data.result);
        console.log(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <ButtonContainer>
        <Button version="success" onClick={() => handleModal()}>
          Create Course
        </Button>
      </ButtonContainer>
      {isModalOpen && (
        <Modal>
          <CreateCourse
            onComplete={() => fetchCourses()}
            hideModal={handleModal}
          />
        </Modal>
      )}
      <CourseContainer>
        {courses &&
          courses.map((course) => (
            <CourseCard key={course.course_id}>
              <Flex>
                <CourseHeading>{course.title}</CourseHeading>
                <div>Credit: {course.credit}</div>
                <div>Availability: {course.isActivated ? 'Yes' : 'No'}</div>
              </Flex>
              <CourseButtons>
                <Button
                  version={'secondary'}
                  onClick={() =>
                    navigate(`/course/details/${course.course_id}`)
                  }
                >
                  Details
                </Button>
              </CourseButtons>
            </CourseCard>
          ))}
      </CourseContainer>
    </>
  );
}

export default Courses;
