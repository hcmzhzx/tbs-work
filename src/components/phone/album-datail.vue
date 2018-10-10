<template>
   <div class="flexv">
      <my-header :content="text" :router="router"></my-header>
      <div id="main" class="flexitemv">
         <div id="album" v-if="photoList.length>0">
            <ul class="clearfix photolist"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                :infinite-scroll-immediate-check="true"
                infinite-scroll-distance="10">

               <li v-for="(item,index) in photoList" :key="index">
                  <a href="javascript:;" @click="swipe(index)"><img :src="item.path" :alt="item.title" class="fitimg"><span>item.title</span></a>
               </li>
            </ul>
         </div>

         <div id="none" class="flexitemv center" v-else><div class="icon"></div><p>该相册暂未上传照片~</p></div>
      </div>

      <!--照片详情-->
      <div id="swiper" v-if="contact">
         <div class="flex top">
            <span class="flex center side" @click="contact=false">关闭</span>
            <span class="flexitem center title">{{activeIndex}}/{{photoList.length}}</span>
            <a href="javascript:;" class="flex center side"></a>
         </div>
         <swiper :options="swiperOption" ref="mySwiper" class="wrap">
            <!-- slides -->
            <swiper-slide class="center" v-for="(item,index) in photoList" :key="index">
               <img :src="item.path" :alt="item.title">
            </swiper-slide>
         </swiper>
         <div class="text">{{photoList[activeIndex-1].title}}</div>
      </div>

   </div>
</template>

<script>
   import {MessageBox} from 'mint-ui'
   import axios from '../../assets/js/axios'
   import myHeader from '../header/header.vue'
   import { swiper, swiperSlide } from 'vue-awesome-swiper'

   export default {
      components: {
         myHeader,
         swiper,
         swiperSlide
      },
      created(){
         this.id = this.$route.query.id;
         this.text = this.$route.query.tit;
          axios.get(`album/${this.id}/photo/`).then(photo=>{
            this.photoList = photo.data
            this.meta = photo.meta

            //console.log(photo.data)
         })
      },
      data(){
         return{
            text: '',
            router: 'album',

            id:0,  //相册id
            photoList:[],
            meta:{},

            contact:false,
            activeIndex:1, //当前图片下标

            loading:false,
            isLoading:false,
            noMore:false,

            swiperOption: {  //轮播参数
               notNextTick: true,
               initialSlide:this.activeIndex,
               onSlideChangeStart:(swiper)=>{
                  this.activeIndex = swiper.activeIndex + 1;
               }
            }
         }
      },
      methods:{
         loadMore(){  //加载更多

         },
         swipe(index){  //显示相册照片
            this.activeIndex = index+1;
            this.contact = true
         }
      }
   }
</script>

<style>
   #swiper{position:fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; z-index:99;}
   #swiper .top{position: fixed; top: 0; left: 0; right: 0; height: 52px; background: rgba(0,0,0,0.5); z-index: 10;}
   #swiper .top .title{color: #fff;}
   #swiper .top .side{width: 60px; color: #fff;}
   #swiper .top a.side{font-size: 1.4em;}

   #swiper .swiper-wrapper,#swiper .swiper-slide{display: -webkit-box;height:100%;}
</style>
