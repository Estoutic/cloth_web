import { useQuery } from "react-query";

import { getProductList } from "../userApi";

import producstList from "./keys";

const useProductList = (productListId: string) => {
  return useQuery(productListId, () => getProductList(productListId));
};

export default useProductList;
