import React from 'react';
import Album from './Album';

class Data extends React.Component{

  constructor(props){
    
    super(props);
    
    this.state={
      
      albums:[],
      idAndImage:[],
    }
    
  }
  
  componentDidMount(){

      fetch("https://api.spotify.com/v1/artists/3Nrfpe0tUJi4K4DXYWgMUX/albums?limit=50", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer BQBUGplY-fmdhzGKePyKMXvBNdTZnAWGXAd3h5n3KOze05pTGtB3z78Lz97TDqQINnVOCBPSppZ6NtxayIuhW3LESUuSBJFt6qh9LPib52U4P0lEppT391_JyoC7tF_or_EyPCENE8GnTX5Smdpvn8RuQQoJr0g",
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
      
      // console.log(i + ":" + result.items[i].name)

      if(i!==1 && i!==8 && i!==10 && i!==12 && i!==13 && i!==15 && i!==18 && i!==21 && i!==22 && i!==24 && i!==27 && i!==29 && i!==41 && i!==43){ // avoid duplicity

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
    }


    arr.sort(function compare(a, b) {
      var dateA = new Date(a[1]);
      var dateB = new Date(b[1]);
      return dateA - dateB;
    });

    // console.log(arr)

 

    
    this.setState({
      albums:arr,
      idAndImage:iarr
    })

  }


  covers=(id)=>{

    let uri=""

    for(let i=0;i<this.state.idAndImage.length;i++){

      if(id.localeCompare(this.state.idAndImage[i][0])===0){

        // console.log("loopp")

        for(let j=0;j<this.state.idAndImage[i][1][0].length;j++){

          // console.log("urls: " + JSON.stringify(this.state.idAndImage[i][1][0][j].url))

          uri=this.state.idAndImage[i][1][0][1].url
        }

      }


    }

    return uri;

  }


  render(){

   
  return(

    <div className="data flex-container">

      {this.state.albums.map(item =>

        <div className="album">
 
            <div className="flex-item-TrackList">
              <Album id={item[2]}/>
            </div>

            <div className="flex-item-Cover">
              <img src={this.covers(item[2].toString())}></img>
              <br></br>
              {/* <b>{item[1]}</b> date*/} 
            </div>

            <div className="flex-item-albumTitle">
              <div><b>{item[0]}</b></div>
            </div>

        </div>

        )} 

    </div>
  )
  }
}

export default Data;

    {/* <script src="https://sdk.scdn.co/spotify-player.js"></script> */}

