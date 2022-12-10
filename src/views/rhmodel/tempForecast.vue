<template>
  <div class="dashboard-editor-container">
    <el-row style="padding: 0px 0px 20px 0px">
      <el-col :xs="3" :sm="3" :lg="3">
        <div class="city-selected-head">
          <div class="radio">
            <el-radio v-model="station" label="1">1工位</el-radio>
            <el-radio v-model="station" label="2">2工位</el-radio>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="city-selected-body">
          <el-form :inline="true" :model="baseInfo" class="demo-form-inline">
            <div class="form-row">
              <el-form-item label="">
                <el-input v-model="baseInfo.treatNo" placeholder="处理号" title="处理号"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="baseInfo.stStatus" placeholder="钢包状态" title="钢包状态"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="baseInfo.alloyAddWeight" placeholder="投入冷材" title="投入冷材"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="baseInfo.vacTankTemp" placeholder="温度[℃]" title="温度[℃]"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="baseInfo.treatStartTm" placeholder="处理开始时刻" title="处理开始时刻"></el-input>
              </el-form-item>
            </div>
            <div class="form-row">
              <el-form-item label="">
                <el-input v-model="baseInfo.stno" placeholder="出钢记号" title="出钢记号"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="baseInfo.steelWeight" placeholder="钢水重量[Kg]" title="钢水重量[Kg]"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input
                  v-model="baseInfo.treatSpan"
                  placeholder="计划处理时长[0.1分]"
                  title="计划处理时长[0.1分]"
                ></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="baseInfo.setO2" placeholder="吹氧量" title="吹氧量"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="baseInfo.treatEndTm" placeholder="处理结束时刻" title="处理结束时刻"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="city-selected-foot">
          <div class="btn">
            <el-button type="primary" plain @click="refreBtn">刷新</el-button>
            <el-button type="success" plain @click="calcBtn">计算</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="chats-container">
      <el-col :span="8">
        <div class="table-container">
          <div class="table-head">
            <div class="table-head-title">计划投入合金信息</div>
          </div>
          <div class="table-body">
            <el-table
              :data="alloyOfPlan"
              :header-cell-style="{ textAlign: 'center' }"
              :cell-style="{ textAlign: 'center' }"
              style="width: 100%"
              height="35vh"
            >
              <el-table-column prop="bunkerNo" label="料仓号" width="130"> </el-table-column>
              <el-table-column prop="matCode" label="物料代码" width="130"> </el-table-column>
              <el-table-column prop="matName" label="物料名称" width="130"> </el-table-column>
              <el-table-column prop="calw" label="计算重量" width="130"> </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="table-container">
          <div class="table-head">
            <div class="table-head-title">合金信息</div>
          </div>
          <div class="table-body">
            <el-table
              :data="alloyInfo"
              :header-cell-style="{ textAlign: 'center' }"
              :cell-style="{ textAlign: 'center' }"
              style="width: 100%"
              height="35vh"
            >
              <el-table-column fixed prop="matCode" label="物料编号" width="120"> </el-table-column>
              <el-table-column prop="matType" label="物料类型" width="120"> </el-table-column>
              <el-table-column prop="matName" label="物料描述" width="150"> </el-table-column>
              <el-table-column prop="matAmount" label="物料重量" width="120"> </el-table-column>
              <el-table-column prop="manualFlag" label="手投料标志" width="120"> </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="table-container">
          <div class="table-head">
            <div class="table-head-title">实测温度</div>
          </div>
          <div class="table-body">
            <el-table
              :data="realTemp"
              :header-cell-style="{ textAlign: 'center' }"
              :cell-style="{ textAlign: 'center' }"
              style="width: 100%"
              height="35vh"
            >
              <el-table-column prop="id" label="时间" width="260"> </el-table-column>
              <el-table-column prop="tempAct" label="温度" width="260"> </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="padding: 20px 0px 0px 0px">
      <el-col :span="24">
        <div class="table-container">
          <div class="table-head">
            <div class="table-head-title">吹氧信息</div>
          </div>
          <div class="table-body">
            <el-table
              :data="tableData"
              :header-cell-style="{ textAlign: 'center' }"
              :cell-style="{ textAlign: 'center' }"
              style="width: 100%"
              height="29vh"
            >
              <!--<el-table-column
                      fixed
                      prop="date"
                      label="日期"
                      width="150">
              </el-table-column>
              <el-table-column
                      prop="name"
                      label="姓名"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="province"
                      label="省份"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="city"
                      label="市区"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="address"
                      label="地址"
                      width="300">
              </el-table-column>
              <el-table-column
                      prop="zip"
                      label="邮编"
                      width="120">
              </el-table-column>-->
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import {
  getActualTemp,
  getAlloyInfo,
  getAlloyInfoOfPlan,
  getBaseInfo,
  getBlowingOxygen,
  doCalc
} from '/@/api/tempforecast'

