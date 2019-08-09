import React, { Component } from "react";
import { Jumbotron, Container, Row, Col} from 'reactstrap';
import API from "../utils/API";
import MapGL, { Marker, Popup, NavigationControl } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Iframe from 'react-iframe';
// import ReactMapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
const TOKEN =  process.envTOKEN || ""

class Details extends Component {
  state = {
    allInfo: [],
    name: localStorage.getItem('name'),
    lat: localStorage.getItem('lat'),
    long: localStorage.getItem('long'),
    address: localStorage.getItem('address'),
    yelpInfo: []
    
    
  };


  componentDidMount = () => {
    API.getPlace(localStorage.getItem('address'), localStorage.getItem('name'))
      .then(res =>
        {this.setState({allInfo: res.data,
        name: res.data[0].restaurant_name,
        address: res.data[0].address});
        })
        .catch(err => console.log(err));
        console.log(this.state.name);
    API.getYelp(this.state.lat, this.state.long, this.state.name)
        .then(res => {
            console.log(res);
            this.setState({yelpInfo: res.data.businesses[0]});
        })
  }


  calcAvgScore = () => {
      var score = 0;
      var number = 0;
      for(var x in this.state.allInfo){
        score += parseInt(this.state.allInfo[x].score)
        number = parseInt(x)+1;

      }
      return score/number;
  }

  numberofStars = (number, review) => {
    if(number >= 5){
        return <div>⭐️⭐️⭐️⭐️⭐️  {review} reviews</div>
      }else if(number < 5 && number >=4) {
        return <div>⭐️⭐️⭐️⭐️  {review} reviews</div>
      }else if(number <4 && number >= 3) {
        return <div>⭐️⭐️⭐️  {review} reviews</div>
      }else if (number <3 && number >= 2){
        return <div>⭐️⭐️  {review} reviews</div>
      } else if (number <2 && number >= 1){
        return <div>⭐️ {review} reviews</div>
      } else {
        return <div>No Info</div>
      }
  }

 
 




  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.name} <div className="float-right"><a href={"tel:"+this.state.yelpInfo.display_phone}> {this.state.yelpInfo.display_phone} </a></div>
              </h1>
              <h3>{this.numberofStars(this.state.yelpInfo.rating, this.state.yelpInfo.review_count)} </h3>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
            <Col size="md-6">
               {/* <MapGL
               style={{ width: '100%', height: '400px' }}
               latitude={parseFloat(localStorage.getItem('lat'))}
               longitude={parseFloat(localStorage.getItem('long'))}
               zoom={12}
               mapStyle='mapbox://styles/mapbox/light-v9'
               accessToken={TOKEN}
             >
            <Marker latitude={parseFloat(localStorage.getItem('lat'))} longitude={parseFloat(localStorage.getItem('long'))} offsetLeft={-20} offsetTop={-10}>
             <div><span role="img">📍</span></div>
           </Marker>  
            <NavigationControl showCompass showZoom position='top-right' />
            </MapGL>  */}
            </Col>
            <Col size="md-6">
            <h2 className="float-right">Avg. Inspection Score: {this.calcAvgScore()}</h2>
            {/* <img className="float-right" src={this.state.yelpInfo.image_url} width="70%"/> */}
            <Iframe url={this.state.yelpInfo.url}
        width="450px"
        height="450px"
        id="myId"
        className="float-right"
        display="initial"
        position="relative"/>
            </Col>
        </Row>
      </Container>
    );
  }
}

export default Details;
