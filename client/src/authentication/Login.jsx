import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { useLocation } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 400px;
`;

const Title = styled.div`
  margin-bottom: 80px;
  font-size: xx-large;
`;

function Login() {
  const location = useLocation();
  const { pathname } = location;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleemailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      console.log("email:", email);
      console.log("Password:", password);
      //   try {
      //     const config = {
      //       headers: {
      //         "Content-Type": "application/form-data",
      //         "X-Auth-Token": "local-shr-system-admin_auth_token",
      //         client_id: "18700",
      //       },
      //     };

      //     const formData = new FormData();
      //     formData.append("email", email);
      //     formData.append("password", password);

      //     const response = await axios.post(
      //       "",
      //       formData,
      //       config
      //     );

      //     console.log("Login successful");
      //     console.log(response);
      //   } catch (error) {
      //     console.error("Error logging in:", error);
      //   }
    } else {
      alert("Please fill in both email and password fields");
    }
  };

  return (
    <Container>
      <Title>School Management System</Title>
      <Form onSubmit={handleSubmit}>
        {pathname.includes("login") ? <h1>Login</h1> : <h1>Signup</h1>}
        <Input
          type="text"
          placeholder="email"
          value={email}
          onChange={handleemailChange}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button version="success" type="submit">
          {pathname.includes("login") ? <>Login</> : <>Signup</>}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
