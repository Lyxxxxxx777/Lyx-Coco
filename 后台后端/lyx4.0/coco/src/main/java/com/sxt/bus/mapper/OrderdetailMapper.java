package com.sxt.bus.mapper;

import com.sxt.bus.domain.Orderdetail;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sxt.bus.domain.Statistics;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author mxg
 * @since 2021-03-23
 */
public interface OrderdetailMapper extends BaseMapper<Orderdetail> {

    List<Orderdetail> getOrderDetailsByOrderId(String orderid);

    List<Statistics> getSales(String datetime);

}
