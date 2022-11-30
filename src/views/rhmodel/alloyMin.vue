<template>
  <div class="dashboard-editor-container">
    <el-row style="padding: 0px 0px 20px 0px;">
      <el-col :xs="3" :sm="3" :lg="3">
        <div class="city-selected-head">
          <div class="radio">
            <el-radio v-model="station" label="A">A工位</el-radio>
            <el-radio v-model="station" label="B">B工位</el-radio>
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
                <el-input v-model="baseInfo.treatStartTm" placeholder="处理开始时刻" title="处理开始时刻"></el-input>
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
                    :header-cell-style="{textAlign: 'center'}"
                    :cell-style="{textAlign: 'center'}"
                    border
                    style="width: 100%"
                    height="35vh">
              <el-table-column
                      fixed
                      prop="title"
                      label="元素名称"
                      width="150">
              </el-table-column>
              <el-table-column
                      prop="cVal"
                      label="C"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="siVal"
                      label="Si"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="mnVal"
                      label="Mn"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="pVal"
                      label="P"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="sVal"
                      label="S"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="mgVal"
                      label="Mg"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="crVal"
                      label="Cr"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="niVal"
                      label="Ni"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="moVal"
                      label="Mo"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="cuVal"
                      label="Cu"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="alVal"
                      label="Al"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="tiVal"
                      label="Ti"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="vVal"
                      label="V"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="nbVal"
                      label="Nb"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="wVal"
                      label="W"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="bVal"
                      label="B"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="caVal"
                      label="Ca"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="sbVal"
                      label="Sb"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="asVal"
                      label="As"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="snVal"
                      label="Sn"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="pbVal"
                      label="Pb"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="biVal"
                      label="Bi"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="ceVal"
                      label="Ce"
                      width="120">
              </el-table-column>
              <el-table-column
                      fixed="right"
                      label="操作"
                      width="100">
                <template #default="scope">
                  <template v-if="scope.row.flag>4">
                    <el-button @click="handleUpdate(scope.row)" type="text" size="small">编辑</el-button>
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="padding: 20px 0px 0px 0px;">
      <el-col :span="24">
        <div class="table-container">
          <div class="table-head">
            <div class="table-head-title">合金计算结果</div>
            <div style="position: absolute;right: 30px;top: 4px;">
              <el-form :inline="true" :model="formOfAl" class="demo-form-inline" :rules="set.rules">
                <el-form-item>
                  -屏蔽设1；解除设0-
                </el-form-item>
                <el-form-item prop="number" label="脱氧铝[kg]">
                  <el-input v-model="formOfAl.deoAl" placeholder="脱氧铝[kg]" title="脱氧铝[kg]"></el-input>
                </el-form-item>
                <el-form-item prop="number" label="加热铝[kg]">
                  <el-input v-model="formOfAl.heatAl" placeholder="加热铝[kg]" title="加热铝[kg]"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="table-body">
            <el-table
                    :data="calcResult"
                    :header-cell-style="{textAlign: 'center'}"
                    :cell-style="{textAlign: 'center'}"
                    style="width: 100%"
                    height="29vh">
              <!--<el-table-column
                      prop="date"
                      label="时间"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="name"
                      label="温度"
                      width="120">
              </el-table-column>-->
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

  <el-dialog :title="dialogTitle" v-model="dialogFormVisible" width="60%">
    <el-form :inline="true" :ref="dataForm" :model="dialogData" label-widht="100px" :rules="set.rules">
      <div class="form-row">
        <el-form-item prop="cVal" label="C">
          <el-input v-model="dialogData.cVal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="siVal" label="Si">
          <el-input v-model="dialogData.siVal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="mnVal" label="Mn">
          <el-input v-model="dialogData.mnVal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="pVal" label="P">
          <el-input v-model="dialogData.pVal" placeholder=""></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item prop="sVal" label="S">
          <el-input v-model="dialogData.sVal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="mgVal" label="Mg">
          <el-input v-model="dialogData.mgVal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="crVal" label="Cr">
          <el-input v-model="dialogData.crVal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="niVal" label="Ni">
          <el-input v-model="dialogData.niVal" placeholder=""></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item prop="moVal" label="Mo">
          <el-input v-model="dialogData.moVal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="cuVal" label="Cu">
          <el-input v-model="dialogData.cuVal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="alVal" label="Al">
          <el-input v-model="dialogData.alVal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="tiVal" label="Ti">
          <el-input v-model="dialogData.tiVal" placeholder=""></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item prop="vVal" label="V">
          <el-input v-model="dialogData.vVal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="nbVal" label="Nb">
          <el-input v-model="dialogData.nbVal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="wVal" label="W">
          <el-input v-model="dialogData.wVal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="bVal" label="B">
          <el-input v-model="dialogData.bVal" placeholder=""></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item prop="caVal" label="Ca">
          <el-input v-model="dialogData.caVal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="sbVal" label="Sb">
          <el-input v-model="dialogData.sbVal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="asVal" label="As">
          <el-input v-model="dialogData.asVal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="snVal" label="Sn">
          <el-input v-model="dialogData.snVal" placeholder=""></el-input>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item prop="pbVal" label="Pb">
          <el-input v-model="dialogData.pbVal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="biVal" label="Bi">
          <el-input v-model="dialogData.biVal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="ceVal" label="Ce">
          <el-input v-model="dialogData.ceVal" placeholder=""></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="dialog-footer">
      <el-button @click="hideDialog">取 消</el-button>
      <el-button type="primary" @click="updateData">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { getBaseInfo, getElementInfo, getAlloyCalcResult, updateElementInfo } from '/@/api/alloymin'

