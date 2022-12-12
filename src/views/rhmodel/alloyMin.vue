<template>
  <div>
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
                  <el-input v-model="baseInfo.treatno" placeholder="处理号" title="处理号"></el-input>
                </el-form-item>
                <el-form-item label="">
                  <el-input v-model="baseInfo.stno" placeholder="出钢记号" title="出钢记号"></el-input>
                </el-form-item>
                <el-form-item label="">
                  <el-input v-model="baseInfo.steelWeight" placeholder="钢水重量[Kg]" title="钢水重量[Kg]"></el-input>
                </el-form-item>
              </div>
              <div class="form-row">
                <el-form-item label="">
                  <el-input v-model="baseInfo.preOxp" placeholder="游离氧浓度[%]" title="游离氧浓度[%]"></el-input>
                </el-form-item>
                <el-form-item label="">
                  <!--<el-input v-model="baseInfo.treatStartTm" placeholder="处理开始时刻" title="处理开始时刻"></el-input>-->
                  <el-date-picker
                    v-model="baseInfo.treatStartTm"
                    type="datetime"
                    placeholder="处理开始时刻"
                    title="处理开始时刻"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="">
                  <el-input v-model="baseInfo.alloyAddWeight" placeholder="增重[吨]" title="增重[吨]"></el-input>
                </el-form-item>
                <el-form-item label="">
                  <el-input v-model="baseInfo.alloyAllCost" placeholder="合金总成本" title="合金总成本"></el-input>
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
      <el-row class="chats-container">
        <el-col :span="24">
          <div class="table-container">
            <div class="table-head">
              <div class="table-head-title">元素信息</div>
            </div>
            <div class="table-body">
              <el-table
                :data="elemComs"
                :header-cell-style="{ textAlign: 'center' }"
                :cell-style="{ textAlign: 'center' }"
                border
                style="width: 100%"
                height="35vh"
              >
                <el-table-column fixed prop="flag" label="类型" width="150">
                  <template #default="scope">
                    {{ getTitle(scope.row.flag) }}
                  </template>
                </el-table-column>
                <el-table-column
                        v-for="tableHeader in elemTableHeaders"
                        :key="tableHeader.prop"
                        :prop="tableHeader.prop"
                        :label="tableHeader.lable"
                        width="120">
                  <template #default="scope">
                    <template v-if="scope.row.edit && tableHeader.prop != 'flag'">
                      <el-input v-model="scope.row[tableHeader.prop]" class="edit-input" size="small" />
                    </template>
                    <span v-else>{{ scope.row[tableHeader.prop] }}</span>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                  <template #default="scope">
                    <template v-if="scope.row.flag > 4">
                      <el-button v-if="!scope.row.edit" @click="scope.row.edit = !scope.row.edit" type="primary" size="small">编辑</el-button>
                      <template v-else>
                        <el-button @click="handleUpdate(scope.row)" type="success" size="small">保存</el-button>
                        <el-button @click="cancelEdit(scope.row)" type="warning" size="small">取消</el-button>
                      </template>
                    </template>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row style="padding: 20px 0px 0px 0px">
        <el-col :span="24">
          <div class="table-container">
            <div class="table-head">
              <div class="table-head-title">合金计算结果</div>
              <div style="position: absolute; right: 30px; top: 4px">
                <el-form :inline="true" :model="formOfAl" class="demo-form-inline">
                  <!-- :rules="set.rules" -->
                  <el-form-item v-if="false"> -屏蔽设1；解除设0- </el-form-item>
                  <el-form-item prop="number" label="脱氧铝[kg]">
                    <el-input v-model="formOfAl.deoAl" placeholder="脱氧铝[kg]" title="脱氧铝[kg]"></el-input>
                  </el-form-item>
                  <el-form-item prop="number" label="加热铝[kg]">
                    <el-input v-model="formOfAl.heatAl" placeholder="加热铝[kg]" title="加热铝[kg]"></el-input>
                  </el-form-item>
                  <el-form-item v-if="false">
                    <el-button type="success">保存</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="table-body">
              <el-table
                :data="rowsData"
                :header-cell-style="{ textAlign: 'center' }"
                :cell-style="{ textAlign: 'center' }"
                border
                style="width: 100%"
                height="29vh"
              >
                <el-table-column
                  v-for="tableHeader in calcTableHeaders"
                  :key="tableHeader.prop"
                  :fixed="tableHeader.prop == 'rowsHeader'"
                  :prop="tableHeader.prop"
                  :label="tableHeader.lable"
                  width="150"
                >
                  <template #default="scope">
                    <template v-if="scope.row.edit && tableHeader.prop != 'rowsHeader'">
                      <!--<el-input v-model="scope.row[tableHeader.prop]" class="edit-input" size="small" />-->
                      <template v-if="scope.row.rowsHeader === '合金屏蔽'">
                        <el-switch
                                v-model="scope.row[tableHeader.prop]"
                                active-text="屏蔽"
                                inactive-text="解除"
                                :active-value="1"
                                :inactive-value="0"
                                :width="30"
                        >
                        </el-switch>
                      </template>
                      <template v-else>
                        <el-input v-model="scope.row[tableHeader.prop]" class="edit-input" size="small" />
                      </template>
                    </template>
                    <span v-else>
                      <template v-if="tableHeader.prop != 'rowsHeader' && scope.row.rowsHeader === '合金屏蔽'">
                        <el-tag :type="statusFilter(scope.row[tableHeader.prop])">{{
                          scope.row[tableHeader.prop] === 1 ? '屏蔽' : '解除'
                        }}</el-tag>
                      </template>
                      <template v-else>
                        {{ scope.row[tableHeader.prop] }}
                      </template>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                  <template #default="scope">
                    <template v-if="scope.row.rowsHeader === '合金屏蔽' || scope.row.rowsHeader === '设定量'">
                      <el-button
                        v-if="!scope.row.edit"
                        @click="scope.row.edit = !scope.row.edit"
                        type="primary"
                        size="small"
                        >编辑</el-button
                      >
                      <el-button v-if="scope.row.edit"
