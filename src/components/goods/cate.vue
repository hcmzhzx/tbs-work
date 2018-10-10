<template>
   <div class="flexv">
      <div id="header" class="flex">
         <a href="javascript:;" @click="$router.go(-1)" class="rd rd-houtui flex centerv side icon" style="width:40px;"></a>
         <a href="javascript:;" @click="$router.go(-1)" class="flexitem search">{{text}}</a>
         <a href="javascript:;" @click="$router.go(-1)" class="flex center rd rd-gi side icon" style="width:40px;"></a>
      </div>

      <div id="main" class="flexitemv">
         <div id="goodslist" class="br" style="padding-bottom:50px;"
              v-infinite-scroll='loadMore'
              infinite-scroll-disabled='loading'
              infinite-scroll-distance='6'>
            <div class="lists" v-for="(item,index) in dataList" :key="index" @click="$router.push({name:'detail',query:{id:item.id}})">
               <div class="cover"><div><img :src="item.cover"></div></div>
               <h3 class="flexv center">{{item.title}}</h3>
               <p class="flex center">¥{{item.price}}</p>
            </div>
         </div>

         <div id="more" class="flex center" v-if="loading"><i></i><span>正在加载..</span></div>
      </div>
      <!--底部栏-->
      <div id="tabbar" class="flex">
         <router-link class="flexitem center" :to="{name:'category'}">产品分类</router-link>
         <router-link class="flexitem center" :to="{name:'index'}">工作室</router-link>
         <router-link class="flexitem center" :to="{name:'category'}">产品搜索</router-link>
      </div>
   </div>
</template>

<script>
   import {InfiniteScroll} from 'mint-ui'

   export default {
      created(){
         this.id = this.$route.query.id;
         this.text = this.$route.query.text;
         this.$store.dispatch('goodsCate',this.id)
      },
      data(){
         return{
            id:0, //分类 id
            text:'', //分类标题

            loading: false
         }
      },
      methods:{
         loadMore(){
            /*let meta = this.$store.getters.goodsClassify.meta;
            console.log(meta);
            this.loading = true;
            if (meta.total_pages == meta.current_page) { //超过分页
               this.loading = false;
               return false;
            }
            setTimeout(()=>{
               this.$store.dispatch('CatePage', meta.links.next);
               this.loading = false
            },200)*/
         }
      },
      computed:{
         dataList(){
            return []
            //return this.$store.getters.goodsClassify.arr
         }
      }
   }
</script>

<style>

</style>
