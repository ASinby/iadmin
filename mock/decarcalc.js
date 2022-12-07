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

const getChart1Data = () => {
  let result = []
  let tms = ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']

  tms.forEach( function( value, index ) {
    result.push( {
      tm : value,
      co : getRandomData( 1, 500 ),
      co2 : getRandomData( 1, 500 ),
      o2 : getRandomData( 1, 500 )
    } )
  } )

  return result
}
const getChart2Data = () => {
  let result = []
  let tms = ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']

  tms.forEach( function( value, index ) {
    result.push( {
      tm : value,
      cVal : getRandomData( 1, 500 )
    } )
  } )

  return result
}
const getBaseInfo = () => {
  return { treatNo : getRandomData( 1, 999999 ), treatStartTm : '', steelWeight : '', preC : '', aimCUpper : '',
    aimCFloor : '', aimC : '', duringCTm : '', duringC : '', steelTemp : '', oxyVal : '', errorMsg : '' }
}

export default [
  {
    url: '/api/decarcalc/doCalc',
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
    url: '/api/decarcalc/getGasFlowRate',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getChart1Data()
      }
    }
  },
  {
    url: '/api/decarcalc/getOutCoxy',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getChart2Data()
      }
    }
  },
  {
    url: '/api/decarcalc/getBaseInfo',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getBaseInfo()
      }
    }
  }
]
