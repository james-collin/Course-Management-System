import React from "react";
import styled, { css } from "styled-components";
import Button from "./Button";
import {
  BrowserRouter as Router,
  Link,
  useHistory,
  useNavigate,
  redirect,
  BrowserRouter,
} from "react-router-dom";

const Nav = styled.div`
  background-color: #363535;
  color: white;
  position: sticky;
  width: 100%;
  height: 60px;
  display: flex;
`;

const LeftPart = styled.div`
  margin-left: 120px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

const RightPart = styled.div`
  margin-right: 120px;
  display: flex;
  gap: 16px;
  align-items: center;
  margin-left: auto;
`;

function Navbar() {
  return (
    <Nav>
      <LeftPart>
        <Button type={"primary"} onClick={"/"}>
          Courses
        </Button>
      </LeftPart>
      <RightPart>
        <Button type={"danger"}>Logout</Button>
      </RightPart>
    </Nav>
  );
}

export default Navbar;
