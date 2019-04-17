import axios from 'axios'

export const getWedHalfList = async (pageIndex, pageSize) => {
  try {
    const data = await axios.get('/yummy-portal/JSONServer/execute.do', {
      params: {
        syshead: {
          "trans_code": "SI_PRD0020",
          pageIndex,
          pageSize,
          "chnlId": "01"
        },
        body: {
          "labelId": "03",
          "parmName": "WEDNESDAY",
          "cityNo": "25",
          "moduleTypeIds": "1"
        }
      }
    })

    if (data.data.syshead && data.data.syshead.rsp_msg === 'sucess') {
      return {
        code: 0,
        total: parseInt(data.data.body.totalRecords, 0),
        data: data.data.body.rows
      }
    } else {
      console.log(data.data)

      return {
        code: 2,
        error: data.data.rsp_msg
      }
    }
  } catch (e) {
    console.error(e)
    return {
      code: 1,
      error: e
    }
  }
}

export const getWedHalfInfo = async (productNo) => {
  try {
    const data = await axios.get('/yummy-portal/JSONServer/execute.do', {
      params: {
        syshead: {
          "trans_code": "SI_PRD0017",
          "chnlId": "01"
        },
        body: {
          "cityNo": "25",
          productNo
        }
      }
    })
    if (data.data.syshead.rsp_msg === 'sucess') {
      return {
        code: 0,
        data: data.data.body
      }
    } else {
      console.log(data.data)

      return {
        code: 2,
        error: 'backend error'
      }
    }
  } catch (e) {
    console.error(e)
    return {
      code: 1,
      error: e
    }
  }
}