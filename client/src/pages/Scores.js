import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Input, Nav, Button, Form, FormGroup, Label, Container, Row, Col, Table} from 'reactstrap';
import API from "../utils/API";
// import BootstrapTable from 'react-bootstrap-table-next';
// import { Input} from "../components/Form";
// var $  = require( 'jquery' );
// var dt = require( 'datatables.net' )();
// import { GoogleLogin } from 'react-google-login';


// const responseGoogle = (response) => {
//     console.log(response);
//   }

class Scores extends Component {
    state = {
      restaurantName: "",
      date: "",
      results: []
    };
  
    componentDidMount() {
      this.searchATX();
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

    // onSignIn = (googleUser) => {
    //     var profile = googleUser.getBasicProfile();
    //     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //     console.log('Name: ' + profile.getName());
    //     console.log('Image URL: ' + profile.getImageUrl());
    //     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    //   }

    render() {
      return (
        <Container fluid>
        <Nav><Link
          to="/user">User Home Page</Link></Nav>
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <h1>Search a Restaurant!</h1>
              </Jumbotron>
              <Form>
        <FormGroup>
          <Label for="restaurantName">Restaurant</Label>
          <Input type="text" value={this.state.restaurantName} onChange={this.handleInputChange} name="restaurantName" id="resturantName" placeholder="Enter a Restaurant" />
        </FormGroup>
        {/* <FormGroup>
          <Label for="date">Inspection Date</Label>
          <Input type="select" name="date" id="date" onChange={this.handleInputChange} value={this.state.date}>
            <option>2015-09-13T19:00:00.000</option>
            <option>2016-01-01T19:00:00.000</option>
            <option>2017-01-01T19:00:00.000</option>
            <option>2018-01-01T19:00:00.000</option>
            <option>2019-01-01T19:00:00.000</option>
          </Input>
        </FormGroup> */}
        <Button onClick={this.handleFormSubmit}>Submit</Button>
      </Form>
            </Col>
        </Row>
        <br></br>
        <Row>
            <Col size="md-12">
              <Jumbotron>
                <h1>Score Results</h1>
              </Jumbotron>
        <Table dark>
        <thead>
          <tr>
            <th>#</th>
            <th>Restaurant Name</th>
            <th>Restaurant Address</th>
            <th>Score</th>
            <th>Inspection Date</th>
          </tr>
        </thead>
        <tbody>
            {this.state.results.map((food, index) => (
            <tr key={index}>
            <th scope="row">{index+1}</th>
            <td>{food.restaurant_name}</td>
            <td>{food.address_address}</td>
            <td>{food.score}</td>
            <td>{food.inspection_date}</td>
          </tr>
            ))}
          
        </tbody>
      </Table>
            </Col>
          </Row>
        </Container>
      );
    }
  }
  
  export default Scores;
