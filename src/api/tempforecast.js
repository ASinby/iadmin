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
 * 获取吹氧信息
 * @param data 工位号
 * @returns {*}
 */
export function getBlowingOxygen( data ) {
  return http.request( {
    method : 'get',
    url : '/tempforecast/getBlowingOxygen',
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
    url : '/tempforecast/getAlloyInfo',
    data
  } )
}

/**
 * 获取实测温度
 * @param data 工位号
 * @returns {*}
 */
export function getActualTemp( data ) {
  return http.request( {
    method : 'get',
    url : '/tempforecast/getActualTemp',
    data
  } )
}

/**
 * 获取计划投入合金信息
 * @param data 工位号
 * @returns {*}
 */
export function getAlloyInfoOfPlan( data ) {
  return http.request( {
    method : 'get',
    url : '/tempforecast/getAlloyInfoOfPlan',
    data
  } )
}
