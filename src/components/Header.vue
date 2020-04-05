<template>
  <header class="header">
    <div class="navbar">
      <div class="navbar-left-container">
        <a href="/">
          <img class="navbar-brand-logo" src="static/logo.png" />
        </a>
      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <!-- <a href="/" class="navbar-link">我的账户</a> -->
          <el-button type="primary" @click="addshopbtn()" v-if="showNew">我要发布</el-button>
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
          <div class="navbar-cart-container" v-if="nikeName">
            <span class="navbar-cart-count" v-if="carCount>0">{{carCount}}</span>
            <a class="navbar-link navbar-cart-link" @click="cart">
              <svg
                t="1586013989622"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2531"
                width="20"
                height="20"
              >
                <path
                  d="M993.34853 132.205377c21.370157 22.498581 30.996714 53.864779 27.062209 86.718899l-57.369884 305.922783c-6.281228 47.593536-52.227066 86.129721-104.703783 86.129721l-491.034278 33.702935c-0.948675 0.259637-2.047141 0.259637-2.846026 0.259637-18.893615 0-34.931219-13.640951-36.289323-31.476044-1.388062-18.823713 13.710853-34.901261 33.553144-36.389183l493.630653-33.952586c18.094731-0.149791 33.293506-13.381313 35.370605-28.520172l57.369884-305.882839c1.348117-11.454005-2.047141-23.996489-9.267059-31.655793a23.731859 23.731859 0 0 0-17.535512-7.369709H291.308918c-20.131886 0-36.459085-15.238719-36.459086-33.912641 0-18.70388 16.47699-33.952586 36.459086-33.952586h630.120047c27.871078 0 53.285588 10.754981 71.919565 30.377578z m-83.513374 580.639147c16.556879 0 36.469072 17.355763 36.469071 36.31928 0 18.673922-16.197381 36.469072-36.469071 36.469072H318.920359c-52.516661 0-98.572345-43.469296-104.953434-92.850336L152.223149 287.478541 117.142139 97.993154c-2.186946-16.636767-18.384327-24.945164-34.162293-24.945164H36.624581c-20.131886 0-36.429127-20.311635-36.429128-39.015516 0-18.594034 16.447032-33.912642 36.469072-33.912641h46.315321c53.02595 0 99.740714 33.912642 107.210283 97.883307l33.912641 189.485387 61.923525 396.326536c2.047141 15.787952 17.395707 29.029461 32.744273 29.029461h591.104532-0.039944zM291.938039 948.275748s0 40.29373 0 0c0-40.283744 32.654399-72.938143 72.938143-72.938143s72.938143 32.654399 72.938143 72.938143-32.654399 72.938143-72.938143 72.938143-72.938143-32.654399-72.938143-72.938143z m437.608886 0s0 40.29373 0 0c0-40.283744 32.654399-72.938143 72.938143-72.938143s72.938143 32.654399 72.938143 72.938143-32.654399 72.938143-72.938143 72.938143-72.938143-32.654399-72.938143-72.938143z m0 0"
                  fill="#333333"
                  p-id="2532"
                />
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
    console.log(this.$route.path);
    this.checklogin();
  },
  computed: {
    ...mapState(["carCount", "mdShow"]), //简写
    showNew() {
      return this.nikeName && this.$route.path === "/";
    }
  },
  methods: {
    addshopbtn() {
      this.$emit("addshopbtn");
    },
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
        if (res.status == "0") {
          this.$store.commit("initCar", res.result);
        }
      });
    }
  }
};
</script>