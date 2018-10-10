<template>
   <div class="container">
      <div class="p1 hide clear" style="display:block;">
         <dl class="clear" style="padding-top:15px;">
            <dt><div :class="['avatar',{vip:vip}]"><img src="http://pic.wuxixinsanguo.cn/default/head.jpg"></div></dt>
            <dd>
               <div class="content">
                  <p class="text">您好，我是尚赫胡成铭，请问您想了解什么呢？</p>
                  <div class="arrow"></div>
               </div>
            </dd>
         </dl>
         <dl class="right clear">
            <dt><div class="avatar"><img src="../../assets/image/unknown.svg"></div></dt>
            <dd>
               <div class="content button">
                  <p class="text">
                     <button v-for="(val,index) in options" :key="index" @click="btn1(val)" :class="{active:val===form.msg}">{{val}}</button>
                  </p>
                  <div class="arrow"></div>
               </div>
            </dd>
         </dl>
      </div>
      <div class="p2 hide clear">
         <dl class="clear">
            <dt><div :class="['avatar',{vip:vip}]"><img src="http://pic.wuxixinsanguo.cn/default/head.jpg"></div></dt>
            <dd>
               <div class="content">
                  <p class="text">您是？</p>
                  <div class="arrow"></div>
               </div>
            </dd>
         </dl>
         <dl class="right clear">
            <dt><div class="avatar"><img src="../../assets/image/unknown.svg"></div></dt>
            <dd>
               <div class="content button">
                  <p class="text">
                     <button v-for="(val,index) in age " :key="index" @click="btn2(val)" :class="{active:val===form.age}">{{val}}</button>
                  </p>
                  <div class="arrow"></div>
               </div>
            </dd>
         </dl>
      </div>
      <div class="p3 hide clear">
         <dl class="clear">
            <dt><div :class="['avatar',{vip:vip}]"><img src="http://pic.wuxixinsanguo.cn/default/head.jpg"></div></dt>
            <dd>
               <div class="content">
                  <p class="text">怎么称呼您？</p>
                  <div class="arrow"></div>
               </div>
            </dd>
         </dl>
         <dl class="right clear">
            <dt><div class="avatar"><img src="../../assets/image/unknown.svg"></div></dt>
            <dd>
               <div class="content button">
                  <p class="text">
                     <textarea placeholder="请填写您的姓名" v-model="form.name"></textarea>
                     <button v-for="(val,index) in gender" :key="index" @click="btn3(val)" :class="['js_sex_button',{active:val===form.gender}]">{{val}}</button>
                  </p>
                  <div class="arrow"></div>
               </div>
            </dd>
         </dl>
      </div>
      <div class="p4 hide clear">
         <dl class="clear">
            <dt><div :class="['avatar',{vip:vip}]"><img src="http://pic.wuxixinsanguo.cn/default/head.jpg"></div></dt>
            <dd>
               <div class="content">
                  <p class="text">怎么联系到您？</p>
                  <div class="arrow"></div>
               </div>
            </dd>
         </dl>
         <dl class="right clear">
            <dt><div class="avatar"><img src="../../assets/image/unknown.svg"></div></dt>
            <dd>
               <div class="content button">
                  <p class="text">
                     <textarea placeholder="请填写您的手机号码" maxlength="11" v-model="form.phone"></textarea>
                     <button @click="btn4" :class="{active:contact===true}">确定</button>
                  </p>
                  <div class="arrow"></div>
               </div>
            </dd>
         </dl>
      </div>
      <div class="p5 hide clear">
         <dl class="clear">
            <dt><div :class="['avatar',{vip:vip}]"><img src="http://pic.wuxixinsanguo.cn/default/head.jpg"></div></dt>
            <dd>
               <div class="content">
                  <p class="text">收到，<img src="../../assets/image/smile.png" align="absmiddle" width="24">我会尽快联系您的，请稍等</p>
                  <div class="arrow"></div>
               </div>
            </dd>
         </dl>
         <dl class="right clear">
            <dt><div class="avatar"><img src="../../assets/image/unknown.svg"/></div></dt>
            <dd>
               <div class="content button">
                  <p class="text">
                     <button @click='end'>结束</button>
                  </p>
                  <div class="arrow"></div>
               </div>
            </dd>
         </dl>
      </div>
      <div id="fill"></div>
   </div>
