<template>
   <div class="flexv wrap">
      <!--头部-->
      <div id="shoptop">
         <div class="bg" :style="{background:'url('+banner+') 0% 0% / cover'}"></div>
         <div class="flex user">
            <div class="head"><img :src="user.upic" class="fitimg"></div>
            <div class="flexitemv contact">
               <h3 class="flexitem centerv"><span>{{user.name}}</span><em>{{user.title}}</em></h3>
               <div class="flex">
                  <!--普通用户-->
                  <a href="javascript:;" class="flexitem centerv unvip" @click="un_vip" v-if='!vip'><i class="flex center zx zx-phone"></i><span class="flexitemv ">暂未开通</span></a>
                  <a href="javascript:;" class="flexitem centerv unvip" @click="un_vip" v-if='!vip'><i class="flex center zx zx-weixin"></i><span class="flexitemv ">暂未开通</span></a>
                  <!--会员用户-->
                  <a :href="`tel:${user.phone}`" class="flexitem centerv unvip" v-if="vip"><i class="flex center zx zx-phone"></i><span class="flexitemv">{{user.phone}}</span></a>
                  <a href="javascript:;" class="flexitem centerv unvip" v-if="vip" @click="wechat_js"><i class="flex center zx zx-weixin"></i><span class="flexitemv">{{user.wechat}}</span></a>
               </div>
            </div>
            <a href="javascript:;" class="flex center zx zx-qrcode qrcode pageqrcode" @click="studioQart"></a>
         </div>
      </div>
      <!--导航-->
      <div id="filter" class="flex">
         <a href="javascript:;" @click="tab('all')" :class="['flexitem','center',{current:contact == 'all'}]"><span>全部产品</span></a>
         <a href="javascript:;" @click="tab('hot')" :class="['flexitem','center', {current:contact == 'hot'}]"><span>热门产品</span></a>
         <a href="javascript:;" @click="tab('promotion')" :class="['flexitem','center', {current:contact == 'promotion'}]"><span>促销产品</span></a>
         <a href="javascript:;" @click="tab('price')" :class="['flexitem','center', {current:contact == 'price'}]">
            <span>价格</span>
            <em class="flexv">
               <i :class="['flex','zx','zx-up', {active:price == true}]"></i>
               <i :class="['flex','zx','zx-down', {active:price == false}]"></i>
            </em>
         </a>
      </div>
      <!--内容-->
      <div id="shop" class="flexitemv mainbox">
         <!--全部-->
         <div id="goodslist" class="br" v-if="contact=='all'"
              v-infinite-scroll='loadMore'
              infinite-scroll-disabled='loading'
              infinite-scroll-immediate-check="false"
              infinite-scroll-distance='10'>
            <div class="lists" v-for="item in goodsall" :key="item.txt" @click="$router.push({name:'bigger_goods_detail',query:{id:item.id}})">
               <div class="cover"><div><img :src="item.cover"></div></div>
               <h3 class="flexv centerv">{{item.title}}</h3>
               <p class="flex center">¥{{item.price}}</p>
            </div>
            <div id="more" class="flex center" v-if="loading"><i></i><span>正在加载..</span></div>
            <div id="more" class="flex center" v-if="allLoaded"><span>已加载完所有商品</span></div>
         </div>
         <!--热门-->
         <div class="br" id="goodslist" v-if="contact=='hot'"
              v-infinite-scroll='loadMore'
              infinite-scroll-disabled='loading'
              infinite-scroll-immediate-check="false"
              infinite-scroll-distance='10'>
            <div class="lists" v-for="item in goodshot" :key="item.txt" @click="$router.push({name:'bigger_goods_detail',query:{id:item.id}})">
               <div class="cover">
                  <div><img :src="item.cover"></div>
               </div>
               <h3 class="flexv center">{{item.title}}</h3>
               <p class="flex center">¥{{item.price}}</p>
            </div>
            <div id="more" class="flex center" v-if="loading"><i></i><span>正在加载..</span></div>
            <div id="more" class="flex center" v-if="allLoaded"><span>已加载完所有商品</span></div>
         </div>
         <!--促销-->
         <div class="br" id="goodslist" v-if="contact=='promotion'"
              v-infinite-scroll='loadMore'
              infinite-scroll-disabled='loading'
              infinite-scroll-immediate-check="false"
              infinite-scroll-distance='10'>
            <div class="lists" v-for="item in goodsrecommend" :key="item.txt" @click="$router.push({name:'bigger_goods_detail',query:{id:item.id}})">
               <div class="cover">
                  <div><img :src="item.cover"></div>
               </div>
               <h3 class="flexv center">{{item.title}}</h3>
               <p class="flex center">¥{{item.price}}</p>
            </div>
            <div id="more" class="flex center" v-if="loading"><i></i><span>正在加载..</span></div>
            <div id="more" class="flex center" v-if="allLoaded"><span>已加载完所有商品</span></div>
         </div>
         <!--价格降序-->
         <div class="br" id="goodslist" v-if="contact=='desc'"
              v-infinite-scroll='loadMore'
              infinite-scroll-disabled='loading'
              infinite-scroll-immediate-check="false"
              infinite-scroll-distance='10'>
            <div class="lists" v-for="item in goodsPriceDesc" :key="item.txt" @click="$router.push({name:'bigger_goods_detail',query:{id:item.id}})">
               <div class="cover">
                  <div><img :src="item.cover"></div>
               </div>
               <h3 class="flexv center">{{item.title}}</h3>
               <p class="flex center">¥{{item.price}}</p>
            </div>
            <div id="more" class="flex center" v-if="loading"><i></i><span>正在加载..</span></div>
            <div id="more" class="flex center" v-if="allLoaded"><span>已加载完所有商品</span></div>
         </div>
         <!--价格升序-->
         <div class="br" id="goodslist" v-if="contact=='asc'"
              v-infinite-scroll='loadMore'
              infinite-scroll-disabled='loading'
              infinite-scroll-immediate-check="false"
              infinite-scroll-distance='10'>
            <div class="lists" v-for="item in goodsPriceAsc" :key="item.txt" @click="$router.push({name:'bigger_goods_detail',query:{id:item.id}})">
               <div class="cover">
                  <div><img :src="item.cover"></div>
               </div>
               <h3 class="flexv center">{{item.title}}</h3>
               <p class="flex center">¥{{item.price}}</p>
            </div>
            <div id="more" class="flex center" v-if="loading"><i></i><span>正在加载..</span></div>
            <div id="more" class="flex center" v-if="allLoaded"><span>已加载完所有商品</span></div>
         </div>
      </div>
      <!--底部栏-->
      <div id="tabbar" class="flex">
         <router-link class="flexitem center" :to="{name:'category'}">产品分类</router-link>
         <router-link class="flexitem center" :to="{name:'index'}">工作室</router-link>
         <router-link class="flexitem center" :to="{name:'category'}">产品搜索</router-link>
      </div>
      <!--工作室二维码-->
      <div id="alert" v-if="qrcode">
         <div class="mask"></div>
         <div class="content qrcode">
            <div class="title">查看二维码</div>
            <div class="text">
               <div class="flex center qrbox"><img :src="studioCode" class="flex"></div>
               <p>扫描二维码进入我的工作室</p>
            </div>
            <div class="clearfix button"><a href="javascript:;" class="flexitem center" @click="qrcode=false">朕知道了</a></div>
         </div>
      </div>
      <!--微信-->
      <div id="alert" v-if="wechat">
         <div class="mask"></div>
         <div class="content wechat">
            <div class="title">查看微信</div>
            <div class="text">
               <p v-if="show_wechat">该用户尚未上传二维码</p>
               <div class="flex center qrbox" v-else><img :src="user.qrcode"></div>
               <p style="padding:0 5px;">微信号：{{user.wechat}}</p>
               <p v-if="!show_wechat">微信中长按二维码可识别添加好友</p>
            </div>
            <div class="flex clearfix button"><a href="javascript:;" class="flexitem center" @click="wechat=false">朕知道了</a></div>
         </div>
      </div>
   </div>
