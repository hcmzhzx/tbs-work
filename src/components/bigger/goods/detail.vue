<template>
   <div id="detail" class="flexv">
      <div id="header" class="flex header">
         <a href="javascript:;" @click="$router.go(-1)" class="flex centerv zx zx-back side icon"></a>
         <div class="flexitem center title">商品详情</div>
         <a href="javascript:;" @click="show=true" class="flex center zx zx-share side icon shareit"></a>
      </div>

      <div id="main" class="flexitemv">
         <div id="goods">
            <div class="cover">
               <div class="img"><img :src="detail.cover" :alt="detail.title"></div>
            </div>
            <div class="info">
               <h1>{{detail.title}}</h1>
               <p><span>规格：{{detail.specification}}</span></p>
               <p><i>¥{{detail.price}}</i></p>
            </div>
            <div class="flex center titles"><span>详情介绍</span></div>
            <div class="detail" v-html="detail.content"></div>
         </div>

         <div id="card" class="flexv" v-if="vip">
            <div class="flex info">
               <a :href="`tel:${user.phone}`" class="flex center phone"><i class="flex center zx zx-phone"></i><span>拨打电话</span></a>
               <div class="flex head"><img :src="user.upic" class="fitimg"></div>
               <div class="flexitemv name">
                  <h3 class="flex endv"><span>{{user.name}}</span><em>{{user.title}}</em></h3>
                  <a href="javascript:;" class="flex" @click="qq=true"><i class="zx zx-qq"></i><span>{{qqnum}}</span></a>
                  <a href="javascript:;" class="flex" @click="wechatNum=true"><i class="zx zx-weixin"></i><span>{{user.wechat}}</span></a>
               </div>
            </div>
            <div class="flex link">
               <a href="javascript:;" @click="$router.push({name:'bigger_index'})" class="flexitem center"><i class="zx zx-home"></i><span>Ta的工作室</span></a>
               <a href="/user/index.html" class="flexitem center"><i class="zx zx-card"></i><span>我也要工作室？</span></a>
            </div>
         </div>
      </div>

      <div id="tabbar" class="flex">
         <a href="javascript:;" @click="$router.push({name:'index'})" class="flexitem center">工作室</a>
         <a href="javascript:;" @click="$router.push({name:'goods'})" class="flexitem center">产品展示</a>
         <a href="javascript:;" @click="$router.push({name:'news'})" class="flexitem center">每日分享</a>
      </div>

      <a href="javascript:;" id="qrcodebor" v-if="vip" @click="wechatQrcode=true" class="flex center zx zx-weixin openqrcode"></a>
      <!--分享-->
      <div id="notice" v-show="show" @click="show=false"></div>
      <!--QQ-->
      <div id="alert" v-if="qq">
         <div class="mask"></div>
         <div class="content QQ">
            <div class="title">查看QQ</div>
            <div class="text">{{qqnum}}</div>
            <div class="flex clearfix button">
               <a href="javascript:;" class="flexitem center clipboard QQ" v-if="qqbtn" :data-clipboard-text="user.qq" @click="copy('.QQ')">复制QQ号</a>
               <a href="javascript:;" class="flexitem center" @click="qq=false">朕知道了</a>
            </div>
         </div>
      </div>
      <!--微信号码-->
      <div id="alert" v-if="wechatNum">
         <div class="mask"></div>
         <div class="content wechat">
            <div class="title">查看微信</div>
            <div class="text">
               <p style="padding:0 5px;">{{user.wechat}}</p>
            </div>
            <div class="flex button">
               <a href="javascript:;" class="flexitem center clipboard WX" :data-clipboard-text="user.wechat" @click="copy('.WX')">复制微信号</a>
               <a href="javascript:;" class="flexitem center" @click="wechatNum=false">朕知道了</a>
            </div>
         </div>
      </div>
      <!--微信二维码-->
      <div id="alert" v-if="wechatQrcode">
         <div class="mask"></div>
         <div class="content wechat">
            <div class="title">查看二维码</div>
            <div class="text" v-if="qrcodeImg">
               <div class="flex center qrbox"><img :src="user.qrcode"></div>
               <p>微信中长按二维码可识别添加好友</p>
            </div>
            <div class="text" v-else>该用户尚未上传二维码</div>
            <div class="flex button">
               <a href="javascript:;" class="flexitem center" @click="wechatQrcode=false">朕知道了</a>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import Clipboard from 'clipboard'
   import { Toast } from 'mint-ui'

   export default {
      //加载前请求
      created(){
         this.$http.get('partner').then(partner=>{
            this.partner = {...partner}
         })

         let id = this.$route.query.id;
         this.$http.get(`product/${id}`).then(detail=>{
            this.detail = detail;
         });
         this.$store.dispatch('userInfo').then(users=>{
            this.user = users;
            // 判断会员
            if(users.is_vip){
               this.vip = true
            }
            //判断有无QQ
            if(users.qq){
               this.qqnum = users.qq;
               this.qqbtn = true
            }
            //判断有无二维码图片
            if(users.qrcode){
               this.qrcodeImg = true
            }
         })
      },
      data(){
         return{
            partner:{}, //站点信息

            detail:{},
            show:false,

            user:{},
            vip:true,

            contact:false, //分享
            qqnum:'尚未填写',
            qq:false, //QQ
            qqbtn:false,

            wechatNum:false, //二维码号码
            wechatQrcode:false, //二维码图片
            qrcodeImg:false, // 有无图片显示

         }
      },
      methods:{
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
               this.wechatNum=false
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

   #qrcodebor{position: fixed; right: 10px; bottom: 70px; width: 40px; height: 40px; border-radius: 50%; background: rgba(0,0,0,0.5); color: #fff; font-size: 2em;}

</style>
