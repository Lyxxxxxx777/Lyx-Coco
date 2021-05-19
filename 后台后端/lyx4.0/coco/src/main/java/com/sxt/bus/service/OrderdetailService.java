package com.sxt.bus.service;

import com.sxt.bus.domain.Orderdetail;
import com.baomidou.mybatisplus.extension.service.IService;
import com.sxt.bus.domain.Statistics;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author mxg
 * @since 2021-03-23
 */
public interface OrderdetailService extends IService<Orderdetail> {
    //通过订单号查询订单详情
    List<Orderdetail> getOrderDetailsByOrderId(String orderid);

    List<Statistics> getSales(String datetime);

}
