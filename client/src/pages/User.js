import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Jumbotron, Input, Nav, Button, Form, FormGroup, Label, Container, Row, Col, Table} from 'reactstrap';
import API from "../utils/API";
// import BootstrapTable from 'react-bootstrap-table-next';
// import { Input} from "../components/Form";
// var $  = require( 'jquery' );
// var dt = require( 'datatables.net' )();
import { GoogleLogin } from 'react-google-login';

class User extends Component {
    state = {
      restaurantName: "",
      date: "",
      results: [],
      user: []
    };
  
    componentDidMount() {
      this.searchATX();
      console.log("in component mount");
      if(localStorage.getItem('id').length === 0){
        this.setState({user: []});
      }
      else{
      API.getUserID(localStorage.getItem('id')).then(res => {
        this.setState({user: res.data})
      }).catch(err =>console.log(err));
    }

      console.log(this.state.user);
      
    }
  
    searchATX = () => {
      API.search()
        .then(res =>
          this.setState({ results: res.data})
        )
        .catch(err => console.log(err));
    };

    searchATXName = query => {
        API.searchName(query)
          .then(res =>
            this.setState({ results: res.data})
          )
          .catch(err => console.log(err));
      };

      searchATXDate = query => {
        API.searchDate(query)
          .then(res =>
            this.setState({ results: res.data})
          )
          .catch(err => console.log(err));
      };
  
    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
        [name]: value
      });
    };
  
    handleFormSubmit = event => {
      event.preventDefault();
      console.log(this.state.restaurantName);
      if(this.state.restaurantName === ""){
        this.searchATXDate(this.state.date);
    }
    else {
        this.searchATXName(this.state.restaurantName);
    }
    };

    mapResults = () => {
        this.state.results.map(food =>(
            {name: food.restaurant_name}
            
        ))
        
    }

    createUser = (response) => {

        console.log("user doesn't exits.... creating user");
        API.createUser({
          email: response.profileObj.email,
          name: response.profileObj.name,
          imageURL: response.profileObj.imageURL
        }
        )
          .then(res => {this.setState({user: res.data});
          localStorage.setItem('id', this.state.user._id)})
          
        
    }

    responseGoogle = (response) => {
        console.log();
        API.getUser(response.profileObj.email).then(res => {
          console.log("Got user: "+JSON.stringify(res));
          if(res.data === null){
            this.createUser(response);
          }else{
          this.setState({user: res.data})
          localStorage.setItem('id', this.state.user._id);}
        }).catch(err =>console.log(err));
        console.log("this.state.user: " + this.state.user);
        
        
      }

    render() {
      return (
        <Container fluid>
        <Nav>&nbsp;</Nav>
          {this.state.user._id ? (
            <Row>
              <Col size="md-12">
                <Jumbotron>
                  <h1>Welcome {this.state.user.name}</h1>
                  <Button color="primary">Saved Places</Button>
                </Jumbotron>
              </Col>
            </Row>) : 
                  (<Row>
                  <Col size="md-12">
                    <Jumbotron>
                      <h1>Please Login...</h1>
                      <GoogleLogin
                  clientId="115882627637-6sn830rkgb9mlt6tih8pbapfbmhuggu3.apps.googleusercontent.com"
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
