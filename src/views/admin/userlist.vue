<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="userlists"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column type="index" width="200"></el-table-column>
      <el-table-column prop="userName" label="用户名" width="200"></el-table-column>
      <el-table-column prop="userEmail" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="createTime" label="注册时间" width="200"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style type="text/css">
.cell {
  text-align: center;
}
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      page: 1,
      loading: true,
      userlists: [],
      multipleSelection: []
    };
  },
  mounted() {
    this.userlist();
  },
  methods: {
    handleDelete(index, row) {
      axios
        .get("/users/delete", { params: { userName: row.userName } })
        .then(res => {
          console.log(res);
          if (res.data.status == "0") {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.userlist();
          }
        });
    },
    userlist(flag) {
      var param = {
        pageSize: 10,
        page: this.page
      };
      //params传参
      this.loading = true;
      axios.get("/admin/userlist", { params: param }).then(result => {
        this.loading = false;
        let res = result.data;
        if (res.status == "0") {
          this.userlists = res.result.list;
        } else {
          this.$alert("登录超时,请重新登录", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              this.$router.push({
                path: "/#/admin"
              });
            }
          });
        }
      });
    }
  }
};
</script>