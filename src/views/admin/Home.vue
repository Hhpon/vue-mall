<template>
  <div>
    <el-header class="admin_h" height="80px">
      <el-col :span="24">
        <el-col :span="16" class="logo">
          <span>
            <!-- 俊猫商城管理系统 -->
            <a href="/junmall/#/Home/about">
              <img src="static/adminlogo.png" />
            </a>
          </span>
        </el-col>
        <el-col :span="4" class="admin_img">
          <img src="static/admin.png" width="50px;" />
        </el-col>
        <el-col :span="4" class="admininfo">
          <!-- <img src="static/admin.png" width="20%" />  -->
          <el-dropdown trigger="hover">
            <span class="el-dropdown-link userinfo-inner">admin</span>
            <el-dropdown-menu slot="dropdown" class="dropdowns">
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-col>
    </el-header>
    <el-col :span="4" style="margin-top: 20px;">
      <el-menu
        default-active="3-3"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :router="true"
        text-color="#000"
        active-text-color="#198dd4"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>用户信息</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" :route="{path: '/Home/userlist'}">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>商品信息</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" :route="{path: '/Home/shoplist'}">商品列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>网站设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index>
              <a href="/junmall" target="_blank">打开首页</a>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="3-1" :route="{path: '/Home/imglist'}">首页轮播图设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-main>
      <router-view />
    </el-main>
  </div>
</template>
<style type="text/css">
.admin_h {
  /*margin: 10px 0;*/
  background-color: #fff;
}
.el-menu-item-group__title {
  display: none;
}
.admin_img img {
  margin: 10px 10px 0px 0px;
  float: right;
}
.logo {
  padding: 10px 0px;
}
.admininfo {
  position: relative;
  top: 30px;
  display: inline-block;
}
</style>
<script>
import axios from "axios";
export default {
  mounted() {
    this.$alert("欢迎来到商城后台", "登录成功", {
      confirmButtonText: "确定"
    });
  },
  methods: {
    logout() {
      axios.post("/admin/logout").then(renponse => {
        let res = renponse.data;
        if (res.status == "0") {
          this.$router.push({
            path: "/admin"
          });
        }
      });
    }
  }
};
</script>
              