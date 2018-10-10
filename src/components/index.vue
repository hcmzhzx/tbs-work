<template>
   <div id="studio" class="flexv wrap home">
      <div id="toper" class="flex center">欢迎进入{{user.name}}的工作室</div>

      <div id="board" class="flexitemv center">
         <div class="flex center head">
            <a href="javascript:;" class="flex center rd rd-erweima1 openqrcode" @click="studioQart"></a>
            <div :style="{background:`url(${user.upic}) 0% 0% / cover`}">
               <span class="rd rd-opened" v-if="vip"></span>
            </div>
            <a href="javascript:;" class="flex center rd rd-fenxiang shareit" @click="contact=true"></a>
         </div>
         <div class="flexv center info">
            <h2>{{user.name}}</h2>
            <p>{{title}}</p>
         </div>
         <div class="flex center contact unvip">
            <a href="javascript:;" class="flexv center" @click="QQ">
               <i class="flex center rd rd-qq" style="background:#338FE0;"></i>
               <em>QQ</em>
            </a>
            <a href="javascript:;" class="flexv center" v-if="!vip" @click="un_vip=true">
               <i class="flex center rd rd-dianhua" style="background:#E0A419;"></i>
               <em>电话</em>
            </a>
            <a :href="`tel:${user.phone}`" class="flexv center" v-if="vip">
               <i class="flex center rd rd-dianhua" style="background:#E0A419;"></i>
               <em>电话</em>
            </a>
            <a href="javascript:;" class="flexv center" @click="wechat_js">
               <i class="flex center rd rd-weixin" style="background:#0ED20D;"></i>
               <em>微信</em>
            </a>
         </div>
      </div>

      <div id="main" class="flexitem center home">
         <ul id="home" class="clearfix">
            <li>
               <router-link :to="{name:'goods'}" class="flexv center">
                  <i class="flex center rd rd-gi" style="color:#FBD0C9;"></i>
                  <em class="flex">产品介绍</em>
               </router-link>
            </li>
            <li>
               <router-link :to="{name:'page_intro'}" class="flexv center">
                  <i class="flex center rd rd-pi" style="color:#FC880F;"></i>
                  <em class="flex">公司介绍</em>
               </router-link>
            </li>
            <li>
               <router-link :to="{name:'news'}" class="flexv center">
                  <i class="flex center rd rd-xinwen" style="color:#F668CA;"></i>
                  <em class="flex">新闻资讯</em>
               </router-link>
            </li>
            <li>
               <router-link :to="{name:'news'}" class="flexv center">
                  <i class="flex center rd rd-share" style="color:#F54D20;"></i>
                  <em class="flex">每日分享</em>
               </router-link>
            </li>
            <li>
               <router-link :to="{name:'album'}" class="flexv center">
                  <i class="flex center rd rd-xiangce" style="color:#55DAE1;"></i>
                  <em class="flex">我的相册</em>
               </router-link>
            </li>
            <li>
               <a href="javascript:;" @click="wcard" class="flexv center">
                  <i class="flex center rd rd-mingpian" style="color:#F64E4E;"></i>
                  <em class="flex">微名片</em>
               </a>
            </li>
            <li>
               <router-link :to="{name:'contact'}" class="flexv center">
                  <i class="flex center rd rd-liuyan" style="color:#12E30D;"></i>
                  <em class="flex">给我留言</em>
               </router-link>
            </li>
            <li>
               <router-link :to="{name:'video'}" class="flexv center">
                  <i class="flex center rd rd-shipin" style="color:#F8E71C;"></i>
                  <em class="flex">学习视频</em>
               </router-link>
            </li>
         </ul>
      </div>

      <div id="signup" class="flex">
         <a :href="`http://${partner.fg_domain}/#/register`" class="flexitem center">免费注册</a>
         <a :href="`http://${partner.fg_domain}/#/login`" class="flexitem center">登录管理</a>
      </div>
      <!--二维码-->
      <div id="alert" v-if="qrcode">
         <div class="mask"></div>
         <div class="content qrcode">
            <div class="title">查看二维码</div>
            <div class="text">
               <div class="flex center qrbox"><img :src="studioCode" class="flex"></div><p>扫描二维码进入我的工作室</p>
            </div>
            <div class="clearfix button"><a href="javascript:;" class="flexitem center" @click="qrcode=false">朕知道了</a></div>
         </div>
      </div>
      <!--QQ-->
      <div id="alert" v-if="qq">
         <div class="mask"></div>
         <div class="content QQ">
            <div class="title">查看QQ</div>
            <div class="text">{{qqnum}}</div>
            <div class="flex clearfix button">
               <a href="javascript:;" class="flexitem center clipboard QQ" v-if="qqbtn" :data-clipboard-text="user.qq" @click="copy('.QQ')">复制号码</a>
               <a href="javascript:;" class="flexitem center" @click="qq=false">朕知道了</a>
            </div>
         </div>
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
            </div><div class="flex clearfix button">
            <a href="javascript:;" class="flexitem center clipboard WX" :data-clipboard-text="user.wechat" @click="copy('.WX')">复制微信</a>
            <a href="javascript:;" class="flexitem center" @click="wechat=false">朕知道了</a>
         </div>
         </div>
      </div>
      <!--分享-->
      <div id="notice" v-if="contact" @click="contact=false"></div>

      <!--未开通功能-->
      <div id="alert" v-if="un_vip">
         <div class="mask"></div>
         <div class="content un_box">
            <div class="text">该工作室暂未开通此功能</div>
            <div class="clearfix button"><a href="javascript:;" class="flexitem center" @click="un_vip=false">朕知道了</a></div>
         </div>
      </div>
   </div>
