import React, { useState, useEffect } from 'react'
import { getWedHalfList } from '../../services'
import { Link } from 'react-router-dom'
import './index.css'

const pageSize = 20

const WedHalfList = ({ match, location }) => {
  const pageIndex = parseInt(match.params.pageIndex)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const initFilter =
    location.state && location.state.initFilter
      ? location.state.initFilter
      : false
  const [filter, setFilter] = useState(initFilter)

  const getData = async () => {
    const data = await getWedHalfList(pageIndex, pageSize)
    if (data.code === 0) {
      setTotal(data.total)
      const list = filter
        ? data.data.filter(item => item.btnStatus !== '1')
        : data.data
      setList(list)
    }
  }

  useEffect(() => {
    getData()
  }, [pageIndex, filter])

  const totalPageNo =
    total % pageSize === 0
      ? total / pageSize
      : parseInt(total / pageSize, 0) + 1

  return (
    <div>
      <div className="wed-halg-list-operation">
        <div>
          <Link
            to={`/wedhalf/list/${pageIndex - 1}`}
            style={
              pageIndex === 1
                ? {
                    pointerEvents: 'none',
                    color: '#ccc',
                    cursor: 'default',
                    fontSize: 16,
                    marginRight: 8,
                  }
                : {
                    color: '#333',
                    fontSize: 16,
                    marginRight: 8,
                  }
            }
          >
            {'<上一页'}
          </Link>
          <span>{pageIndex + ' / ' + totalPageNo}</span>
          <Link
            to={`/wedhalf/list/${pageIndex + 1}`}
            style={
              pageIndex === totalPageNo
                ? {
                    pointerEvents: 'none',
                    color: '#ccc',
                    cursor: 'default',
                    fontSize: 16,
                    marginLeft: 8,
                  }
                : {
                    color: '#333',
                    fontSize: 16,
                    marginLeft: 8,
                  }
            }
          >
            {'下一页>'}
          </Link>
        </div>
        <div>
          <label
            style={{
              fontSize: 16,
              color: '#333',
            }}
            htmlFor="all"
          >
            只看有货:
          </label>
          <input
            checked={filter}
            onChange={e => {
              setFilter(e.target.checked)
            }}
            style={{
              height: 16,
              width: 16,
              verticalAlign: 'middle',
              marginLeft: 8,
            }}
            type="checkbox"
            id="all"
          />
        </div>
      </div>
      <div
        style={{
          marginTop: 48,
        }}
      >
        {list.map(item => {
          return (
            <Link
              to={{
                pathname: `/wedhalf/info/${item.productNo}`,
                state: {
                  pageIndex,
                  filter,
                },
              }}
              key={item.productNo}
            >
              <div className="wed-halg-list-item">
                <div className="wed-halg-list-item-img">
                  <img
                    width={100}
                    height={64}
                    src={item.productPicUrl}
                    alt={item.productName}
                  />
                </div>
                <div className="wed-halg-list-item-content">
                  <div className="wed-halg-list-item-name">
                    {item.productName}
                  </div>
                  <div className="wed-halg-list-item-desc">
                    <div className="wed-halg-list-item-type">
                      {item.merType}
                    </div>
                    <div
                      className="wed-halg-list-item-btn"
                      style={
                        item.btnStatus === '1'
                          ? {
                              backgroundColor: '#bbb',
                            }
                          : {
                              backgroundColor: 'rgba(255,0,0,.75)',
                            }
                      }
                    >
                      {item.btnText}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default WedHalfList
