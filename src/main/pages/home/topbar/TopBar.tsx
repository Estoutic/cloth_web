import styled from "styled-components";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../../../ProductContext";

const TopBarContainer = styled.div`
  background-color: #393e46;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 100%;
  height: 60px;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;
const ProfileImage = styled.img`
  padding-top: 10px;
  width: 40px;
  height: 40px;
  position: fixed;
  color: white;
`;

const CategoryButton = styled.button`
  margin-left: 30px;
  background-color: transparent;
  color: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  margin-top: 10px;
  cursor: pointer;
  font-size: 16px;
  :hover {
    text-decoration: underline;
  }
`;

const TopBar = () => {
  const { categories } = useContext(ProductContext);
  console.log(categories);
  return (
    <TopBarContainer>
      <Link to="/account">
        <ProfileImage src="profile.svg " alt="profile" />
      </Link>
      {categories.map((category) => (
        <Link key={category.id} to={`/${category.customId} `} id={category.id}>
          <CategoryButton>{category.name}</CategoryButton>
        </Link>
      ))}
    </TopBarContainer>
  );
};

export default TopBar;
