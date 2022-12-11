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
// 时间
const tm = ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
const getBaseInfo = () => {
  return { treatno : getRandomData( 1, 999999 ), stStatus : '', vacTankTemp : '', alloyAddWeight : '', treatStartTm : '',
    stno : '', steelWeight : '', treatSpan : '', setO2 : '', treatEndTm : '' }
}
const getAlloyInfoData = () => {
  let result = []
  let rowsnum = getRandomData( 1, 100 )
  while( rowsnum-- > 0 ) {
    result.push( { matCode : getRandomData( 1, 200 ), matType : '', matName : '', matAmount : getRandomData( 1, 2000 ), manualFlag : '' } )
  }

  return result
}
export default [
  {
    url: '/api/tempforecast/doCalc',
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
    url: '/api/tempforecast/getBaseInfo',
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
    url: '/api/tempforecast/getBlowingOxygen',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: []
      }
    }
  },
  {
    url: '/api/tempforecast/getAlloyInfo',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getAlloyInfoData()
      }
    }
  },
  {
    url: '/api/tempforecast/getActualTemp',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: []
      }
    }
  },
  {
    url: '/api/tempforecast/getAlloyInfoOfPlan',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: []
      }
    }
  }
]
