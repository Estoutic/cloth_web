import React from "react"
import styled from "styled-components";

const ProductPriceContainer = styled.div`
  font-size: 1.125em;
  color: #484848;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ProductPrice = ({price}) => {
    if (typeof price !== "number") {
        
        console.error("Price must be a number");
        return null;
      }
    return <ProductPriceContainer>
          {new Intl.NumberFormat("ru", {
            style: "currency",
            currency: "RUB",
          }).format(price)}
        </ProductPriceContainer>
}

export default ProductPrice;