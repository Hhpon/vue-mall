<template>
  <div style="height: 100vh;overflow:auto;">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
      <nav-header></nav-header>
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
      listImg: []
    };
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  },
  mounted() {
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
  methods: {
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