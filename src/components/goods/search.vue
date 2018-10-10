<template>
   <div class="flexv">
      <div id="header" class="flex">
         <a href="javascript:;" @click="$router.go(-1)" class="rd rd-houtui flex centerv side icon" style="width:40px;"></a>
         <a href="javascript:;" @click="$router.go(-1)" class="flexitem search">{{text}}</a>
         <a href="javascript:;" @click="$router.go(-1)" class="flex center rd rd-gi side icon" style="width:40px;"></a>
      </div>

      <div id="main" class="flexitemv">
         <div id="goodslist" class="br" v-if="goodsList.length>0"
              v-infinite-scroll='loadMore'
              infinite-scroll-disabled='loading'
              infinite-scroll-distance='10'>
            <div class="lists" v-for="(item,index) in goodsList" :key="index" @click="$router.push({name:'detail',query:{id:item.id}})">
               <div class="cover"><div><img :src="item.cover"></div></div>
               <h3 class="flexv center">{{item.title}}</h3>
               <p class="flex center">¥{{item.price}}</p>
            </div>
         </div>

         <div id="none" class="flexitemv center" v-else><div class="icon"></div><p>暂无相关产品信息~</p></div>
      </div>
   </div>
</template>

<script>
   import {InfiniteScroll} from 'mint-ui'

   export default {
      created(){
         let val = this.text = this.$route.query.keyword;
         this.$http.get(`product/search?key=${val}`).then(list=>{
            this.goodsList = list.data;
            this.meta = list.meta.pagination;
         })
      },
      data(){
         return{
            goodsList:[],
            meta:{},
            text:''
         }
      }
   }
</script>

<style>

</style>
