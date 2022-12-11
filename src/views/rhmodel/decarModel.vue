<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-row>
          <el-col :span="24">
            <div class="table-container" style="margin-bottom: 20px">
              <div class="table-head">
                <div class="table-head-title">计划与设定信息</div>
              </div>
              <div class="table-body">
                <div class="center-col" style="height: 50vh">
                  <el-form label-position="right" label-width="100px" :model="baseInfo" style="padding: 5px">
                    <el-form-item label="处理号">
                      <el-input v-model="baseInfo.treatno"></el-input>
                    </el-form-item>
                    <el-form-item label="出钢记号">
                      <el-input v-model="baseInfo.stno"></el-input>
                    </el-form-item>
                    <el-form-item label="开始处理时刻">
                      <!--<el-input v-model="baseInfo.treatStartTm"></el-input>-->
                      <el-date-picker v-model="baseInfo.treatStartTm" type="datetime" placeholder="开始处理时刻">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="目标OXP">
                      <el-input v-model="baseInfo.aimOXP"></el-input>
                    </el-form-item>
                    <el-form-item label="设定吹氧量" style="position: relative">
                      <el-radio-group v-model="baseInfo.blowO2Mode">
                        <el-radio :label="'1'">不吹氧</el-radio>
                        <el-radio :label="'2'">预报量</el-radio>
                        <el-radio :label="'3'">设定量</el-radio>
                      </el-radio-group>
                      <el-input
                        v-model="baseInfo.setO2"
                        style="position: absolute; width: 100px; top: 30px; right: 35px"
                        v-if="showOxySet"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                  <div class="radio">
                    <el-radio v-model="station" label="1">1工位</el-radio>
                    <el-radio v-model="station" label="2">2工位</el-radio>
                  </div>
                  <div class="btn">
                    <el-button type="primary" plain @click="refreBtn">刷新</el-button>
                    <el-button type="success" plain @click="calcBtn">计算</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="table-container" style="margin-bottom: 20px">
              <div class="table-head">
                <div class="table-head-title">模型计算输出</div>
              </div>
              <div class="table-body">
                <div class="center-col" style="height: 25vh">
                  <el-form label-position="right" label-width="100px" :model="baseInfo" style="padding: 5px">
                    <el-form-item label="程序开始时刻">
                      <!--<el-input v-model="baseInfo.runTm"></el-input>-->
                      <el-date-picker v-model="baseInfo.runTm" type="datetime" placeholder="程序开始时刻">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="预报吹氧量">
                      <el-input v-model="baseInfo.forecastO2"></el-input>
                    </el-form-item>
                    <el-form-item label="预计处理时长">
                      <el-input v-model="baseInfo.treatSpan"></el-input>
                    </el-form-item>
                    <el-form-item label="镇静[C]">
                      <el-input v-model="baseInfo.killingC"></el-input>
                    </el-form-item>
                    <el-form-item label="提醒">
                      <el-input v-model="baseInfo.tips"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="13">
        <el-row>
          <el-col :span="24">
            <div class="table-container" style="margin-bottom: 20px">
              <div class="table-head">
                <div class="table-head-title">钢水处理信息</div>
              </div>
              <div class="table-body">
                <div class="center-col" style="height: 11vh">
                  <el-form :inline="true" :model="baseInfo" class="demo-form-inline">
                    <div class="form-row">
                      <el-form-item label="">
                        <el-input v-model="baseInfo.preC" placeholder="处理前[C%]" title="处理前[C%]"></el-input>
                      </el-form-item>
                      <el-form-item label="">
                        <el-input v-model="baseInfo.preOXP" placeholder="处理前[OXP%]" title="处理前[OXP%]"></el-input>
                      </el-form-item>
                      <el-form-item label="">
                        <el-input v-model="baseInfo.aimC" placeholder="目标[C%]" title="目标[C%]"></el-input>
                      </el-form-item>
                    </div>
                    <div class="form-row">
                      <el-form-item label="">
                        <el-input
                          v-model="baseInfo.steelWeight"
                          placeholder="钢水重量[kg]"
                          title="钢水重量[kg]"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="">
                        <el-input v-model="baseInfo.steelTemp" placeholder="钢水温度[℃]" title="钢水温度[℃]"></el-input>
                      </el-form-item>
                    </div>
                  </el-form>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="chats-container">
          <el-col :span="24">
            <div class="chart-wrapper chart-container" style="height: 67vh">
              <LineMarker
                name="碳、游离氧预报曲线"
                id="chartCOxy"
                :chartData="coxyChartData"
                :xAxisData="chart1XAxis"
                yVal="ppm"
              />
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <div class="table-container">
          <div class="table-head">
            <div class="table-head-title">碳和游离氧成分预报值</div>
          </div>
          <div class="table-body">
            <el-table
              :data="coxyTableData"
              :header-cell-style="{ textAlign: 'center' }"
              :cell-style="{ textAlign: 'center' }"
              style="width: 100%"
              height="80vh"
            >
              <el-table-column prop="tm" label="时间" width="120"> </el-table-column>
              <el-table-column prop="cVal" label="碳" width="120"> </el-table-column>
              <el-table-column prop="oxyVal" label="游离氧" width="120"> </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import LineMarker from './components/LineMarker'
