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
  return { treatNo : getRandomData( 1, 9999999 ), stStatus : '', vacTankTemp : '', vacTankAlAdd : '', treatStartTm : '', stno : '', steelWeight : getRandomData( 1, 250 ), treatSpan : '', vacTankTempAdd : '', treatEndTm : '' }
}
const getTempData = () => {
  let result = []
  let tms = ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']

  tms.forEach( function( value, index ) {
    result.push( {
      id : value,
      tempPre : getRandomData( 1, 500 ),
      tempAct : getRandomData( 1, 500 )
    } )
  } )

  return result
}
const getAlloyInfo = () => {
  // { matCode : '1', matType : '', matName : '', matAmount : '', manualFlag : '' }
  let result = []
  let rowsnum = getRandomData( 1, 50 )
  while ( rowsnum-- > 0 ) {
    result.push( { matCode : getRandomData( 1, 99999 ), matType : '', matName : '', matAmount : getRandomData( 1, 500 ), manualFlag : '' } )
  }
  return result
}
export default [
  {
    url: '/api/tempmodel/doCalc',
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
    url: '/api/tempmodel/getBaseInfo',
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
    url: '/api/tempmodel/getTempData',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getTempData()
      }
    }
  },
  {
    url: '/api/tempmodel/getAlloyInfo',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getAlloyInfo()
      }
    }
  },
  {
    url: '/api/tempmodel/getBlastOxyInfo',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: ''
      }
    }
  }
]
