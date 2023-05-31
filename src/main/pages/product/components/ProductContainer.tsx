import styled from "styled-components";
import React, { useContext, useRef, useState } from "react";
import useProducts from "../../../../api/product/useProducts";
import { useLocation } from "react-router-dom";
import userStore from "../../basket/useStore";
import useStore from "../../basket/useStore";
import ProductPrice from "./ProductPrice";


const ProductTableContainer = styled.div`
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
  color:black ;
`;

const ProductCountInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductButton = styled.button`
  cursor: pointer;
  text-align: center;
  background-color: #e5e5e5;
  color: #333333;
  width: 100%;
  height: 40px;
  border: none;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d4d4d4;
  }
`;


const ProductContainer = () => {
  const location = useLocation();

  const categoryName = decodeURI(location.pathname).substring(1);
  console.log({ categoryName });

  const { data } = useProducts(categoryName);
  console.log(data);
  const [counts, setCounts] = useState(data ? Array(data.length).fill(0) : []);
  const { addToCart } = useStore();
  if (!data) {
    return null;
  }
  return (
    <ProductTableContainer>
      <ProductsGrid>
        {data.map((product, index) => {
          const handleButtonClick = () => {
            console.log("Количество добавленных продуктов: ", counts[index]);
            addToCart(
              {
                id: product.id,
                name: product.name,
                price: product.price,
                imageLink: product.imageLink,
              },
            );

            setCounts((prevCounts) => {
              const newCounts = [...prevCounts];
              newCounts[index] = 0;
              return newCounts;
            });
          };

          return (
            <ProductCard key={product.id}>
              <ProductImage src={product.imageLink} alt={product.name} />
              <ProductName>{product.name}</ProductName>
              <ProductPrice price ={product.price} />
              <ProductCountInputContainer>
                {/* <ProductCountInput
                  type="number"
                  min={0}
                  max={product.count}
                  value={counts[index]}
                  onChange={handleCountChange}
                /> */}
              </ProductCountInputContainer>
              <ProductButton onClick={handleButtonClick}>
                Добавить в список
              </ProductButton>
            </ProductCard>
          );
        })}
      </ProductsGrid>
    </ProductTableContainer>
  );
};

export default ProductContainer;
