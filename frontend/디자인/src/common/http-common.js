<<<<<<< HEAD:frontend/design/src/common/http-common.js
import axios from "axios";

export default axios.create({
  baseURL: "https://i6e201.p.ssafy.io:8443", // default URL
  // baseURL: "https://localhost:8443", // default URL
  header: {
    Authorization: "",
=======
import axios from 'axios';

export default axios.create({
  baseURL: 'https://i6e201.p.ssafy.io:8443', // default URL
  header: {
    Authorization: '',
>>>>>>> jang:frontend/디자인/src/common/http-common.js
  },
});

// api와 통신하는 코드를 이곳으로 몰아넣음 (보수성 향상)
