package com.sxt.bus.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sxt.bus.domain.Orders;

import java.util.List;

public interface OrdersService extends IService<Orders> {

    public String getOrdersId(String id);

    public String getPickNum(String datetime);

    public List<Orders> getOrdersByCustomerOpenId(String openId);
}