</template>

<script>
   import {MessageBox } from 'mint-ui'

   export default {
      data(){
         return {
            user: {},  //用户信息
            vip: true,

            banner: 'http://pic.wuxixinsanguo.cn/banner/20170918/59bf9128c3b90.jpg',
            qrcode: false,
            studioCode:'',

            show_wechat:true,
            wechat: false,

            contact: 'all',
            price: null,

            loading: false,
            allLoaded: false,
            meta: {}
         }
      },
      created(){
         //获取用户列表
         this.$store.dispatch('userInfo').then(users => {
            this.user = users;
            //console.log(users);

            //判断用户是否上传二维码
            if(users.qrcode){
               this.show_wechat = false
            }

            // 判断会员时间戳
            if(users.is_vip){
               this.vip = true
            }
         });
         let type = '' || this.$route.query.type;
         if (type != '' && type != 0 && type != undefined) {
            //获取商品列表
            this.contact = 'all'
            if (type == 1) {
               this.contact = 'promotion'
               this.$store.dispatch('goodsInfo', {URL: 'user/products/shop?type=1', type: this.contact})
            } else if (type == 2) {
               this.contact = 'hot'
               this.$store.dispatch('goodsInfo', {URL: 'user/products/shop?type=2', type: this.contact})
            } else if (type == 'desc') {  // 降序
               this.contact = 'desc';
               this.price = false
               this.$store.dispatch('goodsInfo', {URL: `user/products/shop?sortby=price&order=desc`, type: this.contact, price:'desc'});
            } else {  //升序
               this.contact = 'asc';
               this.price = true
               this.$store.dispatch('goodsInfo', {URL: `user/products/shop?sortby=price&order=asc`, type: this.contact, price:'asc'});
            }
         } else {
            this.$store.dispatch('goodsInfo', {URL: 'user/products/shop', type: this.contact})
         }
      },
      methods: {
         // 生成工作室二维码
         studioQart(){
            this.studioCode = `https://www.kuaizhan.com/common/encode-png?large=true&data=${window.location.origin}/#/`;
            this.qrcode = true
         },
         tab(item){
            this.allLoaded = false;
            // 判断点击类型
            if (item == 'price') { // 价格
               let order = this.price == false ? 'desc' : 'asc';
               this.$router.push({query: {type: order}});
               setTimeout(()=>{  // 给vue跳转时间(无特别需求)
                  this.contact = this.$route.query.type;
                  this.price = this.price === null ? false : !this.price;
                  this.$store.dispatch('goodsInfo', {URL: `user/products/shop?sortby=price&order=${order}`, type: this.contact, price: order});
               },100)
            } else {
               this.price = null
               this.contact = item;
               if (item == 'all') {
                  this.$store.dispatch('goodsInfo', {URL: 'user/products/shop', type: this.contact});
                  this.$router.push({query: {type: 0}})
               } else if (item == 'hot') {
                  this.$store.dispatch('goodsInfo', {URL: 'user/products/shop?type=2', type: this.contact});
                  this.$router.push({query: {type: 2}})
               } else if (item == 'promotion') {
                  this.$store.dispatch('goodsInfo', {URL: 'user/products/shop?type=1', type: this.contact});
                  this.$router.push({query: {type: 1}})
               }
            }
         },
         loadMore(){  //加载更多
            if(this.loading) return;
            this.loading = true;
            this.allLoaded = false;
            if (this.meta.total_pages == this.meta.current_page) { //超过分页
               this.loading = false;
               this.allLoaded = true;
               return false;
            } else {
               setTimeout(() => {
                  this.$store.dispatch('goodsPage', {URL: this.meta.links.next, type: this.contact}).then(() => {
                     this.loading = false
                  })
               }, 200)
            }
         },
         //提示信息
         un_vip(){
            MessageBox({
               title: '提示信息',
               message: '该商家尚未开通该功能',
               confirmButtonText:'朕知道了'
            })
         },
         wechat_js(){
            if(!this.user.qrcode){
               MessageBox({
                  title: '查看二维码',
                  message: `该用户尚未上传二维码</br>微信号：${this.user.wechat}`,
                  confirmButtonText:'朕知道了'
               })
            } else {
               this.wechat = true
            }
         }
      },
      computed: {
         goodsall(){
            this.meta = this.$store.getters.goodsAll.meta;
            return this.$store.getters.goodsAll.arr;
         },
         goodshot(){
            this.meta = this.$store.getters.goodsHot.meta;
            return this.$store.getters.goodsHot.arr;
         },
         goodsrecommend(){
            this.meta = this.$store.getters.goodsRecommend.meta;
            return this.$store.getters.goodsRecommend.arr;
         },
         //商品价格降序
         goodsPriceDesc(){
            this.meta = this.$store.getters.goodsPriceDesc.meta;
            return this.$store.getters.goodsPriceDesc.arr;
         },
         //商品价格升序
         goodsPriceAsc(){
            this.meta = this.$store.getters.goodsPriceAsc.meta;
            return this.$store.getters.goodsPriceAsc.arr;
         }
      }
   }
