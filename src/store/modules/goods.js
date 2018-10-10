import axios from '../../assets/js/axios'

const state = {
   goodsAll: {arr: [], meta: {}},
   goodsHot: {arr: [], meta: {}},
   goodsRecommend: {arr: [], meta: {}},
   goodsPriceDesc: {arr: [], meta: {}},
   goodsPriceAsc: {arr: [], meta: {}},

   goodsClassify: [],
};

const getters = { //获取属性  使用(getters)
   goodsAll: state => state.goodsAll,
   goodsHot: state => state.goodsHot,
   goodsRecommend: state => state.goodsRecommend,
   goodsPriceDesc: state => state.goodsPriceDesc,
   goodsPriceAsc: state => state.goodsPriceAsc,

};

const mutations = { //改变属性的状态 使用(commit)
   goodsState(state, payload){
      let data = payload.arr.data;
      //console.log(data,payload.type);
      if (payload.type == 'all') {
         for (let val of data) {
            state.goodsAll.arr.push(val);
         }
         state.goodsAll.meta = payload.arr.meta.pagination;
      } else if (payload.type == 'hot') {
         for (let val of data) {
            state.goodsHot.arr.push(val);
         }
         state.goodsHot.meta = payload.arr.meta.pagination;
      } else if (payload.type == 'promotion') {
         for (let val of data) {
            state.goodsRecommend.arr.push(val);
         }
         state.goodsRecommend.meta = payload.arr.meta.pagination;
      } else {
         // 商品价格排序
         if (payload.type == 'desc') {
            for (let val of data) {
               state.goodsPriceDesc.arr.push(val);
            }
            state.goodsPriceDesc.meta = payload.arr.meta.pagination;
         } else {
            for (let val of data) {
               state.goodsPriceAsc.arr.push(val);
            }
            state.goodsPriceAsc.meta = payload.arr.meta.pagination;
         }
      }
   }
};

const actions = { //应用 mutations  使用(dispatch)
   // 请求商品列表
   goodsInfo({commit, state}, data){
      //console.log(data);
      if (data.type == 'all') {
         if (state.goodsAll.arr.length) return Promise.resolve(state.goodsAll.arr)
      } else if (data.type == 'hot') {
         if (state.goodsHot.arr.length) return Promise.resolve(state.goodsHot.arr)
      } else if (data.type == 'promotion') {
         if (state.goodsRecommend.arr.length) return Promise.resolve(state.goodsRecommend.arr)
      } else {
         if(data.price == 'desc'){
            if (state.goodsPriceDesc.arr.length) return Promise.resolve(state.goodsPriceDesc.arr)
         } else {
            if (state.goodsPriceAsc.arr.length) return Promise.resolve(state.goodsPriceAsc.arr)
         }
      }
      return axios.get(data.URL).then(ret => {
         commit("goodsState", {arr: ret, type: data.type, price: data.price});
         return ret
      })
   },
   // 商品分页
   goodsPage({commit}, data){
      return axios.get(data.URL).then(ret => {
         commit("goodsState", {arr: ret, type: data.type, price: data.price});
         return ret
      })
   },
   // 商品分类
   goodsSort({commit, state}){
      if (state.goodsClassify.length) return Promise.resolve(state.goodsClassify)
      return axios.get('categories').then(ret => {
         commit('classifyState', ret);
         return ret
      })
   }
};

export default {state, getters, mutations, actions};
