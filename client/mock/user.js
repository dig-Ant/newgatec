
export const user = [
  {
    name: 'yang'
  }
]

const cst_list_obj = {
  'cst_list': [{
    'cst_id': 1, // 企业id
    'com_name': "杨桑公司", // 公司名
    'com_img': "", //公司图片id
    'state': "", // 雇员状态
    'task_state': 1, // 任务代办
    'integral': 556 // 积分
  },]
}

export const cst_list = {
  body: {
    'cst_list': [
      {
        'cst_id': 1, // 企业id
        'com_name': "杨桑公司", // 公司名
        'com_img': "", //公司图片id
        'state': "在职", // 雇员状态
        'task_state': 1, // 任务代办
        'integral': 556 // 积分
      },
      {
        'cst_id': 2, // 企业id
        'com_name': "星星公司", // 公司名
        'com_img': "", //公司图片id
        'state': "离职", // 雇员状态
        'task_state': 2, // 任务代办
        'integral': 2030 // 积分
      },
      {
        'cst_id': 3, // 企业id
        'com_name': "黄大美美公司", // 公司名
        'com_img': "", //公司图片id
        'state': "离职", // 雇员状态
        'task_state': 3, // 任务代办
        'integral': 3234 // 积分
      },
    ]
  }
}

export const getNotices = (req, res) => {
  res.json([
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      datetime: '2017-08-09',
      type: '通知',
    }
  ]);
};


//获取功能列表
let feature_list_obj = {
  'buttons': [{ 'name': 'StaffInfo', 'task_id': 1 },
  {}, {}, {}, {}]
};
export const feature_list = (req, res) => {
  console.log('获取功能列表---cst_id', req.query.cst_id);
  let cst_id = req.query.cst_id;
  if (cst_id == 1) {
    res.json({
      body: {
        buttons: [
          {
            name: 'StaffInfo',
            task_id: 1
          },
          {
            name: 'SIHF',
            task_id: 2
          },
          {
            name: 'Payslips',
            task_id: 3
          },
          {
            name: 'Welfare',
            task_id: 4
          },
          {
            name: 'Claims',
            task_id: 5
          },
          {
            name: 'Giftcards',
            task_id: 6
          },
          {
            name: 'MedExam',
            task_id: 7
          },
          {
            name: 'emprequest',
            task_id: 8
          },
          {
            name: 'todo',
            task_id: 9
          },
          {
            name: 'PreEntry',
            task_id: 10
          },
          {
            name: 'CFInfoColl',
            task_id: 11
          }
        ]
      }
    });
  } else if (cst_id == 2) {
    res.json({
      body: {
        buttons: [
          {
            name: 'StaffInfo',
            task_id: 1
          },
          {
            name: 'SIHF',
            task_id: 2
          },
          {
            name: 'Payslips',
            task_id: 3
          },
          {
            name: 'Welfare',
            task_id: 4
          },
          {
            name: 'Claims',
            task_id: 5
          },
          {
            name: 'Giftcards',
            task_id: 6
          },
          {
            name: 'CFInfoColl',
            task_id: 11
          }
        ]
      }
    });
  } else {
    res.json({
      body: {
        buttons: [
          {
            name: 'Giftcards',
            task_id: 6
          },
          {
            name: 'MedExam',
            task_id: 7
          },
          {
            name: 'emprequest',
            task_id: 8
          },
          {
            name: 'todo',
            task_id: 9
          },
          {
            name: 'PreEntry',
            task_id: 10
          },
          {
            name: 'CFInfoColl',
            task_id: 11
          }
        ]
      }
    });
  }

};

// 查询证件信息
// id_type 类型
// ('身份证', 'id_card'),
// ('军官证', 'certificate_of_officers'),
// ('警官证', 'police_officer_certificate'),
// ('香港澳门居民护照', 'passport_of_hk_macao_residents'),
// ('台胞证', 'taiwan_resident_pass'),
// ('中国护照', 'chinese_passport'),
// ('外国护照', 'foreign_passport'),
// ('香港永久居留证', 'hk_permanent_residence_certificate'),
// ('澳门永久居留证', 'macao_permanent_residence_certificate'),
// ('台湾身份证', 'taiwan_identity_card'),
// ('外国永久居留证', 'foreign_permanent_residence_permit')
const certificate_infoObj = {
  'name': '柴小姐',
  'gender': ['女'],
  'date_of_birth': 13213213,
  'id_type': 'id_card', //待定
  'id_number': '330382199407251732',
  'folk': '汉',
  'id_address': '上海市花木路888弄99999',
  'issuance': '莲花市公安局', //证件发行机构
  'start_date': 1534821290944, //开始日期
  'end_date': 1534821290944, //，，结束日期
  'state': 0, // 0: 未验证消息判断
  'img_id_front': '',
  'img_id_back': '',
  'c_img_id_list': []
}

