<template>
   <div id="videos" class="flexv">
      <div id="header" class="flex">
         <a href="javascript:;" @click="$router.push({name:'index'})" class="rd rd-houtui flex centerv side icon"></a>
         <div class="flexitem center tabs">
            <a href="javascript:;" v-for="(item,index) in Vtab" :key="index"
               @click="tab(index,item.id)" :class="['flex','center',{current:contact==index}]">{{item.title}}</a>
         </div>
         <a href="javascript:;" class="flex center side"></a>
      </div>

      <div id="player">
         <div class="player">
            <iframe frameborder="0" :src="V_url" allowfullscreen></iframe>
         </div>
      </div>

      <div id="main" class="flexitemv" style="background:#fff">
         <div id="videolist"
              v-infinite-scroll='loadMore'
              infinite-scroll-disabled='loading'
              infinite-scroll-distance='10'>
            <div class="gap"></div>
            <h2 class="flex centerv vtitle">视频列表</h2>

            <div class="flex lists" v-for="item in videoLists" :key="item.id" @click="Vurl(item)">
               <div class="flex cover">
                  <img :src="item.cover" :alt="item.title" class="fitimg"/>
               </div>
               <div class="flexitemv info">
                  <h3 class="flexv">{{item.title}}</h3>
                  <p class="flexitem endv">{{item.create_time}}</p>
               </div>
            </div>

            <div id="more" class="flex center" v-if="loading"><i></i><span>正在加载..</span></div>
            <div id="more" class="flex center" v-if="allLoaded"><span>已加载所有视频</span></div>
         </div>
      </div>
   </div>
</template>

<script>
   import {InfiniteScroll} from 'mint-ui'

   export default{
      created(){
         this.$http.get('video/categories').then(Vtab => {
            this.Vtab = Vtab.data
         });

         this.$store.dispatch('videoData', 1) //默认请求第一项

      },
      data(){
         return {
            Vtab: [],
            contact: 0,

            V_url: '', // 播放视频地址

            id: 0, //tab 栏 id

            loading: false,
            allLoaded: false

         }
      },
      methods: {
         //tab切换
         tab(index, id){
            this.contact = index;
            this.id = id;
            this.$store.dispatch('videoData', id) //切换视频列表
         },
         Vurl(item){ //点击视频
            this.V_url = item.video_url;
            this.$router.push({query: {id: item.id}})
         },
         //滚动加载
         loadMore(){
            this.loading = true;
            let meta = this.$store.getters.getvideoList.meta
            if (meta.total_pages == meta.current_page) { //超过分页
               this.loading = false;
               this.allLoaded = true
               return false;
            } else {
               setTimeout(() => {
                  this.$store.dispatch('VideoPage', meta.links.next).then(() => {
                     this.loading = false
                  })
               }, 200)
            }
         }
      },
      computed: {
         videoLists(){
            if (this.$store.getters.getvideoList.arr.length) {
               // 从链接中判断显示的视频
               if (this.$route.query.id) {
                  let Video = this.$store.getters.getvideoList.arr.filter((item) => {
                     return this.$route.query.id == item.id;
                  })[0];
                  this.V_url = Video.video_url;
                  return this.$store.getters.getvideoList.arr;
               } else {
                  //默认显示第一个视频
                  this.V_url = this.$store.getters.getvideoList.arr[0].video_url;
                  return this.$store.getters.getvideoList.arr;
               }
            }
         }
      }
   }
</script>
