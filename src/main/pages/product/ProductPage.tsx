import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ProductContainer from "./components/ProductContainer";
import SideBar from "../home/topbar/SideBar";

const ProductPage = () => {
  return (
    <>
      <SideBar />
      <ProductContainer />
    </>
  );
};

export default ProductPage;
