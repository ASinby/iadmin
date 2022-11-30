import http from '/@/utils/request'

/**
 * 计算
 * @param param
 * @returns {*}
 */
export function doCalc( param ) {
  return http.request( {
    method : 'post',
    url : '/tempmodel/doCalc',
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
    url : '/tempmodel/getBaseInfo',
    param
  } )
}

/**
 * 获取温度预测与实际值
 * @param param 工位号
 * @returns {*}
 */
export function getTempData( param ) {
  return http.request( {
    method : 'get',
    url : '/tempmodel/getTempData',
    param
  } )
}

/**
 * 获取合金信息
 * @param param 工位号
 * @returns {*}
 */
export function getAlloyInfo( param ) {
  return http.request( {
    method : 'get',
    url : '/tempmodel/getAlloyInfo',
    param
  } )
}

/**
 * 获取吹氧信息
 * @param param 工位号
 * @returns {*}
 */
export function getBlastOxyInfo( param ) {
  return http.request( {
    method : 'get',
    url : '/tempmodel/getBlastOxyInfo',
    param
  } )
}