export const certificate_info = (req, res) => {
  res.json({
    body: certificate_infoObj
  });
};


// 身份验证 第一步
export const validate_user = (req, res) => {
  res.json({
    body: {
      state: 1,   //2 失败
      message: '成功'
    }
  });
};


// # 收集信息的任务id
//     task_id = Column(Integer)
//     # 证件类型、证件号码、证件失效日期
//     id_type = Column(String(50))
//     id_number = Column(String(50))

//     name = Column(String(50)) /姓名

//     # 性别、出生日期
//     gender = Column(String(50)) // 性别
//     date_of_birth = Column(String) // 真实生日

//     # 证件地址
//     id_address = Column(String)
//     # 证件发行机构，开始日期，结束日期
//     issuance = Column(String)
//     start_date = Column(String)
//     end_date = Column(String)

//     # 证件图片id列表
//     c_img_id_list = Column(PickleType)

//     en_name = Column(String(50)) // 英文名

//     # 婚姻状态
//     marriage_status = Column(String(50)) //婚姻状态

//     mobile = Column(String(50))
//     email = Column(String(50))

//     # 国籍、民族
//     nationality = Column(String(50)) // 国籍
//     folk = Co/*  */lumn(String(50))  //民族
//     # 原国籍身份证、原国籍姓名
//     origin_id_card = Column(String(50))
//     origin_name = Column(String(50))
//     # 当前居住城市、当前居住地址
//     living_city = Column(String(50))
//     living_address = Column(String(50))

//     # 紧急联系人、紧急联系人手机
//     contacts_name = Column(String(50))
//     contacts_mobile = Column(String(50))
//     # HUKOU_TYPE = [
//     #     ('local_urban', 'Local Urban'),     # 本地城镇
//     #     ('local_rural', 'Local Rural'),     # 本地农村
//     #     ('other_urban', 'Other Urban'),     # 外地城镇
//     #     ('other_rural', 'Other Rural'),     # 外地农村
//     # ]
//     # 户口性质、户口城市、户口地址、上传图片id列表
//     hukou_type = Column(String(50))
//     hukou_city = Column(String(50))
//     hukou_address = Column(String(50))
//     hukou_img_list = Column(PickleType)

//     # 社保缴纳地、缴纳城市名称、是否已有社保账户、社保账号
//     si_city_id = Column(String(50))
//     si_city_name = Column(String(50))
//     is_si_account = Column(Boolean)
//     si_account = Column(String(50))

//     # 公积金缴纳地、缴纳城市名、是否有公积金账号、公积金账号
//     hf_city_id = Column(String(50))
//     hf_city_name = Column(String(50))
//     is_hf_account = Column(Boolean)
//     hf_account = Column(String(50))

//     # 公积金缴纳地、缴纳城市名、补充公积金账号
//     shf_city_id = Column(String(50))
//     shf_city_name = Column(String(50))
//     shf_account = Column(String(50))

//     # 开户银行
//     bank_name = Column(String(50))
//     # 开户支行
//     sub_branch = Column(String(50))
//     # 开户城市
//     sub_city = Column(String(50))
//     # 个人客户银行卡号
//     bank_card_number = Column(String(50))
//     # 个人客户开户名
//     bank_card_name = Column(String(50))
//     # 纳税人识别码

//     # 用退工信息
//     rework_img_list = Column(PickleType)
// 基础表单 第二步