// 配置
const set = reactive( {
  rules : {
    cVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    siVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    mnVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    pVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    sVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    mgVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    crVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    niVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    moVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    cuVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    alVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    tiVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    vVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    nbVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    wVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    bVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    caVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    sbVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    asVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    snVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    pbVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    biVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ],
    ceVal : [
      { required : true, message : '不可为空', trigger : 'blur' },
      { type : 'number', message : '必须为数字值', trigger : 'change' }
    ]
  }
} )
// 工位点
const station = ref( 'A' )
// const elemName = { cVal : 'C', siVal : 'Si', mnVal : 'Mn', pVal : 'P', sVal : 'S', mgVal : 'Mg', crVal : 'Cr', niVal : 'Ni', moVal : 'Mo', cuVal : 'Cu', alVal : 'Al',
//   tiVal : 'Ti', vVal  : 'V', nbVal : 'Nb', wVal  : 'W', bVal  : 'B', caVal : 'Ca', sbVal : 'Sb', asVal : 'As', snVal : 'Sn', pbVal : 'Pb', biVal : 'Bi', ceVal : 'Ce' }
// 炉次基本信息
const baseInfo = ref( { treatNo : '123001', stno : '', steelWeight : '', preOxp : '', treatStartTm : '', alloyAddWeight : '', alloyAllCost : '' } )
// 脱氧铝、加热铝
const formOfAl = ref( { deoAl : '', heatAl : '' } )
// 弹窗是否显示标志 元素
const dialogFormVisible = ref( false )
// 弹窗标题
const dialogTitle = ref( '' )

const dataForm = ref( null )
const dialogData = ref( {
  flag : '1',
  title : '',
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
} )
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
const calcResult = ref( [] )
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

// 隐藏弹窗
const hideDialog = () => {
  dialogFormVisible.value = false
}

watch( station, ( newX ) => {
  init()
  ElMessage( {
    message : `station is ${newX}`,
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
function calcBtn() {
  ElMessage( {
    message : '计算成功',
    type : 'success',
    duration : 3 * 1000
  } )
}
// 获取基本信息
async function refreBaseInfo( param ) {
  const { data } = await getBaseInfo( { param } )
  baseInfo.value = { data }.data
}
async function refreElementInfo( param ) {
  const { data } = await getElementInfo( { param } )
  elemComs.value = { data }.data
}
async function refreAlloyCalcResult( param ) {
  const { data } = await getAlloyCalcResult( { param } )
  calcResult.value = { data }.data
}

// 查看行数据
function handleUpdate( row ) {
  console.log( row )
  dialogData.value = row
  dialogTitle.value = row.title
  dialogFormVisible.value = true
  nextTick( () => {
    dataForm.value && dataForm.value.clearValidate()
  } )
}
// 修改合金信息
async function updateData() {
  const param = {
    station1 : station.value,
    elemData : dialogData.value
  }
  const { data } = await updateElementInfo( { param } )
  console.log( { data } )
  elemComs.value = { data }.data
}
defineOptions( {
  name : 'alloyMin'
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
/* 弹窗 */
.dialog-footer{
  text-align: right;
}
</style>
