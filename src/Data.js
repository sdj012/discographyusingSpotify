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

    arr.sort(function compare(a, b) {
      var dateA = new Date(a[1]);
      var dateB = new Date(b[1]);
      return dateA - dateB;
    });

    // arr.reverse();

    // //  console.log("albumsDupFix : " + arr.toString())
    //  let compStr="";
    //  let finalArr=[];
 
    //    for(let i=0;i<arr.length;i++){
      
    //      compStr=arr[i][0].toString().toUpperCase();
    //      arr[i][0]=compStr;

    //      console.log("compStr:  " + compStr)
 
    //        if(arr[i][0].toString().includes(",")==1) {
    //          compStr=arr[i][0].toString().replace(','," ");
    //          console.log("compStr ',' fixed:  " + compStr)
    //          arr[i][0]=compStr;
    //        }
 
    //        if(finalArr.length==0) finalArr.push(arr[i])

    //          for(let j=0;j<finalArr.length;j++){

    //              if(finalArr[j][0].toString().includes(arr[i][0].toString())==0){
    //                finalArr.push(arr[i])
    //              }


    //         }
         
    //    }

    // finalArr.reverse();

    // console.log("finalArr: " + finalArr)
    
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

  // albumsDupFix=(array)=>{

  //   console.log("albumsDupFix : " + array)
  //   let compStr="";
  //   let finalArr=[];

  //     for(let i=0;i<array.length;i++){

  //       compStr=array[i][0].toString()

  //         if(array[i][0].toString().includes(",")==1) {
  //           compStr=array[i][0].toString().replace(','," ");
  //         }

  //         if(finalArr.length!=0){

  //           for(let i=0;i<finalArr.length;i++){
  //               if(finalArr[i][0].toString().includes(compStr.toUpperCase()==0)){
  //                 finalArr.push(array[i])
  //               }
  //             }

  //         }
        
  //     }
  //   return finalArr;
  // }



  render(){

   
  return(

    <div className="data flex-container">

      {this.state.albums.map(item =>

          <div className="flex-item">
            <br></br>
            <b>{item[1]}</b>
            <div><b>{item[0]}</b></div>
            <Album id={item[2]}/>


            <img src={this.covers(item[2].toString())}></img>
          </div>

        )} 

    </div>
  )
  }
}

export default Data;

    {/* <script src="https://sdk.scdn.co/spotify-player.js"></script> */}

