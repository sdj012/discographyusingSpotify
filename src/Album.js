import React from 'react';
import Link from 'react';

class Album extends React.Component{

  constructor(props){

    super(props);

    this.state={

     id:this.props.id,
     tracks:[],
     link:[],
    }
    
  }

  Trackdata = (result) => {
    // console.log("-----------------------Tracks-----------------------")
    // console.log("hit: trackdata");



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

    //  console.log("tracks: " + this.state.tracks);


  }
  
  componentDidMount(){


    fetch("https://api.spotify.com/v1/albums/"+this.props.id+"/tracks?limit=50", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer BQBUGplY-fmdhzGKePyKMXvBNdTZnAWGXAd3h5n3KOze05pTGtB3z78Lz97TDqQINnVOCBPSppZ6NtxayIuhW3LESUuSBJFt6qh9LPib52U4P0lEppT391_JyoC7tF_or_EyPCENE8GnTX5Smdpvn8RuQQoJr0g",
        "Content-Type": "application/json"
      }
      })   
      .then(response => response.json())
      .then(result=>this.Trackdata(result))
      .catch(error=>error);
  }

  render(){
    return(
      <div>

      {/* <div>{this.state.id}</div> */}
     {/* {this.state.tracks} */}

      {this.state.tracks.map(item =>

        <div>
          {item}
        </div>


      )}
      
      </div>

    )
  }
  

}

export default Album;