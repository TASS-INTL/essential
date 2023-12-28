import { constantsApi } from "./constantsApi";
const BASE_URL =
  "http://ec2-15-229-119-48.sa-east-1.compute.amazonaws.com:8000/api/v1";

const api = async (method = constantsApi.GET, endpoint, body) => {
  try {
    const url = `${BASE_URL}/${endpoint}`;

    if (method === constantsApi.GET) {
      const response = await fetch(url);
      return await response.json();
    }
    if (method === constantsApi.POST) {
      const response = await fetch(url, {
        method: constantsApi.POST,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export default api;
