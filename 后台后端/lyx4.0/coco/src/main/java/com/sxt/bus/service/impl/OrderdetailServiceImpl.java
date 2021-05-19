package com.sxt.bus.service.impl;

import com.sxt.bus.domain.Orderdetail;
import com.sxt.bus.domain.Statistics;
import com.sxt.bus.mapper.OrderdetailMapper;
import com.sxt.bus.mapper.OrdersMapper;
import com.sxt.bus.service.OrderdetailService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author mxg
 * @since 2021-03-23
 */
@Service
public class OrderdetailServiceImpl extends ServiceImpl<OrderdetailMapper, Orderdetail> implements OrderdetailService {

    @Autowired
    private OrderdetailMapper orderdetailMapper;

    public List<Orderdetail> getOrderDetailsByOrderId(String orderid){
        return orderdetailMapper.getOrderDetailsByOrderId(orderid);
    }

    public List<Statistics> getSales(String datetime){
        return orderdetailMapper.getSales(datetime);
    }


}
