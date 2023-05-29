import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { deleteProductList } from "../userApi";

const useProductPurchase = (): UseMutationResult<void, AxiosError<unknown, any>, string> => {
    const queryClient = useQueryClient();
        
    return useMutation((id: string) => deleteProductList(id), {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  };
  
  export default useProductPurchase;