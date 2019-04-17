import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { getWedHalfInfo } from '../../services'

const WedHalfInfo = ({
  match: {
    params: { productNo },
  },
  location: {
    state: { pageIndex = 1, filter = false },
  },
}) => {
  const [item, setItem] = useState(null)

  const getData = async () => {
    const data = await getWedHalfInfo(productNo)
    if (data.code === 0) {
      setItem(data.data)
    }
  }

  useEffect(() => {
    getData()
  }, [productNo])

  // maxOfOrder 一次可以买多少张
  // maxOfUser 一个用户可以买多少张
  // stock 库存

  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        overflow: 'scroll',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div className="wed-half-item-header">
        <Link
          className="wed-half-item-header-back"
          to={{
            pathname: `/wedhalf/list/${pageIndex}`,
            state: {
              initFilter: filter,
            },
          }}
        >
          {'<'}
        </Link>
        <span className="wed-half-item-header-title">商品详情</span>
      </div>
      {item && (
        <>
          <div className="wed-half-item-name">
            <div className="wed-half-item-name-img">
              <img
                height={80}
                width={100}
                src={item.merLogo}
                alt={item.strName}
              />
            </div>
            <div className="wed-half-item-name-content">
              <div className="wed-half-item-name-title">{item.productName}</div>
              <div
                className="wed-half-item-name-desc"
                style={{
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: '#f60',
                    fontWeight: '500',
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                    }}
                  >
                    {item.salesPrice}
                  </span>
                  元
                </span>
                <span
                  style={{
                    marginLeft: 12,
                    fontSize: 12,
                    color: '#ccc',
                    textDecoration: 'line-through',
                  }}
                >
                  {item.ticketPrice}元
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: '#ccc',
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                  }}
                >
                  已售: {item.quantitySold}张
                </span>
              </div>
            </div>
          </div>
          <div className="wed-half-item-address">
            <div className="wed-half-item-address-title">适用门店</div>
            <div className="wed-half-item-address-content">
              <div className="wed-half-item-address-name">{item.strName}</div>
              <div className="wed-half-item-address-add">{item.address}</div>
              <div className="wed-half-item-address-phone">
                {item.servicePhone}
              </div>
            </div>
            <div className="wed-half-item-address-all">
              <span>全部门店</span>
              <span>
                共
                <span
                  style={{
                    color: '#f60',
                  }}
                >
                  {item.totalRec}
                </span>
                家<span>{' >'}</span>
              </span>
            </div>
          </div>
          <div className="wed-half-item-desc">
            <div className="wed-half-item-desc-title">购买须知</div>
            <div className="wed-half-item-desc-content">
              <div className="wed-half-item-desc-label">有效期</div>
              <div className="wed-half-item-desc-text">
                {item.validityPerBegin}至{item.validityPerEnd}
              </div>
              <div className="wed-half-item-desc-label">支付说明</div>
              <div className="wed-half-item-desc-text">
                {item.payDetailInfo}
              </div>
              <div className="wed-half-item-desc-label">优惠细则</div>
              <div
                className="wed-half-item-desc-text"
                style={{
                  whiteSpace: 'pre-line',
                }}
              >
                {item.detailInfo}
              </div>
            </div>
          </div>
          <div className="wed-half-item-footer">
            <span
              className="wed-half-item-footer-btn"
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
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default WedHalfInfo
