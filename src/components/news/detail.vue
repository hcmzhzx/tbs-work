<template>
   <div class="flexv" style="background: #fff;">
      <div id="header" class="flex">
         <a href="javascript:;" @click="$router.go(-1)" class="rd rd-houtui flex centerv side icon"></a>
         <div class="flexitem center title">资讯详情</div>
         <a href="javascript:;" @click="show=true" class="flex center rd rd-fenxiang side icon shareit"></a>
      </div>
      <div id="notice" v-show="show" @click="show=false"></div>

      <div id="main" class="flexitemv">
         <div id="article-title">
            <h1>{{detailData.title}}</h1>
            <div class="flex centerv author">
               <span class="flex date">{{detailData.create_time}}</span>
               <a href="javascript:;" class="flex cname">{{user.name}}</a>
               <span class="flexitem"></span>
               <a href="javascript:;" class="flex center change">换成我的</a>
            </div>
            <div class="flex centerv topcard">
               <div class="flex circle head"><img :src="user.upic" class="flex fitimg circle"></div>
               <div class="flexv contact">
                  <!--会员-->
                  <a :href="`tel:${user.phone}`" v-if="vip" class="flex centerv item">
                     <i class="flex center rd rd-dianhua circle icon"></i>
                     <span class="flexv text">{{user.phone}}</span>
                     <span class="flex center btn">打电话</span>
                  </a>
                  <a href="javascript:;" v-if="vip" @click="wechat=true" class="flex centerv item openit">
                     <i class="flex center rd rd-weixin1 circle icon"></i>
                     <span class="flexv text">{{user.wechat}}</span>
                     <span class="flex center btn">加微信</span>
                  </a>
                  <!--普通用户-->
                  <a href="javascript:;" v-if="!vip" @click="$router.push({name:'contact'})" class="flex centerv item">
                     <i class="flex center rd rd-dianhua circle icon"></i>
                     <span class="flexv text">{{un_vipPhone(user.phone)}}</span>
                     <span class="flex center btn">打电话</span>
                  </a>
                  <a href="javascript:;" v-if="!vip" @click="$router.push({name:'contact'})" class="flex centerv item openit">
                     <i class="flex center rd rd-weixin1 circle icon"></i>
                     <span class="flexv text">点击加我微信</span>
                     <span class="flex center btn">加微信</span>
                  </a>
               </div>
               <div class="flexitem centerv endh online">
                  <a href="javascript:;" @click="$router.push({name:'contact'})" class="flex center message">在线咨询</a>
               </div>
            </div>
         </div>

         <div id="article">
            <a :href="`http://${partner.fg_domain}`" class="flex centerv openits"></a>
            <div id="article-body" v-html="detailData.content"></div>
            <div class="article-notice">文章内容来源网络，如有侵权或错误请联系我们及时删除或改正</div>
            <div id="article-tool" class="flex">
               <span class="flexitem"><i>阅读 </i>{{detailData.view_num}}</span>
               <a href="javascript:;" class="flex">举报/纠错</a>
            </div>
            <a href="javascript:;" class="flexv poster">
               <span class="flex"><i>我正在经营</i>{{user.brand.title}}<i>事业</i></span><!--这里报错不知道原因-->
               <span class="flex" style="color:#f00;">关注健康 请联系我</span>
            </a>
            <div class="flexv center card">
               <span class="flex center rd rd-mingpian head"></span>
               <div class="flex upic"><img :src="`${user.upic}`" class="fitimg"></div>
               <div class="flex centerv cname">
                  <span class="flex">{{user.name}}</span>
                  <em class="flex">/</em>
                  <span class="flex">{{user.title}}</span>
               </div>
               <div class="flex center contact">
                  <!--会员-->
                  <a :href="`tel:${user.phone}`" v-if="vip" class="flexitem center item" style="background:#2fc3c2;">
                     <i class="flex center rd rd-dianhua"></i>
                     <span class="flexitemv">{{user.phone}}</span>
                  </a>
                  <a href="javascript:;" v-if="vip" @click="wechat=true" class="flexitem center item openit" style="background:#0bcd0b;">
                     <i class="flex center rd rd-weixin1"></i>
                     <span class="flexitemv" style="text-align: center">加我微信</span>
                  </a>

                  <!--普通用户-->
                  <a href="javascript:;" v-if="!vip" @click="$router.push({name:'contact'})" class="flexitem center item" style="background:#2fc3c2;">
                     <i class="flex center rd rd-dianhua"></i>
                     <span class="flexitemv">{{un_vipPhone(user.phone)}}</span>
                  </a>
                  <a href="javascript:;" v-if="!vip" @click="$router.push({name:'contact'})" class="flexitem center item openit" style="background:#0bcd0b;">
                     <i class="flex center rd rd-weixin1"></i>
                     <span class="flexitemv" style="text-align: center">加我微信</span>
                  </a>

               </div>
            </div>
            <div class="flexv center qrcode">
               <div class="box"><img :src="user.qrcode" class="flex fitimg"></div>
            </div>
            <a href="javascript:;" class="flex center payit">我也要开通文章库</a>
         </div>
      </div>
      <!--底部栏-->
      <div id="tabsbar" class="flex footer">
         <a href="javascript:;" @click="$router.push({name:'news'})" class="flexv center item">
            <i class="flex center rd rd-fenxiang"></i>
            <em class="flex center">资讯</em>
         </a>
         <a href="javascript:;" @click="$router.push({name:'index'})" class="flexv center item">
            <i class="flex center rd rd-zhuye"></i>
            <em class="flex center">主页</em>
         </a>
         <div class="flexitem center user">
            <div class="flexitemv center info">
               <a href="javascript:;" @click="$router.push({name:'contact'})" class="flex head"><img :src="`${user.upic}`" class="flex fitimg"></a>
               <a href="javascript:;" @click="$router.push({name:'contact'})" class="flex center cname">点我咨询</a>
            </div>
         </div>
         <a href="javascript:;" @click="$router.push({name:'goods'})" class="flexv center item">
            <i class="flex center rd rd-album"></i>
            <em class="flex center">产品</em>
         </a>
         <a href="javascript:;" class="flexv center item">
            <i class="flex center rd rd-jia"></i>
            <em class="flex center">我的</em>
         </a>
      </div>
      <!--微信-->
      <div id="alert" v-if="wechat">
         <div class="mask"></div>
         <div class="content wechat">
            <div class="title">查看微信</div>
            <div class="text">
               <div class="flex center qrbox"><img :src="user.qrcode"></div>
               <p style="padding:0 5px;">微信号：{{user.wechat}}</p>
               <p>微信中长按二维码可识别添加好友</p>
            </div>
            <div class="flex clearfix button">
               <a href="javascript:;" class="flexitem center clipboard WX" :data-clipboard-text="user.wechat" @click="copy('.WX')">复制微信</a>
               <a href="javascript:;" class="flexitem center" @click="wechat=false">朕知道了</a>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import Clipboard from 'clipboard'
   import {Toast} from 'mint-ui'

   export default {
      created(){
         this.$http.get('partner').then(partner=>{
            this.partner = {...partner}
         })

         this.$http.get('user?include=brand').then(users => {  //用户信息
            this.user = users;

            // 判断会员
            if (this.user.is_vip) {
               this.vip = true
            }
            //console.log(users); theme:default  "bigger"
         });

         this.$http.get(`article/${this.$route.query.id}`).then(data => { //文章信息
            this.detailData = data;
         });
      },
      data(){
         return {
            partner:{}, //站点信息
            show: false,

            user: {brand: {title: ''}},  //用户信息
            vip: false,

            detailData: {}, //文章信息

            wechat: false
         }
      },
      methods: {
         copy(kind){
            const clipboard = new Clipboard(kind)
            clipboard.on('success', e => {
               Toast({
                  message: '复制成功',
                  position: 'center',
                  duration: 500
               });
               clipboard.destroy();  // 释放内存
               this.wechat = false
            })
            clipboard.on('error', e => {
               console.log('该浏览器不支持自动复制')
               clipboard.destroy() // 释放内存
            })
         },
         un_vipPhone(num){ // 不是会员显示的手机号
            if(num){
               let str = num.substr(0,3)+'****'+num.substr(7);
               return str
            }
         }
      }
   }
</script>
