import axios from "axios";

const youtubeInstance = axios.create({
  baseURL: "",
  params: {
    key: "AIzaSyC_neaZBe-HR6jgexTrGsxJoj3SCSS0274",
    maxResults: 20
  }
});

export const default_config = {
  key: "",
  maxResults: 20
};

export default youtubeInstance;
