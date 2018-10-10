<template>
   <div class="flexv">
      <my-header :content="text" :router="router"></my-header>

      <div id="main" class="flexitemv">
         <div id="album" v-if="albumlist.length>0"
              v-infinite-scroll='loadMore'
              infinite-scroll-disabled='loading'
              infinite-scroll-distance='10'>
            <div v-for="(item,index) in albumlist" :key="index" :class="['lists',{odd:classTab(index)},{even:!classTab(index)}]">
               <div class="box cover"><img :src="item.cover" ></div>
               <div class="box info" @click="$router.push({name:'album-datail', query:{id:item.id, tit:item.title}})">
                  <div class="flexv centerh">
                     <h4>{{item.title}}</h4>
                     <p class="flexitem">{{item.desc}}</p>
                     <a href="javascript:;" class="flex centerv">
                        <span class="flexitem">查看详情</span><i class="rd rd-qianjin"></i>
                     </a>
                  </div>
               </div>
            </div>
            <div id="more" class="flex center" v-if="loadingMore"><i></i><span>正在加载..</span></div>
         </div>

         <div id="none" class="flexitemv center" v-else><div class="icon"></div><p>暂未创建相册~</p></div>
      </div>
   </div>
</template>

<script>
   import myHeader from '../header/header.vue'
   import {InfiniteScroll} from 'mint-ui'

   export default {
      components: {
         myHeader
      },
      created(){
          this.$store.dispatch('albumData')
      },
      data(){
         return {
            text: '我的相册',
            router: 'index',

            loading: false, //为true时不会触发加载更多，false可以触发
            loadingMore:false
         }
      },
      methods:{
         classTab(index){ //控制列表切换
            return index%2 == 0 ? true : false;
         },

         loadMore(){  //分页
            this.loading = true;
            this.loadingMore = true;
            let meta = this.$store.getters.getalbumlist.meta;
            if (meta.total_pages == meta.current_page) { //超过分页
               this.loading = true;
               this.loadingMore = false;
               return false;
            } else {
               setTimeout(() => {
                  this.$store.dispatch('albumPage', meta.links.next);
                  this.loading = false;
                  this.loadingMore = false
               }, 200)
            }
         }
      },
      computed:{
         albumlist(){
            return this.$store.getters.getalbumlist.arr;
         }
      }
   }
</script>

<style scoped>
   #album{max-width: 480px; margin: 0 auto;}
   #album .lists{position: relative; padding-top: 50%;}
   #album .lists .box{position: absolute; top: 0; width: 50%; padding-top: 50%; background: #eee; overflow: hidden;}
   #album .even .cover{left: 0;}
   #album .odd .cover{right: 0;}
   #album .lists .info{background: #fff;}
   #album .even .info{right: 0;}
   #album .odd .info{left: 0;}
   #album .lists .cover img{position: absolute; top: 0; left: 0;width:100%;}
   #album .lists .info div{position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px; overflow: hidden;}
   #album .lists .info div h4{font-weight: normal; height: 30px; line-height: 30px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
   #album .lists .info div p{font-size: 0.8em; color: #888; padding: 10px 0;}
   #album .lists .info div a{color: #cc3333;}

   #album .form{padding: 10px;}
   #album .form .title{height: 40px; color: #666;}
   #album .form .text{border: 1px solid #f5f5f5; height: 20px; line-height: 20px; padding: 15px;background:#fff;}
   #album .form textarea.text{resize: none; height: 140px; font-size: 1em;}
</style>
