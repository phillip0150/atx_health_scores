import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Media, Badge, Jumbotron, Input, Nav, Button, Form, FormGroup, Label, Container, Row, Col, Table} from 'reactstrap';
import API from "../utils/API";
import { GoogleLogin } from 'react-google-login';
// import Iframe from 'react-iframe'
import ReactMapGL from 'react-map-gl';
import { GoogleLogout } from 'react-google-login';


//api token for react-map-gl
const TOKEN =  process.envTOKEN || 
const GOOGLE = process.envGOOGLE || 
class User extends Component {
  //setting state to empty
    state = {
      restaurantName: "",
      date: "",
      results: [],
      user: []
    };
  


    componentDidMount() {
      //doing a search of all food scores
      this.searchATX();
      console.log("in component mount");
      //checking local storage for user id
      if(localStorage.getItem('id').length === 0){
        //setting user state to empty
        this.setState({user: []});
      }
      else{
        //getting user id in local storage
        //setting state user
      API.getUserID(localStorage.getItem('id')).then(res => {
        this.setState({user: res.data})
      }).catch(err =>console.log(err));
    }

      console.log(this.state.user);
      
    }
  
    searchATX = () => {
      //calling search api
      API.search()
        .then(res =>
          //when we get something back, put it in the results state
          this.setState({ results: res.data})
        )
        .catch(err => console.log(err));
    };

    searchATXName = query => {
        //searching for the name of food score
        API.searchName(query)
          .then(res =>
            //new results will replace the state
            this.setState({ results: res.data})
          )
          .catch(err => console.log(err));
      };

      searchATXDate = query => {
        //searching for scores by date
        API.searchDate(query)
          .then(res =>
              //new results will replace the state
            this.setState({ results: res.data})
          )
          .catch(err => console.log(err));
      };

  
    handleInputChange = event => {
      //handling input change
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
        [name]: value
      });
    };
  
    handleFormSubmit = event => {
      event.preventDefault();
      console.log(this.state.restaurantName);
      //if restaurantName is empty, we are searching by date
      if(this.state.restaurantName === ""){
        this.searchATXDate(this.state.date);
    }
    else {
        this.searchATXName(this.state.restaurantName);
    }
    };

    // mapResults = () => {
    //   //maping results to name
    //     this.state.results.map(food =>(
    //         {name: food.restaurant_name}
            
    //     ))
        
    // }

    //creating user if we cannot find them.
    createUser = (response) => {

        console.log("user doesn't exits.... creating user");
        //calling api, setting email, name, and image based off of google login
        API.createUser({
          email: response.profileObj.email,
          name: response.profileObj.name,
          image: response.profileObj.imageURL,
          favs: []

        }
        )
        //then we set the user state with the info
        //saving user id to local storage
          .then(res => {this.setState({user: res.data});
          localStorage.setItem('id', this.state.user._id)})
          
        
    }

    //here we are updating users fav foods
    // updateTheFavs = (food) => {
    //   API.updateFavs({
    //     favs: {food}
    //   })
    // }



    //function when we call google login
    responseGoogle = (response) => {
        console.log();
        //api call to get user.
        API.getUser(response.profileObj.email).then(res => {
          console.log("Got user: "+JSON.stringify(res));
          //if res.data is null, we know the user doesn;t exist
          if(res.data === null){
            //creating user
            this.createUser(response);
          }else{
            ///else we know the user exists, adding res.data to user state
          this.setState({user: res.data})
          //adding user id to local storage
          localStorage.setItem('id', this.state.user._id);}
        }).catch(err =>console.log(err));
        console.log("this.state.user: " + this.state.user);
        
        
      }

      //selecting a badge pased on the score of the resturant
    whichBadge = (score) => {
      if(score >= 90){
        return <Badge color="success" pill>{score}</Badge>
      }else if(score < 90 && score >=80) {
        return <Badge color="primary" pill>{score}</Badge>
      }else if(score <80 && score >= 70) {
        return <Badge color="warning" pill>{score}</Badge>
      }else{
        return <Badge color="danger" pill>{score}</Badge>
      }
    }

    //logging out the user
    //setting user state to empty and local storage id to empty
    logout = () => {
      localStorage.setItem('id', "");
      this.setState({user:[]});
    }

    

    render() {
      return (
        <Container fluid>
        <Nav><GoogleLogout
      clientId={GOOGLE}
      buttonText="Logout"
      onLogoutSuccess={this.logout}
    >
    </GoogleLogout></Nav>
          {this.state.user._id ? (
            <Row>
              <Col size="md-6">
                <Jumbotron>
                  <h1>Welcome {this.state.user.name}</h1>
                </Jumbotron>
                <h1>Saved Places</h1>
                {this.state.user.favs.map((favs, index) => (
                  <Media>
      <Media key={index} left href="#">
      {/* <ReactMapGL
        width={200}
        height={200}
        latitude={favs.address.coordinates[1]}
        longitude={favs.address.coordinates[0]}
        zoom={15}
        mapboxApiAccessToken={TOKEN}
        onViewportChange={(viewport) => this.setState({viewport})}
      /> */}
      <br></br>
      </Media>
      <Media body>
        <Media heading>
          {favs.restaurant_name} {this.whichBadge(favs.score)}
        </Media>
        <Button href={favs.address_address} >View Restaurant</Button>
      </Media>
    </Media>))}

              </Col>
              <Col>
              <Jumbotron>
                <h1>Search a Restaurant!</h1>
              </Jumbotron>
              <Form>
        <FormGroup>
          <Label for="restaurantName">Restaurant</Label>
          <Input type="text" value={this.state.restaurantName} onChange={this.handleInputChange} name="restaurantName" id="resturantName" placeholder="Enter a Restaurant" />
        </FormGroup>
        <Button onClick={this.handleFormSubmit}>Submit</Button>
      </Form>
      <h1>Score Results</h1>
        <Table responsive dark>
        <thead>
          <tr>
            <th>Restaurant Name</th>
            <th>Restaurant Address</th>
            <th>Score</th>
            {/* <th>Inspection Date</th> */}
            <th>Add to Saved Places</th>
          </tr>
        </thead>
        <tbody>
            {this.state.results.map((food, index) => (
            <tr key={index}>
            <td>{food.restaurant_name}</td>
            <td>{food.address_address}</td>
            <td>{this.whichBadge(food.score)}</td>
            {/* <td>{food.inspection_date}</td> */}
            <td><Button color="primary">Save</Button></td>
          </tr>
          

            ))}
          
        </tbody>
      </Table>
              </Col>
            </Row>) : 
                  (<Row>
                  <Col size="md-12">
                    <Jumbotron>
                      <h1>Please Login...</h1>
                      <GoogleLogin
                  clientId={GOOGLE}
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
                </Jumbotron>
                </Col>
                </Row>)}
        </Container>
      );
    }
  }
  
  export default User;
