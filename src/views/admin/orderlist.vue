<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="orderLists"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="loading"
      :default-sort="{prop: 'salePrice'}"
    >
      <el-table-column type="index" width="200"></el-table-column>
      <el-table-column label="用户姓名" width="200">
        <template slot-scope="scope">{{scope.row.addressInfo.userName}}</template>
      </el-table-column>
      <el-table-column label="用户电话" width="200">
        <template slot-scope="scope">{{scope.row.addressInfo.tel}}</template>
      </el-table-column>
      <el-table-column label="用户地址" width="200">
        <template slot-scope="scope">{{scope.row.addressInfo.streetName}}</template>
      </el-table-column>
      <el-table-column label="订单总价" width="200">
        <template slot-scope="scope">{{getTotalPrice(scope.row.goodsList)}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--编辑商品-->
    <el-dialog title="添加商品" :visible.sync="editshopVisible">
      <el-form :model="form" :rules="rules2" ref="form" name="form">
        <el-form-item label="商品标题" :label-width="formLabelWidth" prop="productName">
          <el-input v-model="form.productName" auto-complete="off" placeholder="请输商品标题"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="salePrice" :label-width="formLabelWidth">
          <el-input v-model="form.salePrice" auto-complete="off" placeholder="输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" :label-width="formLabelWidth" prop="productImage">
          <el-input v-model="form.productImage" auto-complete="off" placeholder="请输入图片地址"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" :label-width="formLabelWidth" prop="classify">
          <el-select v-model="form.classify" placeholder="请选择商品分类">
            <el-option label="女装" value="0"></el-option>
            <el-option label="男装" value="1"></el-option>
            <el-option label="鞋子" value="2"></el-option>
            <el-option label="数码" value="3"></el-option>
            <el-option label="包箱" value="4"></el-option>
            <el-option label="食物" value="5"></el-option>
            <el-option label="其他" value="6"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editshopVisible = false">取 消</el-button>
        <el-button type="primary" @click="editshop('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="5"
        layout="total, prev, pager, next"
        :total="counts"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
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
      counts: 0,
      page: 1,
      pageSize: 5,
      loading: true,
      addshopVisible: false,
      editForm: {},
      orderLists: [],
      multipleSelection: [],
      editshopVisible: false,
      form: {
        id: "",
        productName: "",
        salePrice: "",
        productImage: "",
        classify: ""
      },
      formLabelWidth: "120px",
      rules2: {
        //注册
        productName: [{ validator: validatename, trigger: "blur,change" }],
        salePrice: [{ validator: validatePrice, trigger: "blur,change" }],
        productImage: [{ validator: validateImage, trigger: "blur,change" }],
        classify: [{ validator: validateclassify, trigger: "blur,change" }]
      }
    };
  },
  mounted() {
    this.getOrderList(); //调用商品列表
  },
  methods: {
    getTotalPrice(item) {
      let totalPrice = 0;
      item.forEach(element => {
        totalPrice += element.salePrice;
      });
      return totalPrice;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getOrderList();
    },
    handleDelete(index, row) {
      console.log(row);
      axios
        .get("/admin/delorder", { params: { orderId: row.orderId } })
        .then(respone => {
          let res = respone.data;
          if (res.status == "0") {
            this.getOrderList();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          }
        });
    },
    getOrderList(flag) {
      var param = {
        pageSize: this.pageSize,
        page: this.page
      };
      this.loading = true;
      axios.get("/admin/userorderlist", { params: param }).then(result => {
        this.loading = false;
        let res = result.data;
        if (res.status == "0") {
          this.counts = res.result.counts;
          this.orderLists = res.result.list;
        }
      });
    },
    editshop(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post("/admin/editgoods", {
              productId: this.form.id,
              productName: this.form.productName,
              salePrice: this.form.salePrice,
              productImage: this.form.productImage,
              classify: this.form.classify
            })
            .then(respone => {
              let res = respone.data;
              if (res.status == "0") {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
              }
              this.getOrderList();
              this.editshopVisible = false;
            });
        }
      });
    }
  }
};
</script>
<style type="text/css">
.cell {
  text-align: center;
}
.pagination {
  margin-top: 10px;
  padding: 5px 0px;
  overflow: hidden;
  background-color: #fff;
}
.el-pagination {
  float: right;
}
</style>