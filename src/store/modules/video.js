import axios from '../../assets/js/axios'

const state = { //属性
   videoList:{arr:[], meta:{}}
};

const getters = { //获取属性 使用(getters)
   getvideoList:state => state.videoList
};

const mutations = { //改变属性 使用(commit)
   //添加列表
   videoState(state,payload){
      state.videoList.arr = [];
      for(let val of payload.data){
         state.videoList.arr.push(val);
      }
      state.videoList.meta = payload.meta.pagination;
   },
   //添加分页列表
   videoPage(state,payload){
      for(let val of payload.data){
         state.videoList.arr.push(val);
      }
      state.videoList.meta = payload.meta.pagination;
   }
};

const actions = { //应用 mutation 使用(dispath)
   //获取视频列表
   videoData({commit,state},id){
      axios.get(`category/${id}/video`).then(ret=>{
         commit('videoState',ret)
      })
   },
   //视频分页
   VideoPage({commit},url){
      axios.get(url).then(ret=>{
         commit('videoPage',ret)
      }).catch()
   }
};

export default {state, getters, mutations, actions};
