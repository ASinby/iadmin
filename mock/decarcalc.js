const getRandomData = () => {
  let nums = 12
  let result = []
  while (nums-- > 0) {
    result.push( Math.floor( Math.random()*1000 ) )
  }
  return result
}

const getChart1Data = () => {
  return [{
    name : 'CO',
    color : 'rgb(160,114,245)',
    data : getRandomData(),
    xData : ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55'],
    offset0 : 'rgba(160,114,245,0.27)',
    offset1 : 'rgba(160,114,245,0)'
  },
    {
      name : 'CO2',
      color : 'rgb(245,237,91)',
      data : getRandomData(),
      xData : ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55'],
      offset0 : 'rgba(245,237,91,0.27)',
      offset1 : 'rgba(245,237,91,0)'
    },
    {
      name : 'O2',
      color : 'rgb(103,245,208)',
      data : getRandomData(),
      xData : ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55'],
      offset0 : 'rgba(103,245,208,0.27)',
      offset1 : 'rgba(103,245,208,0.1)'
    }]
}
const getChart2Data = () => {
  return [{
    name : 'C',
    color : 'rgb(160,114,245)',
    data : getRandomData(),
    xData : ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55'],
    offset0 : 'rgba(160,114,245,0.27)',
    offset1 : 'rgba(160,114,245,0)'
  }]
}
const getSettingVal = () => {
  return { treatNo : '123456', treatStartTm : '', steelWeight : '', preC : '', aimCUpper : '',
    aimCFloor : '', aimC : '', duringCTm : '', duringC : '', steelTemp : '', oxyVal : '', errorMsg : '' }
}

export default [
  {
    url: '/api/decarcalc/doCalc',
    type: 'post',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getSettingVal()
      }
    }
  },
  {
    url: '/api/decarcalc/getChart1Data',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getChart1Data()
      }
    }
  },
  {
    url: '/api/decarcalc/getChart2Data',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getChart2Data()
      }
    }
  },
  {
    url: '/api/decarcalc/getSettingVal',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getSettingVal()
      }
    }
  }
]