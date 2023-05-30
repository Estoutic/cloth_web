import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useDeleteProductList from "../../../api/product_list/useDeleteProductList";
import styled from "styled-components";
import useProductList from "../../../api/product_list/useProductList";
import SideBar from "../home/topbar/SideBar";

const SideBarContainer = styled.div`
  position: fixed;
  top: 0;
  margin-left: 80%;
  z-index: 999;
  overflow-x: hidden;
  padding-top: 30px;
  display: flex;
  flex-direction: row;
`;

const Tittle = styled.a`
  font-size: 28px;
  color: black;
  width: 100%;
  height: 100%;
  position: relative;
  display: inline-block;
  margin-right: 20px;
  margin-top: 10px;
`;

const CartTableContainer = styled.div`
  margin-top: 100px;
  width: 90%;
  margin-left: 5%;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
`;
const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: calc((100% - 30px) / 2);
  margin-left: 0;

  &:nth-child(3) {
    margin-left: 40%;
  }

  &:first-child {
    margin-left: 40%;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ProductName = styled.h3`
  margin-top: 20px;
  font-size: 1.25em;
  text-align: center;
  color: black;
`;

const ProductCountInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductButton = styled.button`
  cursor: pointer;
  text-align: center;
  align-items: center;
  color: #333333;
  font-size: 32px;
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 0;
  &:hover {
    border: 1px solid #ccc;
  }
`;

const ProductList = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const productListId = decodeURI(location.pathname).substring(7);
  const { data: productList } = useProductList(productListId);
  const deleteMutation = useDeleteProductList();

  console.log({ productList });

  const handleButtonClick = (e) => {
    e.preventDefault();
    deleteMutation.mutateAsync(productListId).then(() => {
      navigate("/lists");
    });
    console.log("Delete list");
  };

  return (
    <>
      <SideBar />
      <SideBarContainer>
        <Tittle>{productList?.name}</Tittle>
<ProductButton onClick={handleButtonClick}>X</ProductButton>
      </SideBarContainer>

      <CartTableContainer>
        <ProductsGrid>
          {productList?.products.map((product) => {
            return (
              <ProductCard key={product.id}>
                <ProductImage src={product.imageLink} alt={product.name} />
                <ProductName>{product.name}</ProductName>
                <ProductCountInputContainer></ProductCountInputContainer>
              </ProductCard>
            );
          })}
        </ProductsGrid>
      </CartTableContainer>
    </>
  );
};

export default ProductList;