const station = ref( '1' )
const baseInfo = ref( {
  treatNo : '',
  stStatus : '',
  vacTankTemp : '',
  alloyAddWeight : '',
  treatStartTm : '',
  stno : '',
  steelWeight : '',
  treatSpan : '',
  setO2 : '',
  treatEndTm : ''
} )
// 合金信息
const alloyInfo = ref( [
  { matCode : '1', matType : '', matName : '', matAmount : '', manualFlag : '' },
  { matCode : '2', matType : '', matName : '', matAmount : '', manualFlag : '' },
  { matCode : '3', matType : '', matName : '', matAmount : '', manualFlag : '' }
] )
// 实测温度
const realTemp = ref( [
  { id : '10:12', tempAct : 1600 },
  { id : '10:12', tempAct : 1600 }
] )
const alloyOfPlan = ref( [] )
onMounted( () => {
  init()
} )

onUnmounted( () => {} )

// 监听station变化  ref类型数据
watch( station, newX => {
  init()
  ElMessage( {
    message : '刷新成功！',
    type : 'success',
    duration : 2 * 1000
  } )
} )
// 初始化
function init() {
  const param = {
    station1 : station.value
  }
  refreBaseInfo( param )
  refreO2Info( param )
  refreAlloyInfo( param )
  refreRealTempInfo( param )
  refrePlanUseAlloy( param )
}
// 刷新基本炉次消息
async function refreBaseInfo( param ) {
  try {
    const { data } = await getBaseInfo( param )
    baseInfo.value = { data }.data
  } catch ( e ) {
  } finally {
  }
}
// 吹氧信息
async function refreO2Info( param ) {
  try {
    const { data } = await getBlowingOxygen( param )
    console.log( '吹氧信息', { data } )
  } catch ( e ) {
  } finally {
  }
}
// 合金信息
async function refreAlloyInfo( param ) {
  try {
    const { data } = await getAlloyInfo( param )
    // console.log( '合金信息', { data } )
    alloyInfo.value = { data }.data
  } catch ( e ) {
  } finally {
  }
}
// 实测温度信息
async function refreRealTempInfo( param ) {
  try {
    const { data } = await getActualTemp( param )
    // console.log( '实测温度信息', { data } )
    realTemp.value = { data }.data
  } catch ( e ) {
  } finally {
  }
}
// 计划投入合金信息
async function refrePlanUseAlloy( param ) {
  try {
    const { data } = await getAlloyInfoOfPlan( param )
    // console.log( '计划投入合金信息', { data } )
    alloyOfPlan.value = { data }.data
  } catch ( e ) {
  } finally {
  }
}

// 刷新按键事件
function refreBtn() {
  init()
  ElMessage( {
    message : '刷新成功',
    type : 'success',
    duration : 3 * 1000
  } )
}
// 计算按键事件
async function calcBtn() {
  await doCalc( baseInfo.value )
  init()
  ElMessage( {
    message : '计算成功',
    type : 'success',
    duration : 3 * 1000
  } )
}

defineOptions( {
  name : 'tempForecast'
} )
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh / 2 - 84px);
}
.dashboard-editor-container {
  padding: 32px 32px 32px 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.card {
  background: #fff;
  transition: 0.5s;
  border: 0;
  border-radius: 0.1875rem;
  position: relative;
  width: 100%;
  box-shadow: 0 -3px 31px 0 rgb(0 0 0 / 5%), 0 6px 20px 0 rgb(0 0 0 / 2%);
}
.weather {
}
.city-selected-head {
  font-size: 14px;
  padding: 0px;
  font-weight: 400;
  background: linear-gradient(45deg, #746bbe, #9d9ec5) !important;
  position: relative;
  overflow: hidden;
  color: #fff;
  border-radius: 3px 0px 0px 3px;
  box-sizing: content-box;
  height: 10vh;
  .radio {
    text-align: center;
    margin: 3vh 0 0 0;
  }
}
.city-selected-body {
  font-size: 14px;
  padding: 0px; /* 20px */
  font-weight: 400;
  background-color: #dee2e6;
  position: relative;
  overflow: hidden;
  color: #000000;
  border-radius: 0px 0px 0px 0px;
  box-sizing: content-box;
  height: 10vh;
}
.city-selected-foot {
  font-size: 14px;
  padding: 0px;
  font-weight: 400;
  background: linear-gradient(45deg, #9d9ec5, #746bbe) !important;
  position: relative;
  overflow: hidden;
  color: #fff;
  border-radius: 0px 3px 3px 0px;
  box-sizing: content-box;
  height: 10vh;
  .btn {
    text-align: center;
    margin: 3vh 0 0 0;
  }
}
.table-container {
  /*padding-left: 10px;
  padding-right: 10px*/
}
.table-head {
  font-size: 20px;
  padding: 0px;
  font-weight: 400;
  background: linear-gradient(45deg, #746bbe, #9d9ec5) !important;
  position: relative;
  overflow: hidden;
  color: #fff;
  border-radius: 3px 3px 0px 0px;
  box-sizing: content-box;
  height: 4vh;
  .table-head-title {
    position: absolute;
    padding: 5px;
  }
}
.table-body {
  font-size: 14px;
  padding: 0px;
  font-weight: 400;
  background: linear-gradient(45deg, #746bbe, #9d9ec5) !important;
  position: relative;
  overflow: hidden;
  color: #fff;
  border-radius: 0px 0px 3px 3px;
  box-sizing: content-box;
  /*height: 10vh;*/
}
/* 表单 */
.form-row {
  position: relative;
  text-align: center;
  top: 9px;
}
</style>
