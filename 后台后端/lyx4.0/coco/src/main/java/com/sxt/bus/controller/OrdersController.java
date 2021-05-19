package com.sxt.bus.controller;


import cn.hutool.db.sql.Order;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sxt.bus.domain.Orders;
import com.sxt.bus.domain.Orderdetail;
import com.sxt.bus.service.OrderdetailService;
import com.sxt.bus.service.OrdersService;
import com.sxt.bus.vo.OrdersVo;
import com.sxt.sys.common.DataGridView;
import com.sxt.sys.common.ResultObj;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author mxg
 * @since 2021-02-21
 */
@RestController
@RequestMapping("/orders")
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @Autowired
    private OrderdetailService orderdetailService;

    /**
     * 查询
     */
    @RequestMapping("loadAllOrders")
    public DataGridView loadAllOrders(OrdersVo orderVo) {
        IPage<Orders> page = new Page<>(orderVo.getPage(), orderVo.getLimit());
        QueryWrapper<Orders> queryWrapper = new QueryWrapper<>();
        queryWrapper.like(StringUtils.isNotBlank(orderVo.getOrderId()), "orderId", orderVo.getOrderId());
        queryWrapper.orderByDesc("id");
        this.ordersService.page(page, queryWrapper);
        List<Orders> records = page.getRecords();
        System.out.println(records);
        for (Orders order : records) {
            List<Orderdetail> orderDetailsByOrderId = this.orderdetailService.getOrderDetailsByOrderId(order.getOrderId());
            if(null!=orderDetailsByOrderId) {
                order.setOrderdetails(orderDetailsByOrderId);
            }
        }
        System.out.println(records);
        return new DataGridView(page.getTotal(), records);
    }

    /**
      * 修改
      */
    @RequestMapping("updateOrders")
    public ResultObj updateOrders(Orders orders) {
        System.out.println(orders);
        try {
            if(orders.getIsOk() == 2){
                orders.setPickUpTime(new Date());
            }
            this.ordersService.updateById(orders);
            return ResultObj.UPDATE_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            return ResultObj.UPDATE_ERROR;
        }
    }

    // /**
    //  * 删除
    //  */
    // @RequestMapping("deleteOrders")
    // public ResultObj deleteOrders(Integer id,String ordersimg) {
    //     try {
    //         //删除原文件
    //         // AppFileUtils.removeFileByPath(ordersimg);
    //         this.ordersService.removeById(id);
    //         return ResultObj.DELETE_SUCCESS;
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         return ResultObj.DELETE_ERROR;
    //     }
    // }
}
