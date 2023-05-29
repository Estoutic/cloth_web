import { useQuery } from "react-query";

import { getProductListsNames } from "../userApi";

import producstListKey from "./keys";

const useProducts = () => {
  return useQuery([producstListKey.productList], () => getProductListsNames());
};

export default useProducts;
