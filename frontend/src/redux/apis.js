import axios from "axios";

const REACT_APP_BASE_URL = "http://localhost:3001";

// addNote
export const add_Note = ({ category, note, createdAt }) => {
  return axios.post(`${REACT_APP_BASE_URL}/addNote`, { category, note, createdAt });
};
// viewNote
export const view_Note = () => {
    // return axios.get(`${REACT_APP_BASE_URL}/viewNote`);
    return axios.get("http://localhost:3001/viewNote")
};
  