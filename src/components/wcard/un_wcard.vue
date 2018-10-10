<template>
   <div id="wcard" class="flexv centerv">
      <div class="flexv center content">
         <a href="javascript:;" @click="$router.go(-1)" class="flex center rd rd-wrong close"></a>
         <h3 class="flex center">商家尚未开通此功能</h3>
         <div class="msg">您的访问信息我们已经收集，稍后会推送提醒商家</div>
         <p class="opttxt">如果您是该网站的商家可以点击付费开通</p>
         <p class="opttxt">如果您是网站的访客可以返回首页继续浏览</p>
         <div class="flex opt">
            <a href="javascript:;" class="flexitem center" @click="$router.push({name:'index'})">返回首页</a>
            <a :href="`http://${partner.fg_domain}/#/`" class="flexitem center">付费开通</a>
         </div>
      </div>
   </div>
</template>
<script>
   export default{
      created(){
         //获取站点信息
         this.$http.get('partner').then(partner=>{
            this.partner = {...partner}
         })
      },
      data(){
         return{
            partner:''
         }
      }
   }
</script>

<style>
   #wcard{width:100%;height:100%;background:url(../../assets/image/0.jpg) 0 0/cover no-repeat}
   #wcard .content{position:relative;width:85%;max-width:300px;background:#fff;border-radius:4px;margin-top:100px;box-shadow:0 0 8px 2px rgba(0,0,0,.2)}
   #wcard .content .close{position:absolute;top:-60px;right:0;width:26px;height:26px;border:2px solid #fff;color:#fff;border-radius:50%}
   #wcard .content .close:after{content:'';position:absolute;top:28px;left:12px;width:2px;height:30px;background:#fff}
   #wcard .content h3{font-size:1.1em;font-weight:400;height:60px;padding:0 10px}
   #wcard .content .msg{font-size:.95em;color:#666;padding:20px 10px;text-align:center}
   #wcard .content .opttxt{font-size:.82em;color:#999;padding:2px 10px}
   #wcard .content .opt{height:50px;margin-top:20px;width:100%}
   #wcard .content .opt a{position:relative}
   #wcard .content .opt a:last-child{color:#dd0010}
   #wcard .content .opt a:last-child:after{content:'';width:1px;height:20px;background:#eee;position:absolute;top:15px;left:0}
</style>
