import React from 'react';
import Link from 'react';
import Album from 'react';



class Data extends React.Component{

  constructor(props){

    super(props);

    this.state={

      albums:[],
      albumName:"",
      tracks:[],
      link:[],
      year:"",
      trackFinal:[],
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

    
     this.array();

  }

  Albums=(result)=>{

    let arr=[];

    for(let i=0;i<result.items.length;i++){
      arr.push([[result.items[i].name],[result.items[i].release_date]],[[result.items[i].id]]);
    }

    this.setState({
      albums:arr
    })
  }

  array=()=>{

      let arr=[];

      for(let i=0;i<this.state.tracks.length;i++){


        arr.push([[this.state.tracks[i]],[this.state.link[i]]])

    }

    this.setState({
      trackFinal:arr
      })

    console.log(this.state.trackFinal)

  }

  getTracks=(id)=>{
      fetch("https://api.spotify.com/v1/albums/"+id+"/tracks?limit=50", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer BQDP7tSaKCbE1hv647a5Vq1GeHwzBjnvuvHKJHxLVSSpEpkHhacvOXyYOP7mXPEsQKTlKUvWavHegXDAO2vU-yay08xCH17glA0XAoaC7Isfr0tzc32Cp_TVh0xaKxp1hIqoeFSKnoaQoX28o1vUtqZjAHiLhb4",
        "Content-Type": "application/json"
      }
      })   
      .then(response => response.json())
      .then(result=> this.Trackdata(result))
      .catch(error=>error);
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

    fetch("https://api.spotify.com/v1/artists/3Nrfpe0tUJi4K4DXYWgMUX/albums?limit=50", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer BQDP7tSaKCbE1hv647a5Vq1GeHwzBjnvuvHKJHxLVSSpEpkHhacvOXyYOP7mXPEsQKTlKUvWavHegXDAO2vU-yay08xCH17glA0XAoaC7Isfr0tzc32Cp_TVh0xaKxp1hIqoeFSKnoaQoX28o1vUtqZjAHiLhb4",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(result=>this.Albums(result))
    .catch(error=>error);

  }




  render(){


  return(

    <div className="data">

    {this.state.albums.map(item =>

        <div>
          <b>{item[1]}</b>
          <div><b>{item[0]}</b></div>
          <b>{item[2]}</b>
          <b>Tracks: </b>
          
        </div>
    )}

    <br></br>
    {/* {this.getTracks("3l5hwCuEtpjMiSdEch4vZR")}


          
    <b>{this.state.year}</b> 

    <br></br>

    <b>{this.state.albumName}</b> 

    <br></br>

    <b>Tracks</b>

    {this.state.trackFinal.map(item =>

      <div>
        <a href={item[1]}>{item[0]}</a>
        <br></br>
      </div>
     )
    }
     */}

    </div>
  )
  }
}

export default Data;