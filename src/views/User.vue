<template>
  <div class="manage">
    <!-- 表单 -->
    <el-dialog title="提示" :visible.sync="dialogFormVisible" width="50%">
      <el-form
        :model="form"
        :inline="true"
        label-width="80px"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            v-model="form.age"
            autocomplete="off"
            placeholder="请输入年龄"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            type="date"
            placeholder="出生日期"
            v-model="form.birth"
            style="width: 100%"
            value-format="yyyy-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input
            v-model="form.addr"
            autocomplete="off"
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData(0)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表单弹出及搜索 -->
    <div class="form-search">
      <el-button type="primary" @click="callform(0)">+新增</el-button>
      <el-form class="search" inline>
        <el-form-item>
          <el-input placeholder="请输入名称" label-width="208px" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-button type="primary" style="margin-right: 10px" @click="getList(1)">查询</el-button>
      </el-form>
    </div>
    <div class="data-table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="callform(1,scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="count"
          style="float: right" 
          @current-change="handlePage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, delUser, editUser } from "../api/index";
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "1",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      // 表单验证规则
      rules: {
        name: [
          { required: true, message: "请输入您姓名", trigger: "blur" },
          { min: 2, message: "姓名格式不正确", trigger: "blur" },
        ],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        sex: [{ required: true, message: "请输入您性别", trigger: "blur" }],
        birth: [{ required: true, message: "请输入出生日期", trigger: "blur" }],
        addr: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
      // 用户展示数据
      tableData: [],
      //总条数
      count: 10,
      // 首次请求的页码和条数
      pageData: {
        page: 1,
        limit: 10,
      },
      //打开的是新增还是编辑
      // 0新增，1编辑
      type:'',
      userForm: {
        name: "",
      },
    };
  },
  methods: {
    //请求获取用户数据
    getList(type) {
      if(type!==2)this.pageData.page = 1
      if(type !== 1) this.userForm.name = ''
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(
        ({ data }) => {
          console.log(data);
          this.count = data.count;
          this.tableData = data.list;
        }
      );
    },
    //调用用户表单控件
    callform(type,row) {
      this.dialogFormVisible = true;
      this.type = type
      if (type == 0) {
        //0表示新增，需清空数据
        this.form = {
          name: "",
          age: "",
          sex: "",
          birth: "",
          addr: "",
        };
      }else{
        this.form = row
      }
    },
    //提交表单数据
    submitData() {
      this.$refs.form.validate((vali) => {
        if (vali && this.type == 0) {
          //0表示为新增数据
          addUser(this.form).then((data) => {
            //插入数据成功，关闭窗口，刷新页面
            this.dialogFormVisible = false;
            this.getList()
          });
        }else if(vali && this.type == 1){
            editUser(this.form).then(data => {
              this.dialogFormVisible = false;
              this.getList(1)
            })
        }
      });
    },
    // 删除指定用户数据
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser({id:row.id}).then(data => {
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 删除成功刷新页面
           this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 换页
    handlePage(val){
      this.pageData.page = val 
      this.getList(2)
    }
  },
  mounted() {
    // 页面开始加载时，请求10条数据
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.manage {
  height: 90%;
  .form-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .data-table {
    position: relative;
    height: calc(100% - 60px);
    .pager {
      position: absolute;
      bottom: px;
      right: 20px;
    }
  }
}
</style>
