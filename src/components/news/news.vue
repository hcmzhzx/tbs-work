<template>
   <div id="news" class="flexv">
      <div id="header" class="flex">
         <a href="javascript:;" @click="$router.push({name:'index'})" class="rd rd-houtui flex centerv side icon" style="width:30px;"></a>
         <div class="flexitem center tabs">
            <a href="javascript:;"
               @click="tab(item.id)"
               v-for="(item,index) in tablist"
               :key="index" :class="['flexitem','center', {current:item.id == id}]">
               <span class="flexv">{{item.title}}</span>
            </a>
         </div>
         <a href="javascript:;" class="flex center side" style="width:30px;"></a>
      </div>

      <div id="main" class="flexitemv">
         <div id="newslist" style="padding-bottom:50px;"
              v-infinite-scroll='loadMore'
              infinite-scroll-disabled='loading'
              infinite-scroll-immediate-check="false"
              infinite-scroll-distance='10'>
            <div class="flex lists" v-for="item in datalists" :key="item.txt" @click="detail(item)">
               <div class="cover"><img :src="`${url}${item.cover}`" class="fitimg"></div>
               <div class="flexitemv info">
                  <h3 class="flexv">{{item.title}}</h3>
                  <p class="flexitem"></p>
                  <p class="flex"><span class="flexitem">{{item.create_time}}</span><span>阅读：{{item.view_num}}</span></p>
               </div>
            </div>

            <div id="more" class="flex center" v-if="loadingMore"><i></i><span>正在加载..</span></div>
         </div>
      </div>
   </div>
</template>
<script>
   import {APP_URL} from '../../assets/js/api'

   export default{
      created(){
         this.id = this.$route.query.id || 4
         this.$http.get('article/categories').then(tab=>{  //tab栏
            this.tablist = tab.data;
         });
         //用户信息
         this.$store.dispatch('userInfo').then(users=>{
            this.user = users
         })
         // 默认请求
         this.$store.dispatch('articleData', this.id);
         this.url = APP_URL
      },
      data(){
          return{
             user:{},
             tablist:[],

             url:'',
             id:4, //tab类 id

             loading: false,  //为true时不会触发加载更多，false可以触发
             loadingMore:false
          }
      },
      methods:{
         tab(id){
            if(this.id == id) return false;
            this.id = id;
            this.$router.push({query:{id,id}})
            this.$store.dispatch('articleData', id);
         },
         detail(item){
            if(this.user.theme == 'default'){
               this.$router.push({name:'newDetail',query:{id:item.id}})
            } else if(this.user.theme == 'bigger'){
               this.$router.push({name:'bigger_new_detail',query:{id:item.id}})
            }
         },
         loadMore(){
            this.loadingMore = this.loading = true;
            let meta = this.$store.getters.articleGet.meta;
            if (meta.total_pages == meta.current_page) { //超过分页
               this.loading = true;
               this.loadingMore = false;
               return false;
            } else {
               setTimeout(() => {
                  this.$store.dispatch('articlePage', meta.links.next).then(()=>{
                     this.loadingMore = this.loading = false;
                  })
               }, 200)
            }
         }
      },
      computed:{
         datalists(){
            return this.$store.getters.articleGet.arr
         }
      }
   }
</script>
