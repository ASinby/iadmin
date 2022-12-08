import http from '/@/utils/request'

/**
 * 计算
 * @param data
 * @returns {*}
 */
export function doCalc( data ) {
  return http.request( {
    method : 'put',
    url : '/doCalc',
    data
  } )
}

/**
 * 获取炉次基本信息
 * @param data 工位号
 * @returns {*}
 */
export function getBaseInfo( data ) {
  return http.request( {
    method : 'get',
    url : '/getBaseInfo',
    data
  } )
}

/**
 * 获取碳和游离氧成分预报值
 * @param data 工位号
 * @returns {*}
 */
export function getOutCOxygen( data ) {
  return http.request( {
    method : 'get',
    url : '/decarmodel/getOutCOxygen',
    data
  } )
}

/**
 * 修改吹氧量
 * @param data
 * @returns {*}
 */
export function updateOxygenNums( data ) {
  return http.request( {
    method : 'post',
    url : '/decarmodel/updateOxygenNums',
    data
  } )
}
