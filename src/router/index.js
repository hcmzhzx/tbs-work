import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import goods from '@/components/goods/goods'
import detail from '@/components/goods/detail'
import category from '@/components/goods/category'
import cate from '@/components/goods/cate'
import search from '@/components/goods/search'

import pageIntro from '@/components/page/page_intro'
import news from '@/components/news/news'
import newDetail from '@/components/news/detail'

import album from '@/components/phone/album'
import albumDatail from '@/components/phone/album-datail'
import wcard from '@/components/wcard/wcard'
import Unwcard from '@/components/wcard/un_wcard'
import contact from '@/components/contact/contact'
import video from '@/components/video/video'

//bigger 主题
import bigger_index from '@/components/bigger/index'
import bigger_goods from '@/components/bigger/goods/goods'
import bigger_goods_detail from '@/components/bigger/goods/detail'
import bigger_new_detail from '@/components/bigger/news/detail'
import bigger_album from '@/components/bigger/phone/album'
import bigger_wcard from '@/components/bigger/wcard/wcard'


Vue.use(Router)

export default new Router({
   routes: [
      // default 系统默认主题
      {
         path: '/',
         name: 'index',
         component: index,
         meta: {name: 'index'}
      },
      {
         path: '/goods',
         name: 'goods',
         component: goods,
         meta: {name: 'goods'}
      },
      {
         path: '/goods/detail',
         name: 'detail',
         component: detail,
         meta: {name: 'detail'}
      },
      {
         path: '/goods/category',
         name: 'category',
         component: category,
         meta: {name: 'category', only: true}
      },
      {
         path: '/goods/cate',
         name: 'cate',
         component: cate,
         meta: {name: 'cate', only: true}
      },
      {
         path: '/goods/search',
         name: 'search',
         component: search,
         meta: {name: 'search', only: true}
      },

      {
         path: '/page/intro',
         name: 'page_intro',
         component: pageIntro,
         meta: {name: 'page_intro', only: true}
      },
      {
         path: '/news',
         name: 'news',
         component: news,
         meta: {name: 'news', only: true}
      },
      {
         path: '/news/detail',
         name: 'newDetail',
         component: newDetail,
         meta: {name: 'newDetail', only: true}
      },
      {
         path: '/album',
         name: 'album',
         component: album,
         meta: {name: 'album'}
      },
      {
         path: '/album/datail',
         name: 'album-datail',
         component: albumDatail,
         meta: {name: 'album-datail', only: true}
      },
      {
         path: '/wcard',
         name: 'wcard',
         component: wcard,
         meta: {name: 'wcard'}
      },
      {
         path: '/un/wcard',
         name: 'un_wcard',
         component: Unwcard,
         meta: {name: 'un_wcard', only: true}
      },
      {
         path: '/contact',
         name: 'contact',
         component: contact,
         meta: {name: 'contact', only: true}
      },
      {
         path: '/video',
         name: 'video',
         component: video,
         meta: {name: 'video', only: true}
      },
      //bigger 主题
      {
         path: '/',
         name: 'bigger_index',
         component: bigger_index,
         meta: {name: 'index'}
      },
      {
         path: '/goods',
         name: 'bigger_goods',
         component: bigger_goods,
         meta: {name: 'goods'}
      },
      {
         path: '/goods/detail',
         name: 'bigger_goods_detail',
         component: bigger_goods_detail,
         meta: {name: 'goods_detail'}
      },
      {
         path: '/news/detail',
         name: 'bigger_new_detail',
         component: bigger_new_detail,
         meta: {name: 'new_detail'}
      },
      {
         path: '/album',
         name: 'bigger_album',
         component: bigger_album,
         meta: {name: 'album'}
      },
      {
         path: '/wcard',
         name: 'bigger_wcard',
         component: bigger_wcard,
         meta: {name: 'wcard'}
      },
      {path: '*', redirect: '/'}

   ],
   //mode: 'history',
   scrollBehavior(to, from, ition){
      //return {selector: '.btn'} 选择器定位到该地方
      if (ition) {  // 记忆上一个页面的离开时的位子(需要浏览器回退)
         return ition
      } else {
         return {x: 0, y: 0}
      }
   }
});
