import { useQuery } from "react-query";

import { getCategories } from "../userApi";

import productKey from "./keys";

const useProductCategories = () => {

  return useQuery([productKey.product], () => getCategories());
};

export default useProductCategories;
