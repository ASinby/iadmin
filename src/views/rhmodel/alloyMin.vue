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
                <el-table-column prop="cval" label="C" width="120"> </el-table-column>
                <el-table-column prop="siVal" label="Si" width="120"> </el-table-column>
                <el-table-column prop="mnVal" label="Mn" width="120"> </el-table-column>
                <el-table-column prop="pval" label="P" width="120"> </el-table-column>
                <el-table-column prop="sval" label="S" width="120"> </el-table-column>
                <el-table-column prop="mgVal" label="Mg" width="120"> </el-table-column>
                <el-table-column prop="crVal" label="Cr" width="120"> </el-table-column>
                <el-table-column prop="niVal" label="Ni" width="120"> </el-table-column>
                <el-table-column prop="moVal" label="Mo" width="120"> </el-table-column>
                <el-table-column prop="cuVal" label="Cu" width="120"> </el-table-column>
                <el-table-column prop="alVal" label="Al" width="120"> </el-table-column>
                <el-table-column prop="tiVal" label="Ti" width="120"> </el-table-column>
                <el-table-column prop="vval" label="V" width="120"> </el-table-column>
                <el-table-column prop="nbVal" label="Nb" width="120"> </el-table-column>
                <el-table-column prop="wval" label="W" width="120"> </el-table-column>
                <el-table-column prop="bval" label="B" width="120"> </el-table-column>
                <el-table-column prop="caVal" label="Ca" width="120"> </el-table-column>
                <el-table-column prop="sbVal" label="Sb" width="120"> </el-table-column>
                <el-table-column prop="asVal" label="As" width="120"> </el-table-column>
                <el-table-column prop="snVal" label="Sn" width="120"> </el-table-column>
                <el-table-column prop="pbVal" label="Pb" width="120"> </el-table-column>
                <el-table-column prop="biVal" label="Bi" width="120"> </el-table-column>
                <el-table-column prop="ceVal" label="Ce" width="120"> </el-table-column>
                <el-table-column prop="coVal" label="Co" width="120"> </el-table-column>
                <el-table-column prop="nval" label="N" width="120"> </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template #default="scope">
                    <template v-if="scope.row.flag > 4">
                      <el-button @click="handleUpdate(scope.row)" type="text" size="small">编辑</el-button>
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
                  <el-form-item> -屏蔽设1；解除设0- </el-form-item>
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
                  v-for="tableHeader in tableHeaders"
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
                        type="text"
                        size="small"
                        >编辑</el-button
                      >
                      <el-button v-if="scope.row.edit"
@click="handleUpdateOfCalc(scope.row)"
type="text"
size="small"
                        >保存</el-button
                      >
                      <el-button v-if="scope.row.edit"
@click="cancelEdit(scope.row)"
type="text"
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

    <el-dialog :title="dialogTitle" v-model="dialogFormVisible" width="60%">
      <el-form :inline="true" :ref="dataForm" :model="dialogData" label-widht="100px">
        <!-- :rules="set.rules" -->
        <div class="form-row">
          <el-form-item prop="cVal" label="C">
            <el-input v-model="dialogData.cval" placeholder=""></el-input>
          </el-form-item>
          <el-form-item prop="siVal" label="Si">
            <el-input v-model="dialogData.siVal" placeholder=""></el-input>
          </el-form-item>
          <el-form-item prop="mnVal" label="Mn">
            <el-input v-model="dialogData.mnVal" placeholder=""></el-input>
          </el-form-item>
          <el-form-item prop="pVal" label="P">
            <el-input v-model="dialogData.pval" placeholder=""></el-input>
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item prop="sVal" label="S">
            <el-input v-model="dialogData.sval" placeholder=""></el-input>
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
            <el-input v-model="dialogData.vval" placeholder=""></el-input>
          </el-form-item>
          <el-form-item prop="nbVal" label="Nb">
            <el-input v-model="dialogData.nbVal" placeholder=""></el-input>
          </el-form-item>
          <el-form-item prop="wVal" label="W">
            <el-input v-model="dialogData.wval" placeholder=""></el-input>
          </el-form-item>
          <el-form-item prop="bVal" label="B">
            <el-input v-model="dialogData.bval" placeholder=""></el-input>
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
          <el-form-item prop="coVal" label="Co">
            <el-input v-model="dialogData.coVal" placeholder=""></el-input>
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item prop="nval" label="N">
            <el-input v-model="dialogData.nval" placeholder=""></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="hideDialog">取 消</el-button>
        <el-button type="primary" @click="updateData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { getBaseInfo, getElementInfo, getAlloyCalcResult, updateElementInfo, doCalc } from '/@/api/alloymin'

