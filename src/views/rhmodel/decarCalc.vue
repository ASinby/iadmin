<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-row class="chats-container">
          <el-col :xs="24" :sm="24" :lg="24">
            <div class="chart-wrapper chart-container">
              <LineMarker name="废气流量" id="chart1" :chartData="chart1Data" :xAxisData="chart1XAxis" yVal="-" />
            </div>
          </el-col>
        </el-row>
        <el-row class="chats-container">
          <el-col :xs="24" :sm="24" :lg="24">
            <div class="chart-wrapper chart-container">
              <LineMarker name="脱氧量" id="chart2" :chartData="chart2Data" :xAxisData="chart2XAxis" yVal="ppm" />
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <div class="card weather">
          <div class="city-selected-head l-salmon">
            <el-row :gutter="0" class="table-list">
              <el-col :span="24">
                <div class="info">
                  <div class="city">动态模型输入量与设定值</div>
                  <div class="radio">
                    <el-radio-group v-model="station">
                      <el-radio-button label="1">1工位</el-radio-button>
                      <el-radio-button label="2">2工位</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>

          <div style="padding: 8px">
            <el-form :label-position="left" label-width="120px" :model="baseInfo">
              <el-form-item label="处理号">
                <el-input v-model="baseInfo.treatno"></el-input>
              </el-form-item>
              <el-form-item label="处理开始时刻">
                <!--<el-input v-model="baseInfo.treatStartTm"></el-input>-->
                <el-date-picker v-model="baseInfo.treatStartTm" type="datetime" placeholder="处理开始时刻">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="钢水重量[kg]">
                <el-input v-model="baseInfo.steelWeight"></el-input>
              </el-form-item>
              <el-form-item label="初始C含量[%]">
                <el-input v-model="baseInfo.preC"></el-input>
              </el-form-item>
              <el-form-item label="目标C上限[%]">
                <el-input v-model="baseInfo.aimCUpper"></el-input>
              </el-form-item>
              <el-form-item label="目标C下限[%]">
                <el-input v-model="baseInfo.aimCFloor"></el-input>
              </el-form-item>
              <el-form-item label="目标C[%]">
                <el-input v-model="baseInfo.aimC"></el-input>
              </el-form-item>
              <el-form-item label="过程碳取样时刻">
                <!--<el-input v-model="baseInfo.duringCTm"></el-input>-->
                <el-date-picker v-model="baseInfo.duringCTm" type="datetime" placeholder="过程碳取样时刻">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="过程C含量[%]">
                <el-input v-model="baseInfo.duringC"></el-input>
              </el-form-item>
              <el-form-item label="钢水温度[℃]">
                <el-input v-model="baseInfo.steelTemp"></el-input>
              </el-form-item>
              <el-form-item label="最新游离氧">
                <el-input v-model="baseInfo.oxyVal"></el-input>
              </el-form-item>
              <el-form-item label="错误">
                <el-input v-model="baseInfo.tips"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <div class="city-selected-foot l-salmon">
            <el-row :gutter="0">
              <el-col :span="24">
                <div class="info">
                  <div class="btn">
                    <el-button type="primary" plain @click="refreBtn">刷新</el-button>
                    <el-button type="success" plain @click="calcBtn">计算</el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { doCalc, getBaseInfo, getChart1Data, getChart2Data } from '/@/api/decarcalc'
import LineMarker from './components/LineMarker'

const station = ref( '1' )

const chart1 = ref( null )
const chart1XAxis = ref( [
  '13:00',
  '13:05',
  '13:10',
  '13:15',
  '13:20',
  '13:25',
  '13:30',
  '13:35',
  '13:40',
  '13:45',
  '13:50',
  '13:55'
] )
const chart1Data = ref( [
  {
    name : 'CO',
    color : 'rgb(160,114,245)',
    data : [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150],
    offset0 : 'rgba(160,114,245,0.27)',
    offset1 : 'rgba(160,114,245,0)'
  },
  {
    name : 'CO2',
    color : 'rgb(245,237,91)',
    data : [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122],
    offset0 : 'rgba(245,237,91,0.27)',
    offset1 : 'rgba(245,237,91,0)'
  },
  {
    name : 'O2',
    color : 'rgb(103,245,208)',
    data : [110, 125, 145, 134, 150, 120, 110, 125, 145, 165, 122, 220],
    offset0 : 'rgba(103,245,208,0.27)',
    offset1 : 'rgba(103,245,208,0.1)'
  }
] )
const chart2 = ref( null )
const chart2XAxis = ref( [
  '13:00',
  '13:05',
  '13:10',
  '13:15',
  '13:20',
  '13:25',
  '13:30',
  '13:35',
  '13:40',
  '13:45',
  '13:50',
  '13:55'
] )
const chart2Data = ref( [
  {
    name : 'C',
    color : 'rgb(160,114,245)',
    data : [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122],
    offset0 : 'rgba(160,114,245,0.27)',
    offset1 : 'rgba(160,114,245,0)'
  }
] )
const baseInfo = ref( {
  treatno : '',
  treatStartTm : '',
  steelWeight : '',
  preC : '',
  aimCUpper : '',
  aimCFloor : '',
  aimC : '',
  duringCTm : '',
  duringC : '',
  steelTemp : '',
  oxyVal : '',
  tips : ''
} )