</template>
<script>
   import Clipboard from 'clipboard'
   import { Toast } from 'mint-ui'

   export default{
      created(){
         this.$http.get('partner').then(partner=>{
            this.partner = {...partner}
         })

         this.$store.dispatch('userInfo').then(users=>{
            this.user = users
            //console.log(users);
            // 判断头衔
            if(users.title){
               this.title = users.title;
            }
            // 判断会员时间戳
            if(users.is_vip){
               this.vip = true
            }
         })
      },
      data(){
         return {
            partner:{}, //站点信息

            user:{
               'upic':'http://pic.wuxixinsanguo.cn/default/head.jpg'
            },
            title:'暂未设置头衔',

            vip:false,
            un_vip:false,

            qrcode:false, //二维码
            studioCode:'',

            contact:false, //分享
            qqnum:'尚未填写',
            qq:false, //QQ
            qqbtn:false,
            wechat:false //微信
         }
      },
      methods:{
         // 生成工作室二维码
         studioQart(){
            this.studioCode = `https://www.kuaizhan.com/common/encode-png?large=true&data=${window.location.origin}/#/`;
            this.qrcode = true
         },
         QQ(){
            if(this.vip){
               if(!this.user.qq){
                  this.qq=true
               } else {
                  this.qqnum = this.user.qq;
                  this.qq=true;
                  this.qqbtn=true
               }
            } else {
               this.un_vip = true
            }
         },
         wechat_js(){
            if(this.vip){
               this.wechat = true
            } else {
               this.un_vip = true
            }
         },
         //微名片
         wcard(){
            if(this.vip){
               this.$router.push({name:'wcard'})
            } else {
               this.$router.push({name:'un_wcard'})
            }
         },
         copy(kind){
            const clipboard = new Clipboard(kind)
            clipboard.on('success', e => {
               Toast({
                  message: '复制成功',
                  position: 'center',
                  duration: 500
               });
               clipboard.destroy();  // 释放内存
               this.qq=false;
               this.wechat=false
            })
            clipboard.on('error', e => {
               console.log('该浏览器不支持自动复制')
               clipboard.destroy() // 释放内存
            })
         }
      }
   }
</script>

<style>
   #notice{background: rgba(0,0,0,0.5) url(../assets/image/wxnotice.png) right 10px no-repeat; background-size: 240px auto; position: fixed; top: 0; left: 0; width: 100%; height: 100%;z-index: 999;}
</style>
