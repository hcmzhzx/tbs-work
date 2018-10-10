<template>
   <div class="flexv">
      <form method="get" id="header" class="flex" @submit.prevent="sendForm">
         <a href="javascript:;" @click="$router.go(-1)" class="rd rd-houtui flex centerv side icon" style="width:40px;"></a>
         <div class="flexitem center title"><input type="text" name="keyword" ref="keyword" placeholder="请在这里输入商品名称" class="flexitem searchkey"></div>
         <input type="submit" value="搜索" class="flex center side">
      </form>

      <div id="main" class="flexitemv">
         <div id="category" class="clearfix">
            <div class="box" v-for="(item,index) in goodsList" :key="index" @click="cate(item)">
               <div class="cover"><div><img :src="item.cover" :alt="item.title"></div></div>
               <h3 class="flexv center">{{item.title}}</h3>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import axios from '../../assets/js/axios'

   export default {
      created(){
         this.$store.dispatch('goodsSort').then(sort=>{
            this.goodsList = sort
            //console.log(sort);
         })
      },
      data(){
         return{
            goodsList:[]
         }
      },
      methods:{
         cate(item){
            this.$router.push({name:'cate',query:{id:item.id, text:item.title}})
         },
         sendForm(){
            let val = this.$refs.keyword.value;
            this.$router.push({name:'search',query:{keyword:val}})
         }
      }
   }
</script>

<style>

</style>
