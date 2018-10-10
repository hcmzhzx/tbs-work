<template>
   <div class="flexv">
      <my-header :content="text" :router="router"></my-header>

      <div id="main" class="flexitemv">
         <div id="company" v-html="content"></div>
      </div>
   </div>
</template>

<script>
   import myHeader from '../header/header.vue'

   export default {
      components:{
         myHeader
      },
      created(){
         this.$http.get('company').then(res=>{
            this.content = res.intro;
         })
      },
      data(){
         return{
            text:'公司介绍',
            router:'index',

            content:''
         }
      }
   }
</script>

<style>
   #company{padding: 0 10px;background: #fff;}
   #company img{max-width: 100%;}
</style>
