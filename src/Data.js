import React from 'react';
import Album from './Album';
class Data extends React.Component{
  

  constructor(props){
    
    super(props);
    
    this.state={
      
      albums:[],
      albumName:"",
      idAndTrackArr:[],
      tracks:[],
      link:[],
      year:"",
      trackFinal:[],
      idAndImage:[],
    }
    
  }
  
  componentDidMount(){

      fetch("https://api.spotify.com/v1/artists/3Nrfpe0tUJi4K4DXYWgMUX/albums?limit=50", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer BQAPWNYpBpTurkibLXzjsGnDu-9q-SfQVInZ6vzL6WFgLGIWw6c5MFFkiNaoskeR_qriAUTaSM0aMsPHJzgvyEvzixVcA9sOGLv5vt40ek-H6XdLhoezA0vjGYXix4AdTFVqyAQfKZBoYl-D0nGJv_EvfNZyk0c",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(result=>this.Albums(result))
      .catch(error=>error);

  }

  Albums=(result)=>{
    
    console.log("-----------------------Albums-----------------------")
    
    
    let arr=[];
    let iarr=[];

    for(let i=0;i<result.items.length;i++){
      arr.push(
        [
          [[result.items[i].name]],[[result.items[i].release_date]],
          [[result.items[i].id]]
        ]
      );

      iarr.push(
        [[result.items[i].id],[result.items[i].images]]
      )
    }
    
    this.setState({
      albums:arr,
      idAndImage:iarr
    })

  }

  covers=(id)=>{

    let uri=""

    for(let i=0;i<this.state.idAndImage.length;i++){

      if(id.localeCompare(this.state.idAndImage[i][0])===0){

        console.log("loopp")

        for(let j=0;j<this.state.idAndImage[i][1][0].length;j++){

          console.log("urls: " + JSON.stringify(this.state.idAndImage[i][1][0][j].url))

          uri=this.state.idAndImage[i][1][0][0].url
        }

      }


    }

    return uri;

  }



  render(){
  return(

    <div className="data">

      {this.state.albums.map(item =>

          <div>
            <br></br>
            <b>{item[1]}</b>
            <div><b>{item[0]}</b></div>
            <p>Tracks: </p>
            <img src={this.covers(item[2].toString())}></img>
            <Album id={item[2]}/>
          </div>

        )} 

    <br></br>
    <script src="https://sdk.scdn.co/spotify-player.js"></script>
    </div>
  )
  }
}

export default Data;