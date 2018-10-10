<template>
   <div clas="flexv">
      <div id="cards" class="wrap">
         <h3 class="flex center title">玻妃TBS事业帮手</h3>
         <div class="flex icons">
            <div class="flex endv side">
               <a :href="`tel:${user.phone}`" class="flexv center">
                  <i class="flex center zx zx-phone"></i>
                  <em class="flex">电话</em>
               </a>
            </div>
            <div class="flexitem side">
               <a href="javascript:;" class="flexv center vip" @click="wechat=true">
                  <i class="flex center zx zx-weixin"></i>
                  <em class="flex">微信</em>
               </a>
            </div>
            <div class="flexitem side">
               <a href="javascript:;" class="flexv center vip" @click="qq=true">
                  <i class="flex center zx zx-qq"></i>
                  <em class="flex">QQ</em>
               </a>
            </div>
            <div class="flex endv side">
               <a href="javascript:;" class="flexv center shareit" @click="contact=true">
                  <i class="flex center zx zx-share"></i>
                  <em class="flex">分享</em>
               </a>
            </div>
         </div>
         <div class="flex center user">
            <div class="flex center side">
               <a href="javascript:;" @click="$router.push({name:'index'})" class="flexv">
                  <i class="flex center zx zx-home"></i>
                  <em>工作室</em>
               </a>
            </div>
            <div class="flexitemv center middle">
               <div class="head" :style="{background:`url(${user.upic}) 0% 0% / cover`}"></div>
               <h2>{{user.name}}</h2>
               <p>{{user.title}}</p>
            </div>
            <div class="flex center side">
               <a href="javascript:;" class="flexv pageqrcode" @click="studioQart">
                  <i class="flex center zx zx-qrcode"></i>
                  <em>二维码</em>
               </a>
            </div>
         </div>
         <div class="line"></div>
         <div class="signature">{{user.signature}}</div>
      </div>
      <!--二维码-->
      <div id="alert" v-if="qrcode">
         <div class="mask"></div>
         <div class="content qrcode">
            <div class="title">查看二维码</div>
            <div class="text">
               <div class="flex center qrbox"><img :src="studioCode" class="flex"></div>
               <p>扫描二维码进入我的工作室</p>
            </div>
            <div class="button"><a href="javascript:;" class="flexitem center" @click="qrcode=false">朕知道了</a></div>
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
   import Clipboard from 'clipboard'
   import {Toast} from 'mint-ui'

   export default {
      created(){
         this.$store.dispatch('userInfo').then(user => {
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
         return {
            user: {},

            studioCode:'',

            qrcode: false, //二维码
            contact: false, //分享
            qqnum: '尚未填写',
            qq: false, //QQ
            qqbtn: false,

            qrcodeImg:false,
            wechat: false //微信
         }
      },
      methods: {
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
               this.qq = false;
               this.wechat = false
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
   #cards{background:url(../../../assets/image/card_bg.jpg) no-repeat;background-size:cover}
   #cards .title{font-weight:400;font-size:1.1em;color:#fff;height:60px}
   #cards .icons{padding-top:30px;height:140px;max-width:480px;margin:0 auto}
   #cards .side{width:80px}
   #cards .icons div a{margin:0 auto;height:70px}
   #cards .side i{width:43px;height:43px;border:2px solid #fff;background:rgba(0,0,0,.5);border-radius:50%;font-size:1.4em;color:#fff}
   #cards .side em{font-size:.8em;color:#fff;height:22px;line-height:22px}
   #cards .user{max-width:480px;margin:10px auto}
   #cards .user .middle{position:relative;padding-top:64px}
   #cards .user .head{position:absolute;top:-50px;left:50%;margin-left:-51px;width:100px;height:100px;border:2px solid #fff;border-radius:50%}
   #cards .user .middle h2{font-size:1.1em;font-weight:400;color:#fff;text-shadow:0 0 3px rgba(0,0,0,.2)}
   #cards .user .middle p{font-size:.9em;color:#f8f8f8}
   #cards .line{background:url(../../../assets/image/card_line.png) center no-repeat;background-size:100%;height:30px;margin:10px 0}
   #cards .signature{margin:5px 10px;padding:10px;color:#fff;min-height:40px;background:rgba(0,0,0,.2);font-size:.9em;line-height:20px}

</style>
