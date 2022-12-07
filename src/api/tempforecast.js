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
 * 获取吹氧信息
 * @param param 工位号
 * @returns {*}
 */
export function getBlowingOxygen( param ) {
  return http.request( {
    method : 'get',
    url : '/tempforecast/getBlowingOxygen',
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
    url : '/tempforecast/getAlloyInfo',
    param
  } )
}

/**
 * 获取实测温度
 * @param param 工位号
 * @returns {*}
 */
export function getActualTemp( param ) {
  return http.request( {
    method : 'get',
    url : '/tempforecast/getActualTemp',
    param
  } )
}

/**
 * 获取计划投入合金信息
 * @param param 工位号
 * @returns {*}
 */
export function getAlloyInfoOfPlan( param ) {
  return http.request( {
    method : 'get',
    url : '/tempforecast/getAlloyInfoOfPlan',
    param
  } )
}
