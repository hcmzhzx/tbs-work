import axios from '../../assets/js/axios'

const state = { //属性
   goodsCate:{arr:[],meta:{}}

};

const getters = { //获取属性 使用(getters)
   goodsClassify:state => state.goodsCate
};

const mutations = { //改变属性 使用(commit)
   classifyState(state,payload){  //商品分类
      state.goodsCate.arr = [];
      for(let val of payload.data){
         state.goodsCate.arr.push(val);
      }
      state.goodsCate.meta = payload.meta.pagination;
   },

   classifyPage(state,payload){  //商品分类分页
      for(let val of payload.data){
         state.goodsCate.arr.push(val);
      }
      state.goodsCate.meta = payload.meta.pagination;
   }
};

const actions = { //应用 mutation 使用(dispath)
   // 单个分类下的商品
   goodsCate({commit,state},ID){
      return new Promise((res,rej)=>{
         axios.get(`category/${ID}/products`).then(ret=>{
            commit('classifyState',ret)
         }).catch(err=>rej(err))
      })
   },

   CatePage({commit},url){
      axios.get(url).then(ret=>{
         commit('classifyPage',ret)
      })
   }
};

export default {state, getters, mutations, actions};
