<template>
  <div class="login">
    <el-form
      :model="form"
      :rules="rules"
      class="login-container"
      inline
      label-width="70px"
      ref="form"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入账号" v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getMenu } from "../api/index";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 登录
    submit() {
      this.$refs.form.validate((vali) => {
        if (vali) {
          getMenu(this.form).then(({ data }) => {
            if (data.code == 20000) {
              console.log("登录成功", data);
              //将token及用户权限存入状态树
              this.$store.commit('setToken',data.data.token)
              this.$store.commit('setMenu',data.data.menu)
              this.$store.commit('addMenu',this.$router)
              this.$router.push("/");
            } else {
              this.$message.error(data.data.message);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  .el-form {
    width: 350px;
    box-sizing: border-box;
    border: 1px solid #eaeaea;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 35px 35px 15px 35px;
    color: #fff;
    box-shadow: 0 0 25px #eaeaea;
    border-radius: 15px;
    .title {
      color: #505458;
      margin: 0 0 40px 0;
      text-align: center;
    }
    .el-input {
      width: 198px;
    }
    .el-form-item:last-child {
      margin-left: 50%;
      margin-top: 10px;
      position: relative;
      left: -24px;
    }
  }
}
</style>
