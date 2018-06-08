const _fetch = (requestPromise, timeout) => {
  let timeoutAction = null;
  const timerPromise = new Promise((resolve, reject) => {
    timeoutAction = () => {
      reject('请求超时');
    }
  })
  setTimeout(()=>{
    timeoutAction()
  }, timeout)
  return Promise.race([requestPromise,timerPromise]);
}


export const request = (url, method, body) => {
  

  const myFetch = fetch(url,{
    method: method,
    headers:{
      'Accept': 'application/json',
      "Content-Type" : "application/json"
    },
    body:JSON.stringify(body)
  });
  console.log(url);
  return new Promise((resolve, reject) => {
    _fetch(myFetch, 30000)
        .then( response  => {
          // console.log(response.status)
          if(response.status>=200&&response.status<400){
            return response.json();
          }else{
            throw response;
          }
        })
        .then(responseData =>{
          if(responseData.body!=null){
            return responseData
          }else{
            throw responseData
          }
        })
        .then(responseData=>{
          // 1表示成功
          
          resolve(responseData)
        })
        .catch(async error=>{
          if (error.status>=400&&error.status<500){
              let err = await error.json();
              reject(err.error)
              console.log('msg')
          }else{
            if(error.error!=null){
              reject(error.error)
            }else {
              let err = await error.json();
              reject(err.error)
            }
          }
          
          
        });
  });

};
