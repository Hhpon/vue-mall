<template>
  <div style="height: 100vh;overflow:auto;">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
      <nav-header @addshopbtn="addshopbtn"></nav-header>
      <div class="content">
        <div>
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(str,index) in listImg" :key="index">
                <img :src="str.imgLink" alt />
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <div class="accessory-result-page accessory-page">
            <div class="container">
              <div class="index_nav">
                <span class="index_sort">女士专区</span>
                <router-link class="default cur" to="/GoodsList">
                  查看全部
                  <span style="margin-left:5px;">&gt;</span>
                </router-link>
              </div>
              <div class="accessory-result">
                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                  <div class="accessory-list col-5">
                    <ul>
                      <li
                        v-for="(item,index) in madams"
                        @click="shopgo(item.productId)"
                        :key="index"
                      >
                        <div class="pic">
                          <img v-lazy="item.productImage" alt />
                        </div>
                        <div class="main">
                          <div class="name">{{item.productName}}</div>
                          <div class="price">{{item.salePrice|currency('&yen;')}}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="index_nav">
                <span class="index_sort">男士专区</span>
                <router-link class="default cur" to="/GoodsList">
                  查看全部
                  <span style="margin-left:5px;">&gt;</span>
                </router-link>
              </div>
              <div class="accessory-result">
                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                  <div class="accessory-list col-5">
                    <ul>
                      <li
                        v-for="(item,index) in misters"
                        @click="shopgo(item.productId)"
                        :key="index"
                      >
                        <div class="pic">
                          <img v-lazy="item.productImage" alt />
                        </div>
                        <div class="main">
                          <div class="name">{{item.productName}}</div>
                          <div class="price">{{item.salePrice|currency('&yen;')}}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="index_nav">
                <span class="index_sort">精品鞋区</span>
                <router-link class="default cur" to="/GoodsList">
                  查看全部
                  <span style="margin-left:5px;">&gt;</span>
                </router-link>
              </div>
              <div class="accessory-result">
                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                  <div class="accessory-list col-5">
                    <ul>
                      <li
                        v-for="(item,index) in shoess"
                        @click="shopgo(item.productId)"
                        :key="index"
                      >
                        <div class="pic">
                          <img v-lazy="item.productImage" alt />
                        </div>
                        <div class="main">
                          <div class="name">{{item.productName}}</div>
                          <div class="price">{{item.salePrice|currency('&yen;')}}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="index_nav">
                <span class="index_sort">家电数码</span>
                <router-link class="default cur" to="/GoodsList">
                  查看全部
                  <span style="margin-left:5px;">&gt;</span>
                </router-link>
              </div>
              <div class="accessory-result">
                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                  <div class="accessory-list col-5">
                    <ul>
                      <li
                        v-for="(item,index) in digitals"
                        @click="shopgo(item.productId)"
                        :key="index"
                      >
                        <div class="pic">
                          <img v-lazy="item.productImage" alt />
                          <!-- <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a> -->
                        </div>
                        <div class="main">
                          <div class="name">{{item.productName}}</div>
                          <div class="price">{{item.salePrice|currency('&yen;')}}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="index_nav">
                <span class="index_sort">箱包专区</span>
                <router-link class="default cur" to="/GoodsList">
                  查看全部
                  <span style="margin-left:5px;">&gt;</span>
                </router-link>
              </div>
              <div class="accessory-result">
                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                  <div class="accessory-list col-5">
                    <ul>
                      <li
                        v-for="(item,index) in boxs"
                        @click="shopgo(item.productId,item.classify)"
                        :key="index"
                      >
                        <div class="pic">
                          <img v-lazy="item.productImage" alt />
                          <!-- <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a> -->
                        </div>
                        <div class="main">
                          <div class="name">{{item.productName}}</div>
                          <div class="price">{{item.salePrice|currency('&yen;')}}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="index_nav">
                <span class="index_sort">美味零食</span>
                <router-link class="default cur" to="/GoodsList">
                  查看全部
                  <span style="margin-left:5px;">&gt;</span>
                </router-link>
              </div>
              <div class="accessory-result">
                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                  <div class="accessory-list col-5">
                    <ul>
                      <li
                        v-for="(item,index) in foods"
                        @click="shopgo(item.productId)"
                        :key="index"
                      >
                        <div class="pic">
                          <img v-lazy="item.productImage" alt />
                        </div>
                        <div class="main">
                          <div class="name">{{item.productName}}</div>
                          <div class="price">{{item.salePrice|currency('&yen;')}}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="index_nav">
                <h1 class="text_center">猜你喜欢</h1>
              </div>
              <div class="accessory-result">
                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                  <div class="accessory-list col-4">
                    <ul>
                      <li
                        v-for="(item,index) in goodsList"
                        @click="shopgo(item.productId)"
                        :key="index"
                      >
                        <div class="pic" :a="item.productId">
                          <img v-lazy="item.productImage" alt />
                        </div>
                        <div class="main">
                          <div class="name">{{item.productName}}</div>
                          <div class="price">{{item.salePrice|currency('&yen;')}}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="添加商品" :visible.sync="addshopVisible">
        <el-form :model="form" :rules="rules2" ref="form" name="form">
          <el-form-item label="商品标题" :label-width="formLabelWidth" prop="productName">
            <el-input v-model="form.productName" auto-complete="off" placeholder="请输商品标题"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" :label-width="formLabelWidth" prop="salePrice">
            <el-input v-model="form.salePrice" auto-complete="off" placeholder="输入价格"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" :label-width="formLabelWidth" prop="productImage">
            <el-input v-model="form.productImage" auto-complete="off" placeholder="请输入图片地址"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" :label-width="formLabelWidth" prop="classify">
            <el-select v-model="form.classify" placeholder="请选择商品分类">
              <el-option label="女装" value="1"></el-option>
              <el-option label="男装" value="2"></el-option>
              <el-option label="数码" value="3"></el-option>
              <el-option label="包箱" value="4"></el-option>
              <el-option label="食物" value="5"></el-option>
              <el-option label="其他" value="6"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addshopVisible = false">取 消</el-button>
          <el-button type="primary" @click="addshop('form')">确 定</el-button>
        </div>
      </el-dialog>
      <nav-footer></nav-footer>
    </div>
  </div>
