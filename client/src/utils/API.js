import axios from "axios";

const BASEURL = "https://data.austintexas.gov/resource/nguv-n54k.json?";
const NAMEURL = "$where=restaurant_name";
const DATEURL = "$where=inspection_date";
// Export an object with a "search" method that searches the Giphy API for the passed query
export default {
  search: function() {
    return axios.get(BASEURL);
  },
  searchName: function(query) {
      console.log(query)
    const text = query.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    console.log("In Search Name:" +text);
    return axios.get(BASEURL+NAMEURL+"%20like%20%27%25"+text+"%25%27");
  },
  searchDate: function(query) {
    console.log("In Search Date:"+ query);
    return axios.get(BASEURL+DATEURL+"%20between%20%27"+query+"%27%20and%20%272019-12-31T19:00:00.000%27");
  },

  getUser: function(user) {
    console.log("in get user: " + user);
    return axios.get("/api/user/"+user);
  },
  createUser: function(userData) {
    return axios.post("/api/user", userData);
  },
  getUserID: function(user) {
    console.log("in get user: " + user);
    return axios.get("/api/user/id/"+user);
  },

  updateFavs: function(user) {
    return axios.put("/api/user/id/"+user)
  }

};
