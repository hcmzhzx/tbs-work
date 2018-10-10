import axios from '../../assets/js/axios'

const state = {
   albumlist:{arr:[],meta:{}}
};

const getters = {  //获取属性的状态  使用(getters)
   getalbumlist:state => state.albumlist
};

const mutations = {  //改变属性的状态 使用(commit)
   albumState(state,payload){
      for(let val of payload.data){
         state.albumlist.arr.push(val);
      }
      state.albumlist.meta = payload.meta.pagination;
   }
};

const actions = {  //应用 mutations  使用(dispatch)
   albumData({commit,state}){  //相册列表
      if(state.albumlist.arr.length) return Promise.resolve(state.albumlist.arr)
      return new Promise((res,rej)=>{
         axios.get('album').then(ret=>{
            commit('albumState',ret)
         }).catch(err=>rej(err))
      })
   },

   albumPage({commit},url){  //相册列表分页
      axios.get(url).then(ret=>{
         commit('albumState',ret)
      }).catch()
   }


};

export default {state, getters, mutations, actions};
