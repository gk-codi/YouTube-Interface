import axios from "axios";

const youtubeInstance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: "AIzaSyCdW_I_8WJUQLR30NNmdcOEusJgup8uwRY",
    maxResults: 20
  }
});

export const default_config = {
  key: "AIzaSyCdW_I_8WJUQLR30NNmdcOEusJgup8uwRY",
  maxResults: 20
};

export default youtubeInstance;
