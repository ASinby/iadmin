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
 * 获取炉次信息
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
 * 获取元素信息表格数据
 * @param data 工位号
 * @returns {*}
 */
export function getElementInfo( data ) {
  return http.request( {
    method : 'get',
    url : '/alloymin/getElementInfo',
    data
  } )
}

/**
 * 获取合金计算结果表格数据
 * @param data 工位号
 * @returns {*}
 */
export function getAlloyCalcResult( data ) {
  return http.request( {
    method : 'get',
    url : '/alloymin/getAlloyCalcResult',
    data
  } )
}

/**
 * 修改元素信息
 * @param data
 * @returns {*}
 */
export function updateElementInfo( data ) {
  return http.request( {
    method : 'put',
    url : '/alloymin/updateElementInfo',
    data
  } )
}

/**
 * 修改合金计算结果
 * @param data
 * @returns {*}
 */
export function updateAlloyCalcResult( data ) {
  return http.request( {
    method : 'put',
    url : '/alloymin/updateAlloyCalcResult',
    data
  } )
}

/**
 * 修改脱氧铝/加热铝
 * @param data
 * @returns {*}
 */
export function updateAlNums( data ) {
  return http.request( {
    method : 'put',
    url : '/alloymin/updateAlNums',
    data
  } )
}
