import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000', // default URL
  header: {
    Authorization: '',
  },
});

// api와 통신하는 코드를 이곳으로 몰아넣음 (보수성 향상)