// 单独创建名族类型 根据类型进行判断 folk
// 基本信息 BasicInfo
// 联系方式 CTCTInfo
// 户籍信息 HukouInfo
// 社保档案 SI_Acct
// 公积金档案 HF_Acct
// 工资卡及个税信息 PCPIT
// 用退工信息 ESCert
const formList = [
  {
    groupName: "基本信息",
    groupType: 'BasicInfo',
    isShow: true, // 是否显示
    data: [
      { // 单个表单填写项目要素
        field: 'name', //字段名 对应上传给后台的字段名
        text: '姓名',//表单名
        isShow: true,  // 是否显示
        readOnly: false,
        required: true, // 是否必填项
        type: 'char',//表单类型 必须 填写文本 填写数字  下拉框 时间 图片等
        placeholder: '请填写姓名',// 用户未填写表单时的提示信息
        value: '黄美美',// 填写的值 草稿时可能有数据
        errorMessage: '请填写姓名'
      },
      {
        field: 'en_name',
        text: '英文名',
        isShow: true,
        readOnly: false,
        required: false,
        type: 'char',
        placeholder: '请填写英文名',
        value: 'beauty',
        errorMessage: '请填写英文名'
      },
      {
        field: 'gender',
        text: '性别',
        isShow: true,
        readOnly: false,
        required: true,
        type: 'select',
        placeholder: '请选择性别',
        value: ['女'],
        errorMessage: '请选择性别',
        options: [[
          {
            label: '男', // 选项名 
            value: 'MALE', // 选项对应值 英文
          },
          {
            label: '女',
            value: 'FEMALE',
          }
        ]]
      },
      {
        field: 'nationality',
        text: '国籍/地区',
        isShow: true,
        readOnly: false,
        required: true,
        type: 'nation',
        placeholder: '请选择国籍',
        value: ['chinese_passport'],
        errorMessage: '请选择国籍',
        options: [[
          {
            label: '军官证',
            value: 'certificate_of_officers'
          },
          {
            label: '警官证',
            value: 'police_officer_certificate'
          },
          {
            label: '香港澳门居民护照',
            value: 'passport_of_hk_macao_residents'
          },
          {
            label: '台胞证',
            value: 'taiwan_resident_pass'
          },
          {
            label: '中国护照',
            value: 'chinese_passport'
          },
          {
            label: '外国护照',
            value: 'foreign_passport'
          },
          {
            label: '香港永久居留证',
            value: 'hk_permanent_residence_certificate'
          },
          {
            label: '澳门永久居留证',
            value: 'macao_permanent_residence_certificate'
          },
          {
            label: '台湾身份证',
            value: 'taiwan_identity_card'
          },
          {
            label: '外国永久居留证',
            value: 'foreign_permanent_residence_permit'
          },
        ]]
      },
      {
        field: 'date_of_birth',
        text: '证件生日',
        isShow: true,
        readOnly: false,
        required: true,
        type: 'date',
        placeholder: '请填写生日',
        value: 1534821290944,
        errorMessage: '请输入日期',
      },
      {
        field: 'folk',
        text: '民族',
        isShow: true,
        readOnly: false,
        required: false,
        type: 'folk',
        placeholder: '请选择民族',
        value: ['汉'],
        errorMessage: '请选择民族',
        options: [[
          {
            label: '汉', // 选项名 
            value: '汉', // 选项对应值 英文
          },
          {
            label: '满',
            value: '满',
          }
        ]]
      },
      {
        field: 'marriage_status',
        text: '婚姻状态',
        isShow: true,
        readOnly: false,
        required: false,
        type: 'select',
        placeholder: '请选择婚姻状态',
        value: ['married'],
        errorMessage: '请选择婚姻状态',
        options: [[
          {
            label: '已婚', // 选项名 
            value: 'married', // 选项对应值 英文
          },
          {
            label: '未婚',
            value: 'unmarried',
          },
          {
            label: '离异',
            value: 'divorce',
          },
          {
            label: '丧偶',
            value: 'widowed',
          }
        ]]
      },

    ]
  },
  {
    groupName: '联系方式',
    groupType: 'CTCTInfo',
    isShow: true,
    data: [
      {
        field: 'mobile',
        text: '常用手机',
        isShow: true,
        readOnly: false,
        required: true,
        type: 'tel',
        placeholder: '请填写手机',
        value: 15067773371,
        errorMessage: '请填写您的手机'
      },
      {
        field: 'email',
        text: '个人邮箱',
        isShow: true,
        readOnly: false,
        required: false,
        type: 'email',
        placeholder: '请填写邮箱',
        value: 'beauty@Huang.com',
        errorMessage: '请填写您的邮箱'
      },
      {
        field: 'living_city',
        text: '当前居住城市',
        isShow: true,
        readOnly: false,
        required: false,
        type: 'address',
        placeholder: '请选择居住城市',
        value: ['已婚'],
        errorMessage: '请选居住城市',
        // options: [[ 
        //   {
        //     label: '上海', // 选项名 
        //     value: '上海', // 选项对应值 英文
        //   },
        //   {
        //     label: '杭州',
        //     value: '杭州',
        //   }
        // ]]
      },
      {
        field: 'living_address',
        text: '当前居住地址',
        isShow: true,
        readOnly: false,
        required: false,
        type: 'textarea',
        placeholder: '请填写地址',
        value: '上海市花木路9999弄',
        errorMessage: '请填写您的地址'
      },
      {
        field: 'contacts_name',
        text: '紧急联系人姓名',
        isShow: true,
        readOnly: false,
        required: false,
        type: 'char',
        placeholder: '请填写紧急人姓名',
        value: '王晓梅',
        errorMessage: '请填写您的紧急人姓名'
      },
      {
        field: 'contacts_mobile',
        text: '紧急联系人手机',
        isShow: true,
        readOnly: false,
        required: false,
        type: 'tel',
        placeholder: '请填写紧急联系人手机',
        value: 15067773371,
        errorMessage: '请填写您的紧急联系人手机'
      },
    ]
  },
  {
    groupName: '户籍信息',
    groupType: 'HukouInfo',
    isShow: true,
    data: [
      {
        field: 'hukou_type',
        text: '户口性质',
        isShow: true,
        readOnly: false,
        required: true,
        type: 'select',
        placeholder: '请选择户口性质',
        value: ['城镇'],
        errorMessage: '请选户口性质',
        options: [[
          {
            label: '城镇', // 选项名 
            value: 'urban', // 选项对应值 英文
          },
          {
            label: '非城镇',
            value: 'rural',
          }
        ]]
      },
      {
        field: 'hukou_city',
        text: '户口所在省市',
        isShow: true,
        readOnly: false,
        required: true,
        type: 'address',
        placeholder: '请选择户口所在省市',
        value: ['云南'],
        errorMessage: '请选户口所在省市',
        // options: [[ 
        //   {
        //     label: '上海', // 选项名 
        //     value: '上海', // 选项对应值 英文
        //   },
        //   {
        //     label: '杭州',
        //     value: '杭州',
        //   }
        // ]]
      },
      {
        field: 'hukou_address',
        text: '户籍地址',
        isShow: true,
        readOnly: false,
        required: false,
        type: 'textarea',
        placeholder: '请填写户籍地址',
        value: '云南省普洱市某个小区',
        errorMessage: '请填写您的户籍地址'
      },
      {
        field: 'hukou_img_list',
        text: '上传拍照件',
        type: 'submitImg',
        isShow: true,
        readOnly: false,
        required: false
      }
    ]
  },
  {
    groupName: '社保档案',
    groupType: 'SI_Acct',
    isShow: true,
    data: [
      {
        field: 'si_city_id',
        text: '缴纳城市',
        isShow: true,
        readOnly: true,
        required: true,
        type: 'select',
        placeholder: '请选择缴纳城市',
        value: ['上海'],
        errorMessage: '请选缴纳城市',
        options: [[
          {
            label: '上海', // 选项名 
            value: '上海', // 选项对应值 英文
          },
          {
            label: '杭州',
            value: '杭州',
          }
        ]]
      },
      {
        field: 'is_si_account',
        text: '有无社保账号',
        isShow: true, //是否只读
        readOnly: false,
        required: true, //是否必填
        type: 'select',
        placeholder: '请选择是否有社保账号',
        value: ['已有账号'],
        errorMessage: '请选是否有社保账号',
        options: [[
          {
            label: '已有账号', // 选项名 
            value: '1', // 选项对应值 英文
          },
          {
            label: '没有,需要新办',
            value: '0',
          }
        ]]
      },
      {
        field: 'si_account',
        text: '社保账号',
        isShow: true,
        readOnly: false,
        required: true,
        type: 'char',
        placeholder: '请填写社保账号',
        value: 31010111231231231231,
        errorMessage: '请填写您的社保账号'
      },
    ]
  },
  {
    groupName: '公积金档案',
    groupType: 'HF_Acct',
    isShow: true,
    data: [
      {
        field: 'hf_city_id',
        text: '缴纳城市',
        isShow: true,
        readOnly: false,
        required: true,
        type: 'select',
        placeholder: '请选择缴纳城市',
        value: ['上海'],
        errorMessage: '请选缴纳城市',
        options: [[
          {
            label: '上海', // 选项名 
            value: '上海', // 选项对应值 英文
          },
          {
            label: '杭州',
            value: '杭州',
          }
        ]]
      },
      {
        field: 'is_hf_account',
        text: '有无公积金账号',
        isShow: true,
        readOnly: false,
        required: true,
        type: 'select',
        placeholder: '请选择是否有公积金账号',
        value: ['已有账号'],
        errorMessage: '请选是否有公积金账号',
        options: [[
          {
            label: '已有账号', // 选项名 
            value: '已有账号', // 选项对应值 英文
          },
          {
            label: '没有,需要新办',
            value: '没有,需要新办',
          }
        ]]
      },
      {
        field: 'hf_account',
        text: '基本公积金账号',
        isShow: true,
        readOnly: false,
        required: true,
        type: 'char',
        placeholder: '请填写基本公积金账号',
        value: 31010111231231231231,
        errorMessage: '请填写您的基本公积金账号'
      },
      {
        field: 'shf_account',
        text: '补充公积金账号',
        isShow: true,
        readOnly: false,
        required: true,
        type: 'char',
        placeholder: '请填写补充公积金账号',
        value: 31010111231231231231,
        errorMessage: '请填写您的补充公积金账号'
      },
    ]
  },
  {
    groupName: "工资卡及个税信息",
    groupType: 'PCPIT',
    isShow: true, // 是否显示
    data: [
      {
        field: 'bank_img_list',
        text: '上传拍照件',
        type: 'aiSubmitImg',
        isShow: true,
        readOnly: false,
        required: false
      },
      {
        field: 'bank_card_name',
        text: '持卡人开户名',
        isShow: true,
        readOnly: false,
        required: true,
        type: 'char',
        placeholder: '请填写开户名',
        value: '黄美美',
        errorMessage: '请填写开户名'
      },
      {
        field: 'bank_card_number',
        text: '储蓄卡号',
        isShow: true,
        readOnly: false,
        required: true,
        type: 'int',
        placeholder: '请填写储蓄卡号',
        value: 62123123123123213122,
        errorMessage: '请填写储蓄卡号'
      },
      {
        field: 'bank_name',
        text: '银行',
        isShow: true,
        readOnly: false,
        required: true,
        type: 'select',
        placeholder: '请选择银行',
        value: ['招商银行'],
        errorMessage: '请选择银行',
        options: [[
          {
            label: '华夏银行', // 选项名 
            value: '华夏银行', // 选项对应值 英文
          },
          {
            label: '招商银行',
            value: '招商银行',
          }
        ]]
      },
      {
        field: 'sub_city',
        text: '开户地',
        isShow: true,
        readOnly: false,
        required: true,
        type: 'select',
        placeholder: '请选择开户地',
        value: ['上海'],
        errorMessage: '请选开户地',
        options: [[
          {
            label: '上海', // 选项名 
            value: '上海', // 选项对应值 英文
          },
          {
            label: '杭州',
            value: '杭州',
          }
        ]]
      },
      {
        field: 'sub_branch',
        text: '开户支行全称',
        isShow: true,
        readOnly: false,
        required: true,
        type: 'char',
        placeholder: '请填写开户支行全称',
        value: '招商银行花木支行',
        errorMessage: '请填写开户支行全称'
      },
      {
        field: 'tin',
        text: '纳税人识别码',
        isShow: true,
        readOnly: false,
        required: true,
        type: 'char',
        placeholder: '请填写纳税人识别码',
        value: 1231230111231231231231,
        errorMessage: '请填写您的纳税人识别码'
      },
    ]
  },
  {
    groupName: '用退工信息',
    groupType: 'ESCert',
    isShow: true,
    data: [
      {
        field: 'rework_img_list',
        text: '请上传上家公司退工单或离职证明:',
        type: 'submitImg',
        isShow: true,
        readOnly: false,
        required: true
      }
    ]
  }
];
export const collect_mod = (req, res) => {
  res.json({
    body: {
      formList
    }
  });
};


