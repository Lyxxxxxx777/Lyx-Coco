package com.sxt.bus.controller;


import com.sxt.bus.domain.Statistics;
import com.sxt.bus.service.OrderdetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author mxg
 * @since 2021-03-23
 */
@RestController
@RequestMapping("/orderdetail")
public class OrderdetailController {

    @Autowired
    private OrderdetailService orderdetailService;

    @RequestMapping("getSales")
    private List<Statistics> getSales(){
        Date date=new Date();
        DateFormat format=new SimpleDateFormat("yyyyMM");
        String format1 = format.format(date);
        System.out.println(format.format(date));
        List<Statistics> OrderdetailList = orderdetailService.getSales(format1);
        return OrderdetailList;
    }

}
