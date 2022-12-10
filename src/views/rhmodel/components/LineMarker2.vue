<template>
  <div :id="props.id" :class="props.className" :style="{ height: props.height, width: props.width }" />
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, shallowRef, onBeforeUnmount, reactive } from 'vue'

const props = defineProps( {
  className : {
    type : String,
    default : 'chart'
  },
  id : {
    type : String,
    default : 'chart2'
  },
  width : {
    type : String,
    default : '100%'
  },
  height : {
    type : String,
    default : '100%'
  }
} )
const chart = shallowRef( null )

onMounted( () => {
  initChart()
} )
onBeforeUnmount( () => {
  if ( !chart.value ) {
    return
  }
  chart.value.dispose()
  chart.value = null
} )

const chartData = reactive( {
  fluegas : {
    name : '脱碳量',
    color : 'rgb(245,164,140)',
    data : [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122],
    offset0 : 'rgba(245,164,140,0.27)',
    offset1 : 'rgba(245,164,140,0)'
  },
  C : {
    name : 'C',
    color : 'rgb(160,114,245)',
    data : [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150],
    offset0 : 'rgba(160,114,245,0.27)',
    offset1 : 'rgba(160,114,245,0)'
  },
  time : ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
} )
const initChart = () => {
  chart.value = echarts.init( document.getElementById( props.id ) )

  chart.value.setOption( {
    backgroundColor : '#394056',
    title : {
      top : 20,
      text : '',
      textStyle : {
        fontWeight : 'normal',
        fontSize : 16,
        color : '#F1F1F3'
      },
      left : '1%'
    },
    tooltip : {
      trigger : 'axis',
      axisPointer : {
        lineStyle : {
          color : '#57617B'
        }
      }
    },
    color : [chartData.fluegas.color, chartData.C.color] /* 设置legend每块数据块的颜色 */,
    legend : {
      top : 20,
      icon : 'rect',
      itemWidth : 14,
      itemHeight : 5,
      itemGap : 13,
      data : [chartData.fluegas.name, chartData.C.name],
      right : '4%',
      textStyle : {
        fontSize : 12,
        color : '#F1F1F3'
      }
    },
    grid : {
      top : 100,
      left : '2%',
      right : '2%',
      bottom : '2%',
      containLabel : true
    },
    xAxis : [
      {
        type : 'category',
        boundaryGap : false,
        axisLine : {
          lineStyle : {
            color : '#FFFFFF' /* #57617B*/
          }
        },
        data : chartData.time
      }
    ],
    yAxis : [
      {
        type : 'value',
        name : '(ppm)',
        axisTick : {
          show : false
        },
        axisLine : {
          lineStyle : {
            color : '#FFFFFF' /* #57617B */
          }
        },
        axisLabel : {
          margin : 10,
          textStyle : {
            fontSize : 14
          }
        },
        splitLine : {
          lineStyle : {
            color : '#57617B'
          }
        }
      }
    ],
    series : [
      {
        name : chartData.fluegas.name,
        type : 'line',
        smooth : true,
        symbol : 'circle',
        symbolSize : 5,
        showSymbol : false,
        lineStyle : {
          normal : {
            width : 1
          }
        },
        areaStyle : {
          normal : {
            color : new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset : 0,
                  color : chartData.fluegas.offset0
                },
                {
                  offset : 0.8,
                  color : chartData.fluegas.offset1
                }
              ],
              false
            ),
            shadowColor : 'rgba(0, 0, 0, 0.1)',
            shadowBlur : 10
          }
        },
        /* itemStyle : {
            normal : {
              color : chartData.fluegas.color,
              borderColor : 'rgba(137,189,2,0.27)',
              borderWidth : 12
            }
          },*/
        data : chartData.fluegas.data
      },
      {
        name : chartData.C.name,
        type : 'line',
        smooth : true,
        symbol : 'circle',
        symbolSize : 5,
        showSymbol : false,
        lineStyle : {
          normal : {
            width : 1
          }
        },
        areaStyle : {
          normal : {
            color : new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset : 0,
                  color : chartData.C.offset0
                },
                {
                  offset : 0.8,
                  color : chartData.C.offset1
                }
              ],
              false
            ),
            shadowColor : 'rgba(0, 0, 0, 0.1)',
            shadowBlur : 10
          }
        },
        /* itemStyle : {
            normal : {
              color : chartData.CO.color,
              borderColor : 'rgba(0,136,212,0.2)',
              borderWidth : 12
            }
          },*/
        data : chartData.C.data
      }
    ]
  } )
}

defineOptions( {
  name : 'LineMarker'
} )
</script>

<style scoped lang="scss"></style>