// 配置
// const set = reactive( {
//   rules : {
//     cVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     siVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     mnVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     pVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     sVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     mgVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     crVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     niVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     moVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     cuVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     alVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     tiVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     vVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     nbVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     wVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     bVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     caVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     sbVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     asVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     snVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     pbVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     biVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ],
//     ceVal : [
//       { required : true, message : '不可为空', trigger : 'blur' },
//       { type : 'number', message : '必须为数字值', trigger : 'change' }
//     ]
//   }
// } )
// 工位点
const station = ref( '1' )
// const elemName = { cVal : 'C', siVal : 'Si', mnVal : 'Mn', pVal : 'P', sVal : 'S', mgVal : 'Mg', crVal : 'Cr', niVal : 'Ni', moVal : 'Mo', cuVal : 'Cu', alVal : 'Al',
//   tiVal : 'Ti', vVal  : 'V', nbVal : 'Nb', wVal  : 'W', bVal  : 'B', caVal : 'Ca', sbVal : 'Sb', asVal : 'As', snVal : 'Sn', pbVal : 'Pb', biVal : 'Bi', ceVal : 'Ce' }
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
// 表头
const tableHeaders = ref( [] )
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

// 隐藏弹窗
const hideDialog = () => {
  dialogFormVisible.value = false
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
  elemComs.value = { data }.data
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
  tableHeaders.value = tempHeader

  // 2、获取行数据
  const tempRows = []
  rowsHeaders.forEach( function( map, n ) {
    const tempRow = {}
    // 设置行头
    tempRow[tempHeader[0].prop] = map.rowName
    calcResult.value.forEach( function( value, index ) {
      tempRow[value.bunkerNo] = value[map.colKey]
    } )
    // 出现套娃了！！！
    // tempRow.oldRow = tempRow
    // 默认不可编辑
    // tempRow.edit = false
    tempRows.push( tempRow )
  } )
  console.log( tempRows )
  // 出现套娃了！！！
  // rowsData.value = tempRows
  rowsData.value = tempRows.map( v => {
    return {
      ...v,
      edit : false,
      oldRow : v
    }
  } )
  console.log( rowsData.value )
}
// 查看行数据  合金信息
function handleUpdate( row ) {
  // console.log( row )
  dialogData.value = row
  dialogTitle.value = row.title
  dialogFormVisible.value = true
  nextTick( () => {
    dataForm.value && dataForm.value.clearValidate()
  } )
}
// 修改合金信息
async function updateData() {
  // console.log( dialogData.value )
  try {
    const { data } = await updateElementInfo( dialogData.value )
    elemComs.value = { data }.data
    dialogFormVisible.value = false
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
  console.log( '1', row )
  // 此处 无法正常取消 问题 ？？？
  row = row.oldRow
  console.log( '2', row )
  row.edit = false
  console.log( '3', row )
}
// 屏蔽/解除
const statusFilter = status => {
  const statusMap = {
    1 : 'danger',
    0 : 'success'
  }
  return statusMap[status]
}
// 查看行数据  合金计算结果
function handleUpdateOfCalc( row ) {
  console.log( row )
  ElMessage( {
    message : '暂无开发完成，稍后再试。',
    type : 'info',
    duration : 3 * 1000
  } )
  // dialogData.value = row
  // dialogTitle.value = row.title
  // dialogFormVisible.value = true
  // nextTick( () => {
  //   dataForm.value && dataForm.value.clearValidate()
  // } )
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
