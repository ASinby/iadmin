/**
 * 生成随机数
 * @param n 个数
 * @param max 最大值
 * @returns {[]}
 */
const getRandomData = ( n, max ) => {
  if ( n > 1 ) {
    let result = []
    while (n-- > 0) {
      result.push( Math.floor( Math.random() * max ) )
    }
    return result
  }else if ( n === 1 ) {
    return Math.floor( Math.random() * max )
  }

  return -1
}
const getBaseInfo = () => {
  return { treatno : '1230023', stno : '', steelWeight : getRandomData( 1, 1000 ), preOxp : '', treatStartTm : '', alloyAddWeight : '', alloyAllCost : '' }
}
// 元素成分
const getElementInfo = () => {
  return [
    {
      flag : '1',
      title : '元素下限',
      cVal : 1,
      siVal : 1,
      mnVal : 1,
      pVal : 1,
      sVal : 1,
      mgVal : 1,
      crVal : 1,
      niVal : 1,
      moVal : 1,
      cuVal : 1,
      alVal : 1,
      tiVal : 1,
      vVal : 1,
      nbVal : 1,
      wVal : 1,
      bVal : 1,
      caVal : 1,
      sbVal : 1,
      asVal : 1,
      snVal : 1,
      pbVal : 1,
      biVal : 1,
      ceVal : 1
    },
    {
      flag : '2',
      title : '元素目标',
      cVal : 1,
      siVal : 1,
      mnVal : 1,
      pVal : 1,
      sVal : 1,
      mgVal : 1,
      crVal : 1,
      niVal : 1,
      moVal : 1,
      cuVal : 1,
      alVal : 1,
      tiVal : 1,
      vVal : 1,
      nbVal : 1,
      wVal : 1,
      bVal : 1,
      caVal : 1,
      sbVal : 1,
      asVal : 1,
      snVal : 1,
      pbVal : 1,
      biVal : 1,
      ceVal : 1
    },
    {
      flag : '3',
      title : '元素上限',
      cVal : 1,
      siVal : 1,
      mnVal : 1,
      pVal : 1,
      sVal : 1,
      mgVal : 1,
      crVal : 1,
      niVal : 1,
      moVal : 1,
      cuVal : 1,
      alVal : 1,
      tiVal : 1,
      vVal : 1,
      nbVal : 1,
      wVal : 1,
      bVal : 1,
      caVal : 1,
      sbVal : 1,
      asVal : 1,
      snVal : 1,
      pbVal : 1,
      biVal : 1,
      ceVal : 1
    },
    {
      flag : '4',
      title : '成分最新值',
      cVal : 1,
      siVal : 1,
      mnVal : 1,
      pVal : 1,
      sVal : 1,
      mgVal : 1,
      crVal : 1,
      niVal : 1,
      moVal : 1,
      cuVal : 1,
      alVal : 1,
      tiVal : 1,
      vVal : 1,
      nbVal : 1,
      wVal : 1,
      bVal : 1,
      caVal : 1,
      sbVal : 1,
      asVal : 1,
      snVal : 1,
      pbVal : 1,
      biVal : 1,
      ceVal : 1
    },
    {
      flag : '5',
      title : '目标调整值',
      cVal : 1,
      siVal : 1,
      mnVal : 1,
      pVal : 1,
      sVal : 1,
      mgVal : 1,
      crVal : 1,
      niVal : 1,
      moVal : 1,
      cuVal : 1,
      alVal : 1,
      tiVal : 1,
      vVal : 1,
      nbVal : 1,
      wVal : 1,
      bVal : 1,
      caVal : 1,
      sbVal : 1,
      asVal : 1,
      snVal : 1,
      pbVal : 1,
      biVal : 1,
      ceVal : 1
    },
    {
      flag : '6',
      title : '标准收得率',
      cVal : getRandomData( 1, 100 ),
      siVal : getRandomData( 1, 100 ),
      mnVal : getRandomData( 1, 100 ),
      pVal : getRandomData( 1, 100 ),
      sVal : 1,
      mgVal : 1,
      crVal : 1,
      niVal : 1,
      moVal : 1,
      cuVal : 1,
      alVal : 1,
      tiVal : 1,
      vVal : 1,
      nbVal : 1,
      wVal : 1,
      bVal : 1,
      caVal : 1,
      sbVal : 1,
      asVal : 1,
      snVal : 1,
      pbVal : 1,
      biVal : 1,
      ceVal : 1
    }
  ]
}
// 合金计算结果表单
const getAlloyCalcResult = () => {
  return [
    {
      "bunkerNo": "41101",
      "matCode": "A6034202",
      "matName": "HI",
      "matSetw": 123,
      "ifok": 1,
      "tm": "18:14",
      "treatNo": "123001",
      "matCalw": 111
    },
    {
      "bunkerNo": "41102",
      "matCode": "A6034208",
      "matName": null,
      "matSetw": null,
      "ifok": 1,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41103",
      "matCode": "A0",
      "matName": null,
      "matSetw": null,
      "ifok": 0,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41104",
      "matCode": "A0",
      "matName": null,
      "matSetw": null,
      "ifok": 0,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41105",
      "matCode": "A6060444",
      "matName": null,
      "matSetw": null,
      "ifok": 1,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41106",
      "matCode": "A6060444",
      "matName": null,
      "matSetw": null,
      "ifok": 1,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41107",
      "matCode": "A6030059",
      "matName": null,
      "matSetw": null,
      "ifok": 1,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41108",
      "matCode": "A0",
      "matName": null,
      "matSetw": null,
      "ifok": 0,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41109",
      "matCode": "A6030055",
      "matName": null,
      "matSetw": null,
      "ifok": 1,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41110",
      "matCode": "A6060575",
      "matName": null,
      "matSetw": null,
      "ifok": 1,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41111",
      "matCode": "A0",
      "matName": null,
      "matSetw": null,
      "ifok": 0,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41112",
      "matCode": "A0",
      "matName": null,
      "matSetw": null,
      "ifok": 0,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41113",
      "matCode": "A9999907",
      "matName": null,
      "matSetw": null,
      "ifok": 1,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41114",
      "matCode": "A6060444",
      "matName": null,
      "matSetw": null,
      "ifok": 1,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41115",
      "matCode": "A0",
      "matName": null,
      "matSetw": null,
      "ifok": 0,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41116",
      "matCode": "A0",
      "matName": null,
      "matSetw": null,
      "ifok": 0,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41117",
      "matCode": "A6030055",
      "matName": null,
      "matSetw": null,
      "ifok": 1,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41118",
      "matCode": "A9999907",
      "matName": null,
      "matSetw": null,
      "ifok": 1,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41119",
      "matCode": "A0",
      "matName": null,
      "matSetw": null,
      "ifok": 0,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41120",
      "matCode": "A0",
      "matName": null,
      "matSetw": null,
      "ifok": 0,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41201",
      "matCode": "A6060575",
      "matName": null,
      "matSetw": null,
      "ifok": 1,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41202",
      "matCode": "A0",
      "matName": null,
      "matSetw": null,
      "ifok": 0,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    },
    {
      "bunkerNo": "41203",
      "matCode": "A6030059",
      "matName": null,
      "matSetw": null,
      "ifok": 1,
      "tm": "18:16",
      "treatNo": "123001",
      "matCalw": null
    }
  ]
}
const updateAlloyCalcResult = () => {
  return ''
}
const updateAlNums = () => {
  return ''
}

export default [
  {
    url: '/api/alloymin/doCalc',
    type: 'post',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getBaseInfo()
      }
    }
  },
  {
    url: '/api/alloymin/getBaseInfo',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getBaseInfo()
      }
    }
  },
  {
    url: '/api/alloymin/getElementInfo',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getElementInfo()
      }
    }
  },
  {
    url: '/api/alloymin/getAlloyCalcResult',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getAlloyCalcResult()
      }
    }
  },
  {
    url: '/api/alloymin/updateElementInfo',
    type: 'post',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getElementInfo()
      }
    }
  },
  {
    url: '/api/alloymin/updateAlloyCalcResult',
    type: 'post',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getBaseInfo()
      }
    }
  },
  {
    url: '/api/alloymin/updateAlNums',
    type: 'post',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: getBaseInfo()
      }
    }
  }
]
