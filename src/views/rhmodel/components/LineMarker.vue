<template>
  <div :id="props.id" :class="props.className" :style="{ height: props.height, width: props.width }" />
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, shallowRef, onBeforeUnmount, watch } from 'vue'

// 父传子值 type有String  Number  Boolean  Array  Object  Date  Function  Symbol
const props = defineProps( {
  id : {
    type : String,
    default : 'chart'
  },
  name : {
    type : String,
    default : ''
  },
  className : {
    type : String,
    default : 'chart'
  },
  yVal : {
    type : String,
    default : ''
  },
  width : {
    type : String,
    default : '100%'
  },
  height : {
    type : String,
    default : '100%'
  },
  chartData : {
    required : true,
    type : Array,
    default : function( e ) {
      return []
    }
  },
  xAxisData : {
    required : true,
    type : Array,
    default : function( e ) {
      return []
    }
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

// const chartData = reactive( {
//   fluegas : {
//     name : '废气流量',
//     color : 'rgb(245,164,140)',
//     data : [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122],
//     offset0 : 'rgba(245,164,140,0.27)',
//     offset1 : 'rgba(245,164,140,0)'
//   },
//   CO : {
//     name : 'CO',
//     color : 'rgb(160,114,245)',
//     data : [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150],
//     offset0 : 'rgba(160,114,245,0.27)',
//     offset1 : 'rgba(160,114,245,0)'
//   },
//   CO2 : {
//     name : 'CO2',
//     color : 'rgb(245,237,91)',
//     data : [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122],
//     offset0 : 'rgba(245,237,91,0.27)',
//     offset1 : 'rgba(245,237,91,0)'
//   },
//   O2 : {
//     name : 'O2',
//     color : 'rgb(103,245,208)',
//     data : [110, 125, 145, 134, 150, 120, 110, 125, 145, 165, 122, 220],
//     offset0 : 'rgba(103,245,208,0.27)',
//     offset1 : 'rgba(103,245,208,0)'
//   },
//   time : ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
// } )
const initChart = () => {
  chart.value = echarts.init( document.getElementById( props.id ) )

  chart.value.setOption( {
    backgroundColor : '#394056',
    title : {
      top : 20,
      text : props.name,
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
    color : getColor(), /* [chartData.fluegas.color, chartData.CO.color, chartData.CO2.color, chartData.O2.color]设置legend每块数据块的颜色 */
    legend : {
      top : 20,
      icon : 'rect',
      itemWidth : 14,
      itemHeight : 5,
      itemGap : 13,
      data : getLegendData(), /* [chartData.fluegas.name, chartData.CO.name, chartData.CO2.name, chartData.O2.name] */
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
            color : '#ffffff' /* #57617B */
          }
        },
        data : props.xAxisData
      }
    ],
    yAxis : [
      {
        type : 'value',
        name : '(' + props.yVal + ')',
        axisTick : {
          show : false
        },
        axisLine : {
          lineStyle : {
            color : '#ffffff' /* #57617B */
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
    series : getSeries()
  } )
}
function getColor() {
  const colors = []
  props.chartData.forEach( item => {
    colors.push( item.color )
  } )

  return colors
}
function getLegendData() {
  const legendData = []
  props.chartData.forEach( item => {
    legendData.push( item.name )
  } )

  return legendData
}
function getSeries() {
  const series = []
  props.chartData.forEach( item => {
    series.push( {
      name : item.name,
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
            0, 0, 0, 1,
            [
              {
                offset : 0,
                color : item.offset0
              },
              {
                offset : 0.8,
                color : item.offset1
              }
            ],
            false
          ),
          shadowColor : 'rgba(0, 0, 0, 0.1)',
          shadowBlur : 10
        }
      },
      data : item.data
    } )
  } )

  return series
}

watch( () => props.chartData, ( newVal ) => {
  console.log( 'chartData of LineMarker', props.chartData )
  initChart()
} )

defineOptions( {
  name : 'LineMarker'
} )
</script>

<style scoped lang="scss"></style>
