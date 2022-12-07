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
 * 获取炉次信息
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
 * 获取元素信息表格数据
 * @param param 工位号
 * @returns {*}
 */
export function getElementInfo( param ) {
  return http.request( {
    method : 'get',
    url : '/alloymin/getElementInfo',
    param
  } )
}

/**
 * 获取合金计算结果表格数据
 * @param param 工位号
 * @returns {*}
 */
export function getAlloyCalcResult( param ) {
  return http.request( {
    method : 'get',
    url : '/alloymin/getAlloyCalcResult',
    param
  } )
}

/**
 * 修改元素信息
 * @param param
 * @returns {*}
 */
export function updateElementInfo( param ) {
  return http.request( {
    method : 'post',
    url : '/alloymin/updateElementInfo',
    param
  } )
}

/**
 * 修改合金计算结果
 * @param param
 * @returns {*}
 */
export function updateAlloyCalcResult( param ) {
  return http.request( {
    method : 'post',
    url : '/alloymin/updateAlloyCalcResult',
    param
  } )
}

/**
 * 修改脱氧铝/加热铝
 * @param param
 * @returns {*}
 */
export function updateAlNums( param ) {
  return http.request( {
    method : 'post',
    url : '/alloymin/updateAlNums',
    param
  } )
}
