import axios from '../../assets/js/axios'

const state = { //属性
   articleList:{arr:[],meta:{}}
};

const getters = { //获取属性 使用(getters)
   articleGet:state => state.articleList
};

const mutations = { //改变属性 使用(commit)
   articleState(state,payload){
      state.articleList.arr = [];
      for(let val of payload.data){
         state.articleList.arr.push(val);
      }
      state.articleList.meta = payload.meta.pagination;
   },

   pageArticle(state,payload){
      for(let val of payload.data){
         state.articleList.arr.push(val);
      }
      state.articleList.meta = payload.meta.pagination;
   }
};

const actions = { //应用 mutation 使用(dispath)
   articleData({commit},ID){
      return new Promise((res,rej)=>{
         axios.get(`category/${ID}/article`).then(ret=>{
            commit('articleState',ret)
         }).catch(err=>rej(err))
      })
   },

   articlePage({commit},url){
      axios.get(url).then(ret=>{
         commit('pageArticle',ret)
      })
   }
};

export default {state, getters, mutations, actions};
