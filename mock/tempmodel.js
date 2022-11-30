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
  return [{
    name : '实际',
    color : 'rgb(160,114,245)',
    data : getRandomData( 12, 2000 ),
    offset0 : 'rgba(160,114,245,0.27)',
    offset1 : 'rgba(160,114,245,0)'
  },
  {
    name : '预测',
    color : 'rgb(245,237,91)',
    data : getRandomData( 12, 2000 ),
    offset0 : 'rgba(245,237,91,0.27)',
    offset1 : 'rgba(245,237,91,0)'
  }]
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