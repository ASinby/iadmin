<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20" style="padding: 0px 0px 20px 0px;">
      <el-col :xs="3" :sm="3" :lg="3" class="left-col">
        <div class="city-selected-head">
          <div class="radio">
            <el-radio v-model="station" label="A">A工位</el-radio>
            <el-radio v-model="station" label="B">B工位</el-radio>
          </div>
        </div>
      </el-col>
      <el-col :span="18" class="center-col">
        <div class="city-selected-body">
          <el-form :inline="true" :model="baseInfo" class="demo-form-inline">
            <div class="form-row">
              <el-form-item label="">
                <el-input v-model="baseInfo.treatNo" placeholder="处理号" title="处理号"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="baseInfo.stStatus" placeholder="钢包状况" title="钢包状况"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="baseInfo.vacTankTemp" placeholder="当前真空槽处理温度" title="当前真空槽处理温度"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="baseInfo.vacTankAlAdd" placeholder="真空槽烘烤AL补正量[KG]" title="真空槽烘烤AL补正量[KG]"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="baseInfo.treatStartTm" placeholder="RH处理开始时刻" title="RH处理开始时刻"></el-input>
              </el-form-item>
            </div>
            <div class="form-row">
              <el-form-item label="">
                <el-input v-model="baseInfo.stno" placeholder="出钢记号" title="出钢记号"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="baseInfo.steelWeight" placeholder="钢水重量" title="钢水重量"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="baseInfo.treatSpan" placeholder="计划处理时间[0.1分]" title="计划处理时间[0.1分]"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="baseInfo.vacTankTempAdd" placeholder="真空槽温度补正[℃]" title="真空槽温度补正[℃]"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="baseInfo.treatEndTm" placeholder="RH处理结束时刻" title="RH处理结束时刻"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-col>
      <el-col :span="3" class="right-col">
        <div class="city-selected-foot">
          <div class="btn">
            <el-button type="primary" plain @click="refreBtn">刷新</el-button>
            <el-button type="success" plain @click="calcBtn">计算</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chats-container">
      <el-col :xs="16" :sm="16" :lg="16">
        <el-row>
          <el-col :xs="24" :sm="24" :lg="24">
            <div class="chart-wrapper chart-container">
              <LineMarker name="温度趋势" id="chartTempModel" :chartData="chart1Data" :xAxisData="chart1XAxis" yVal="℃" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="12" :sm="12" :lg="12" style="padding-right: 10px;">
            <div class="table-container">
              <div class="table-head">
                <div class="table-head-title">合金信息</div>
              </div>
              <div class="table-body">
                <el-table
                        :data="alloyInfo"
                        :header-cell-style="{textAlign: 'center'}"
                        :cell-style="{textAlign: 'center'}"
                        style="width: 100%"
                        height="25vh">
                  <el-table-column
                          fixed
                          prop="matCode"
                          label="物料编号"
                          width="120">
                  </el-table-column>
                  <el-table-column
                          prop="matType"
                          label="物料类型"
                          width="120">
                  </el-table-column>
                  <el-table-column
                          prop="matName"
                          label="物料描述"
                          width="150">
                  </el-table-column>
                  <el-table-column
                          prop="matAmount"
                          label="物料重量"
                          width="120">
                  </el-table-column>
                  <el-table-column
                          prop="manualFlag"
                          label="手投料标志"
                          width="120">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12" style="padding-left: 10px;">
            <div class="table-container">
              <div class="table-head">
                <div class="table-head-title">吹氧信息</div>
              </div>
              <div class="table-body">
                <el-table style="width: 100%" height="25vh">

                </el-table>
                <!--<el-table
                        :data="tableData"
                        style="width: 100%"
                        height="250">
                  <el-table-column
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
                  </el-table-column>
                </el-table>-->
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="8" :sm="8" :lg="8">
        <el-row>
          <el-col :xs="12" :sm="12" :lg="12" style="padding-right: 10px;">
            <div class="table-container">
              <div class="table-head">
                <div class="table-head-title">实测温度</div>
                </div>
              <div class="table-body">
                <el-table
                        :data="realTemp"
                        :header-cell-style="{textAlign: 'center'}"
                        :cell-style="{textAlign: 'center'}"
                        style="width: 100%"
                        height="68vh">
                  <el-table-column
                          prop="tm"
                          label="时间"
                          width="120">
                  </el-table-column>
                  <el-table-column
                          prop="temp"
                          label="温度"
                          width="120">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12" style="padding-left: 10px;">
            <div class="table-container">
              <div class="table-head">
                <div class="table-head-title">预报温度</div>
              </div>
              <div class="table-body">
                <el-table
                        :data="forceTemp"
                        :header-cell-style="{textAlign: 'center'}"
                        :cell-style="{textAlign: 'center'}"
                        style="width: 100%"
                        height="68vh">
                  <el-table-column
                          prop="tm"
                          label="时间"
                          width="120">
                  </el-table-column>
                  <el-table-column
                          prop="temp"
                          label="温度"
                          width="120">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import LineMarker from './components/LineMarker'
