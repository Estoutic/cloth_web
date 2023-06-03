import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useProductCategories from "../../../../api/product/useProductCategories";
import useProductListNames from "../../../../api/product_list/useProductListNames";
import CloseButtonComponent from "../components/CloseButtonComponent";

const SideBarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 320px;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`;
const CategoriesList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-left: 0;
  padding-left: 0;
  flex-grow: 1;
  position: fixed;
  height: calc(100% - 60px);
  overflow-y: auto;

  &:first-of-type {
    margin-top: 20px;
    position: fixed;
  }

  &:not(:first-of-type) {
    margin-top: 500px;
    margin-left: 30px;
    position: absolute;
  }
`;

const CategoryLink = styled(Link)`
  margin-left: 10px;
  display: block;
  color: #000000be;
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.2s;
  flex: 1;

  &:hover {
    color: black;
  }
  &:first-of-type {
    margin-top: 20px;
  }

  &:not(:first-of-type) {
    margin-top: 0;
  }
`;

const CategoryTitle = styled.a`
  height: 20px;
  color: black;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.2s;
  flex: 1;

  &:hover {
    background-color: #ffffff;
  }
`;

const SubcategoryLink = styled(Link)`
  padding: 12px 24px;
  margin-top: 10px;
  color: #adadad;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.2s;
  flex: 1;

  &:hover {
    color: black;
  }
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  outline: none;
  margin-left: 22px;
  top: 100px;
  z-index: 9999;
  position: fixed;
  top: 100px;
`;

const LogoutImage = styled.img`
  width: 30px;
  height: 30px;
  outline: none;
  margin-left: 30px;
  z-index: 9999;
  top: 176px;
  position: fixed;
  left: -6px;
`;

const SideBar = () => {
  const { data } = useProductCategories();
  const { data: names } = useProductListNames();
  console.log(names);
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  const handleOnClick = () => {
    window.localStorage.setItem("userData", "");
  };
  const toggleSideBarVisibility = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  if (!data || !names) {
    return null;
  }

  return (
    <>
      <Link to="/lists">
        <ProfileImage src="/149347.png" alt="lists" />
      </Link>
      <Link to="/login">
        <LogoutImage src="/logout.svg" alt="lists" onClick={handleOnClick} />
      </Link>
      <CloseButtonComponent
        isOpen={isSideBarVisible}
        ariaLabel="Toggle sidebar"
        onClick={toggleSideBarVisibility}
      />
      <SideBarContainer style={{ display: isSideBarVisible ? "flex" : "none" }}>
        <CategoryTitle>Одежда</CategoryTitle>

        <CategoriesList>
          {data.map((category) => (
            <li key={category.id}>
              <CategoryLink to={`/${category.name}`}>
                {category.title}
              </CategoryLink>
            </li>
          ))}
        </CategoriesList>
        <CategoryTitle>Списки</CategoryTitle>
        <CategoriesList>
          {names.map((name) => (
            <li key={name.id}>
              <CategoryLink to={`/lists/${name.id}`}>{name.name}</CategoryLink>
            </li>
          ))}
        </CategoriesList>
      </SideBarContainer>
    </>
  );
};

export default SideBar;
