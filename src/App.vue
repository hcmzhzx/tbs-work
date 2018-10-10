<template>
  <div id="wrap">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'wrap'
}
</script>

<style>
  html,body,div,ul,ol,li,dl,dt,dd,form,input,textarea,table,h1,h2,h3,h4,p,span,a,em,i,img{margin: 0; padding: 0; font-style: normal;}
  html,body{height: 100%; background: #fafafa; font: 1em '\5FAE\8F6F\96C5\9ED1','\9ED1\4F53','\5B8B\4F53';}
  ul,ol{list-style: none;}table{border-collapse: collapse;}
  iframe,img{border:none;}
  a,a:hover,a:visited,a:active{text-decoration:none;color:inherit;}
  input,button,select,textarea{font:inherit;outline:0;border:0;border-radius:0;-webkit-tap-highlight-color:transparent;-moz-appearance:none;appearance:none;-webkit-appearance:none;background:transparent;line-height:normal;-webkit-writing-mode:horizontal-tb;resize:none;color:inherit;white-space:pre-wrap;word-wrap:break-word;-webkit-rtl-ordering:logical;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;/*flex-direction: column;*/}
  input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none !important;-moz-appearance:none !important;}
  input[type="file"]{position:absolute;top:0;left:0;bottom:0;right:0;opacity:0;}
  input[type="radio"],input[type="checkbox"]{font:caption;}
  .flex{display: -webkit-box;}
  .flexv{display: -webkit-box;/*! autoprefixer: off */ -webkit-box-orient: vertical;/* autoprefixer: on */}
  .flexitem{display: -webkit-box;/*! autoprefixer: off */ -webkit-box-flex: 1;/* autoprefixer: on */ -webkit-flex: 1; flex: 1;}
  .flexitemv{display: -webkit-box;/*! autoprefixer: off */ -webkit-box-flex: 1;/* autoprefixer: on */ -webkit-flex: 1; flex: 1; -webkit-box-orient: vertical;}
  .center{-webkit-box-align: center;/*! autoprefixer: off */ -webkit-box-pack: center;/* autoprefixer: on */}
  .centerv{-webkit-box-align: center;}
  .centerh{-webkit-box-pack: center;}
  .end{-webkit-box-align: end;/*! autoprefixer: off */ -webkit-box-pack: end;/* autoprefixer: on */}
  .endh{-webkit-box-pack: end;}
  .endv{-webkit-box-align: end;}
  .br{display: flex;flex-wrap:wrap;}  /*换行*/
  .fitimg{width: 100%; height: 100%;}
  .wrap{height:100%;}
  .mainbox{position: relative; overflow-x: hidden; overflow-y: auto; -webkit-overflow-scrolling: touch;}
  .header{background: #fff; box-shadow: 0 2px 2px rgba(0,0,0,0.05),0 1px 0 rgba(0,0,0,0.05);}


  .rd,.zx{font-size:inherit;}
  /**************************** mint-ui css *****************************************/
  .mint-actionsheet-button{color:#f00}
  .mint-msgbox-btn{font-size:1.05em}
  .mint-toast.error{background: rgba(255,0,0,0.6)}
  /*******************************组件css********************************************/
  #loading{position: fixed; top: 0; right: 0; left: 0; bottom: 0; background: rgba(0,0,0,0.2); z-index: 99999999;}
  #loading .container{position: absolute; top: 50%; left: 50%; margin-left: -50px; margin-top: -50px; width: 90px; height: 90px; padding: 10px; border-radius: 6px; background: #333; display: -webkit-box; -webkit-box-pack: center; -webkit-box-align: center; -webkit-box-orient: vertical; overflow: hidden;}
  #loading .loader,#loading .loader:before,#loading .loader:after{border-radius: 50%;}
  #loading .loader:before,#loading .loader:after {position: absolute; content: '';}
  #loading .loader:before{width: 22px; height: 44px; background: #333; border-radius: 44px 0 0 44px; top: -2px; left: -4px; -webkit-transform-origin: 22px 21px; transform-origin: 22px 21px; -webkit-animation: progresses 2s infinite ease 1.5s; animation: progresses 2s infinite ease 1.5s;}
  #loading .loader{font-size: 11px; text-indent: -99999em; margin: 0 auto; position: relative; width: 40px; height: 40px; box-shadow: inset 0 0 0 4px #FFF;}
  #loading .loader:after{width: 22px; height: 44px; background: #333; border-radius: 0 44px 44px 0; top: -3px; left: 20px; -webkit-transform-origin: 0px 22px; transform-origin: 0px 22px; -webkit-animation: progresses 2s infinite ease; animation: progresses 2s infinite ease;}
  #loading .text{color: #fff; font-size: 0.9em; text-align: center; padding-top: 8px;}
  /****************************弹窗组件************************************************/
  #alert{position:fixed;top:0;left:0;width:100%;bottom:0;overflow:hidden;z-index:1000;background:rgba(0,0,0,.5)}
  #alert .mask{position:absolute;top:0;left:0;width:100%;height:100%}
  #alert .content{position:absolute;top:50%;left:50%;width:80%;max-width:320px;background:#fff;border-radius:5px;overflow:hidden;transition:transform .2s linear;-webkit-transition:transform .2s linear;}
  #alert .content .title{padding:10px;line-height:20px;font-size:1.1em;font-weight:bold;text-align:center}
  #alert .content .text{padding:10px;line-height:24px;font-size:.98em;max-height:246px;overflow:hidden;margin:10px 0;text-align:center}
  #alert .qrbox{margin:10px auto;width:180px;height:180px;background:#eee}
  #alert .qrbox img{width:100%;height:100%}
  #alert .content .button{border-top:1px solid #eee}
  #alert .content .button a{text-align:center;height:46px;line-height:46px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:1.05em;border-left:1px solid #eee}

  #alert .content.qrcode{top:20%;left:10%;}
  #alert .content.QQ{top:34%;left:10%;}
  #alert .content.wechat{top:24%;left:10%;}
  #alert .content.un_box{top:40%;left:10%;}
  /****************************action组件********************************************/
  #action{position: fixed; top: 0; left: 0; width: 100%; bottom: 0; z-index: 999;}
  #action .mask{position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000; opacity: 0; transition: opacity 0.2s ease; -webkit-transition: opacity 0.2s ease;}
  #action .button{position: absolute; top: 100%; bottom: 0; width: 100%; transition: translate 0.2s ease; -webkit-transition: transform 0.2s ease;}
  #action .button .title{height: 40px; line-height: 40px; font-size: 0.95em; color: #666; overflow: hidden; background: #fff; text-align: center; padding: 0 10px;}
  #action .button a{display: block; height: 49px; line-height: 49px; text-align: center; border-top: 1px solid #eee; background: #fff; font-size: 1.1em;}
  #action .button a.cancel{background: #f00; color: #fff; margin-top: 10px; border-top-color: #f00;}
  /*******************************动画***********************************************/
  @keyframes progresses{0%{transform: rotate(0deg);}100%{transform: rotate(360deg);}}
  @-webkit-keyframes progresses{0%{-webkit-transform: rotate(0deg);}100%{-webkit-transform: rotate(360deg);}}
  @-webkit-keyframes imageLoad{0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);} 100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}}
  @keyframes imageLoad {0% {-webkit-transform: rotate(0deg); transform: rotate(0deg);} 100% {-webkit-transform: rotate(360deg); transform: rotate(360deg);}}
  /*******************************相册***********************************************/
  #swiper{position:fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; z-index: -1;}
  #swiper.show{z-index: 99;}
  #swiper .top{position: fixed; top: 0; left: 0; right: 0; height: 52px; background: rgba(0,0,0,0.5); z-index: 10;}
  #swiper .top .title{color: #fff;}
  #swiper .top .side{width: 60px; color: #fff;}
  #swiper .top a.side{font-size: 1.4em;}
  /*#swiper .wrap .swiper-slide{position: relative; -webkit-flex-shrink: 0; flex-shrink: 0; overflow: hidden;}*/
  #swiper .wrap .swiper-slide img{max-width: 100%; max-height: 100%;}
  #swiper .wrap .swiper-slide span{position: absolute; top: 50%; left: 50%; width: 24px; height: 24px; border-style: solid; border-width: 3px; border-color: #fff #fff transparent transparent; border-radius: 50%; margin-top: -15px; margin-left: -15px; -webkit-animation: imageLoad 1s infinite linear; animation: imageLoad 1s infinite linear;}
  #swiper .text{position: fixed; left: 0; bottom: 0; right: 0; padding: 10px; background: rgba(0,0,0,0.5); color: #fff; height: 20px; line-height: 20px;}
  /**********************************************************************************/
  .frame{position: fixed; top: 0; left: 0; width: 100%; height: 100%; transition: transform 0.2s linear; -webkit-transition: transform 0.2s linear; transform: translateX(100%); -webkit-transform: translateX(100%); background: #fff; z-index: 9999;}
  .frameshow{transform: translateX(0px); -webkit-transform: translateX(0px);}
  .frame .header{position: absolute; top: 0; left: 0; right: 0; height: 52px; border-bottom: 1px solid #eee; line-height: 52px; z-index: 9;}
  .frame .header .side{position: absolute; top: 0; left: 0; color: #555; width: 60px; padding: 0 5px; text-align: center;}
  .frame .header .save{left: initial; right: 0;}
  .frame .header .title{font-size: 1.05em; text-align: center;}
  .frame .bodys{position: absolute; top: 52px; left: 0; right: 0; bottom: 0; overflow-x: hidden; overflow-y: auto; -webkit-overflow-scrolling: touch;}
  #none{padding: 10px;}
  #none .icon{width: 80px; height: 80px; background: url(assets/image/error.png) no-repeat; background-size: cover;}
  #none p{padding: 10px 0; color: #555;}
  #none .link{margin-top: 10px;}
  #none .link a{background: #fff; border: 1px solid #f5f5f5; padding: 10px; border-radius: 4px; font-size: 0.8em;}
  #tabs{height: 40px; background: #fff; border-bottom: 1px solid #eee;}
  #tabs a{position: relative; font-size: 0.95em; width: 0%;}
  #tabs a:after{content: ''; position: absolute; left: 35%; right: 35%; bottom: 0; height: 3px; background: #c33; visibility: hidden;}
  #tabs a.current{color: #c33;}
  #tabs a.current:after{visibility: visible;}
  /**********************************************************************************/
  .cliper{position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #fff; opacity: 0; z-index: -1; transition: opacity 0.5s linear; -webkit-transition: opacity 0.5s linear;}
  .cliper .header{position: absolute; top: 0; left: 0; right: 0; height: 52px;  line-height: 52px; background: #fdfdfd; border-bottom: 1px solid #eee; padding: 0 60px;}
  .cliper .header .side{position: absolute; top: 0; width: 60px; text-align: center; bottom: 0;}
  .cliper .header .cancel{left: 0; color: #f00;}
  .cliper .header .confirm{right: 0; color: #27e;}
  .cliper .header .title{text-align: center; font-size: 1.05em;}
  .cliper .cliperbox{position: absolute; top: 52px; left: 0; right: 0; bottom: 0;}
  /**********************************************************************************/
  #studio.home{background: url(assets/image/bg.jpg) no-repeat;background-size: cover;}
  #studio.card{background: url(assets/image/wCard_bg.png) no-repeat; background-size: cover;}
  #wrap,#wrap>div{height: 100%;}
  #header{height: 52px; background: #fbfbfb; border-bottom: 1px solid #eee;position:relative;z-index:1;}
  #header .side{width: 60px;}
  #header input.side{border: none; padding: 0; background: none; color: #27e;}
  #header .side.icon{font-size: 1.5em; color: #ababab; text-indent: 5px;}
  #header .side span{color: #d5e7ff; font-size: 0.95em;}
  #header .delete{color: #f00;}
  #header .title{font-size: 1.05em; overflow: hidden;}
  #header .title i{padding: 0 4px;}
  #header .title input.searchkey{padding: 6px; font-size: 0.95em; border: 1px solid #eee; background: #ececec; border-radius: 5px;}
  #header .tabs a{position: relative; width: 90px; height: 52px;}
  #header .tabs a:after{content: ''; position: absolute; left: 30%; width: 40%; bottom: -1px; height: 2px; background: transparent;}
  #header .tabs a.current{color: #27e;}
  #header .tabs a.current:after{background: #27e;}
  #header .tabs a span{-webkit-line-clamp: 1; padding: 0 4px; height: 20px; line-height: 20px; overflow: hidden;}
  #header .search{margin: 8px 6px; border: 1px solid #eee; background: #ececec; border-radius: 5px; padding: 6px; font-size: 0.95em; color: #555;}
  #main{position: relative; overflow-x: hidden; overflow-y: auto; -webkit-overflow-scrolling: touch;}
  #main::-webkit-scrollbar{display: none;}
  #footer{position: relative; height: 50px; background: #fafafa; border-top: 1px solid #eee;}
  #footer .link{width: 0%;}
  #footer .link i{width: 30px; height: 30px; font-size: 1.4em;}
  #footer .link em{font-size: 0.8em; color: #666; height: 20px;}
  #footer .post{position: relative; width: 60px; padding-top: 30px;}
  #footer .post i{position: absolute; top: -20px; left: 5px; width: 48px; height: 48px; border: 1px solid #eee; border-radius: 50%; background: #fafafa; font-size: 1.4em;}
  #footer .post em{font-size: 0.8em; color: #666; height: 20px;}
  #footer .current i,#footer .current em{color: #27e;}
  /**********************************************************************************/
  #userboard{height: 260px; background: url(assets/image/user_bg.jpg) no-repeat top center; background-size: auto 180px;}
  #userboard .title{font-weight: normal; height: 40px; color: #fff; font-size: 1.05em; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);}
  #userboard .user .side{width: 0%;}
  #userboard .user .side a i{width: 40px; height: 40px; border-radius: 50%; background: #c4e437; font-size: 1.6em; color: #fff;}
  #userboard .user .side a em{font-size: 0.8em; color: #888; padding-top: 4px;}
  #userboard .user .head{position: relative; width: 80px; height: 80px; border-radius: 50%; box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.1);}
  #userboard .user .head i{position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; background: #eee; color: #fff; border-radius: 50%; border: 2px solid #fff; font-size: 0.9em;}
  #userboard .user .head i.vip{background: #f40;}
  #userboard .user h3{font-weight: normal; height: 20px; font-size: 1.1em; padding: 5px 0;}
  #userboard .user .edit span{font-size: 0.8em; color: #888;}
  #homelink{padding: 10px; max-width: 480px; margin: 0 auto;}
  #homelink a{position: relative; float: left; width: 33.33%; margin: 6px 0;}
  #homelink a i{width: 50px; height: 50px; color: #fff; border-radius: 4px; font-size: 1.8em;}
  #homelink a em{font-size: 0.9em; color: #999; padding: 4px 0;}
  #homelink a s{position: absolute; top: 50%; left: 50%; background: #f00; min-width: 16px; height: 16px; padding: 2px; font-size: 0.8em; color: #fff; margin-top: -46px; margin-left: 10px; border-radius: 50%; text-decoration: none;}
  /**********************************************************************************/
  #toper{height: 50px; background: rgba(0,0,0,0.35); color: #fff; border-bottom: 1px solid #2F87F9;}
  #board .head a{width: 40px; height: 40px; background: rgba(0,0,0,0.5); color: #fff; border-radius: 50%; font-size: 1.4em;}
  #board .head div{position: relative; width: 100px; height: 100px; border-radius: 50%; margin: 0 40px; box-shadow: 0px 0px 4px 3px rgba(0,0,0,0.09); border: 2px solid #fff;}
  #board .head div span{position: absolute; bottom: 0; right: 0; width: 30px; height: 30px; line-height: 34px; text-align: center; background: #fff; border-radius: 50%; font-size: 1.2em; color: #f40;}
  #board .info{padding-top: 10px;}
  #board .info h2{font-size: 1.2em; font-weight: normal; color: #fff; text-shadow: 1px 2px 3px rgba(0,0,0,0.5); height: 30px; line-height: 30px;}
  #board .info p{font-size: 0.9em; color: #fff;}
  #board .contact{padding-top: 10px;}
  #board .contact a{width: 40px; margin: 0 20px;}
  #board .contact a i{width: 40px; height: 40px; border-radius: 50%; color: #fff; background: #eee; font-size: 1.4em;}
  #board .contact a em{font-size: 0.9em; color: #fff;}
  #main.home{padding: 0 2px;}
  #home{width: 100%; overflow: hidden; max-width: 480px; margin: 0 auto;}
  #home li{width: 25%; padding-top: 25%; /*height: 90px;*/ position: relative; float: left;}
  #home li a{position: absolute; top: 2px; left: 2px; bottom: 2px; right: 2px; background: rgba(255,255,255,0.35);}
  #home li a i{width: 40px; height: 40px; font-size: 1.8em; color: #fff;}
  #home li a em{font-size: 0.9em; color: #fff;}
  #signup{padding: 10px;}
  #signup a{height: 50px; font-size: 1.05em; color: #fff;}
  #notice{background: rgba(0,0,0,0.5) url(assets/image/wxnotice.png) right 10px no-repeat; background-size: 240px auto; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 999;}
  /**********************************************************************************/
  #album .photolist{padding:5px}
  #album .photolist li{float:left;position:relative;width:33.333%;padding-top:33.33%}
  #album .photolist li a{position:absolute;top:5px;left:5px;right:5px;bottom:5px;overflow:hidden}
  #album .photolist li a img{position:absolute;top:0;left:0;object-fit:cover;}
  #album .photolist li a span{position:absolute;bottom:0;left:0;right:0;height:30px;line-height:30px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding:0 10px;font-size:.8em;color:#fff;background:rgba(0,0,0,.5);text-align:center}


  #album .albumlist li{position: relative; padding: 8px; background: #fff; border-bottom: 1px solid #f5f5f5;}
  #album .albumlist li img{width: 80px; height: 80px;}
  #album .albumlist li div{padding: 0 10px;}
  #album .albumlist li div h3{font-weight: normal; font-size: 1em; height: 20px; line-height: 20px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; padding-bottom: 6px;}
  #album .albumlist li div p{font-size: 0.8em; color: #888; height: 54px; line-height: 18px; overflow: hidden;}
  #album .albumlist li i{height: 80px; color: #888; font-size: 1.2em;}
  #album .albumlist li a{position: absolute; top: 0; left: 0; right: 40px; bottom: 0;}

  #upload .album{border-bottom: 1px solid #f5f5f5; padding: 6px; background: #fff;}
  #upload .album .cover{width: 40px; height: 40px; overflow: hidden;}
  #upload .album .info{padding: 0 10px;}
  #upload .album .info h3{font-weight: normal; font-size: 1em; height: 20px; line-height: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  #upload .album .info p{font-size: 0.8em; color: #888; height: 14px; line-height: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  #upload .album  i{height: 40px; font-size: 1.4em; color: #999;}
  #upload .photos{padding: 5px;}
  #upload .photos li{position: relative; width: 33.33%; padding-top: 33.33%; padding-bottom: 30px;}
  #upload .photos li .cover{position: absolute; top: 5px; left: 5px; right: 5px; bottom: 35px; overflow: hidden; background: #f5f5f5;}
  #upload .photos li .cover em{position: absolute; left: 0; top: 50%; width: 100%; height: 30px; line-height: 30px; text-align: center; font-size: 0.8em; margin-top: -20px;}
  #upload .photos li .cover img{position: absolute; top: 0; left: 0; z-index: 3;object-fit: cover;}
  #upload .photos li .cover span{position: absolute; left: 0; bottom: 0; height: 24px; background: rgba(255,0,0,0.5); color: #fff; width: 100%; font-size: 0.9em; z-index: 4;}
  #upload .photos li div{position: absolute; bottom: 5px; left: 5px; right: 5px; height: 30px;}
  #upload .photos li div input{border: none; padding: 6px; font-size: 0.8em;}
  /**********************************************************************************/
  #error{padding: 20px;}
  /*#error .icon{width: 200px; height: 160px; background: url(../image/error.png) no-repeat; background-size: cover;}*/
  #error .text{padding: 20px 10px;}
  #error .text h3{font-weight: normal; font-size: 1.1em; border-bottom: 1px solid #eee; height: 36px;}
  #error .text p{font-size: 0.8em; color: #888; line-height: 20px; padding-top: 10px;}
  #error .link{padding: 10px 0; width: 100%;}
  #error .link a{height: 40px; margin: 0 10px; border: 1px solid #27e; border-radius: 50px; color: #27e;}
  /**********************************************************************************/
  .circle{border-radius: 50%;}
  #article-title{padding: 10px;}
  #article-title h1{font-size: 1.2em; font-weight: normal; line-height: 26px;}
  #article-title .author{padding-top: 10px;}
  #article-title .author .date{color: #999; padding-right: 10px; height: 18px; line-height: 18px;}
  #article-title .author .cname{color: #27e; height: 18px; line-height: 18px; max-width: 220px; -webkit-line-clamp: 1;}
  #article-title .author .change{width: 70px; height: 24px; border-radius: 24px; background: #28a7e1; color: #fff; font-size: 0.8em;}
  #article-title .topcard{margin-top: 14px;}
  #article-title .topcard .head{width: 44px; height: 44px; overflow: hidden;}
  #article-title .topcard .contact{padding-left: 8px;}
  #article-title .topcard .contact .item{height: 20px; line-height: 20px; overflow: hidden;}
  #article-title .topcard .contact .item .icon{width: 20px; height: 20px; color: #27e;}
  #article-title .topcard .contact .item .text{width: 90px; margin: 0 2px; overflow: hidden; -webkit-line-clamp: 1; font-size: 0.85em; color: #555; word-break: break-all;}
  #article-title .topcard .contact .item .btn{font-size: 0.7em; padding: 0 6px; border-radius: 20px; background: linear-gradient(90deg,#94c5fb,#2374e6); color: #fff;}
  #article-title .topcard .contact .item:last-child{margin-top: 4px;}
  #article-title .topcard .contact .item:last-child .icon{color: #18ca2c;}
  #article-title .topcard .contact .item:last-child .btn{background: linear-gradient(90deg,#85ec8b,#18ca2c);}
  #article-title .topcard .online .message{width: 68px; height: 28px; border-radius: 28px; color: #fff; font-size: 0.8em; background: linear-gradient(90deg,#ffe13c,#ffa70f);}
  #article-body{padding: 0 10px;}
  #article-body img{max-width: 100%;}
  #article-body p{margin-bottom: 10px; line-height: 28px;}
  .article-notice{font-size: 0.8em; color: #999; padding: 8px 10px;}
  #article-tool{padding: 6px 10px;}
  #article-tool span{color: #888; padding-right: 4px;}
  #article-tool a{font-size: 0.95em; color: #28a7e1;}
  #article .openits{margin: 8px 10px; padding-top: 12.5%; background: url(./assets/image/article.gif) center no-repeat; background-size: 100%;}
  #article .goods{padding: 0 5px;}
  #article .goods .lists{position: relative; float: left; width: 25%; padding-top: 25%; padding-bottom: 24px;}
  #article .goods .cover{position: absolute; top: 5px; left: 5px; right: 5px; bottom: 29px; background: #eee;}
  #article .goods .title{position: absolute; left: 5px; right: 5px; bottom: 5px; height: 24px; line-height: 30px; overflow: hidden; -webkit-line-clamp: 1; font-weight: normal; font-size: 0.85em; color: #888;}
  #article .link{position: absolute; top: 5px; left: 5px; right: 5px; bottom: 5px;}
  #article .news{padding: 0 10px;}
  #article .news .lists{position: relative; padding: 5px 0; border-bottom: 1px solid #f2f2f2;}
  #article .news .lists:last-child{border-bottom: none;}
  #article .news .cover{position: relative; overflow: hidden; width: 80px; height: 60px; background: #fafafa; margin-left: 10px;}
  #article .news .title{font-size: 1em; height: 40px; line-height: 20px; overflow: hidden; -webkit-line-clamp: 2; font-weight: normal;}
  #article .news .date{font-size: 0.8em; color: #999;}
  #article .poster{height: 96px; background: #fafafa url(./assets/image/talking.jpg) no-repeat; margin: 0 10px; background-size: 100% 100%;}
  #article .poster span{padding-left: 38px; padding-top: 2px; font-size: 0.95em;}
  #article .poster span:first-child{padding-top: 15px;}
  #article .card{position: relative; margin: 30px 10px 5px; border: 1px solid #f54d4d; border-radius: 4px; padding: 10px; background: url(./assets/image/card_head_bg.png) center 17px no-repeat;}
  #article .card .head{height: 40px; font-size: 1.4em; color: #f54d4d; width: 100px; background: #fff; margin-top: -30px;}
  #article .card .upic{position: relative; width: 58px; height: 58px; border-radius: 50%; background: #fff; margin-top: 2px; overflow: hidden;}
  #article .card .cname{height: 40px; font-size: 0.9em; color: #333;}
  #article .card .cname em{color: #999; padding: 0 5px;}
  #article .card .contact{width: 100%;}
  #article .card .contact .item{width: 0%; border-radius: 34px; background: #eee; color: #fff; margin: 0 5px;}
  #article .card .contact .item i{width: 20px; margin-left: 8px; font-size: 1.2em;}
  #article .card .contact .item span{font-size: 0.85em; padding: 0 6px; height: 34px; line-height: 34px; -webkit-line-clamp: 1; overflow: hidden;}
  #article .qrcode{position: relative; height: 160px; max-width: 480px; background: url(./assets/image/qrcode_bg.png) center 10px no-repeat; background-size: 100% 140px; margin: 0 auto;}
  #article .qrcode .box{width: 120px; height: 120px; background: #fafafa;}
  #article .qrcode .box span{font-size: 0.9em; color: #999; text-align: center; padding: 0 10px;}
  #article .qrcode .text{margin-top: 20px; height: 20px;}
  #article .payit{width: 220px; height: 38px; border-radius: 38px; margin: 5px auto; color: #fff; background: -webkit-linear-gradient(left,#f3201f 0,#f75f5e 100%); background: linear-gradient(to right,#f3201f 0,#f75f5e 100%);}
  /***************************************************************************************/
  .confirm{position: fixed; top: 0; left: 0; right: 0; bottom: 0; transform: translateX(-100%); -webkit-transform: translateX(-100%); z-index: 999;}
  .confirm.hide{transition-delay: 0.3s; -webkit-transition-delay: 0.3s;}
  .confirm.show{transform: translateX(0); -webkit-transform: translateX(0); transition-delay: 0s; -webkit-transition-delay: 0s;}
  .confirm .mask{position: absolute; top: 0; right: 0; width: 100%; height: 100%; background: #000; opacity: 0; transition: opacity linear 0.3s;}
  .confirm .content{position: relative; z-index: 9; margin: 70px 20px 0; padding: 10px; background: #fff; border-radius: 4px; box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.2); transform: translateY(-300px); -webkit-transform: translateY(-300px); transition: transform linear 0.3s; -webkit-transition: transform linear 0.3s;}
  .confirm.show .mask{opacity: 0.6;}
  .confirm.show .content{transform: translateY(0); -webkit-transform: translateY(0);}
  .confirm .content .closeit{position: absolute; top: -60px; right: 10px; width: 26px; height: 26px; border: 2px solid #fff; border-radius: 50%; color: #fff; font-size: 1.1em;}
  .confirm .content .closeit:after{content: ''; position: absolute; top: 26px; left: 12px; width: 2px; height: 34px; background: #fff;}
  .confirm .content .qrcode .codeimg{width: 160px; height: 160px;}
  .confirm .content .qrcode p{font-size: 0.95em; color: #999; padding: 8px 0; text-align: center;}
  .confirm .content .qrcode a.btn{min-width: 120px; padding: 0 20px; height: 36px; border-radius: 36px; background: #27e; color: #fff;}
  .confirm .content .qrcode a.subbtn{margin-top: 20px;}
  .confirm .content .qrcode .notice{padding-top: 6px; font-size: 0.8em; color: #999;}
  /**********************************************************************************/
  #tabsbar{box-shadow: 0 -2px 4px rgba(0,0,0,0.05),0 -1px 0 rgba(0,0,0,0.05);}
  #tabsbar .item{width: 60px; color: #999;}
  #tabsbar .item i{width: 26px; height: 26px; font-size: 1.2em;}
  #tabsbar .item em{font-size: 0.8em; height: 20px;}
  #tabsbar .user{position: relative;}
  #tabsbar .user .info{position: relative; background: #fff; z-index: 9; height: 50px;}
  #tabsbar .user .head{width: 38px; height: 38px; margin-top: -12px; border-radius: 50%; overflow: hidden;}
  #tabsbar .user .cname{font-size: 0.8em; color: #ff4747; height: 20px;}
  #tabsbar .user:after{content: ''; position: absolute; top: -12px; left: 50%; margin-left: -26px; width: 50px; height: 50px; border-radius: 50%; border: 1px solid #f2f2f2; background: #fff;}
  /**********************************************************************************/
  #card{position: relative; margin: 10px; border-radius: 4px; background: #0076FF; overflow: hidden; box-shadow: 1px 2px 3px #eee;}
  #card .phone{position: absolute; top: 10px; right: 0; background: #fff; height: 26px; padding: 5px; border-radius: 50px 0 0 50px; color: #cc3333;}
  #card .phone i{height: 24px; width: 24px; border: 1px solid #eee; border-radius: 50%;}
  #card .phone span{font-size: 0.9em; vertical-align: 2px; margin-left: 5px;}
  #card .info{padding: 10px;}
  #card .info .head{width: 70px; height: 70px; border-radius: 50%; overflow: hidden; margin-right: 10px;}
  #card .info .name h3{font-size: 1em; font-weight: normal; height: 20px; padding-bottom: 8px;}
  #card .info .name h3 span{color: #fff; text-shadow: 0px 0px 3px rgba(0,0,0,0.5);}
  #card .info .name h3  em{font-size: 0.7em; color: #fff; margin-left: 4px;}
  #card .info .name a{height: 22px; color: #fff; overflow: hidden;}
  #card .info .name a i{font-size: 1.2em; padding-right: 6px; vertical-align: -2px;}
  #card .info .name a span{font-size: 0.8em;}
  #card .link a{height: 40px; background: rgba(0,0,0,0.5); color: #fff; border-left: 1px solid #3A689C; margin-left: -1px;}
  #card .link a i{font-size: 1.15em; margin-right: 6px;}
  #card .link a span{font-size: 0.95em;}
  /**********************************************************************************/
  #sortgoods{position: relative; z-index: 8; background: #fff; box-shadow: 0 2px 2px rgba(0,0,0,0.05),0 1px 0 rgba(0,0,0,0.05);}
  #sortgoods a{position: relative; height: 46px;}
  #sortgoods a:after{content: ''; position: absolute; top: 14px; bottom: 14px; right: 0; width: 1px; background: #eee;}
  #sortgoods a:last-child{}
  #sortgoods a:last-child:after{background: none;}
  #sortgoods a span{font-size: 0.95em;}
  #sortgoods a.current span{color: #27e;}
  #sortgoods a em{height: 20px; padding: 0 4px;}
  #sortgoods a em i{color: #ccc; font-size: 0.7em; height: 10px;}
  #sortgoods a em i.active{color: #27e;}
  /**********************************************************************************/
  #more{width:100%;height: 50px;}
  #more i{width: 16px; height: 16px; display: inline-block; border-width: 1px; border-style: solid; border-color: #ccc #ccc #222 #222; border-radius: 50%; -webkit-animation: imageLoad 1s infinite linear; animation: imageLoad 1s infinite linear; vertical-align: -3px;}
  #more span{font-size: 0.9em; padding-left: 8px; color: #999;}
  /************************************ 商品详情 **********************************************/
  #detail #goods .cover{position: relative; max-width: 480px; margin: 0 auto; padding-top: 100%;}
  #detail #goods .cover .img{position: absolute; top: 0; left: 0; width: 100%; height: 100%;}
  #detail #goods .cover .img img{width: 100%; height: 100%;}
  #detail #goods .info{padding: 10px; background: #fff; border-bottom: 1px solid #eee;}
  #detail #goods .info h1{font-size: 1.1em; font-weight: normal; border-bottom: 1px solid #f5f5f5; padding-bottom: 10px;}
  #detail #goods .info p{padding-top: 10px;}
  #detail #goods .info p span{font-size: 0.9em; color: #999; margin-right: 10px;}
  #detail #goods .info p i{font-size: 1.2em; color: #f00;}
  #detail #goods .titles{position: relative; height: 40px; padding: 10px;}
  #detail #goods .titles:after{content: ''; position: absolute; top: 28px; left: 10px; right: 10px; height: 2px; background: #eee;}
  #detail #goods .titles span{position: relative; padding: 0 10px; background: #fafafa; z-index: 2; font-size: 1.1em;}
  #detail #goods .detail{padding: 10px; background: #fff; border-top: 1px solid #f5f5f5;}
  #detail #goods .detail img{max-width: 100%;}
  #detail #goods .detail p{line-height: 1.45em; padding-bottom: 10px; color: #333;}
  /************************************ 商品列表 **********************************************/
  #goods{position: relative;}
  #goods .goods li{padding: 5px; background: #fff; border-bottom: 1px solid #f5f5f5;}
  #goods .goods li .info img{width: 80px; height: 80px;}
  #goods .goods li .info div{padding: 0 10px;}
  #goods .goods li .info h3{font-size: 0.95em; font-weight: normal; height: 40px; line-height: 20px; text-overflow: ellipsis; -webkit-line-clamp: 2; word-break: break-all; overflow: hidden;}
  #goods .goods li .info p{height: 20px; color: #f00; font-size: 1.1em;}
  #goods .goods li .option{width: 50px;}
  #goods .goods li .option a.rd{color: #888; font-size: 1.2em;}
  /**********************************************************************************/
  #tabbar{position: relative; z-index: 8;  height: 50px; background: #fff; box-shadow: 0 -2px 4px rgba(0,0,0,0.05),0 -1px 0 rgba(0,0,0,0.05);}
  #tabbar a{width: 0%; border-left: 1px solid #eee; margin-left: -1px;}
  /**********************************************************************************/
  #category{max-width: 480px; padding: 2px;}
  #category .box{position: relative; float: left; width: 50%;}
  #category .box .cover{position: relative; padding-top: 100%;}
  #category .box .cover div{position: absolute; top: 5px; left: 5px; right: 5px; bottom: 5px; background: #fff;}
  #category .box .cover div img{width: 100%; height: 100%;}
  #category .box h3{font-weight: normal; font-size: 1em; overflow: hidden; padding: 4px 5px;}
  #category .box a{position: absolute; top: 5px; left: 5px; right: 5px; bottom: 5px;}
  /**********************************************************************************/
  #msgform .form{padding: 0 10px;}
  #msgform .form .title{height: 36px; color: #999;}
  #msgform .form .text{border: 1px solid #f5f5f5; height: 20px; line-height: 20px; padding: 12px 8px;}
  #msgform .form textarea.text{resize: none; height: 80px; font-size: 1em;}
  #msgform .form .imgcode{width: 80px; height: 44px; margin-left: 10px;}
  #msgform .form .submit{border: none; border-radius: 2px; height: 50px; background: #cc3333; color: #fff; margin-top: 20px;}
  /**********************************************************************************/

  #newslist{position: relative;}
  #newslist .lists{position: relative; padding: 10px; background: #fff; border-bottom: 1px solid #f5f5f5;}
  #newslist .lists .cover{position: relative; width: 100px; height: 80px; background: #fbfbfb; overflow: hidden;}
  #newslist .lists .cover img{position: absolute; top: 0; left: 0;object-fit:cover;}
  #newslist .lists .info{padding-left: 10px;}
  #newslist .lists .info h3{font-weight: normal; font-size: 1.02em; color: #000; -webkit-line-clamp: 2; overflow: hidden; text-overflow: ellipsis; line-height: 20px;}
  #newslist .lists .info p{font-size: 0.85em; color: #999; height: 16px;}
  #newslist .lists .link{position: absolute; top: 0; left: 0; width: 100%; height: 100%;}
  /**********************************************************************************/
  #player{max-width: 480px; margin: 0 auto;}
  #player .player{position: relative; padding-top: 56%; overflow: hidden; background: #eee;}
  #player .player iframe{position: absolute; top: 0; left: 0; width: 100%; height: 100%;}
  /**********************************************************************************/
  #videolist{position: relative;}
  #videolist .gap{height: 10px; background: #f8f9f9; border-bottom: 1px solid #f2f2f2;}
  #videolist .vtitle{font-weight: normal; font-size: 1.05em; padding: 0 10px; height: 40px; color: #666;}
  #videolist .lists{position: relative; padding: 10px; border-bottom: 1px solid #f2f2f2;}
  #videolist .lists:last-child{border-bottom: none;}
  #videolist .lists .cover{height: 80px; width: 120px; overflow: hidden; margin-right: 10px;}
  #videolist .lists .cover img{object-fit:cover;object-position:center;}
  #videolist .lists .info h3{font-weight: normal; font-size: 1em; -webkit-line-clamp: 2; overflow: hidden; height: 40px; line-height: 20px;}
  #videolist .lists .info p{font-size: 0.9em; color: #999;}
  #videolist .lists .link{position: absolute; top: 0; left: 0; width: 100%; height: 100%;}
  #company{padding: 0 10px;background: #fff;}
  #company img{max-width: 100%;}
  /**********************************************************************************/
  #audio{background: #fff; padding: 10px;}
  #audio .inner{border: 1px solid #f2f2f2; background: #fdfdfd; padding: 10px;}
  /*#audio .icon{position: relative; width: 36px; height: 36px; background: url(../image/audio.gif) 0 -36px no-repeat;}*/
  #audio .icon.play{background-position: 0 0;}
  #audio .media{padding-left: 10px;}
  #audio .media h3{font-size: 1.05em; font-weight: normal; -webkit-line-clamp: 1; height: 30px; line-height: 30px; overflow: hidden;}
  #audio .media p{font-size: 0.85em; color: #999; -webkit-line-clamp: 1; height: 18px; line-height: 18px; overflow: hidden;}
  #audio .progress{position: relative; height: 2px; background: #eee; margin: 5px 0;}
  #audio .progress span{background: #ccc; height: 100%; width: 0%;}
  #audio .progress em{position: absolute; left: 0; top: 0; height: 2px; background: #03ba03; width: 0%;  visibility: hidden; transition: width 0.2s linear; -webkit-transition: width 0.2s linear;}
  #audio .progress em:before{content: ''; position: absolute; top: -4px; right: -2px; width: 12px; height: 12px; background: rgba(15, 189, 15,0.2); border-radius: 50%;}
  #audio .progress em:after{content: ''; position: absolute; top: -2px; right: 0; width: 8px; height: 8px; background: #03ba03; border-radius: 50%;}
  #audio .duration{font-size: 0.8em; color: #999;}
  /**********************************************************************************/
  #paynow{height: 50px; color: #fff; font-size: 1.05em; background: #27e;}
  #vip .top{height: 150px; background: #fff; border-bottom: 1px solid #f5f5f5;}
  #vip .top div{width: 80px; height: 80px; border-radius: 50%;}
  #vip .top p{font-size: 1.05em; color: #fff; text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.76);}
  #vip .row{background: #fff; margin-top: 10px; border-top: 1px solid #f5f5f5;}
  #vip .row label{padding: 8px; border-bottom: 1px solid #f5f5f5;}
  #vip .row label i{width: 40px; height: 40px; border-radius: 2px; background: #f5f5f5; color: #fff; font-size: 1.6em;}
  #vip .row label span{padding: 0 10px; height: 24px; line-height: 24px; color: #f00; font-size: 1.2em;}
  #vip .row label s{font-size: 0.8em; color: #ccc; padding: 0 5px;}
  #vip .row label span.normal{font-size: 1em; color: #333;}
  #vip .row label em{padding: 0 10px; font-size: 0.8em; color: #888; height: 16px; line-height: 16px;}
  #vip .row label input{width: 24px; height: 24px; padding: 0; border: 1px solid #eee; border-radius: 50%; background: none; -webkit-appearance: none; margin-top: 5px;}
  #vip .row label input:after{content: '\e613'; font-family: 'rd' !important; font-size: 1.1em; color: #fff;}
  #vip .row label input:checked{background: #00E834; border-color: #00E834;}
  #vip .row .off{font-size: 0.8em; color: #666; padding: 0 5px;}
  /**********************************************************************************/
  #profile .gap{height: 10px;}
  #profile .block{margin-top: 10px; background: #fff; border-top: 1px solid #eee; border-bottom: 1px solid #eee;}
  #profile .block .row{position: relative; padding: 5px; border-bottom: 1px solid #f5f5f5; margin-left: 10px;}
  #profile .block .row:last-child{border-bottom: none;}
  #profile .block .row .title{width: 80px;}
  #profile .block .row img{width: 50px; height: 50px; border-radius: 50%;}
  #profile .block .row i{width: 20px; font-size: 1.2em; color: #888; padding-top: 2px;}
  #profile .block .row s{height: 40px; text-decoration: none; font-size: 1.4em; color: #999; padding: 0 4px;}
  #profile .block .row em{color: #888; height: 40px;}
  #profile .block .row .input{text-align: right; height: 20px; padding: 10px; border: none; background: none;}
  #profile .block .row input.normal{text-align: left;}
  #profile .block .row .hidden{opacity: 0; position: absolute; top: 0; left: 0; bottom: 0; right: 0;}
  #profile .upload{padding: 10px; max-width: 480px; margin: 0 auto;}
  #profile .upload h4{font-weight: normal; font-size: 1em; height: 40px; line-height: 40px;}
  #profile .upload .uparea{position: relative; padding-top: 54%; background: #fff;}
  #profile .upload .uparea .webuploader-pick{position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 1px dashed #eee;}
  #profile .upload .uparea input{position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 8; opacity: 0; padding: 0;}
  #profile .upload .uparea .file{position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; z-index: 6;}
  #profile .upload .uparea .file em.text{width: 40px; height: 40px; background: rgba(0,0,0,0.5); color: #fff; border-radius: 4px;}
  #profile .upload .uparea .file em.state{position: absolute; top: 0; left: 0; width: 0%; height: 2px; background: #f00;}
  /**********************************************************************************/
  #signature{padding: 10px;}
  #signature textarea{padding: 10px; font-size: 0.95em; line-height: 20px; height: 140px; background: #fff; border-radius: 2px; resize: none; border: none;}
  #signature .submit{margin-top: 20px; font-size: 1.05em; color: #fff; border: none; background: #66DC52; border-radius: 2px; height: 50px;}
  /**********************************************************************************/
  #qrcode{padding: 40px 0;}
  #qrcode .qrcode{position: relative; width: 240px; height: 240px; border: 1px dashed #eee; background: #fff; margin: 0 auto;}
  #qrcode .qrcode img{width: 100%; height: 100%;}
  #qrcode .qrcode span{position: absolute; top: 50%; left: 10px; right: 10px; text-align: center; color: #666; height: 20px; line-height: 20px; margin-top: -10px;}
  #qrcode .uploader{position: relative; display: block; width: 120px; height: 50px; line-height: 50px; text-align: center; background: #62E262; color: #fff; border-radius: 2px; margin: 20px auto; overflow: hidden;}
  #qrcode .uploader input{position: absolute; top: 0; left: 0; width: 100%; bottom: 0; padding: 0; opacity: 0;}
  /**********************************************************************************/
  #leavemsg .lists{padding: 10px; background: #fff; margin-bottom: 10px;}
  #leavemsg .lists .top{padding: 5px 0;}
  #leavemsg .lists .top .head{width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;}
  #leavemsg .lists .top .info span{font-size: 1.05em; color: #404040;}
  #leavemsg .lists .top .info em{font-size: 0.9em; color: #999;}
  #leavemsg .lists .contact{width: 200px; height: 40px; border-radius: 40px; margin: 0 auto; color: #fdebea; background: -webkit-linear-gradient(#f95e48, #f7403c);}
  /**********************************************************************************/
  #particulars header{width:100%;height: 3.5rem;background: #f20a46;color: #fefefe;}
  #particulars header a.rd{font-size: 1.2rem;width:3rem;height:3rem;}
  #particulars header h1{font-size:1.3rem;}
  #particulars .info{padding: 20px;color: #333;padding-top: 0;}
  #particulars .info .p1{border-bottom: 1px solid #ddd;padding: 12px 0;}
  #particulars .info .p1 span{font-size: 1.2rem;}
  #particulars .dredge{padding: 10px;text-align:center;}
  #particulars .dredge .button{width:100%;height: 3rem;font-size:1.2rem;background: #1e90ff;border-radius: 5px;color: #fff;}
  #particulars .dredge p{color: #F20A46;padding: 10px 0;font-size: 1rem;}
  /*#particulars .qrcode{margin: 10px 0;padding: 5px;}*/
  #particulars .qrcode .img{width: 120px;height: 120px;background: #fff;}
  #particulars .qrcode .img img{width: 100%;height:100%;}

  #tools{position: relative; background: #fff; height: 50px; border-top: 1px solid #ddd; overflow: hidden;}
  #tools a{border-left: 1px solid #eee; margin-left: -1px;}
  #tools span{font-size: 1.05em; color: #27e;}
  #tools input{position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0; z-index: 2;}
  #tools div.picker,#tools div.lists{position: absolute; top: 0; left: 0; height: 100%; width: 100%; background: #fff; z-index: 2;}
  #tools div.show{z-index: 3;}
  #tools .counter{font-size: 0.8em; color: #666; padding: 0 5px;}
  #tools .continue{position: relative; width: 80px; height: 40px; background: #27e; margin-right: 4px; border-radius: 2px;}
  #tools .webuploader-pick{display: -webkit-box; -webkit-box-pack: center; -webkit-box-align: center;  width: 100%; height: 100%; font-size: 1.05em; color: #27e;}
  #tools .continue .webuploader-pick{color: #fff; font-size: 0.9em;}


</style>