</template>
<script>
   import {Toast} from 'mint-ui'

   export default{
      created(){
         this.$store.dispatch('userInfo').then(users=>{
            // 判断会员
            if(users.is_vip){
               this.vip = true
            }
         })
      },
      data(){
         return {
            options: ["我想咨询健康问题", "了解加盟直销事业", "其他"],
            age: ["50前后", "60后", "70后", "80后", "90后"],
            gender: ['先生','女士'],
            form: {
               msg: '',
               age: '',
               name: '',
               gender: '',
               phone: ''
            },
            vip:false,
            contact:false
         }
      },
      methods: {
         // 显示下一个内容并撑高页面
         top(e){
            let dom = document.querySelector(e).nextSibling.nextSibling;
            dom.style.display = 'block';
            let h = window.innerHeight - window.getComputedStyle(dom).height.split('').slice(0,length-2).join('')+"px";
            document.querySelector('#fill').style.height = h;  //320
            window.scrollTo(0,dom.offsetTop)
         },
         btn1(val){
            this.form.msg = val;
            this.$options.methods.top('.p1')
         },
         btn2(val){
            this.form.age = val;
            this.$options.methods.top('.p2')
         },
         btn3(val){
            if(!(/[\u4e00-\u9fa5]/.test(this.form.name))){
               Toast({
                  message:'请正确填写姓名!',
                  iconClass: 'rd rd-guanbi',
                  position:'center',
                  duration:1000
               })
            } else {
               this.form.gender = val;
               this.$options.methods.top('.p3')
            }
         },
         btn4(){
            if(!(/^[1][3-9][0-9]{9}$/.test(this.form.phone))){
               Toast({
                  message:'请正确填写手机号!',
                  iconClass: 'rd rd-guanbi',
                  position:'center',
                  duration:1000
               })
            } else {
               this.contact = true;
               this.$options.methods.top('.p4')
            }
         },
         end(){
            const data = {
               msg:this.form.msg,
               age:this.form.age,
               name:this.form.name + this.form.gender,
               phone:this.form.phone
            }
            this.$http.post('contact',data).then(()=>{
               this.$router.push({name:'index'});
            })
         }
      },
      //页面挂载时执行重置函数
      created:() => {
         let dom = document.documentElement.style, dom2 = document.body.style;
         dom2.fontSize = dom.fontSize = 16 + "px";
         dom2.height = dom.height = 'auto';
         dom2.background = dom.background = '#E5E5E5';
      },
      //离开当前页面后执行再次重置
      destroyed:() => {
         let dom = document.documentElement.style, dom2 = document.body.style;
         dom2.fontSize = dom.fontSize = '';
         dom2.height = dom.height = '';
         dom2.background = dom.background = '';
      }
   }
</script>

<style scoped>
   input,button,textarea{background:#fff;}
   .container{width:100%;min-height:100%}
   .container .clear{padding-top:8px}
   .clear:after{display:block;content:"";clear:both;visibility:hidden;height:0}
   .container dl{float:left;position:relative;clear:both;display:block;padding:0 40px 0 15px;margin:0 0 15px 0}
   .container dl dt{display:inline-block;float:left}
   .container dl dt div.avatar{position:relative;width:3rem;height:3rem;border-radius:3px;overflow:hidden}
   .container dl:first-child dt div.avatar.vip:before{content:'VIP';position:absolute;bottom:-1.4rem;right:-1.4rem;width:2.8rem;height:2.8rem;background:#fff;transform:rotate(-45deg);-webkit-transform:rotate(-45deg);text-align:center;font-size:.75em;color:red;font-weight:700}
   .container dl dt div.avatar img{width:100%}
   .container dl dd .content{position:relative}
   .container dl dd{box-shadow:0 0 3px rgba(0,0,0,.05);border:1px solid #D5D5D5;margin-left:4rem;background:#fff;font-size:14px;padding:.8rem 1rem;border-radius:5px}
   .container dl dd .content p{line-height:16px}
   .container dl dd .content p button{display:block;clear:both;border:1px solid #639838;border-radius:5px;padding:8px 12px;background:#fff;outline:0;margin:.8rem 0 0 0;width:100%;font-size:13px}
   .container dl dd .content p button.active{color:#ccc;border-color:#fff}
   .container dl dd div.button{padding-bottom:5px}
   .container dl dd .content p textarea{border:1px solid #ccc;border-radius:2px;padding:10px;outline:0;margin:.6rem 0 0 0}
   .container dl dd .content .arrow{position:absolute;left:-21px;top:2px;width:8px;height:8px;background:#fff;transform:rotate(45deg);border-left:1px solid #d5d5d5;border-bottom:1px solid #d5d5d5}
   .container dl.right{float:right;padding:0 15px 0 40px}
   .container dl.right dt{position:absolute;right:15px}
   .container dl.right dd{border:1px solid #79B746;margin:0 4rem 0 0;background:#C0E278;padding-top:4px}
   .container dl.right dd .content .arrow{border-left:0;border-bottom:0;border-right:1px solid #79B746;border-top:1px solid #79B746;left:auto;right:-21px;background:#C0E278}
   .hide{display:none}
   #hint{width:12rem;height:3rem;background:rgba(0,0,0,.5);padding:0 10px;position:fixed;top:50%;left:22%;border-radius:10px;text-align:center;line-height:3rem;color:#fff;display:none}
   #fill{clear:both;float:left;visibility:hidden;}
</style>
