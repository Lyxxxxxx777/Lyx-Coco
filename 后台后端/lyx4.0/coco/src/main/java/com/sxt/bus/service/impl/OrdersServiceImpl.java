package com.sxt.bus.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sxt.bus.domain.Orders;
import com.sxt.bus.mapper.OrdersMapper;
import com.sxt.bus.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 */
@Service
@Transactional
public class OrdersServiceImpl extends ServiceImpl<OrdersMapper, Orders> implements OrdersService {

	@Autowired
	private OrdersMapper ordersMapper;


	@Override
	public String getOrdersId(String id) {
		return ordersMapper.getOrdersId(id);
	}

	@Override
	public String getPickNum(String datetime) {
		return ordersMapper.getPickNum(datetime);
	}

	public List<Orders> getOrdersByCustomerOpenId(String openId){
		return ordersMapper.getOrdersByCustomerOpenId(openId);
	}
}
