<template>
   <div class="flexv">
      <div id="albumtop">
         <div class="flex user">
            <h3 class="flex center">我的相册</h3>
            <div class="head" :style="{background:`url(${user.upic}) 0% 0% / cover`}"></div>
            <div class="flexitemv info">
               <h2>{{user.name}}</h2>
               <p>{{user.title}}</p>
            </div>
         </div>
         <div class="flex header links">
            <a href="javascript:;" @click="$router.push({name:'album'})" class="flexitem center">我的相册</a>
            <a href="javascript:;" @click="$router.push({name:'index'})" class="flexitem center">工作室</a>
            <a href="javascript:;" @click="$router.push({name:'goods'})" class="flexitem center">产品介绍</a>
            <a href="javascript:;" @click="$router.push({name:'news'})" class="flexitem center">每日分享</a>
         </div>
      </div>

      <div id="album" class="flexitemv mainbox" v-if="albumlist.length>0"
           v-infinite-scroll='loadMore'
           infinite-scroll-disabled='loading'
           infinite-scroll-distance='10'>
         <div class="br lists">
            <div class="box" v-for="item in albumlist" :key="item.id">
               <a href="javascript:;" class="flex" @click="$router.push({name:'album-datail', query:{id:item.id, tit:item.title}})">
                  <span class="flexitemv center">{{item.title}}</span>
                  <img :src="item.cover" class="fitimg">
               </a>
            </div>
         </div>
      </div>

      <div id="none" class="flexitemv center" v-else><div class="icon"></div><p>暂未创建相册~</p></div>

   </div>
</template>

<script>
   export default {
      created(){
         this.$http.get('partner').then(partner=>{ //站点信息
            this.partner = {...partner}
         })

         this.$store.dispatch('userInfo').then(users=>{ //用户信息
            this.user = users
            // 判断会员
            if(users.is_vip){
               this.vip = true
            }
         })

         this.$store.dispatch('albumData')
      },
      data(){
         return{
            user:{},

            partner:{},

            loading: false, //为true时不会触发加载更多，false可以触发
            loadingMore:false
         }
      },
      methods:{
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
   #albumtop .user{position:relative;padding:60px 10px 10px 10px;background:url(../../../assets/image/album_bg.jpg) no-repeat #eee;background-size:cover}
   #albumtop .user h3{position:absolute;top:0;left:0;font-weight:400;font-size:1.05em;color:#fff;width:100%;height:50px;text-shadow:0 0 3px rgba(0,0,0,.4)}
   #albumtop .user .head{width:42px;height:42px;background-color:#fff;border-radius:50%;box-shadow:0 0 6px 2px #3A3A3A}
   #albumtop .user .info{padding-left:10px}
   #albumtop .user h2{font-weight:400;font-size:1.1em;color:#fff;text-shadow:0 0 3px rgba(0,0,0,.2)}
   #albumtop .user p{color:#f8f8f8;font-size:.9em}
   #albumtop .links{height:50px;border-bottom:1px solid #f2f2f2}
   #albumtop .links a{border-right:1px solid #f2f2f2;width:0}
   #album .lists{position:relative;max-width:480px;margin:0 auto}
   #album .lists .box{position:relative;width:49.2%;padding-top:50%}
   #album .lists .box a{position:absolute;top:0;left:0;right:0;bottom:0;background:#eee;overflow:hidden;padding:4px 0 0 4px}
   #album .lists .box a span{position:relative;background:rgba(0,0,0,.3);/*padding:14px;*/color:#fff;z-index:9;text-align:center;text-shadow:1px 1px 4px rgba(0,0,0,.2);font-size:1.05em;line-height:22px}
   #album .lists .box a img{position:absolute;top:0;left:0;object-fit:cover}

</style>