@click="handleUpdateOfCalc(scope.row)"
type="success"
size="small"
                        >保存</el-button
                      >
                      <el-button v-if="scope.row.edit"
@click="cancelEdit(scope.row)"
type="warning"
size="small"
                        >取消</el-button
                      >
                    </template>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { getBaseInfo, getElementInfo, getAlloyCalcResult, updateElementInfo, updateAlloyCalcResult, doCalc } from '/@/api/alloymin'

const station = ref( '1' )
// 炉次基本信息
const baseInfo = ref( {
  treatno : '123001',
  stno : '',
  steelWeight : '',
  preOxp : '',
  treatStartTm : '',
  alloyAddWeight : '',
  alloyAllCost : ''
} )
// 脱氧铝、加热铝
const formOfAl = ref( { deoAl : '', heatAl : '' } )

const elemComs = ref( [
  {
    flag : '1',
    title : '元素下限',
    cVal : 1,
    siVal : 1,
    mnVal : 1,
    pVal : 1,
    sVal : 1,
    mgVal : 1,
    crVal : 1,
    niVal : 1,
    moVal : 1,
    cuVal : 1,
    alVal : 1,
    tiVal : 1,
    vVal : 1,
    nbVal : 1,
    wVal : 1,
    bVal : 1,
    caVal : 1,
    sbVal : 1,
    asVal : 1,
    snVal : 1,
    pbVal : 1,
    biVal : 1,
    ceVal : 1
  },
  {
    flag : '2',
    title : '元素目标',
    cVal : 1,
    siVal : 1,
    mnVal : 1,
    pVal : 1,
    sVal : 1,
    mgVal : 1,
    crVal : 1,
    niVal : 1,
    moVal : 1,
    cuVal : 1,
    alVal : 1,
    tiVal : 1,
    vVal : 1,
    nbVal : 1,
    wVal : 1,
    bVal : 1,
    caVal : 1,
    sbVal : 1,
    asVal : 1,
    snVal : 1,
    pbVal : 1,
    biVal : 1,
    ceVal : 1
  },
  {
    flag : '3',
    title : '元素上限',
    cVal : 1,
    siVal : 1,
    mnVal : 1,
    pVal : 1,
    sVal : 1,
    mgVal : 1,
    crVal : 1,
    niVal : 1,
    moVal : 1,
    cuVal : 1,
    alVal : 1,
    tiVal : 1,
    vVal : 1,
    nbVal : 1,
    wVal : 1,
    bVal : 1,
    caVal : 1,
    sbVal : 1,
    asVal : 1,
    snVal : 1,
    pbVal : 1,
    biVal : 1,
    ceVal : 1
  },
  {
    flag : '4',
    title : '成分最新值',
    cVal : 1,
    siVal : 1,
    mnVal : 1,
    pVal : 1,
    sVal : 1,
    mgVal : 1,
    crVal : 1,
    niVal : 1,
    moVal : 1,
    cuVal : 1,
    alVal : 1,
    tiVal : 1,
    vVal : 1,
    nbVal : 1,
    wVal : 1,
    bVal : 1,
    caVal : 1,
    sbVal : 1,
    asVal : 1,
    snVal : 1,
    pbVal : 1,
    biVal : 1,
    ceVal : 1
  },
  {
    flag : '5',
    title : '目标调整值',
    cVal : 1,
    siVal : 1,
    mnVal : 1,
    pVal : 1,
    sVal : 1,
    mgVal : 1,
    crVal : 1,
    niVal : 1,
    moVal : 1,
    cuVal : 1,
    alVal : 1,
    tiVal : 1,
    vVal : 1,
    nbVal : 1,
    wVal : 1,
    bVal : 1,
    caVal : 1,
    sbVal : 1,
    asVal : 1,
    snVal : 1,
    pbVal : 1,
    biVal : 1,
    ceVal : 1
  },
  {
    flag : '6',
    title : '标准收得率',
    cVal : 1,
    siVal : 1,
    mnVal : 1,
    pVal : 1,
    sVal : 1,
    mgVal : 1,
    crVal : 1,
    niVal : 1,
    moVal : 1,
    cuVal : 1,
    alVal : 1,
    tiVal : 1,
    vVal : 1,
    nbVal : 1,
    wVal : 1,
    bVal : 1,
    caVal : 1,
    sbVal : 1,
    asVal : 1,
    snVal : 1,
    pbVal : 1,
    biVal : 1,
    ceVal : 1
  }
] )
const elemTableHeaders = ref( [] )