</template>
<style scoped>
.index {
  display: flex;
}
.index_nav {
  height: 55px;
  line-height: 55px;
  margin: 20px 0 30px 0;
  padding: 0 20px;
  background: #fff;
  overflow: hidden;
}
.index_sort {
  font-size: 24px;
  font-weight: bold;
  color: #198dd4;
  float: left;
}
.index_nav a {
  float: right;
}
.swiper-container {
  max-width: 1280px;
  padding-top: 80px;
}
.swiper-wrapper {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
}
</style>
<script type="text/javascript">
import NavHeader from "@/components/Header";
import NavFooter from "@/components/Footer";
import NavBread from "@/components/Bread";
import Modal from "@/components/Modal";
import "../assets/css/product.css";
import "../assets/css/base.css";
import "../assets/css/checkout.css";
import "swiper/dist/css/swiper.min.css";
import axios from "axios";
import Swiper from "swiper";
export default {
  data() {
    var validatename = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请输商品标题"));
      } else {
        callback();
      }
    };
    var validatePrice = (rule, value, callback) => {
      if (isNaN(parseFloat(value))) {
        callback(new Error("输入商品价格(注:必须为数字)"));
      } else {
        callback();
      }
    };
    var validateImage = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请输入图片地址"));
      } else {
        callback();
      }
    };
    var validateclassify = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请选择商品分类"));
      } else {
        callback();
      }
    };
    return {
      madams: [],
      misters: [],
      digitals: [],
      shoess: [],
      boxs: [],
      foods: [],
      goodsList: [],
      loading: false,
      page: 2,
      pageSize: 8,
      sortFlag: true,
      priceChecked: "all",
      classify: 0,
      busy: false,
      addshopVisible: false,
      formLabelWidth: "120px",
      listImg: [],
      form: {
        id: "",
        productName: "",
        salePrice: "",
        productImage: "",
        classify: ""
      },
      rules2: {
        productName: [{ validator: validatename, trigger: "blur,change" }],
        salePrice: [{ validator: validatePrice, trigger: "blur,change" }],
        productImage: [{ validator: validateImage, trigger: "blur,change" }],
        classify: [{ validator: validateclassify, trigger: "blur,change" }]
      }
    };
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  },
  mounted() {
    this.getInit();
  },
  methods: {
    getInit() {
      axios.get("/admin/imglist").then(result => {
        this.loading = false;
        let res = result.data;
        if (res.status == "0") {
          this.listImg = res.result.list;
          setTimeout(function() {
            var swiper = new Swiper(".swiper-container", {
              pagination: ".swiper-pagination",
              paginationClickable: true,
              loop: true,
              speed: 600,
              autoplay: 3000,
              onTouchEnd: function() {
                swiper.startAutoplay();
              }
            });
          }, 1000);
        }
      });
      this.madam();
      this.mister();
      this.shoes();
      this.digital();
      this.box();
      this.food();
      this.getGoodsList();
    },
    addshop(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post("/admin/addshop", {
              productName: this.form.productName,
              salePrice: this.form.salePrice,
              productImage: this.form.productImage,
              classify: this.form.classify
            })
            .then(respone => {
              let res = respone.data;
              if (res.status == "0") {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
              }
              this.getInit();
              this.addshopVisible = false;
            });
        }
      });
    },
    addshopbtn() {
      this.addshopVisible = true;
    },
    madam() {
      var param = {
        pageSize: 5,
        page: 4,
        sort: 1,
        classify: 0,
        priceGt: 200,
        priceLte: 300
      };
      //params传参
      axios.get("/goods/list", { params: param }).then(res => {
        this.madams = res.data.result.list;
      });
    },
    mister() {
      var param = {
        pageSize: 5,
        page: 5,
        sort: 1,
        classify: 1,
        priceGt: 200,
        priceLte: 300
      };
      //params传参
      axios.get("/goods/list", { params: param }).then(res => {
        this.misters = res.data.result.list;
      });
    },
    shoes() {
      var param = {
        pageSize: 5,
        page: 2,
        sort: 1,
        classify: 2,
        priceGt: 100,
        priceLte: 300
      };
      //params传参
      axios.get("/goods/list", { params: param }).then(res => {
        this.shoess = res.data.result.list;
      });
    },
    digital() {
      var param = {
        pageSize: 5,
        page: 3,
        sort: 1,
        classify: 3,
        priceGt: 100,
        priceLte: 300
      };
      //params传参
      axios.get("/goods/list", { params: param }).then(res => {
        this.digitals = res.data.result.list;
      });
    },
    box() {
      var param = {
        pageSize: 5,
        page: 2,
        sort: 1,
        classify: 4,
        priceGt: 20,
        priceLte: 500
      };
      //params传参
      axios.get("/goods/list", { params: param }).then(res => {
        this.boxs = res.data.result.list;
      });
    },
    food() {
      var param = {
        pageSize: 5,
        page: 2,
        sort: 1,
        classify: 5,
        priceGt: 30,
        priceLte: 100
      };
      //params传参
      axios.get("/goods/list", { params: param }).then(res => {
        this.foods = res.data.result.list;
      });
    },
    getGoodsList(flag) {
      var param = {
        pageSize: this.pageSize,
        page: this.page,
        sort: this.sortFlag ? 1 : -1,
        priceLevel: this.priceChecked
      };
      //params传参
      this.loading = true;
      axios.get("/goods/list", { params: param }).then(result => {
        this.loading = false;
        let res = result.data;
        if (res.status == "0") {
          if (flag) {
            if (res.result.length == 0) {
              this.busy = true;
            } else {
              this.busy = false;
            }
            this.goodsList = this.goodsList.concat(res.result.list);
          } else {
            this.goodsList = res.result.list;
            this.busy = false;
          }
        } else {
          this.goodsList = [];
        }
      });
    },
    shopgo(productId, classify) {
      this.$router.push({
        path: "/GoodsShop?shopid=" + productId
      });
    },
    loadMore() {
      this.busy = true;
      setTimeout(() => {
        this.page++;
        this.getGoodsList(true);
        this.busy = false;
      }, 1000);
    }
  }
};
</script>