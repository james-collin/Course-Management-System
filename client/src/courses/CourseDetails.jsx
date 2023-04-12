import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from '../components/Modal';
import CreateClass from '../classes/CreateClass';

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

function CourseDetails() {
  const navigate = useNavigate();
  const [details, setDetails] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const id = params.courseId;

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const uri = `/api/v1/course/${id}`;
    axios
      .get(uri)
      .then((res) => {
        console.log(res);
        setDetails(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <Container>
        {isModalOpen && (
          <Modal>
            <CreateClass hideModal={handleModal} />
          </Modal>
        )}
        <Header>
          <Title>Course Title: {details?.title || ''}</Title>
          <div>Credit: {details?.credit || ''}</div>
          <div>Availability: {details?.isActivated ? 'Yes' : 'No'}</div>
        </Header>
        <Details>{details?.description || ''}</Details>
        <ClassButtons>
          <Button
            version={'secondary'}
            onClick={() => navigate(`/classes/${id}`, { replace: true })}
          >
            All classes
          </Button>
          <Button onClick={() => handleModal()} version={'success'}>
            Create Class
          </Button>
        </ClassButtons>
      </Container>
    </>
  );
}

export default CourseDetails;
