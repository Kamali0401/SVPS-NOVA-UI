import axios from "axios";

// API URLs
export const authURL = "https://www.test.com/api/";
//export const baseURL = "http://103.62.146.210/api";//"http://103.53.52.215:90/api"; 
//export const baseURL = "http://prasath-001-site6.ftempurl.com/api";
export const baseURL = "https://localhost:44315/api";
export const ProductURL = "http://103.53.52.215:85/api"; 
export const userURL = "http://manojvgl-001-site4.ctempurl.com/api/";

// Function to get the JWT token from AsyncStorage or other storage
export const getJWTToken = async () => {
  try {
    const token = await localStorage.getItem("accessToken"); // Replace with your method of retrieving token
    return token;
  } catch (error) {
    console.log("Error retrieving JWT token", error);
    return null;
  }
};

// Add the JWT token to the request headers
// const setAuthHeader = async () => {
//   const token = await getJWTToken();
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };
const setAuthHeader = async () => {
  const token = await getJWTToken(); // Get token from storage
  if (!token) throw new Error("No authentication token found");

  return {
    Authorization: `Bearer ${token}`,
    Accept: "*/*",
    "Content-Type": "application/json",
  };
};
// Fetch the response using the provided URL and optional data (POST/GET requests)
export const ShopsGet = async (url) => {
  try {
    const authHeader = await setAuthHeader();
    const response = await axios.get(baseURL + url, { headers: authHeader });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const CategoryGet = async (url) => {
  try {
    const authHeader = await setAuthHeader();
    const response = await axios.get(ProductURL + url, { headers: authHeader });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const SubCategoryGet = async (url) => {
  try {
    const authHeader = await setAuthHeader();
    const response = await axios.get(ProductURL + url, { headers: authHeader });
    console.log(ProductURL + url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const ShopSubCategoryGet = async (url) => {
  try {
    const authHeader = await setAuthHeader();
    const response = await axios.get(baseURL + url, { headers: authHeader });
    console.log(ProductURL + url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const ShopProductsGet = async (url, model) => {
  try {
    const authHeader = await setAuthHeader();
    const response = await axios.post(baseURL + url, {
      subcatId: model.subcatId,
      shopId: model.shopId,
    }, { headers: authHeader });
    console.log(baseURL + url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const ShopProductsSearchPost = async (url, model) => {
  try {
    const authHeader = await setAuthHeader();
    const response = await axios.post(baseURL + url, model, { headers: authHeader });
    console.log(baseURL + url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const AsyncGet = async (url) => {
  try {
    debugger;
    const authHeader = await setAuthHeader();
    const response = await axios.get(baseURL + url, { headers: authHeader });
    return response;
  } catch (error) {
    console.log(error, baseURL + url);
    return error;
  }
};

export const AsyncGetFiles = async (url, responseType = "arraybuffer") => {
  try {
    const authHeader = await setAuthHeader();
    const response = await axios.get(`${baseURL}${url}`, {
      responseType: "blob",  
      headers: authHeader ,
      withCredentials: false, // Add this if your API requires authentication cookies
    });
    return response;
  } catch (error) {
    console.error("Error fetching file:", error, baseURL + url);
    throw error;
  }
};

export const AsyncPostFiles = async (url) => {
  try {
   
    const authHeader = await setAuthHeader();
    const response = await axios.post(baseURL + url, {
      responseType: "arraybuffer",
    }, { headers: authHeader });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error, baseURL + url);
  }
};

export const AsyncProductGet = async (url) => {
  try {
    const authHeader = await setAuthHeader();
    const response = await axios.get(ProductURL + url, { headers: authHeader });
    return response;
  } catch (error) {
    console.log(error, url);
  }
};

export const AsyncSMSPost = async (url, data) => {
  try {
    const authHeader = await setAuthHeader();
    const response = await axios.post(userURL + url, data, { headers: authHeader });
    return response;
  } catch (error) {
    console.log(error, baseURL + url + "here it is");
  }
};

export const AsyncPost = async (url, data) => {
  try {
 
    const authHeader = await setAuthHeader();
    const response = await axios.post(baseURL + url, data, { headers: authHeader });
    return response;
  } catch (error) {
    console.log(error, baseURL + url + "here it is");
    return error;
  }
};
export const AsyncPut = async (url, data) => {
  try {
    const authHeader = await setAuthHeader();
    const response = await axios.put(baseURL + url, data, { headers: authHeader });
    return response;
  } catch (error) {
    console.log("PUT Error:", error, baseURL + url);
    return error;
  }
};

export const AsyncDelete = async (url, data = null) => {
  try {
    const authHeader = await setAuthHeader();
    const config = {
      headers: authHeader,
      data: data, // Optional: send body with DELETE if API supports it
    };
    const response = await axios.delete(baseURL + url, config);
    debugger;
    return response;
  } catch (error) {
    console.log("DELETE Error:", error, baseURL + url);
    return error;
  }
};


export const AsyncUserVerifyPost = async (url, data) => {
  try {
    const authHeader = await setAuthHeader();
    const response = await axios.post(userURL + url, data, { headers: authHeader });
    return response;
  } catch (error) {
    console.log(error, userURL + url);
  }
};

export const AsyncUserProfilePost = async (url, data) => {
  try {
    const authHeader = await setAuthHeader();
    const response = await axios.post(userURL + url, data, { headers: authHeader });
    return response;
  } catch (error) {
    console.log(error, userURL + url);
  }
};

export const ValidateUser = async (url, data) => {
  try {
    const authHeader = await setAuthHeader();
    const response = await axios.get(baseURL + url, data, { headers: authHeader });
    return response;
  } catch (error) {
    console.log(error + baseURL + url);
  }
};

export const PublicAsyncGet = async (url) => {
  debugger;
  return axios
    .get(baseURL + url)
    .then((resp) => {
      return resp;
    })
    .catch((error) => {
      console.log(error, baseURL + url);
    });
 
};
export const PublicAsyncPost = async (url, data) => {
  try {
 
   
    const response = await axios.post(baseURL + url, data);
    return response;
  } catch (error) {
    console.log(error, baseURL + url + "here it is");
    return error;
  }
};
