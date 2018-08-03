

module.exports ={

  arry_de:(arr)=>{
    return  new Promise(async (resolve,reject)=>{
      if(arr instanceof Array){
        resolve(Array.from(new Set(arr.map(JSON.stringify))).map(JSON.parse));
      }else{
        let err = new Error('数据必须为数组');
        err.statusCode = 412;
        err.status = 412;
        reject(err);
      }
    });
  },
  arr_obj:(key,arr)=>{
    return new Promise(async(resolve,reject)=>{
      if(arr instanceof Array){
        let promarr=[];
        for (let index = 0; index < arr.length; index++) {
          
          promarr.push(obj_key(key,arr[index]));
        }
        let nums = await Promise.all(promarr);
        if(nums!=null){
          resolve(nums);
        }else{
          let err = new Error('未找到该元素');
          err.statusCode = 412;
          err.status = 412;
          reject(err);
        }
       
      }else{
        let err = new Error('数据必须为数组');
        err.statusCode = 412;
        err.status = 412;
        reject(err);
       
      }
    });
  },

  QUI:(arr)=>{//快速排序
    return new Promise(async (resolve,reject)=>{
      if(arr instanceof Array){
        function quickSort(arr){
          //如果数组<=1,则直接返回
          if(arr.length<=1){return arr;}
          var pivotIndex=Math.floor(arr.length/2);
          //找基准，并把基准从原数组删除
          var pivot=arr.splice(pivotIndex,1)[0];
          //定义左右数组
          var left=[];
          var right=[];
      
          //比基准大的放在left，比基准大的放在right
          for(var i=0;i<arr.length;i++){
            if(arr[i]>=pivot){
              left.push(arr[i]);
            }
            else{
              right.push(arr[i]);
            }
          }
          //递归
          return quickSort(left).concat([pivot],quickSort(right));
        };   
        let list = quickSort(arr);
        resolve(list);
      }else{  
        reject(new Error('值必须为数组'));
      }
      
    });   
  },
  uuid:(str)=>{
    let d = new Date().getTime();
    let uuid = str||'xxxxxxxxx'.replace(/[xy]/g, (c)=> {
      let r = (d + Math.random()*16)%10 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  }
};

obj_key = (key,obj) =>{
  return new Promise((resolve,rejects)=>{
   
    if(obj instanceof Object){
      resolve(obj[key]); 
      
    }else{
      let err = new Error('数据必须为对象');
      err.statusCode = 412;
      err.status = 412;
      reject(err);
      
    }
  });
 
};
