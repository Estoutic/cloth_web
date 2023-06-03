import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { deleteProductList } from "../userApi";

const useDeleteProductList = (): UseMutationResult<void, AxiosError<unknown, any>, string> => {
    const queryClient = useQueryClient();
        
    return useMutation((id: string) => deleteProductList(id), {
      onSuccess: async () => {
        queryClient.invalidateQueries("productLists");
      },
    });
  };
  
  export default useDeleteProductList;