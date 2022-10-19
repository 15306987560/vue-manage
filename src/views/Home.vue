<template>
  <div class="home-view">
    <el-row class="">
      <el-col :span="8" style="padding-right: 10px">
        <el-card class="user">
          <div class="user-info">
            <img src="../assets/images/user.png" alt="" />
            <div class="authority">
              <p>Admin</p>
              <p>超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间:<span class="info-content">2022-07-20</span></p>
            <p>上次登录地点:<span class="info-content">武汉</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :prop="key"
              :label="val"
              :key="key"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="padding-left: 10px">
        <div class="orderData">
          <el-card class="data-item" v-for="item in countData" :key="item.name">
            <i
              class="icon"
              :class="'el-icon-' + item.icon"
              :style="{background: item.color}"
            ></i>
            <div>
              <p>￥{{ item.value }}</p>
              <p>{{ item.name }}</p>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from "../api/index";
export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      console.log(data.data);
      const { orderData, tableData, userData, videoData } = data.data;
      this.tableData = tableData;
    });
  },
};
</script>

<style lang="scss" scoped>
.user {
  width: 479px;
  height: 260px;
  box-sizing: border-box;
  color: #999;
  .el-card__body {
    .user-info {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 40px;
      }
      .authority p:first-child {
        font-size: 32px;
        margin-bottom: 10px;
        color: #333;
      }
    }
    .login-info {
      line-height: 28px;
      font-size: 14px;
      p span {
        margin-left: 60px;
        color: #333;
      }
    }
  }
}
// 订单数据模块
.orderData {
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  ::v-deep .el-card {
    width: 32%;
    margin-bottom: 20px;
    .el-card__body {
      padding: 0 !important;
      display: flex;
      .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        margin-right: 15px;
        color: #fff;
      }
      div {
        display: flex;
        flex-flow: column;
        justify-content: center;
        p{
          margin: 0;
          &:first-child{
            font-size: 30px;
            margin-bottom: 10px;
          }
          &:last-child{
            font-size: 14px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
