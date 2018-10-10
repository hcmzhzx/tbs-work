import axios from '../../assets/js/axios'

const state = {
   user:[],
   service:[]
}

const getters = {  //获取属性的状态  使用(getters)

}

const mutations ={  //改变属性的状态 使用(commit)
   userState(state,user){
      for(let[key,val] of Object.entries(user)){
         state[key] = val;
      }
   },
   partnerState(state,service){
      for(let[key,val] of Object.entries(service)){
         state[key] = val;
      }
   }
}

const actions = {  //应用 mutations  使用(dispatch)
   //获取用户信息
   userInfo({commit,state}){
      if(Object.values(state.user).length) return Promise.resolve(state.user)
      return axios.get('user?include=brand').then(user=>{
         commit("userState",{user:user});
         return user
      })
   },
   //获取客服信息
   partnerInfo({commit,state}){
      if(state.service.length) return Promise.resolve(state.service)
      return axios.get('partner').then(partner=>{
         commit("partnerState",{service:partner});
         return partner
      })
   }
}

export default {state,getters,mutations,actions}
