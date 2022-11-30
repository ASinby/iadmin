<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-row>
          <el-col :span="24">
            <div class="table-container" style="margin-bottom: 20px;">
              <div class="table-head">
                <div class="table-head-title">计划与设定信息</div>
              </div>
              <div class="table-body">
                <div class="center-col" style="height: 50vh;">
                  <el-form label-position="right" label-width="100px" :model="settingVal" style="padding: 5px;">
                    <el-form-item label="处理号">
                      <el-input v-model="settingVal.useNo"></el-input>
                    </el-form-item>
                    <el-form-item label="出钢记号">
                      <el-input v-model="settingVal.steelNo"></el-input>
                    </el-form-item>
                    <el-form-item label="开始处理时刻">
                      <el-input v-model="settingVal.startTm"></el-input>
                    </el-form-item>
                    <el-form-item label="目标OXP">
                      <el-input v-model="settingVal.aimOXP"></el-input>
                    </el-form-item>
                    <el-form-item label="设定吹氧量" style="position: relative">
                      <el-radio-group v-model="settingVal.setOxyCount">
                        <el-radio :label="1">不吹氧</el-radio>
                        <el-radio :label="2">预报量</el-radio>
                        <el-radio :label="3">设定量</el-radio>
                      </el-radio-group>
                      <el-input v-model="settingVal.oxyCount" style="position: absolute;width: 100px;top: 30px;right: 35px;" v-if="showOxySet"></el-input>
                    </el-form-item>
                  </el-form>
                  <div class="radio">
                    <el-radio v-model="station" label="A">A工位</el-radio>
                    <el-radio v-model="station" label="B">B工位</el-radio>
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
            <div class="table-container" style="margin-bottom: 20px;">
              <div class="table-head">
                <div class="table-head-title">模型计算输出</div>
              </div>
              <div class="table-body">
                <div class="center-col" style="height: 25vh;">
                  <el-form label-position="right" label-width="100px" :model="settingVal" style="padding: 5px;">
                    <el-form-item label="程序开始时刻">
                      <el-input v-model="settingVal.useNo"></el-input>
                    </el-form-item>
                    <el-form-item label="预报吹氧量">
                      <el-input v-model="settingVal.steelNo"></el-input>
                    </el-form-item>
                    <el-form-item label="处理时间">
                      <el-input v-model="settingVal.startTm"></el-input>
                    </el-form-item>
                    <el-form-item label="镇静[C]">
                      <el-input v-model="settingVal.aimOXP"></el-input>
                    </el-form-item>
                    <el-form-item label="错误">
                      <el-input v-model="settingVal.oxyCount"></el-input>
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
            <div class="table-container" style="margin-bottom: 20px;">
              <div class="table-head">
                <div class="table-head-title">钢水处理信息</div>
              </div>
              <div class="table-body">
                <div class="center-col" style="height: 11vh;">
                  <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <div class="form-row">
                      <el-form-item label="">
                        <el-input v-model="formInline.preC" placeholder="处理前[C%]" title="处理前[C%]"></el-input>
                      </el-form-item>
                      <el-form-item label="">
                        <el-input v-model="formInline.preOXP" placeholder="处理前[OXP%]" title="处理前[OXP%]"></el-input>
                      </el-form-item>
                      <el-form-item label="">
                        <el-input v-model="formInline.targerC" placeholder="目标[C%]" title="目标[C%]"></el-input>
                      </el-form-item>
                    </div>
                    <div class="form-row">
                      <el-form-item label="">
                        <el-input v-model="formInline.steelW" placeholder="钢水重量[kg]" title="钢水重量[kg]"></el-input>
                      </el-form-item>
                      <el-form-item label="">
                        <el-input v-model="formInline.steelW" placeholder="钢水温度[℃]" title="钢水温度[℃]"></el-input>
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
            <div class="chart-wrapper chart-container">
              <LineMarker2 />
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
                    :data="tableData"
                    :header-cell-style="{textAlign: 'center'}"
                    :cell-style="{textAlign: 'center'}"
                    style="width: 100%"
                    height="80vh">
              <el-table-column
                      prop="date"
                      label="时间"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="name"
                      label="碳"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="name"
                      label="游离氧"
                      width="120">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, reactive, watch } from 'vue'
import LineMarker2 from './components/LineMarker2'
import { ElMessage } from 'element-plus'

const settingVal = reactive( { useNo : '', steelNo : '', startTm : '', aimOXP : '', oxyCount : '', setOxyCount : 1 } )
const formInline = reactive( { preC : '', preOXP : '', targerC : '', steelW : '', steelT : '' } )
const showOxySet = ref( false )
const station = ref( 'A' )

onMounted( () => {

} )

onUnmounted( () => {

} )

// 刷新按键事件
function refreBtn() {
  ElMessage( {
    message : '刷新成功',
    type : 'success',
    duration : 3 * 1000
  } )
}
// 计算按键事件
function calcBtn() {
  ElMessage( {
    message : '计算成功',
    type : 'success',
    duration : 3 * 1000
  } )
}

// 监听setOxyCount变化 reactive类型数据
watch( () => settingVal.setOxyCount,
  ( setOxyCount ) => {
    // console.log(`setOxyCount is: ${setOxyCount}`)
    // 1不吹氧  2预报量  3设定量
    if ( setOxyCount === 1 ) {
      showOxySet.value = false
      settingVal.oxyCount = 0
    } else if ( setOxyCount === 2 ) {
      showOxySet.value = false
      settingVal.oxyCount = 1
    } else if ( setOxyCount === 3 ) {
      settingVal.oxyCount = ''
      showOxySet.value = true
    }
  } )

// 监听station变化  ref类型数据
watch( station, ( newX ) => {
  // console.log(`x is ${newX}`)
  ElMessage( {
    message : `station is ${newX}`,
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
  height: calc(100vh/2 - 84px);
}
.dashboard-editor-container {
  padding: 32px 32px 0px 32px;
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
/* 表格 */
.table-container{
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
  .table-head-title{
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
.form-row{
  position: relative;
  text-align: center;
  top: 9px;
}
/* 单选工位 */
.radio{
  text-align: center;
  padding-top: 20px;
}
.btn{
  text-align: center;
  margin: 3vh 0 0 0;
}
</style>
