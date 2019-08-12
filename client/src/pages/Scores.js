import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Badge, Input, Nav, Button, Form, FormGroup, Label, Container, Row, Col, Table} from 'reactstrap';
import API from "../utils/API";
// import BootstrapTable from 'react-bootstrap-table-next';
// import { Input} from "../components/Form";
// var $  = require( 'jquery' );
// var dt = require( 'datatables.net' )();
// import { GoogleLogin } from 'react-google-login';


// const responseGoogle = (response) => {
//     console.log(response);
//   }
import Moment from 'react-moment';
// import $ from 'jquery';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';



function dateFormatter(cell, row) {
  
  return (
    <Moment format="MM/DD/YYYY">{cell}</Moment>
  );
}

function scoreFormatter(cell, row) {
  if(cell >= 90){
    return <h3><Badge color="success" pill>{cell}</Badge></h3>
  }else if(cell < 90 && cell >=80) {
    return <h3><Badge color="primary" pill>{cell}</Badge></h3>
  }else if(cell <80 && cell >= 70) {
    return <h3><Badge color="warning" pill>{cell}</Badge></h3>
  }else{
    return <h3><Badge color="danger" pill>{cell}</Badge></h3>
  }
}
const pagination = paginationFactory({
  page: 1
});
const columns = [
  {
    text: 'Health Score   ',
    dataField: 'score',
    filter: textFilter(), 
    formatter: scoreFormatter,
    sort: true
  },
  {
    text: 'Inspection Date   ',
    dataField: 'inspection_date',
    filter: textFilter(),
    formatter: dateFormatter,
    sort: true
  },
  {
    text: 'Place   ',
    dataField: 'restaurant_name',
    filter: textFilter(),
    sort: true
  },
  {
    text: 'Address   ',
    dataField: 'address_address',
    filter: textFilter(),
    sort: true
  }, 
  
  
];


class Scores extends Component {
    state = {
      restaurantName: "",
      date: "",
      results: []
    };
  
    
    componentDidMount() {
      this.searchATX();
    }

    rowEvents = {
      onClick: (e, row, cell, rowIndex) => {
        // this.toggle();
        console.log("theCell: "+cell)
        console.log(rowIndex);
        console.log(e);
        console.log(row);
        // this.updateTheFavs(localStorage.getItem('id'),row)
        this.saveInfo(row.address_address, row.restaurant_name , row.address.coordinates[1], row.address.coordinates[0], row.facility_id, "")
        window.location.href = "/place/"+row.restaurant_name;
      }
    }

    saveInfo = (address, name , lat, long, placeid, inFav) => {
      localStorage.setItem('address', address);
      localStorage.setItem('name', name);
      localStorage.setItem('lat', lat);
      localStorage.setItem('long', long);
      localStorage.setItem("idNumb", placeid);
      localStorage.setItem("inFav", inFav);

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
        {/* <Nav><Link
          to="/user">User Home Page</Link></Nav> */}
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <h1>Restaurant Inspection Scores</h1>
              </Jumbotron>
              <div className="table-responsive" >
              <BootstrapTable classes="table-dark" bootstrap4 keyField='id' data={ this.state.results } columns={ columns }  filter={ filterFactory() }  rowEvents={this.rowEvents} pagination={ pagination }/>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
  }
  
  export default Scores;
