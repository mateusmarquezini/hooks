import axios from 'axios';

const newsService = {
  get: query => {
    return axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
  }
};

export default newsService;
