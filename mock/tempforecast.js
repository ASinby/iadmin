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
  return { treatNo : getRandomData( 1, 999999 ), stStatus : '', vacTankTemp : '', alloyAddWeight : '', treatStartTm : '',
    stno : '', steelWeight : '', treatSpan : '', setO2 : '', treatEndTm : '' }
}
const getOutCOxygenData = () => {
  let tabledata = []
  tm.forEach(function(value, index) {
    tabledata.push( {
      tm : value,
      cVal : getRandomData( 1, 3000 ),
      oxyVal : getRandomData( 1, 3000 )
    } )
  })
  let result = {
    tableData : tabledata,
    chartData : [{
      name : '碳',
      color : 'rgb(160,114,245)',
      data : getRandomData( 12, 2000 ),
      offset0 : 'rgba(160,114,245,0.27)',
      offset1 : 'rgba(160,114,245,0)'
    },
    {
      name : '游离氧',
      color : 'rgb(245,237,91)',
      data : getRandomData( 12, 2000 ),
      offset0 : 'rgba(245,237,91,0.27)',
      offset1 : 'rgba(245,237,91,0)'
    }]
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
        data: []
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