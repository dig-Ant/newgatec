module.exports = {
  keysCheck :(arr,obj)=>{
   
    return new Promise(async (resolve, reject) => {
      
      let promiseArr = []
      for (let index = 0; index < arr.length; index++) {
        
        promiseArr.push(keyCheck(arr[index],obj))
      }
      Promise.all(promiseArr).then((result)=>{
        resolve(true)
      }).catch((e)=>{
        
        reject(e)
      })

    })

      
    
  }
}

keyCheck = (key,obj)=>{
  return new Promise((resolve, reject)=>{

    if (obj.hasOwnProperty(key)) {
      resolve(1)
      
    }else{
      reject(new Error(key+ '不能为空'))
    }
  
  })
 
}