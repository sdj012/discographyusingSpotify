import React from 'react';
import { array } from 'prop-types';

class Data extends React.Component{

  constructor(props){

    super(props);

    this.state={

      albumName:"",
      tracks:[],
      link:"",
      year:"",

    }
    
  }

  Albumdata = (result) => {
    console.log("-----------------------Albums-----------------------")
    console.log(result.items[0].name)
    console.log(result.items[0].release_date)
    this.setState({
      albumName:result.items[0].name,
      year:result.items[0].release_date
    })

  }

  Trackdata = (result) => {
    console.log("-----------------------Tracks-----------------------")
    // console.log(result)
    // console.log(result.items[0])


    console.log("hit: trackdata");

    this.setState({
      tracks:result.items[0].name,
      link:result.items[0].external_urls.spotify
    })


  }

  componentDidMount(){

    fetch("https://api.spotify.com/v1/artists/3Nrfpe0tUJi4K4DXYWgMUX/albums?limit=50", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer BQDP7tSaKCbE1hv647a5Vq1GeHwzBjnvuvHKJHxLVSSpEpkHhacvOXyYOP7mXPEsQKTlKUvWavHegXDAO2vU-yay08xCH17glA0XAoaC7Isfr0tzc32Cp_TVh0xaKxp1hIqoeFSKnoaQoX28o1vUtqZjAHiLhb4",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
      .then(result=>this.Albumdata(result))
      .catch(error=>error);

    fetch("https://api.spotify.com/v1/albums/3l5hwCuEtpjMiSdEch4vZR/tracks?limit=50", {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer BQDP7tSaKCbE1hv647a5Vq1GeHwzBjnvuvHKJHxLVSSpEpkHhacvOXyYOP7mXPEsQKTlKUvWavHegXDAO2vU-yay08xCH17glA0XAoaC7Isfr0tzc32Cp_TVh0xaKxp1hIqoeFSKnoaQoX28o1vUtqZjAHiLhb4",
      "Content-Type": "application/json"
    }
    })   
    .then(response => response.json())
    .then(result=>this.Trackdata(result))
    .catch(error=>error);

  }






  render(){
  return(

    <div className="data">

    <b>Album</b> {this.state.albumName}

    <br></br>

    <b>Tracks</b>{this.state.tracks}

    <br></br>

    <b>Link</b> {this.state.link}

    <br></br>
    
    <b>Date</b> {this.state.year}
    
    
    
    </div>



  )
  }
}

export default Data;