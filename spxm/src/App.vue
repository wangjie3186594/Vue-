<template>
  <div id="app">
    
    <mt-header fixed title="Vue项目 购物车">
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <div class="vue-content">
      <transition>
        <router-view/>
      </transition>
    </div>
      
    <div class="vue-footer">
      <router-link to="/">
        <img src="./assets/image/主页.png" alt="">
        <div> 首页 </div> 
      </router-link>
      <router-link to="/huiyuan">
        <img src="./assets/image/会员.png" alt="">
        <div> 会员 </div> 
      </router-link>
      <router-link to="/shopp">
        <div class="oper" id="badge"> {{ $store.getters.getAllCount }} </div>
        <img src="./assets/image/购物车满.png" alt="">
        <div> 购物车 </div> 
      </router-link>
      <router-link to="/search">
        <img src="./assets/image/搜索.png" alt="">
        <div> 搜索 </div>
      </router-link>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      flag: false
    }
  },
  created() {
    this.flag = this.$route.path === '/home' ? false : true
  },
  methods: {
    goBack(){
      // 点击后退
      this.$router.go(-1)
      
    }
  },
  watch: {
    '$route.path': function(newVal){
      if(newVal === '/home'){
        this.flag = false
      }else{
        this.flag = true
      }
    }
  }
}
</script>

<style lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  #app{
    padding-top: 40px;
    padding-bottom: 50px;
  }
  .v-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  .v-enter-active,.v-leave-active{
    transition: all .5s linear;
  }
  .vue-title{
    width: 100%;
    background: blue;
    position: fixed;
    top: 0;
    left: 0;
    height: 40px;
    line-height: 40px;
    z-index: 10;
    display: flex;
    span{
      width: 70%;
      height: 40px;
      display: block;
      line-height: 40px;
      text-align: center;
      color: white;
    }
    div{
      width: 20%;
      text-align: center;
      color: #fff;
    }
  }
  .vue-content{
    background: #fff;
    overflow-x: hidden;
  }
  .vue-footer{
    width: 100%;
    height: 50px;
    line-height: 17px;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
    border-top: 1px solid gray;
    z-index: 10;
    font-size: 13px;
    a{
      flex: 1;
      text-decoration: none;
      background: white;
      color: black;
      position: relative;
      img{
        width: 20px;
        margin-top: 5px;
      }
      .oper{
        width: 15px;
        height: 15px;
        background: red;
        position: absolute;
        color: #fff;
        border-radius: 50%;
        font-size: 12px;
        top: 2px;
        right: 30px;
      }
    }
    .router-link-exact-active{
      color: red;
    }
  }
  .preview figure {
    float: left;
    width: 30%;
    height:calc(30vw - 0px);
    margin: 1.5%;
  }

  .preview figure img {
    width: 100%;
  }
  
  .my-gallery{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    figure {
      width: 30%;
      margin: 5px;
      a{
        img{
          border: 0;
          width: 100%;
          box-shadow: 0 0 5px #999;
        }
      }
    }
  }

img{
    width: 100%;
}
</style>