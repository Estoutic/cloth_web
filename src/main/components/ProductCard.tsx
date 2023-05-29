
// const ProductCard = styled.div`
//   margin-top: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   width: calc((100% - 30px) / 2);
//   margin-left: 0;

//   &:nth-child(3) {
//     margin-left: 40%;
//   }

//   &:first-child {
//     margin-left: 40%;
//   }
// `;

// const ProductImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   object-position: center;
// `;

// const ProductName = styled.h3`
//   margin-top: 20px;
//   font-size: 1.25em;
//   text-align: center;
//   color: black;
// `;

// const ProductCountInputContainer = styled.div`
//   display: flex;
//   align-items: center;
// `;


// const ProductCart = () =>{
//     <ProductCard key={product.id}>
//     <ProductImage src={product.imageLink} alt={product.name} />
//     <ProductName>{product.name}</ProductName>
//     <ProductCountInputContainer></ProductCountInputContainer>
//     <RemoveFromCartButton
//       onClick={() => removeFromCart(product.id)}
//     />
//   </ProductCard>
// }

// export default ProductCart;