const calcResult = ref( [] )
// 表头
const calcTableHeaders = ref( [] )
// 行数据
const rowsData = ref( [] )
onMounted( () => {
  init()
} )

function init() {
  const param = {
    station1 : station.value
  }
  refreBaseInfo( param )
  refreElementInfo( param )
  refreAlloyCalcResult( param )
}

watch( station, newX => {
  init()
  ElMessage( {
    message : '刷新成功！',
    type : 'success',
    duration : 2 * 1000
  } )
} )
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
// 获取基本信息
async function refreBaseInfo( param ) {
  const { data } = await getBaseInfo( param )
  baseInfo.value = { data }.data
}
async function refreElementInfo( param ) {
  const { data } = await getElementInfo( param )
  const items = { data }.data

  elemComs.value = items.map( v => {
    return {
      ...v,
      edit : false,
      oldRow : v
    }
  } )
  console.log( elemComs.value )
  getElemHeaders()
}
function getElemHeaders() {
  const tempHeaders = []

  console.log( elemComs.value.length )
  console.log( elemComs.value[0] )
  if ( elemComs.value.length > 0 ) {
    for ( const key in elemComs.value[0] ) {
      let label = key

      if ( label.indexOf( 'val' ) == -1 && label.indexOf( 'Val' ) == -1 ) {
        continue
      }

      // 将 val 或者 Val 替换成 "" , 获取元素名
      const regExp = /val|Val/g
      label = label.replace( regExp, '' )

      // 将元素名首字母大写
      const character = [...label]
      character[0] = character[0].toUpperCase()
      label = character.join( '' )

      tempHeaders.push( {
        prop : key,
        lable : label
      } )
    }
  }
  console.log( 'headers', tempHeaders )
  elemTableHeaders.value = tempHeaders
}
async function refreAlloyCalcResult( param ) {
  const { data } = await getAlloyCalcResult( param )
  calcResult.value = { data }.data
  rowColChange()
}
// 行列置换
function rowColChange() {
  // 行头 列
  const rowsHeaders = [
    { colKey : 'matName', rowName : '合金牌名' },
    { colKey : 'ifok', rowName : '合金屏蔽' },
    { colKey : 'matSetw', rowName : '设定量' },
    { colKey : 'matCalw', rowName : '计算量' }
  ]
  // 1、将 料仓号 作为表头
  const tempHeader = []
  tempHeader.push( {
    prop : 'rowsHeader',
    lable : '料仓号'
  } )
  calcResult.value.forEach( function( value, index ) {
    tempHeader.push( {
      prop : value.bunkerNo,
      lable : value.bunkerNo
    } )
  } )
  calcTableHeaders.value = tempHeader

  // 2、获取行数据
  const tempRows = []
  rowsHeaders.forEach( function( map, n ) {
    const tempRow = {}
    // 设置行头
    tempRow[tempHeader[0].prop] = map.rowName
    calcResult.value.forEach( function( value, index ) {
      tempRow[value.bunkerNo] = value[map.colKey]
      tempRow.treatNo = value.treatNo
    } )
    tempRow.fieldName = map.colKey
    tempRows.push( tempRow )
  } )
  // console.log( tempRows )
  // 出现套娃了！！！
  // rowsData.value = tempRows
  rowsData.value = tempRows.map( v => {
    return {
      ...v,
      edit : false,
      oldRow : v
    }
  } )
}
// 修改合金信息
async function handleUpdate( row ) {
  try {
    const { data } = await updateElementInfo( row )
    elemComs.value = { data }.data
    ElMessage( {
      message : '修改成功',
      type : 'success',
      duration : 3 * 1000
    } )
  } catch ( e ) {
  } finally {
  }
}
// 取消编辑——回复数据  合金计算结果
const cancelEdit = row => {
  const tt = row.oldRow

  // 解决取消编辑 无法恢复数据问题
  for ( const key in tt ) {
    row[key] = tt[key]
  }
  row.edit = false
}
// 屏蔽/解除
const statusFilter = status => {
  const statusMap = {
    1 : 'danger',
    0 : 'success'
  }
  return statusMap[status]
}
// 修改合金计算结果
async function handleUpdateOfCalc( row ) {
  console.log( row )
  await updateAlloyCalcResult( row )
  ElMessage( {
    message : '修改成功',
    type : 'success',
    duration : 3 * 1000
  } )
  row.edit = false
  // 刷新
  const param = {
    station1 : station.value
  }
  refreAlloyCalcResult( param )
}
// 行类型
function getTitle( flag ) {
  const title = ['元素下限', '元素目标', '元素上限', '成分最新', '目标调整', '标准收得率']
  return title[flag - 1]
}
defineOptions( {
  name : 'alloyMin'
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
/* 弹窗 */
.dialog-footer {
  text-align: right;
}
/*  */
.yu-layout {
  .header {
    display: none !important;
  }
}
</style>
