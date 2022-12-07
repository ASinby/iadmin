import http from '/@/utils/request'

/**
 * 计算
 * @param param
 * @returns {*}
 */
export function doCalc( param ) {
  return http.request( {
    method : 'post',
    url : '/doCalc',
    param
  } )
}

/**
 * 获取炉次基本信息
 * @param param 工位号
 * @returns {*}
 */
export function getBaseInfo( param ) {
  return http.request( {
    method : 'get',
    url : '/getBaseInfo',
    param
  } )
}

/**
 * 获取碳和游离氧成分预报值
 * @param param 工位号
 * @returns {*}
 */
export function getOutCOxygen( param ) {
  return http.request( {
    method : 'get',
    url : '/decarmodel/getOutCOxygen',
    param
  } )
}

/**
 * 修改吹氧量
 * @param param
 * @returns {*}
 */
export function updateOxygenNums( param ) {
  return http.request( {
    method : 'post',
    url : '/decarmodel/updateOxygenNums',
    param
  } )
}
