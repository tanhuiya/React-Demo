
let Util = {
  get:(url , successCallBack , failCallBack)=>{
    fetch(url)
    .then((response)=>response.text())
    .then((responseText)=>{
      successCallBack(JSON.parse(responseText));
    })
    .catch((error)=>{
      console.log(error);
      failCallBack(error);
    })
  }
  
}

export default Util;
