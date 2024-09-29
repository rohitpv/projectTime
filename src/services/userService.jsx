import http from "../http-common";

export const getAllRecordsDB = async () => {
  let response = await http.get("/").catch((error) => {
    if (error.message == "Request failed with status code 502") {
      throw new Error("Network Error");
    } else if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  });
  return response.data;
};

export const getFilteredRecordsDB = async (queryParam) => {
  let response = await http.get(queryParam).catch((error) => {
    if (error.message == "Request failed with status code 502") {
      throw new Error("Network Error");
    } else if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  });
  return response.data;
};

export const getRecordDataDB = async (id) => {
  let response = await http.get(`/project-record/${id}`).catch((error) => {
    if (error.message == "Request failed with status code 502") {
      throw new Error("Network Error");
    } else if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  });
  return response.data;
};
export const deleteRecordDB = async (id) => {
  let response = await http.delete(`/project-record/${id}`).catch((error) => {
    if (error.message == "Request failed with status code 502") {
      throw new Error("Network Error");
    } else if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  });
  return response.data;
};
export const postNewRecordDB = async (data) => {
  let response = await http.post(`/project-record/`, data).catch((error) => {
    if (error.message == "Request failed with status code 502") {
      throw new Error("Network Error");
    } else if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  });
  return response.data;
};
export const putEditRecordDB = async (id, data) => {
  let response = await http.put(`/project-record/${id}`, data).catch((error) => {
    if (error.message == "Request failed with status code 502") {
      throw new Error("Network Error");
    } else if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  });
  return response.data;
};