// 获取草稿

let obj = {
  // 基本信息
  name: '柴小姐',
  en_name: 'cherish',
  gender: ['MALE'],
  nationality: ['chinese_passport'],
  date_of_birth: 1234909123,
  folk: ['03'],
  marriage_status: ['married'],
  //联系方式
  mobile: 15067773371, // 主要联系手机
  email: '547964566@qq.com',
  living_city: ["310000", "310100"],
  living_address: '上海市花木路888弄888号9sadf水电费',
  contacts_name: '小狮子', //紧急联系人姓名
  ontacts_mobile: 15290421033,
  //户籍信息
  hukou_type: ['urban'],// 可选城镇 非城镇
  hukou_city: ["310000", "310100"],
  hukou_address: '云南省普洱市某个小区某个楼909',
  hukou_img_list: ['imgId', 'imgId2'],
  //社保档案
  si_city_id: ["310000", "310100"], //有异议 id
  is_si_account: [1], // 没有,需要新办 和 已有账号账号
  si_account: 330382199307231742,
  //公积金档案
  hf_city_id: ["310000", "310100"], //有异议 id
  is_hf_account: [1],
  hf_account: 10000000001, //基本公积金账号
  shf_account: 100000000001, //补充公积金账号
  //工资卡及个税信息
  bank_card_name: '黄大美',
  bank_card_number: 622258801118888888,//储蓄卡号
  bank_name: [5],// 按照oudo
  sub_city: ["310000", "310100"], //
  sub_branch: '招商银行支行',
  tin: 1234101020210301203,
  bank_img_list: ['id'],
  // 用退工信息
  rework_img_list: ['imgId']
};

