import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Media, Modal, Collapse, ModalBody, ModalFooter, Card, CardBody, CardTitle, Badge, Jumbotron, Input, Nav, Button, Form, FormGroup, Label, Container, Row, Col, Table} from 'reactstrap';
import API from "../utils/API";
import { GoogleLogin } from 'react-google-login';
// import Iframe from 'react-iframe'
import ReactMapGL, {Marker} from 'react-map-gl';
import { GoogleLogout } from 'react-google-login';
import Moment from 'react-moment';
// import $ from 'jquery';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';





//api token for react-map-gl
const TOKEN =  process.env.TOKEN
const GOOGLE = process.env.GOOGLE
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


class User extends Component {
  //setting state to empty
    state = {
      restaurantName: "",
      date: "",
      results: [],
      user: [],
      address: "",
      selected: [],
      modal: false,
      collapse: true
    };


  

    rowEvents = {
      onClick: (e, row, cell, rowIndex) => {
        // this.toggle();
        console.log("theCell: "+cell)
        console.log(rowIndex);
        console.log(e);
        console.log(row);
        // this.updateTheFavs(localStorage.getItem('id'),row)
        this.saveInfo(row.address_address, row.restaurant_name , row.address.coordinates[1], row.address.coordinates[0], row.facility_id, false)
        window.location.href = "/place/"+row.restaurant_name;
      }
    }
   

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
          {this.setState({ results: res.data});}
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
    updateTheFavs = (id, favs) => {
      API.updateFavs(id, {
        favs
      }).then(res =>
      {this.setState({user: res.data});
    })
    
    }

    delTheFavs = (id, favs) => {
      console.log("TheFavsDel: " +JSON.stringify(favs));
      API.deleteFavs(id, 
        {favs}
      ).then(res =>
      {this.setState({user: res.data});})
    }

    saveInfo = (address, name , lat, long, placeid, inFav) => {
      localStorage.setItem('address', address);
      localStorage.setItem('name', name);
      localStorage.setItem('lat', lat);
      localStorage.setItem('long', long);
      localStorage.setItem("idNumb", placeid);
      localStorage.setItem("inFav", inFav);

    }



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
      console.log("in logout")
      localStorage.setItem('id', "");
      this.setState({user:[]});
    }

    toggle = () => {
      if(this.state.modal === false){
          this.setState({modal:true})
      }else if(this.state.modal === true){
          this.setState({modal:false})
      }
  }

    toggleFavs = () => {
      if(this.state.collapse === false){
        this.setState({collapse:true})
      }else if (this.state.collapse ===true){
        this.setState({collapse:false})
      }
    }

    reduceName = (name) => {
      if(name.includes("#")){
        return name.substring(0, name.indexOf('#'));
    }else{
      return name
    }
  }
    
    render() {
      return (
        <Container fluid>
          {this.state.user._id ? (
            <Row>
              <Col size="md-6">
                <Jumbotron>
                  <h1>Welcome {this.state.user.name}</h1>
                  <GoogleLogout
                    clientId={GOOGLE}
                    buttonText="Logout"
                    onLogoutSuccess={this.logout}></GoogleLogout>
                </Jumbotron>
                <Button color="primary" onClick={this.toggleFavs} style={{ marginBottom: '1rem'}} size="lg">Toggle Favs</Button>

                <Collapse isOpen={this.state.collapse}>
                {this.state.user.favs.map((favs, index) => (
                   <Card key={index} style={{width:"100%", overflow: "hidden"}}>
                     <CardBody>
                  <Media>
      <Media key={index} left href="#">
      <ReactMapGL
        width={200}
        height={250}
        latitude={favs.address.coordinates[1]}
        longitude={favs.address.coordinates[0]}
        zoom={12}
        mapboxApiAccessToken={TOKEN}
        onViewportChange={(viewport) => this.setState({viewport})}
      ><Marker latitude={favs.address.coordinates[1]} longitude={favs.address.coordinates[0]} offsetLeft={-20} offsetTop={-10}>
      <div>📍</div>
    </Marker></ReactMapGL>
      <br></br>
      </Media>
      <Media body>
        <Media heading>
        <CardTitle><div style={{wordWrap: "break-word", textAlign: "center"}}>{this.reduceName(favs.restaurant_name)} {" "} {this.whichBadge(favs.score)}</div></CardTitle>
        </Media>
        <br></br>
        <Button style={{width:"80%", marginLeft: "10%"}} href={"place/"+favs.restaurant_name} onClick={()=> this.saveInfo(favs.address_address, favs.restaurant_name, favs.address.coordinates[1], favs.address.coordinates[0], favs.facility_id, true)} size="lg">Info</Button>
        <br></br>
        <br></br>
        <Button style={{width:"80%", marginLeft: "10%"}} onClick={() => this.delTheFavs(localStorage.getItem('id'), favs)} color="danger" size="lg">Remove</Button>
      </Media>
    </Media> </CardBody></Card>))}
              <br></br>
              </Collapse>
              </Col>
              
              <Col >
              <Jumbotron>
                <h1>Restaurant Inspection Scores</h1>
              </Jumbotron>
        
    <div className="table-responsive" >
    <BootstrapTable classes="table-dark" bootstrap4 keyField='id' data={ this.state.results } columns={ columns }  filter={ filterFactory() }  rowEvents={this.rowEvents} pagination={ pagination }/>
    </div>
    <div>
       
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          {/* <ModalHeader toggle={this.toggle}>Modal title</ModalHeader> */}
          <ModalBody>
            Item added to favorites!
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>

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
