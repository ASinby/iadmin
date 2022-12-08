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
 * 获取动态模型输入量与设定值
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
 * 获取废气流量折线图数据
 * @param data 工位号
 * @returns {*}
 */
export function getChart1Data( data ) {
  return http.request( {
    method : 'get',
    url : '/decarcalc/getGasFlowRate',
    data
  } )
}

/**
 * 获取脱碳量折线图数据
 * @param data 工位号
 * @returns {*}
 */
export function getChart2Data( data ) {
  return http.request( {
    method : 'get',
    url : '/decarcalc/getOutCoxy',
    data
  } )
}
