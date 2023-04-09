import React from "react";
import styled from "styled-components";

const ButtonPrimary = styled.div`
  background-color: #c9c9c9;
  cursor: pointer;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 12px;
  text-decoration: none;
`;

const ButtonDanger = styled(ButtonPrimary)`
  background-color: #ed5555;
  color: white;
`;

const ButtonSuccess = styled(ButtonPrimary)`
  background-color: #55eda9;
`;

const ButtonSecondary = styled(ButtonPrimary)`
  background-color: #55b5ed;
`;

function Button(props) {
  return (
    <>
      {props.version === "primary" ? (
        <ButtonPrimary>{props.children}</ButtonPrimary>
      ) : props.version === "danger" ? (
        <ButtonDanger>{props.children}</ButtonDanger>
      ) : props.version === "success" ? (
        <ButtonSuccess>{props.children}</ButtonSuccess>
      ) : props.version === "secondary" ? (
        <ButtonSecondary>{props.children}</ButtonSecondary>
      ) : (
        <ButtonPrimary>{props.children}</ButtonPrimary>
      )}
    </>
  );
}

export default Button;
