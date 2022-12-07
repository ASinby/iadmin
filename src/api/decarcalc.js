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
 * 获取动态模型输入量与设定值
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
 * 获取废气流量折线图数据
 * @param param 工位号
 * @returns {*}
 */
export function getChart1Data( param ) {
  return http.request( {
    method : 'get',
    url : '/decarcalc/getGasFlowRate',
    param
  } )
}

/**
 * 获取脱碳量折线图数据
 * @param param 工位号
 * @returns {*}
 */
export function getChart2Data( param ) {
  return http.request( {
    method : 'get',
    url : '/decarcalc/getOutCoxy',
    param
  } )
}
