import Layout from '/@/layout/index.vue'

export default {
  path : '/rhmodel',
  component : Layout,
  name : 'RhModel',
  redirect : '/rhmodel/index',
  meta : {
    title : 'RH模型',
    icon : 'nested',
    noCache : false,
    roles : ['admin']
  },
  children : [
    {
      path : 'decarCalc',
      component : () => import( '/@/views/rhmodel/decarCalc.vue' ),
      name : 'DecarCalc',
      meta : { title : '动态脱碳计算', noCache : true }
    },
    {
      path : 'alloyMin',
      component : () => import( '/@/views/rhmodel/alloyMin.vue' ),
      name : 'AlloyMin',
      meta : { title : '合金最小化模型', noCache : true }
    },
    {
      path : 'tempForecast',
      component : () => import( '/@/views/rhmodel/tempForecast.vue' ),
      name : 'TempForecast',
      meta : { title : '模型温度预测', noCache : true }
    },
    {
      path : 'decarModel',
      component : () => import( '/@/views/rhmodel/decarModel.vue' ),
      name : 'DecarModel',
      meta : { title : '脱碳静态模型', noCache : true }
    },
    {
      path : 'tempModel',
      component : () => import( '/@/views/rhmodel/tempModel.vue' ),
      name : 'TempModel',
      meta : { title : '温度实时推定模型', noCache : true }
    }
  ]
}
