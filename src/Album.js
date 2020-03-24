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
        Authorization: "Bearer BQAPWNYpBpTurkibLXzjsGnDu-9q-SfQVInZ6vzL6WFgLGIWw6c5MFFkiNaoskeR_qriAUTaSM0aMsPHJzgvyEvzixVcA9sOGLv5vt40ek-H6XdLhoezA0vjGYXix4AdTFVqyAQfKZBoYl-D0nGJv_EvfNZyk0c",
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
          <p>{item}</p>
        </div>


      )}
      
      </div>

    )
  }
  

}

export default Album;