import { ElMessage } from 'element-plus'
import { getBaseInfo, getOutCOxygen, doCalc } from '/@/api/decarmodel'

const baseInfo = ref( {
  treatno : '',
  stno : '',
  treatStartTm : '',
  aimOXP : '',
  setO2 : '',
  blowO2Mode : '1',
  runTm : 0,
  forecastO2 : 99,
  treatSpan : 0,
  killingC : 89,
  tips : 'hi',
  preC : '',
  preOXP : '',
  aimC : '',
  steelWeight : '',
  steelTemp : ''
} )
const coxyTableData = ref( [] )
const chart1XAxis = ref( [] )
const coxyChartData = ref( [] )
const showOxySet = ref( false )
const station = ref( '1' )

onMounted( () => {
  init()
} )

onUnmounted( () => {} )

// 初始化
function init() {
  const param = {
    station1 : station.value
  }
  refreBaseInfo( param )
  refreOutCOxy( param )
}
// 刷新基本消息
async function refreBaseInfo( param ) {
  try {
    const { data } = await getBaseInfo( param )
    baseInfo.value = { data }.data
  } catch ( e ) {
  } finally {
  }
}
// 刷新碳和游离氧
async function refreOutCOxy( param ) {
  try {
    const { data } = await getOutCOxygen( param )
    // console.log( { data } )
    coxyTableData.value = { data }.data.tableData

    const tm = []
    const cVals = []
    const oxyVals = []
    coxyTableData.value.forEach( function( value, index, array ) {
      tm.push( value.tm )
      cVals.push( value.cVal )
      oxyVals.push( value.oxyVal )
    } )
    chart1XAxis.value = tm
    coxyChartData.value = chart1FormatData( cVals, oxyVals )
    // console.log( coxyChartData.value )
  } catch ( e ) {
  } finally {
  }
}

function chart1FormatData( cVals, oxyVals ) {
  return [
    {
      name : '碳',
      color : 'rgb(160,114,245)',
      data : cVals,
      offset0 : 'rgba(160,114,245,0.27)',
      offset1 : 'rgba(160,114,245,0)'
    },
    {
      name : '游离氧',
      color : 'rgb(245,237,91)',
      data : oxyVals,
      offset0 : 'rgba(245,237,91,0.27)',
      offset1 : 'rgba(245,237,91,0)'
    }
  ]
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

// 监听setOxyCount变化 reactive类型数据
watch(
  () => baseInfo.value.blowO2Mode,
  blowO2Mode => {
    // 1不吹氧  2预报量  3设定量
    if ( blowO2Mode === '1' ) {
      showOxySet.value = false
      baseInfo.value.setO2 = 0
    } else if ( blowO2Mode === '2' ) {
      showOxySet.value = false
      baseInfo.value.setO2 = baseInfo.value.forecastO2
    } else if ( blowO2Mode === '3' ) {
      // baseInfo.value.setO2 = ''
      showOxySet.value = true
    }
    console.log( `blowO2Mode is: ${blowO2Mode}`, baseInfo.value.setO2 )
  }
)

// 监听station变化  ref类型数据
watch( station, newX => {
  // console.log(`x is ${newX}`)
  init()
  ElMessage( {
    message : '刷新成功！',
    type : 'success',
    duration : 2 * 1000
  } )
} )

defineOptions( {
  name : 'decarModel'
} )
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh / 2 - 84px);
}
.dashboard-editor-container {
  padding: 32px 32px 0px 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .left-col {
    padding-right: 0px !important;
    margin-bottom: 0px;
  }
  .center-col {
    padding-left: 0px !important;
    padding-right: 0px !important;
    margin-bottom: 0px;
  }
  .right-col {
    padding-left: 0px !important;
    margin-bottom: 0px;
  }

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
/* 表格 */
.table-container {
  /*width: 100%;*/
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
  /*background: linear-gradient(45deg, #746bbe, #9d9ec5) !important;*/
  background-color: #dee2e6;
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
/* 单选工位 */
.radio {
  text-align: center;
  padding-top: 20px;
}
.btn {
  text-align: center;
  margin: 3vh 0 0 0;
}
</style>
