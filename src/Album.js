import React from 'react';
import Link from 'react';

class Album extends React.Component{

  constructor(props){

    console.log("Album" + props)

    super(props);

    this.state={

     id:this.props.id,
     tracks:[],
     link:[],
    }
    
  }

  Trackdata = (result) => {
    console.log("-----------------------Tracks-----------------------")
    console.log("hit: trackdata");
    let i=0;
    let arr=[];
    let arr2=[];

    for(i=0;i<result.items.length;i++){

      arr.push(result.items[i].name);
      arr2.push(result.items[i].external_urls.spotify);
    }

    this.setState({
      tracks:arr,
      link:arr2,
     })


  }
  
  componentDidMount(){

    fetch("https://api.spotify.com/v1/albums/"+this.props.id+"/tracks?limit=50", {
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

  render()
    return(){

      <div></div>

    }
  

}

export default Album;