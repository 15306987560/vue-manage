<template>
  <div class="home-view">
    <el-row>
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
        <!-- 订单展示模块 -->
        <div class="orderData">
          <el-card class="data-item" v-for="item in countData" :key="item.name">
            <i
              class="icon"
              :class="'el-icon-' + item.icon"
              :style="{ background: item.color }"
            ></i>
            <div>
              <p>￥{{ item.value }}</p>
              <p>{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <!-- 折线图 -->
        <el-card style="height: 280px; margin-bottom: 20px">
          <div ref="echarts1" style="height: 280px"></div>
        </el-card>
        <div class="graph" style="width: 100%">
          <!-- 柱状图 -->
          <el-card style="height: 260px; width: 48%">
            <div ref="echarts2" style="height: 260px"></div>
          </el-card>
          <!-- 饼状图 -->
          <el-card style="height: 260px; width: 48%">
            <div ref="echarts3" style="height: 260px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from "../api/index";
import * as echarts from "echarts";
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
      // 折线图
      const echarts1 = echarts.init(this.$refs.echarts1);
      // 折线图数据
      const echarts1Option = {};
      // 处理数据
      const legend = Object.keys(orderData.data[0]);
      const xAxis = [];
      orderData.date.forEach((item) => xAxis.push(item));
      echarts1Option.series = [];
      echarts1Option.yAxis = {};
      echarts1Option.legend = {
        data: legend,
      };
      echarts1Option.xAxis = {
        data: xAxis,
      };
      legend.forEach((item) => {
        echarts1Option.series.push({
          name: item,
          data: orderData.data.map((val) => val[item]),
          type: "line",
          stack: "x",
        });
      });
      //渲染折线图数据
      echarts1.setOption(echarts1Option);

      // 柱形图
      const echarts2 = echarts.init(this.$refs.echarts2);
      // 柱形图数据
      const echarts2Option = {
        legend: {
          // 图例排序方向，水平
          orient: "horizontal",
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        // 表格距离左侧20%
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          // 触发方式，坐标轴触发
          trigger:"axis"
        },
        xAxis: {
          type: "category",
          data: userData.map((item) => item.date),
          xAxisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",//y轴
            axisLine: {
              lineStyle: {//y轴的颜色
                color: "#17b3a3",
              },
            },
          },
        ],
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            type: "bar",
            data:userData.map(item => item.new),
            name: "新增用户",
          },
          {
            type: "bar",
            data:userData.map(item => item.active),
            name: "活跃用户",
          },
        ],
      };
      // 处理数据
      //渲染饼状图数据
      echarts2.setOption(echarts2Option);


            // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      // 饼状图数据
      const echarts3Option = {
        title: {
          text: "Referer of a Website",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: videoData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      // 处理数据
      //渲染饼状图数据
      echarts3.setOption(echarts3Option);
    });
  },
};
</script>

<style lang="scss" scoped>
.el-row {
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
        p{margin: 0;}
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
          p {
            margin: 0;
            &:first-child {
              font-size: 30px;
              margin-bottom: 10px;
            }
            &:last-child {
              font-size: 14px;
              color: #999;
            }
          }
        }
      }
    }
  }
  .graph {
    display: flex;
    justify-content: space-between;
  }
}
</style>
