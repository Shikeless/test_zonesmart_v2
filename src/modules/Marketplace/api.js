import axios from "axios";
import { load } from "../../localStorage";

export const fetchChannels = () => {
  return axios({
    method: "get",
    url: "http://utss.su/api/user_channel/",
    headers: { Authorization: `JWT ${load("access")}` }
  }).then(response => {
    return response.data;
  });
};

export const fetchCategories = data => {
  return axios({
    method: "get",
    url: "http://utss.su/api/ebay/product/category/",
    headers: {},
    params: {
      level: data.level,
      channel_id: data.channel_id,
      parent_id: data.parent_id,
      limit: 999
    }
  }).then(response => {
    return response.data;
  });
};

export const fetchAspects = id => {
  return axios({
    method: "get",
    url: `http://utss.su/api/ebay/product/category/${id}/get_aspects/`,
    header: {}
  }).then(response => {
    return response.data;
  });
};
