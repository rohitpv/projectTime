import axios from "axios";
export default axios.create({
  baseURL: 'https://project-time-server.vercel.app/',
  headers: {
    'content-type': "application/json",
    "accept": "application/json",
  },
});

