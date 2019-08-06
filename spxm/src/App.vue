<template>
  <div id="app">
    <div class="vue-title">
      Vue项目
    </div>
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
        <div class="oper">0</div>
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
  name: 'App'
}
</script>

<style lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  #app{
    padding-top: 40px;
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
  .v-enter-active,.v-leave-active{transition: all .5s linear;}
  .vue-title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    background: blue;
    z-index: 10;
  }
  .vue-content{
    background: #fff;
    height: 644px;
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
</style>