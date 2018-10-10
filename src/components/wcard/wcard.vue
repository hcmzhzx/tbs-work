<template>
   <div id="cards">
      <h3 class="flex center title">玻妃TBS事业帮手</h3>
      <div class="flex userinfo">
         <div class="flexitemv user">
            <div class="head"><img :src="user.upic" class="fitimg"></div>
            <div class="flex link">
               <a href="javascript:;" @click="$router.push({name:'index'})" class="flexv center">
                  <i class="flex center rd rd-zhuye"></i>
                  <em class="flex">工作室</em>
               </a>
               <span class="flexitemv">
						<i class="flexv center">{{user.name}}</i>
						<em class="flexv center">{{user.title}}</em>
					</span>
               <a href="javascript:;" class="flexv center shareit" @click="contact=true">
                  <i class="flex center rd rd-fenxiang"></i>
                  <em class="flex">分享</em>
               </a>
            </div>
         </div>
         <div class="flexv qrcode">
            <div class="flex center box" v-if="qrcodeImg"><img :src="user.qrcode" id="qrcodepath" class="fitimg"></div>
            <div class="flex center box" v-else>尚未上传二维码</div>
            <p class="flex center">长按二维码，立即添加</p>
         </div>
      </div>
      <div class="gap"></div>
      <div class="contact">
         <a :href="`tel:${user.phone}`" class="flex centerv">
            <i class="flex center rd rd-dianhua"></i>
            <span class="flexitem">{{user.phone}}</span>
         </a>
         <a href="javascript:;" class="flex centerv alert" @click="QQ">
            <i class="flex center rd rd-qq1"></i>
            <span class="flexitem" v-if="user.qq">{{user.qq}}</span>
            <span class="flexitem" v-else>尚未完善</span>
         </a>
         <a href="javascript:;" class="flex centerv alert" @click="wechat=true">
            <i class="flex center rd rd-weixin1"></i>
            <span class="flexitem">{{user.wechat}}</span>
         </a>
      </div>
      <div class="line"></div>
      <div class="signature">{{user.signature}}</div>

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
            <div class="text" v-if="qrcodeImg">
               <div class="flex center qrbox"><img :src="user.qrcode"></div>
               <p style="padding:0 5px;">微信号：{{user.wechat}}</p>
               <p>微信中长按二维码可识别添加好友</p>
            </div>
            <div class="text" v-else>
               <p>该用户尚未上传二维码</p>
               <p style="padding:0 5px;">微信号：{{user.wechat}}</p>
            </div>
            <div class="flex button">
               <a href="javascript:;" class="flexitem center clipboard WX" :data-clipboard-text="user.wechat" @click="copy('.WX')">复制微信</a>
               <a href="javascript:;" class="flexitem center" @click="wechat=false">朕知道了</a>
            </div>
         </div>
      </div>
      <!--分享-->
      <div id="notice" v-if="contact" @click="contact=false"></div>
   </div>
</template>

<script>
   import {APP_URL} from '../../assets/js/api'
   import Clipboard from 'clipboard'
   import { Toast } from 'mint-ui'

   export default {
      created(){
         this.url = APP_URL;
         this.$store.dispatch('userInfo').then(user=>{
            this.user = user;
            //判断有无QQ
            if(user.qq){
               this.qqnum = user.qq;
               this.qqbtn = true
            }
            //判断有无二维码图片
            if(user.qrcode){
               this.qrcodeImg = true
            }
         })
      },
      data(){
         return{
            url:'',
            user:{},

            studioCode:'',

            qrcode:false, //二维码
            contact:false, //分享
            qqnum:'尚未填写',
            qq:false, //QQ
            qqbtn:false,

            qrcodeImg:false,
            wechat:false //微信
         }
      },
      methods:{
         // 生成工作室二维码
         studioQart(){
            this.studioCode = `https://www.kuaizhan.com/common/encode-png?large=true&data=${window.location.origin}/#/`;
            this.qrcode = true
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

<style scoped>
   #cards{background: url(../../assets/image/wCard_bg.png) no-repeat;background-size: cover;}
   #cards .title{font-weight: normal; font-size: 1.1em; color: #fff; height: 60px;}
   #cards .userinfo{padding: 0 6px;}
   #cards .userinfo .user{padding-right: 10px;}
   #cards .userinfo .head{width: 70px; height: 70px; border-radius: 50%; overflow: hidden; border: 3px solid rgba(0,0,0,0.2); margin: 10px auto;}
   #cards .userinfo .link{width: 100%;}
   #cards .userinfo .link em{height: 22px; line-height: 22px;}
   #cards .userinfo .link a i{width: 30px; height: 30px; background: rgba(255,255,255,0.4); border-radius: 50%; font-size: 1.2em; color: #fff;}
   #cards .userinfo .link a em{font-size: 0.8em; color: #fff;}
   #cards .userinfo .link span i{height: 30px; line-height: 30px; overflow: hidden; -webkit-line-clamp: 1; text-shadow: 0px 1px 3px rgba(0,0,0,0.2); color: #fff; font-size: 1.1em;}
   #cards .userinfo .link span em{font-size: 0.9em; overflow: hidden; -webkit-line-clamp: 1; color: #fff;}
   #cards .userinfo .qrcode .box{width: 116px; height: 116px; padding: 5px; border-radius: 2px; background: rgba(255,255,255,0.8);}
   #cards .userinfo .qrcode p{font-size: 0.8em; color: rgba(255,255,255,0.69); height: 20px;}
   #cards .gap{background: url(../../assets/image/wCard_pic1.png) no-repeat; background-size: 100%; height: 30px; margin: 10px 0;}
   #cards .contact{margin: 10px; background: rgba(0,0,0,0.2);}
   #cards .contact a{height: 50px; border-bottom: 1px solid rgba(0,0,0,0.2); padding: 0 10px;}
   #cards .contact a:last-child{border-bottom: none;}
   #cards .contact a i{width: 26px; height: 26px; border: 1px solid rgba(255,255,255,0.69); color: rgba(255,255,255,0.69); border-radius: 50%; margin-right: 10px;}
   #cards .contact a span{color: #fff;}
   #cards .line{background: url(../../assets/image/wCard_pic2.png) center no-repeat;background-size: 100%;height: 30px;margin: 10px 0;}
   #cards .signature{margin: 5px 10px; padding: 10px; color: #fff; min-height: 40px; background: rgba(0,0,0,0.2); font-size: 0.9em; line-height: 20px;}

</style>
