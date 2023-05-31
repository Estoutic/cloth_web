import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { purchase } from "../userApi";

interface Params {
  name: string;
  products: string[]
}
const useProductPurchase = (): UseMutationResult<void, AxiosError<unknown, any>, Params> => {
    const queryClient = useQueryClient();
    return useMutation((data: Params) => purchase(data), {
      onSuccess:async () => {
        queryClient.invalidateQueries("productLists");
      },
    });
  };
  
  export default useProductPurchase;