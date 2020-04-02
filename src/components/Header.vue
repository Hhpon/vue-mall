<template>
  <header class="header">
    <div class="navbar">
      <div class="navbar-left-container">
        <a href="/junmall">
          <img class="navbar-brand-logo" src="static/logo.png" />
        </a>
      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <!--<a href="/" class="navbar-link">我的账户</a>-->
          <span v-if="nikeName">{{nikeName}}</span>
          <a
            href="javascript:void(0)"
            class="navbar-link"
            @click="btnLogin('ruleForm')"
            v-if="!nikeName"
          >登录</a>
          <a
            href="javascript:void(0)"
            class="navbar-link"
            @click="btnSign('ruleForm')"
            v-if="!nikeName"
          >注册</a>
          <a href="javascript:void(0)" class="navbar-link" @click="logOut" v-if="nikeName">退出</a>
          <div class="navbar-cart-container">
            <span class="navbar-cart-count" v-if="carCount>0">{{carCount}}</span>
            <a class="navbar-link navbar-cart-link" @click="cart">
              <svg class="navbar-cart-logo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':logindiv}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">用户登录</div>
          <button class="md-close" @click="logindiv=false">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules2"
              ref="ruleForm"
              label-width="80px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名">
                <el-input
                  type="text"
                  v-model="ruleForm.userName"
                  :maxlength="namesize"
                  placeholder="请输入用户名"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  type="password"
                  v-model="ruleForm.userPwd"
                  placeholder="请输入密码"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="login">登 录</a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="logindiv" @click="logindiv=false"></div>
    <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':Signdiv}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">用户注册</div>
          <button class="md-close" @click="Signdiv=false">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules2"
              ref="ruleForm"
              label-width="80px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="name">
                <el-input
                  type="text"
                  v-model="ruleForm.name"
                  :maxlength="namesize"
                  placeholder="请输入用户名"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  placeholder="请输入密码"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="ruleForm.checkPass"
                  placeholder="请确认密码"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input type="email" placeholder="请输入邮箱" v-model="ruleForm.email"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="Signup('ruleForm')">注册</a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="Signdiv" @click="Signdiv=false"></div>
  </header>
</template>
<style>
</style>
<script type="text/javascript">
import "./../assets/css/login.css";
// import verify from "vue-verify-plugin";
import axios from "axios";
import { mapState } from "vuex"; //多个vuex引入简写
// Vue.use(verify,{
//     blur:true
// });
export default {
  data() {
    var validatename = (rule, value, callback) => {
      let reg = /^[0-9a-zA-Z]+$/;
      if (value.trim() === "") {
        callback(new Error("请输入用户名"));
      } else if (!reg.test(value)) {
        callback(new Error("用户名不能使用中文"));
      } else if (value.length < 6) {
        callback(new Error("用户名不能少于6位"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateemail = (rule, value, callback) => {
      let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("请输入邮件"));
      } else if (!reg.test(value)) {
        return callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    return {
      mdshow: false,
      namesize: 15,
      errorTip: false,
      logindiv: false,
      Signdiv: false,
      nikeName: "",
      time: true,
      ruleForm: {
        //登录
        userName: "",
        userPwd: "",
        //注册
        name: "",
        pass: "",
        checkPass: "",
        email: ""
      },
      rules2: {
        //注册
        name: [{ validator: validatename, trigger: "blur,change" }],
        pass: [{ validator: validatePass, trigger: "blur,change" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        email: [{ validator: validateemail, trigger: "blur,change" }]
      }
    };
  },
  mounted() {
    this.checklogin();
  },
  computed: {
    ...mapState(["carCount", "mdShow"]) //简写
    // carCount(){
    // return this.$store.state.carCount;
    // },
  },
  methods: {
    checklogin() {
      axios.get("/users/checklogin").then(res => {
        if (res.data.status == "0") {
          //接口直接赋值
          this.nikeName = res.data.result;
          this.getCart();
          this.$store.commit("btnmdShow", false);
        }
      });
    },
    btnLogin(formName) {
      this.logindiv = true;

      this.$refs[formName].resetFields();
    },
    btnSign(formName) {
      this.Signdiv = true;
      //   console.log(this.$refs[formName].resetFields());
      this.$refs[formName].resetFields();
    },
    login() {
      //防止重复点击
      if (!this.time) {
        return false;
      }
      var _this = this;
      this.time = false;
      var time = setTimeout(function() {
        _this.time = true;
        clearInterval(time);
      }, 1000);
      axios
        .post("/users/login", {
          userName: this.ruleForm.userName,
          userPwd: this.ruleForm.userPwd
        })
        .then(renponse => {
          let res = renponse.data;

          if (res.status == "0") {
            console.log("登录成功");
            this.logindiv = false;
            this.rorTip = false;
            this.nikeName = res.result.userName;
            this.$notify({
              title: "提示",
              message: "登录成功",
              type: "success",
              duration: 2000
            });
            this.$store.commit("btnmdShow", false);
            this.getCart();
          } else {
            // this.errorTip=true;
            this.$notify.error({
              title: "错误提示",
              message: "您的输入的帐号密码不正确",
              duration: 3000
            });
          }
        });
    },
    logOut() {
      this.$store.commit("initCar", 0);
      axios.post("/users/logout").then(renponse => {
        let res = renponse.data;
        if (res.status == "0") {
          this.nikeName = "";
          this.$store.commit("btnmdShow", true);
        }
      });
    },
    Signup(formName) {
      if (!this.time) {
        return false;
      }
      var _this = this;
      this.time = false;
      var time = setTimeout(function() {
        _this.time = true;
        clearInterval(time);
      }, 2000);
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post("/users/Signup", {
              userName: this.ruleForm.name,
              userPwd: this.ruleForm.checkPass,
              userEmail: this.ruleForm.email
            })
            .then(renponse => {
              let res = renponse.data;
              if (res.status == "0") {
                this.Signdiv = false;
                //接口直接赋值
                this.$notify({
                  title: "提示",
                  message: "注册成功",
                  type: "success",
                  duration: 2000
                });
                //注册成功后自动登录
                axios
                  .post("/users/login", {
                    userName: this.ruleForm.name,
                    userPwd: this.ruleForm.checkPass
                  })
                  .then(renponse => {
                    let res = renponse.data;
                    this.nikeName = res.result.userName;
                  });
              } else {
                this.$notify.error({
                  title: "错误提示",
                  message: "用户名已经存在",
                  duration: 2000
                });
              }
            });
        } else {
          this.$notify.error({
            title: "错误提示",
            message: "您的输入有误请重新输入",
            duration: 2000
          });
          return false;
        }
      });
    },
    cart() {
      if (!this.time) {
        return false;
      }
      var _this = this;
      this.time = false;
      var time = setTimeout(function() {
        _this.time = true;
        clearInterval(time);
      }, 2000);
      if (this.nikeName) {
        this.$router.push({
          path: "/cart"
        });
      } else {
        this.$notify.error({
          title: "错误提示",
          message: "未登录，无法进去购物车",
          duration: 2000
        });
      }
    },
    getCart() {
      axios.get("/users/getCart").then(renponse => {
        let res = renponse.data;
        this.$store.commit("initCar", res.result);
      });
    }
  }
};
</script>