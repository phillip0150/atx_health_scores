import axios from "axios";

const BASEURL = "https://data.austintexas.gov/resource/nguv-n54k.json?";
const RECENTURL = "https://data.austintexas.gov/resource/nguv-n54k.json?$where=inspection_date%20between%20%272018-12-31T12:00:00%27%20and%20%272019-12-31T14:00:00%27&$order=inspection_date DESC"
const NAMEURL = "$where=restaurant_name";
const DATEURL = "$where=inspection_date";
const ADDRESSURL = "address_address=";

// Export an object with a "search" method that searches the Giphy API for the passed query
export default {
  search: function() {
    return axios.get(RECENTURL);
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

  updateFavs: function(id, foodData) {
    return axios.put("/api/user/id/"+id, foodData)
  },

  deleteFavs: function(id, foodData) {
    return axios.put("/api/user/id/"+id+"/food", foodData)
  },

  getPlace: function(query1, query2) {
    return axios.get(BASEURL+ADDRESSURL+query1+"&restaurant_name="+query2+"&$order=inspection_date DESC");
  },

  getYelp: function(lat, long, place){
    return axios.get("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="+place+"&latitude="+lat+"&longitude="+long, {
      headers: {
          Authorization: `Bearer 2ozrOdoM-iqGVuP5uozgiBk6CunvT4pCllsN7PdRctZR63EopSt0ZruMP-E6Xiv7YOzffRRDGwVqUUwMLjVdKlYk_n49Q9d7WpshV0LSbgThn9oclFErTIuS14ECXXYx`
     },
    })
  }
};
