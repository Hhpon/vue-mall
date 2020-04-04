<template>
  <div>
    <el-header class="admin_h" height="80px">
      <el-col :span="24">
        <el-col :span="16" class="logo">
          <span>
            <!-- 俊猫商城管理系统 -->
            <a href="/#/Home/about">
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
              <el-dropdown-item @click.native="editAccountShow = !editAccountShow">修改密码</el-dropdown-item>
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
          <el-menu-item-group>
            <el-menu-item index="2-2" :route="{path: '/Home/orderlist'}">订单管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>网站设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index>
              <a href="/" target="_blank">打开首页</a>
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
      <el-dialog title="修改密码" :visible.sync="editAccountShow">
        <el-form
          :model="ruleForm2"
          :rules="rules2"
          ref="ruleForm2"
          label-position="left"
          label-width="0px"
          class="demo-ruleForm login-container"
        >
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm2.checkPass"
              auto-complete="off"
              placeholder="原密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="confirmPass">
            <el-input
              type="password"
              v-model="ruleForm2.confirmPass"
              auto-complete="off"
              placeholder="确认密码"
            ></el-input>
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button
              type="primary"
              style="width:100%;"
              @click.native.prevent="handleSubmit2"
              :loading="logining"
            >确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-main>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      editAccountShow: false,
      logining: false,
      ruleForm2: {
        confirmPass: "",
        checkPass: ""
      },
      rules2: {
        confirmPass: [{ required: true, message: "确认密码", trigger: "blur" }],
        checkPass: [{ required: true, message: "原密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.$alert("欢迎来到商城后台", "登录成功", {
      confirmButtonText: "确定"
    });
  },
  methods: {
    handleSubmit2(ev) {
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          axios
            .post("/admin/edit", {
              confirmPass: this.ruleForm2.confirmPass,
              checkPass: this.ruleForm2.checkPass
            })
            .then(renponse => {
              let res = renponse.data;
              if (res.status == "0") {
                this.$notify({
                  title: "提示",
                  message: "修改成功",
                  type: "success",
                  duration: 2000
                });
                this.$router.push({
                  path: "/admin"
                });
              } else {
                this.$notify.error({
                  title: "错误提示",
                  message: "请检查你的原密码",
                  duration: 3000
                });
              }
            });
        } else {
          return false;
        }
      });
    },
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
              