let newObj = {
  // 基本信息
  name: '柴小姐',
  en_name: 'cherish',
  gender: 'MALE',
  nationality: 'CHN',
  date_of_birth: 1234909123,
  folk: '03',
  marriage_status: 'married',
  //联系方式
  mobile: 15067773371, // 主要联系手机
  email: '547964566@qq.com',
  living_city: "310100",
  living_address: '上海市花木路888弄888号9收到罚单阿萨德',
  contacts_name: '小狮子', //紧急联系人姓名
  contacts_mobile: 15067773371, 
  //户籍信息
  hukou_type: 'urban',// 可选城镇 非城镇
  hukou_city: "310100",
  hukou_address: '云南省普洱市某个小区某个楼909',
  hukou_img_list: ['imgId', 'imgId2'],
  //社保档案
  si_city_id: "310100", //有异议 id
  is_si_account: 1, // 没有,需要新办 和 已有账号账号
  si_account: 330382199307231742,
  //公积金档案
  hf_city_id: "310000", //有异议 id
  is_hf_account: 1,
  hf_account: 10000000001, //基本公积金账号
  shf_account: 100000000001, //补充公积金账号
  //工资卡及个税信息
  bank_card_name: '黄大美',
  bank_card_number: 622258801118888888,//储蓄卡号
  bank_name: 5,// 按照oudo
  sub_city: "310100", //
  sub_branch: '招商银行支行',
  tin: 1234101020210301203,
  bank_img_list: ['id'],
  // 用退工信息
  rework_img_list: ['imgId'],

  id_number: 330382199307231742,
  id_address: '浙江省温州市北白象哈哈哈哈路107号333',
  issuance: '莲花市公安局',
  start_date:1534821290944,
  end_date:1534821290944,
  img_id_front: 1,
  img_id_back: 0,
  c_img_id_list: [],
  origin_id_card: 123,//原国籍身份证、原国籍姓名
  origin_name: '杨柴',
};

export const get_collect_draft = (req, res) => {
  res.json({
    // body: obj
    body: newObj
  })
}
// 保存草稿
export const save_collect_draft = (req, res) => {
  newObj = {
    ...newObj,
    ...req.body
  }
  res.json({
    // body: obj
    body: {
      state: 1
    }
  })
}


// ger_plat_user_customers 企业列表
// ger_plat_user_auth 功能列表
// get_certificate_info 查询证件信息
// 原来的验证接口 身份验证扩展
// get_collect_mod 获取表单
//                 填写表单上传图片
// save_collect_draft 保存草稿
// get_collect_draft 获取草稿
// submit_collect_info 提交表单


export default {
  cst_list,
  feature_list,
  certificate_info,
  validate_user,
  collect_mod,
  get_collect_draft,
  save_collect_draft
}