</script>

<style scoped>
   #shoptop .bg{background: #eee; height: 104px;}
   #shoptop .user{position: relative; height: 46px; padding: 2px 10px 10px 10px; background: #fff; border-bottom: 1px solid #f2f2f2;}
   #shoptop .user .head{position: absolute; top: -20px; left: 6px; width: 60px; height: 60px; border-radius: 50%; overflow: hidden; border: 2px solid #fff; box-shadow: 0px 1px 5px #eee;}
   #shoptop .user .contact{padding-left: 70px;}
   #shoptop .user .contact h3{font-weight: normal; font-size: 1em; height: 26px;}
   #shoptop .user .contact h3 em{font-size: 0.8em; color: #888; padding-left: 8px;}
   #shoptop .user .contact div a{height: 16px; width: 0%; padding-right: 8px;}
   #shoptop .user .contact div i{width: 16px; height: 16px; background: #eee; border-radius: 2px; font-size: 0.8em; color: #fff;}
   #shoptop .user .contact div span{font-size: 0.8em; color: #888; padding-left: 4px; -webkit-line-clamp: 1; overflow: hidden;}
   #shoptop .user .qrcode{position: absolute; top: -34px; right: 0; width: 30px; height: 30px; background: rgba(0,0,0,0.5); border-radius: 15px 0 0 15px; padding-left: 6px; color: #fff;}

   #filter{position: relative; z-index: 8; background: #fff; box-shadow: 0 2px 2px rgba(0,0,0,0.05),0 1px 0 rgba(0,0,0,0.05);}
   #filter a{position: relative; height: 46px;}
   #filter a:after{content: ''; position: absolute; top: 14px; bottom: 14px; right: 0; width: 1px; background: #eee;}
   #filter a:last-child:after{background: none;}
   #filter a span{font-size: 0.95em;}
   #filter a.current span{color: #27e;}
   #filter a em{height: 20px; padding: 0 4px;}
   #filter a em i{color: #ccc; font-size: 0.7em; height: 10px;}
   #filter a em i.active{color: #27e;}

   #goodslist{position: relative; padding: 2px;}
   #goodslist .lists{position: relative; width: 50%;}
   #goodslist .lists .cover{position: relative; padding-top: 100%;}
   #goodslist .lists .cover div{position: absolute; top: 2px; left: 2px; right: 2px; bottom: 2px; background: #fff;}
   #goodslist .lists .cover img{width: 100%; height: 100%;}
   #goodslist .lists h3{font-weight: normal; padding: 2px; line-height: 20px; height: 40px; overflow: hidden; font-size: 0.95em; color: #333; -webkit-line-clamp: 2;}
   #goodslist .lists p{font-size: 1.05em; color: #f00; padding: 2px;}
   #goodslist .lists a.link{position: absolute; top: 2px; left: 2px; right: 2px; bottom: 2px;}

</style>
