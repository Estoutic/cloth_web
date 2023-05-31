import axios, { AxiosResponse } from "axios";

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
interface ResponseProductDto{
  name: string;
  products: Product[];
}
interface UserData {
  firstName: string;
  surName: string;
  lastName: string;
  phone: string;
  password: string;
}

interface ResponseUserData {
  id: number;
  firstName: string;
  surName: string;
  lastName: string;
  bonus: number;
  phone: string;
  password: string;
  token: string;
}
export async function purchase(purchaseData: ProductDto): Promise<void> {
  console.log(purchaseData);
  try {
    await axios.post("http://0.0.0.0:3400/productList", purchaseData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error(error);
  }
}
export async function deleteProductList(id: string): Promise<void> {
  try {
    await axios.delete(`http://0.0.0.0:3400/productList/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
  } catch (error: any) {
    console.error(error);
  }
}

export async function loginUser(
  phone: string,
  password: string
): Promise<void> {
  try {
    const body = { phone, password };
    const response: AxiosResponse<ResponseUserData> = await axios.post(
      "http://0.0.0.0:3400/login",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setAuthHeader(response.data.token);
    console.log(response.data.token);
  } catch (error: any) {
    console.error(error);
    return;
  }
}

export async function editUser(userData: UserData): Promise<string> {
  console.log(userData);
  try {
    const response: AxiosResponse<string> = await axios.post(
      "http://0.0.0.0:3400/user",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    console.log(response.data);
    setAuthHeader(response.data);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return "";
  }
}

export async function registerUser(userData: UserData): Promise<void> {
  console.log(userData);
  try {
    const response: AxiosResponse<ResponseUserData> = await axios.post(
      "http://0.0.0.0:3400/register",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setAuthHeader(response.data.token);
    console.log(response.data.token);
  } catch (error: any) {
    console.error(error);
    return;
  }
}

export async function getCategories(): Promise<CategoryDTO[]> {
  try {
    const response: AxiosResponse<CategoryDTO[]> = await axios.get<
      CategoryDTO[]
    >("http://0.0.0.0:3400/category/all", {
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
      `http://0.0.0.0:3400/product/category/${categoryName}`,
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
    >(`http://0.0.0.0:3400/productList/names`, {
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
): Promise<ResponseProductDto | undefined> {
  try {
    const response: AxiosResponse<ResponseProductDto> = await axios.get<ResponseProductDto>(
      `http://0.0.0.0:3400/productList/${productListId}`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

export const setAuthHeader = (token) => {
  window.localStorage.setItem("auth_token", token);
};
