import axios from 'axios';

export default axios.create({
  baseURL: 'https://i6e201.p.ssafy.io:8443', // default URL
  header: {
    Authorization: '',
  },
});