import { getBaseInfo, getTempData, getAlloyInfo, getBlastOxyInfo } from '/@/api/tempmodel'

const station = ref( 'A' )
const baseInfo = ref( { treatNo : '', stStatus : '', vacTankTemp : '', vacTankAlAdd : '', treatStartTm : '', stno : '', steelWeight : '', treatSpan : '', vacTankTempAdd : '', treatEndTm : '' } )
const chart1XAxis = ref( ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55'] )
const chart1Data = ref( [{
  name : '实际',
  color : 'rgb(160,114,245)',
  data : [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150],
  offset0 : 'rgba(160,114,245,0.27)',
  offset1 : 'rgba(160,114,245,0)'
},
{
  name : '预测',
  color : 'rgb(245,237,91)',
  data : [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122],
  offset0 : 'rgba(245,237,91,0.27)',
  offset1 : 'rgba(245,237,91,0)'
}] )
const realTemp = ref( [] )
const forceTemp = ref( [] )
const alloyInfo = ref( [
  { matCode : '1', matType : '', matName : '', matAmount : '', manualFlag : '' },
  { matCode : '2', matType : '', matName : '', matAmount : '', manualFlag : '' },
  { matCode : '3', matType : '', matName : '', matAmount : '', manualFlag : '' }
] )

onMounted( () => {
  init()
} )

watch( station, ( newVal ) => {
  const param = {
    station1 : station.value
  }
  refreBaseInfo( param )
  refreTempData( param )
  refreAlloyInfo( param )
  refreBlastOxyInfo( param )

  ElMessage( {
    message : '选中' + newVal,
    type : 'success',
    duration : 3 * 1000
  } )
} )
// 初始化
function init() {
  const param = {
    station1 : station.value
  }

  refreBaseInfo( param )
  refreTempData( param )
  refreAlloyInfo( param )
  refreBlastOxyInfo( param )
}
async function refreBaseInfo( param ) {
  const result = await getBaseInfo( { param } )
  // console.log( result )
  baseInfo.value = result.data
}
async function refreTempData( param ) {
  try {
    const { data } = await getTempData( { param } )
    // console.log( { data }.data )
    chart1Data.value = { data }.data

    realTemp.value = []
    forceTemp.value = []
    chart1Data.value.forEach( function( item, index ) {
      item.data.forEach( function( val, nn ) {
        if ( item.name === '实际' ) {
          realTemp.value.push( {
            tm : chart1XAxis.value[nn],
            temp : val
          } )
        } else if ( item.name === '预测' ) {
          forceTemp.value.push( {
            tm : chart1XAxis.value[nn],
            temp : val
          } )
        }
      } )
    } )
  } catch ( e ) {

  } finally {

  }
}
async function refreAlloyInfo( param ) {
  const { data } = await getAlloyInfo( { param } )
  // console.log( { data } )
  alloyInfo.value = { data }.data
}
async function refreBlastOxyInfo( param ) {
  const { data } = await getBlastOxyInfo( { param } )
  console.log( { data } )
  // baseInfo.value = { data }.data
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
function calcBtn() {
  init()
  ElMessage( {
    message : '计算成功',
    type : 'success',
    duration : 3 * 1000
  } )
}

defineOptions( {
  name : 'tempModel'
} )
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh/2 - 84px);
}
.dashboard-editor-container {
  padding: 32px 32px 32px 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .left-col {padding-right: 0px !important;margin-bottom: 0px;}
  .center-col {padding-left: 0px !important;padding-right: 0px !important;margin-bottom: 0px;}
  .right-col {padding-left: 0px !important;;margin-bottom: 0px;}

  .chats-container {
    .chart-wrapper {
      border-radius: 5px;
      background: #fff;
      padding: 20px;
      box-sizing: border-box;
      margin-bottom: 20px;
      box-shadow: 0 -3px 31px 0 rgb(0 0 0 / 5%), 0 6px 20px 0 rgb(0 0 0 / 2%);
      &:hover {
        transition: all 0.3s;
        transform: translateY(-6px);
      }
    }
  }

  .table-list {
    /*height: 476px;*/
    .el-col {
      padding-right: 8px;
      margin-bottom: 30px;
    }
  }

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
  .radio{
    text-align: center;
    margin: 3vh 0 0 0;
  }
}
.city-selected-body {
  font-size: 14px;
  padding: 0px;  /* 20px */
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
  .btn{
    text-align: center;
    margin: 3vh 0 0 0;
  }
}
.table-container{
  /*padding-left: 10px;
  padding-right: 10px*/;
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
  .table-head-title{
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
.form-row{
  position: relative;
  text-align: center;
  top: 9px;
}
</style>
