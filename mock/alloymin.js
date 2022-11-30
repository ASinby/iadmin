/**
 * 生成随机数
 * @param n 个数
 * @param max 最大值
 * @returns {[]}
 */
const getRandomData = ( n, max ) => {
  if ( n > 1 ) {
    let result = []
    while (n-- > 0) {
      result.push( Math.floor( Math.random() * max ) )
    }
    return result
  }else if ( n === 1 ) {
    return Math.floor( Math.random() * max )
  }
  
  return -1
}
const getBaseInfo = () => {
  return { treatNo : '1230023', stno : '', steelWeight : getRandomData( 1, 1000 ), preOxp : '', treatStartTm : '', alloyAddWeight : '', alloyAllCost : '' }
}
const getElementInfo = () => {
  return [
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
      cVal : getRandomData( 1, 100 ),
      siVal : getRandomData( 1, 100 ),
      mnVal : getRandomData( 1, 100 ),
      pVal : getRandomData( 1, 100 ),
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
  ]
}
const updateAlloyCalcResult = () => {
  return ''
}
const updateAlNums = () => {
  return ''
}

export default [
  {
    url: '/api/alloymin/doCalc',
    type: 'post',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getBaseInfo()
      }
    }
  },
  {
    url: '/api/alloymin/getBaseInfo',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getBaseInfo()
      }
    }
  },
  {
    url: '/api/alloymin/getElementInfo',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getElementInfo()
      }
    }
  },
  {
    url: '/api/alloymin/getAlloyCalcResult',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getElementInfo()
      }
    }
  },
  {
    url: '/api/alloymin/updateElementInfo',
    type: 'post',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getElementInfo()
      }
    }
  },
  {
    url: '/api/alloymin/updateAlloyCalcResult',
    type: 'post',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getBaseInfo()
      }
    }
  },
  {
    url: '/api/alloymin/updateAlNums',
    type: 'post',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getBaseInfo()
      }
    }
  }
]