import axios, { AxiosResponse } from "axios";

interface AuthFormData {
  firstName?: string;
  surName?: string;
  lastName?: string;
  bonus?: number;
  phone: string;
  password: string;
}

interface CategoryDTO {
  id: string;
  name: string;
  title: string;
}
interface Product {
  id: string;
  name: string;
  imageLink: string;
  price: number;
  count: number;
  categoryId: string;
}
interface ProductListNames {
  id: number;
  name: string;
}
interface ProductDto {
  name: string;
  products: string[];
}
interface ProductListDto {
  name: string;
  products: ProductDto[];
}
export async function purchase(purchaseData: ProductDto): Promise<void> {
  console.log(purchaseData);
  try {
    const response: AxiosResponse<AuthFormData> = await axios.post(
      "http://0.0.0.0:8080/productList",
      purchaseData,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.token);
  } catch (error: any) {
    console.error(error);
  }
}
export async function deleteProductList(id: string): Promise<void> {
  try {
    const response: AxiosResponse<AuthFormData> = await axios.delete(
      `http://0.0.0.0:8080/productList/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    console.log(response.data.token);
  } catch (error: any) {
    console.error(error);
  }
}


export async function loginUser(
  phone: string,
  password: string
): Promise<number> {
  try {
    const body = { phone, password };
    const response: AxiosResponse<AuthFormData> = await axios.post(
      "http://0.0.0.0:8080/login",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setAuthHeader(response.data.token);
    console.log(response.data.token);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return -1;
  }
}

export async function registerUser(userData: AuthFormData): Promise<number> {
  console.log(userData);
  try {
    const response: AxiosResponse<AuthFormData> = await axios.post(
      "http://0.0.0.0:8080/register",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setAuthHeader(response.data.token);
    console.log(response.data.token);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return -1;
  }
}

export async function getCategories(): Promise<CategoryDTO[]> {
  try {
    const response: AxiosResponse<CategoryDTO[]> = await axios.get<
      CategoryDTO[]
    >("http://0.0.0.0:8080/category/all", {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProducts(categoryName: string): Promise<Product[]> {
  try {
    const response: AxiosResponse<Product[]> = await axios.get<Product[]>(
      `http://0.0.0.0:8080/product/category/${categoryName}`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getProductListsNames(): Promise<ProductListNames[]> {
  try {
    const response: AxiosResponse<ProductListNames[]> = await axios.get<
      ProductListNames[]
    >(`http://0.0.0.0:8080/productList/names`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getProductList(
  productListId: string
): Promise<ProductDto> {
  try {
    const response: AxiosResponse<ProductDto> = await axios.get<ProductDto>(
      `http://0.0.0.0:8080/productList/${productListId}`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

export const setAuthHeader = (token) => {
  window.localStorage.setItem("auth_token", token);
};
