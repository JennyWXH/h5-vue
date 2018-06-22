import Qs from 'qs'

const progressConfig = require('../../config')
var base_url
if(process.env.NODE_ENV=='production') {
	base_url = JSON.parse(progressConfig.build.env.API_ROOT)
}else {
	base_url = JSON.parse(progressConfig.dev.env.API_ROOT)
}
export default{

	  url: 'route',
	  // baseURL: 'http://t.imoduo.com:9000/moduo/',
	  baseURL: base_url,
	  method:'POST',
	  transformRequest: [function (data) {
	  	//参数直接传入字符串的时候
		if (Object.prototype.toString.call(data) === "[object String]") {console.log('我是字符串')
		}else {
			//为了避免qs格式化时对内层对象的格式化先把内层的对象转为
			// data.CustData = JSON.stringify(data.CustData);
			//由于使用的form-data传数据所以要格式化
			data = JSON.stringify(data);
		}
		return data;
	  }],

	  transformResponse: [function (data) {
	  	if(typeof(data) == 'string')
		{
			data = JSON.parse(data);
		}
	    return data;
	  }],
	  responseType: 'json', // default
	  headers: {
	  	'Content-Type':'application/x-www-form-urlencoded',
		  // 'Access-Control-Allow-Origin':'*',
		  // 'Access-Control-Allow-Methods':'*',
		 // 'Access-Control-Allow-Headers':'Authorization,Origin, X-Requested-With, Content-Type, Accept, contentType',
		// 'X-Requested-With': 'XMLHttpRequest'
	  },

	  withCredentials:true,

	  params: {
	    // eid:8484662,
	    // openid:'57c80528e4b07e300ed4ffbb',
	    // pubacckey:'',
	    // timestamp:'',
	    // nonce:'',
	    // pubaccid:'',
	  },


	  paramsSerializer: function(params) {
	    return Qs.stringify(params)
	  },


  	data: {

  	},


	timeout: 20000,


	withCredentials: false, // default






	onUploadProgress: function (progressEvent) {
	    // Do whatever you want with the native progress event
	},


	onDownloadProgress: function (progressEvent) {
	    // Do whatever you want with the native progress event
	},


	maxContentLength: 2000,


	validateStatus: function (status) {
	    return status >= 200 && status < 300; // default
	},


	maxRedirects: 5, // default
}
