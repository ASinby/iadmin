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
 * 获取温度预测与实际值
 * @param data 工位号
 * @returns {*}
 */
export function getTempData( data ) {
  return http.request( {
    method : 'get',
    url : '/tempmodel/getTempData',
    data
  } )
}

/**
 * 获取合金信息
 * @param data 工位号
 * @returns {*}
 */
export function getAlloyInfo( data ) {
  return http.request( {
    method : 'get',
    url : '/tempmodel/getAlloyInfo',
    data
  } )
}

/**
 * 获取吹氧信息
 * @param data 工位号
 * @returns {*}
 */
export function getBlastOxyInfo( data ) {
  return http.request( {
    method : 'get',
    url : '/tempmodel/getBlastOxyInfo',
    data
  } )
}
