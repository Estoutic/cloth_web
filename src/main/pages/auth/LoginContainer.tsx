import React, { useState } from "react";
import AuthForm from "../auth/components/AuthForm";
import AuthFormContainer from "../auth/components/AuthFormContainer";
import InfoContainer from "../auth/components/InfoContainer";
import styled, { css } from "styled-components";
import useUserAuth from "../../../api/user/useUserAuth";

interface LoginContainerProps {}

interface AuthFormData {
  firstName?: string;
  surName?: string;
  lastName?: string;
  bonus?: number;
  phone: string;
  password: string;
}


const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #f1f1f1;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 520px;
  margin: 0 auto;
`;

const LoginContainer: React.FC<LoginContainerProps> = ({}) => {
  
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleFormToggle = () => {
    setIsLoginFormOpen((prevIsLoginFormOpen) => !prevIsLoginFormOpen);
  };

  const handleAuthSubmit = (formData: AuthFormData) => {
    console.log(formData);

  };

  const { data: user, isLoading, isError } = useUserAuth(phone, password);
  
const handleLoginSubmit = (formData: AuthFormData) => {
    setPhone(formData.phone);
    setPassword(formData.password);
    console.log(user);
  };

  return (
    <Container>
      {isLoginFormOpen ? (
        <AuthFormContainer isLoginFormOpen={isLoginFormOpen}>
          <AuthForm
            type="login"
            onSubmit={handleLoginSubmit}
            isLoginFormOpen={isLoginFormOpen}
          />
        </AuthFormContainer>
      ) : (
        <AuthFormContainer isLoginFormOpen={isLoginFormOpen}>
          <AuthForm
            type="register"
            onSubmit={handleAuthSubmit}
            formPosition="left"
            isLoginFormOpen={isLoginFormOpen}
          />
        </AuthFormContainer>
      )}
      <InfoContainer
        isLoginFormOpen={isLoginFormOpen}
        onButtonClick={handleFormToggle}
      />
    </Container>
  );
};

export default LoginContainer;
