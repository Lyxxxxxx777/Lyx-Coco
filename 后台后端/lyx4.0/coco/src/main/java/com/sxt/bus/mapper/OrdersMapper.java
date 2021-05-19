package com.sxt.bus.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sxt.bus.domain.Orders;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 */
public interface OrdersMapper extends BaseMapper<Orders> {

    String getOrdersId(String id); // 获取订单号

    String getPickNum(String datetime); // 获取订单号

    public List<Orders> getOrdersByCustomerOpenId(String openId);
}
