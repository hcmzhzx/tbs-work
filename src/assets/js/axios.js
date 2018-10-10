import axios from 'axios'
import {API_URL} from './api'

//初始化axios
axios.defaults.baseURL=`${API_URL}`;

// 添加请求拦截器
axios.interceptors.request.use(config=>{
   //console.log(config);
   return config
});

// 添加响应拦截器
axios.interceptors.response.use(res=>{
   //console.log(res);
   return res.data;
},err=>{
   const errDate = err.response;
   console.log(errDate);
   /*if(errDate.data.message === "登录已失效"){
      Toast({ // 提示错误
         message:errDate.data.message,
         iconClass: 'rd rd-guanbi',
         position:'center',
         className:'error',
         duration:900
      })
   }*/
})

export default axios;
