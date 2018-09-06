let util_lv = require('../core/util'); 

module.exports = function (File_Model) {

  File_Model.user_file_size = (user_id,_size,num) =>{
    return new Promise(async (resolve,reject)=>{
      try {
        let files = await File_Model.find({where:{user_id:user_id}});
        let size_arr = await util_lv.arr_obj(size,files);
        let files_all_size = eval(size_arr.join('+'));
        if(files_all_size+_size>num){
          let err = new Error('个人空间不足');
          err.statusCode = 412;
          err.status = 412;
          throw err;
        }
        resolve(files_all_size);
      } catch (error) {
        reject(error);
      }
    });
  };

};