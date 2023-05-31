import { useQuery } from "react-query";

import { getProductList } from "../userApi";

const useProductList = (productListId: string) => {
  return useQuery(productListId, () => getProductList(productListId));
};

export default useProductList;
