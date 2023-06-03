import React, { useState } from "react";
import useStore from "./useStore";
import styled from "styled-components";
import TopBar from "../home/topbar/SideBar";
import Modal from "./Modal";
import useProductPurchase from "../../../api/product/useProducrPurchase";

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
  margin-top: 20px;
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

const SaveImage = styled.img`
  width: 30px;
  height: 30px;
  outline: none;
  margin-left: 22px;
  z-index: 9999;
  top: 35px;
  position: absolute;
  right: 5%;
  cursor: pointer;
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
const Input = styled.input`
  width: 200px;
  height: 30px;
  background-color: #ffffff;
  margin-right: 20px;
  color: black;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  position: absolute;
  top: 30px;
  right: 10%;
`;

type Props = {
  onClick: () => void;
};
interface ProductPurchase {
  name: string;
  products: string[];
}
type CartItem = {
  id: string;
  name: string;
  price: number;
  imageLink: string;
};

const RemoveFromCartButton: React.FC<Props> = ({ onClick }) => {
  return <ProductButton onClick={onClick}>Убрать</ProductButton>;
};

const Basket: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useStore();
  const [listName, setListName] = useState("");

  const total = cartItems.reduce((acc, curr) => acc + curr.price, 0);

  const  productPurchaseMutate  = useProductPurchase();

  const handleImageClick = () => {
    const productIds: string[] = cartItems.map((item: CartItem) => item.id);
    const productPurchases: ProductPurchase = {
      name: listName,
      products: productIds,
    };
    console.log(productPurchases);
    productPurchaseMutate.mutateAsync(productPurchases).then(() => {
      clearCart();
      window.location.reload();
    });

  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  };

  return (
    <>
      <TopBar />

      <CartTableContainer>
        <ProductsGrid>
          {cartItems.map((product) => {
            return (
              <ProductCard key={product.id}>
                <ProductImage src={product.imageLink} alt={product.name} />
                <ProductName>{product.name}</ProductName>
                <ProductCountInputContainer></ProductCountInputContainer>
                <RemoveFromCartButton
                  onClick={() => removeFromCart(product.id)}
                />
              </ProductCard>
            );
          })}
        </ProductsGrid>
      </CartTableContainer>
      <Input
        type="text"
        value={listName}
        onChange={(e) => handleInputChange(e)}
        placeholder="Введите название списка"
      />
      <SaveImage src="save.png" alt="lists" onClick={handleImageClick} />
    </>
  );
};

export default Basket;