onMounted( () => {
  init()
} )

watch( station, newX => {
  init()
  ElMessage( {
    message : '刷新成功！',
    type : 'success',
    duration : 2 * 1000
  } )
} )

function init() {
  const param = {
    station1 : station.value
  }

  refrebaseInfo( param )
  refreWasteGas( param )
  refreOutCoxy( param )
}

function refreBtn() {
  init()
  ElMessage( {
    message : '刷新成功！',
    type : 'success',
    duration : 2 * 1000
  } )
}
async function calcBtn() {
  try {
    const { data } = await doCalc( baseInfo.value )
    console.log( { data } )
    init()
    ElMessage( {
      message : '计算成功',
      type : 'success',
      duration : 3 * 1000
    } )
  } catch ( e ) {
  } finally {
  }
}

// 刷新废气流量
async function refreWasteGas( param ) {
  try {
    const { data } = await getChart1Data( param )

    // console.log( { data }.data )
    chart1.value = { data }.data

    const tm = []
    const coVals = []
    const co2Vals = []
    const o2Vals = []
    chart1.value.forEach( function( value, index ) {
      tm.push( value.tm )
      coVals.push( value.co )
      co2Vals.push( value.co2 )
      o2Vals.push( value.o2 )
    } )

    chart1XAxis.value = tm
    chart1Data.value = chart1FormatData( coVals, co2Vals, o2Vals )
  } catch ( e ) {
  } finally {
  }
}
// 刷新脱碳量
async function refreOutCoxy( param ) {
  try {
    const { data } = await getChart2Data( param )

    // console.log( { data }.data )
    chart2.value = { data }.data

    const tm = []
    const cVals = []
    chart2.value.forEach( function( value, index ) {
      tm.push( value.tm )
      cVals.push( value.cVal )
    } )

    chart1XAxis.value = tm
    chart2Data.value = chart2FormatData( cVals )
  } catch ( e ) {
  } finally {
  }
}
// 设定值
async function refrebaseInfo( param ) {
  try {
    const { data } = await getBaseInfo( param )

    // console.log( { data } )
    baseInfo.value = { data }.data
  } catch ( e ) {
  } finally {
  }
}

/**
 * 废气流量趋势图数据格式
 * @param coVals
 * @param co2Vals
 * @param o2Vals
 * @returns {({color: string, data: *, name: string, offset0: string, offset1: string}|{color: string, data: *, name: string, offset0: string, offset1: string}|{color: string, data: *, name: string, offset0: string, offset1: string})[]}
 */
function chart1FormatData( coVals, co2Vals, o2Vals ) {
  return [
    {
      name : 'CO',
      color : 'rgb(160,114,245)',
      data : coVals,
      offset0 : 'rgba(160,114,245,0.27)',
      offset1 : 'rgba(160,114,245,0)'
    },
    {
      name : 'CO2',
      color : 'rgb(245,237,91)',
      data : co2Vals,
      offset0 : 'rgba(245,237,91,0.27)',
      offset1 : 'rgba(245,237,91,0)'
    },
    {
      name : 'O2',
      color : 'rgb(103,245,208)',
      data : o2Vals,
      offset0 : 'rgba(103,245,208,0.27)',
      offset1 : 'rgba(103,245,208,0.1)'
    }
  ]
}

/**
 * 脱碳量趋势图数据格式
 * @param cVals
 * @returns {{color: string, data: *, name: string, offset0: string, offset1: string}[]}
 */
function chart2FormatData( cVals ) {
  return [
    {
      name : 'C',
      color : 'rgb(160,114,245)',
      data : cVals,
      offset0 : 'rgba(160,114,245,0.27)',
      offset1 : 'rgba(160,114,245,0)'
    }
  ]
}

defineOptions( {
  name : 'decarCalc'
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

/* 右侧 */
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
  padding: 20px;
  font-weight: 400;
  background: linear-gradient(45deg, #746bbe, #9d9ec5) !important;
  position: relative;
  overflow: hidden;
  color: #fff;
  border-radius: 3px 3px 0 0;
  box-sizing: content-box;
  height: 8vh;
  .city {
    height: 36px;
    font-size: 24px;
    text-align: center;
  }
  .radio {
    text-align: center;
    padding-top: 20px;
  }
}
.city-selected-foot {
  font-size: 14px;
  padding: 20px;
  font-weight: 400;
  background: linear-gradient(45deg, #746bbe, #9d9ec5) !important;
  position: relative;
  overflow: hidden;
  color: #fff;
  border-radius: 0 0 3px 3px;
  box-sizing: content-box;
  height: 5vh;
  .btn {
    text-align: center;
    button {
      /*font-size: 24px;*/
    }
  }
}

.table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  td,
  th {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }
  tbody tr td {
    padding: 14px 20px;
  }
}
.table-striped {
  tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.week-weather {
  height: 120px;
  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .days-list {
  }
  .day {
    display: inline-block;
    width: 30%;
    margin: 0 1%;
    padding: 20px 10px;
    text-align: center;
    p {
      padding: 0;
      margin: 0;
      font-size: 15px;
      line-height: 24px;
      height: 24px;
      margin-bottom: 16px;
    }
    .panel-icon {
      width: 40px;
      height: 40px;
      color: #343434;
    }
  }
}

.carousel {
}
.slide {
}
</style>
