<template>
   <div class="felxv">
      <div id="homeuser" class="flexitemv center">
         <div class="flex head" :style="{background:`url(${user.upic}) 0% 0% / cover`}"><span class="flex center zx zx-vip" v-if="vip"></span></div>
         <div class="flexv info">
            <h2 class="flex center">{{user.name}}</h2>
            <p class="flex center">{{title}}</p>
         </div>
         <div class="flex contact">
            <a href="javascript:;" class="flexitemv" v-if="!vip" @click="un_vip=true">
               <i class="flex center zx zx-phone" style="background:#31F1C6;"></i>
               <em class="flex center">电话</em>
            </a>
            <a :href="`tel:${user.phone}`" class="flexitemv" v-if="vip">
               <i class="flex center zx zx-phone" style="background:#31F1C6;"></i>
               <em class="flex center">电话</em>
            </a>
            <a href="javascript:;" class="flexitemv vip" @click="wechat_js">
               <i class="flex center zx zx-weixin" style="background:#62b900;"></i>
               <em class="flex center">微信</em>
            </a>
            <a href="javascript:;" class="flexitemv vip" @click="qq=true">
               <i class="flex center zx zx-qq" style="background:#3399FE;"></i>
               <em class="flex center">QQ</em>
            </a>
            <a href="javascript:;" class="flexitemv pageqrcode" @click="studioQart">
               <i class="flex center zx zx-qrcode" style="background:#E91E63;"></i>
               <em class="flex center">二维码</em>
            </a>
         </div>
         <a href="javascript:;" class="flex center zx zx-share btns shareit" @click="contact=true"></a>
         <a :href="`http://${partner.fg_domain}`" class="flex center zx zx-user btns ucenter"></a>
      </div>

      <div id="homepage" class="clearfix">
         <div class="lists">
            <a href="javascrtip:;" @click="$router.push({name:'bigger_goods'})" class="flexv center">
               <i class="flex center"></i>
               <em class="flex center">产品介绍</em>
            </a>
         </div>
         <div class="lists">
            <a href="javascrtip:;" @click="$router.push({name:'page_intro'})" class="flexv center">
               <i class="flex center" style="background-position:-62px -2px;"></i>
               <em class="flex center">公司介绍</em>
            </a>
         </div>
         <div class="lists">
            <a href="javascrtip:;" @click="$router.push({name:'news'})" class="flexv center">
               <i class="flex center" style="background-position:-124px -2px;"></i>
               <em class="flex center">新闻资讯</em>
            </a>
         </div>
         <div class="lists">
            <a href="javascrtip:;" @click="$router.push({name:'news'})" class="flexv center">
               <i class="flex center" style="background-position:-2px -62px;"></i>
               <em class="flex center">每日分享</em>
            </a>
         </div>
         <div class="lists">
            <a href="javascrtip:;" @click="$router.push({name:'album'})" class="flexv center">
               <i class="flex center" style="background-position:-62px -62px;"></i>
               <em class="flex center">我的相册</em>
            </a>
         </div>
         <div class="lists">
            <a href="javascript:;" @click="wcard" class="flexv center">
               <i class="flex center" style="background-position:-124px -62px;"></i>
               <em class="flex center">微名片</em>
            </a>
         </div>
         <div class="lists">
            <a href="javascrtip:;" @click="$router.push({name:'contact'})" class="flexv center">
               <i class="flex center" style="background-position:-2px -124px;"></i>
               <em class="flex center">给我留言</em>
            </a>
         </div>
         <div class="lists">
            <a href="javascrtip:;" @click="$router.push({name:'video'})" class="flexv center">
               <i class="flex center" style="background-position:-62px -124px;"></i>
               <em class="flex center">学习视频</em>
            </a>
         </div>
         <div class="lists">
            <a :href="`http://${partner.fg_domain}/#/register`" class="flexv center">
               <i class="flex center" style="background-position:-124px -124px;"></i>
               <em class="flex center">免费加入</em>
            </a>
         </div>
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

   export default {
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
            // 判断会员
            if(!users.is_vip){
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

<style scoped>
   #homeuser{position:relative;background:url(../../assets/image/home_bg.jpg) no-repeat center #eee;background-size:cover;min-height:230px}
   #homeuser .head{position:relative;width:90px;height:90px;box-shadow:0 0 1px 2px #fff;border-radius:50%;margin:14px 0}
   #homeuser .head span{position:absolute;top:0;right:0;background:#FFED00;color:#fff;width:24px;height:24px;border-radius:50%;transform:rotate(15deg);-webkit-transform:rotate(15deg)}
   #homeuser .info h2{font-weight:400;font-size:1.15em;color:#fff;text-shadow:0 0 3px rgba(0,0,0,.2)}
   #homeuser .info p{font-size:.9em;color:#f8f8f8}
   #homeuser .contact{width:100%}
   #homeuser .contact a{padding:10px 0}
   #homeuser .contact a i{width:30px;height:30px;background:#ccc;margin:0 auto;font-size:1.2em;border-radius:2px;color:#fff}
   #homeuser .contact a em{font-size:.8em;color:#f9f9f9;height:20px}
   #homeuser .btns{position:absolute;top:10px;width:30px;height:30px;font-size:1.2em;color:#fff;background:rgba(0,0,0,.5);border-radius:50%}
   #homeuser .btns.shareit{right:10px}
   #homeuser .btns.ucenter{left:10px}
   #homepage{background:#fff}
   #homepage div{position:relative;float:left;width:33.33%;padding-top:33.33%}
   #homepage div a{position:absolute;top:0;left:0;width:100%;height:100%;border-bottom:1px solid #f2f2f2;border-right:1px solid #f2f2f2;margin-bottom:-1px;margin-left:-1px}
   #homepage div a i{width:56px;height:56px;border-radius:50%;background:url(../../assets/image/menu_bg.png) no-repeat #eee;overflow:hidden;background-position:-2px -2px}
   #homepage div a em{color:#666;height:28px;font-size:.9em}

</style>
