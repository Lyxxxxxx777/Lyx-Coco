package com.sxt.bus.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sxt.bus.domain.*;
import com.sxt.bus.service.*;
import com.sxt.sys.common.DataGridView;
import com.sxt.sys.common.ResultObj;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

//小程序接口
@CrossOrigin
@RestController
@RequestMapping("coco")
public class WxController {

    @Autowired
    private GoodsService goodsService;

    @Autowired
    private TeatypeService teatypeService;

    @Autowired
    private FeedinfoService feedinfoService;

    @Autowired
    private OrdersService ordersService;

    @Autowired
    private OrderdetailService orderdetailService;

    @Autowired
    private UserinfoService userinfoService;

    @RequestMapping("menu")
    public List<Goods> getMenu(){
        List<Goods> list = goodsService.list();
        for (Goods goods : list) {
            Teatype teatype = this.teatypeService.getById(goods.getTypeId());
            if(null!=teatype) {
                goods.setTypeName(teatype.getTypeName());
            }

            String[] split = goods.getTemArr().split(",");
            String[] temName = new String[split.length];
            for (int i = 0; i < split.length ; i++) {
                if(split[i].equals("1")){
                    split[i] = "热";
                }else if(split[i].equals("2")){
                    split[i] = "温";
                }else if(split[i].equals("3")){
                    split[i] = "常规冰";
                }else if(split[i].equals("4")){
                    split[i] = "多冰";
                }else if(split[i].equals("5")){
                    split[i] = "少冰";
                }else if(split[i].equals("6")){
                    split[i] = "去冰";
                }
                temName[i] = split[i];
            }
            goods.setTemName(temName);

            String[] split1 = goods.getSweetArr().split(",");
            String sweetName[] =  new String[split1.length];
            for (int i = 0; i < split1.length ; i++) {
                if(split1[i].equals("1")){
                    split1[i] = "常规糖";
                }else if(split1[i].equals("2")){
                    split1[i] = "半糖";
                }else if(split1[i].equals("4")){
                    split1[i] = "微糖";
                }else if(split1[i].equals("5")){
                    split1[i] = "不另外加糖";
                }
                sweetName[i] = split1[i];
            }
            goods.setSweetName(sweetName);

            if(goods.getFeedArr() != null){
                String[] split2 = goods.getFeedArr().split(",");
                List<Feedinfo> feedinfos = new ArrayList<>();
                for (int i = 0; i < split2.length ; i++) {
                    Feedinfo feedinfo = this.feedinfoService.getById(split2[i]);
                    feedinfos.add(feedinfo);
                }
                goods.setFeedinfos(feedinfos);
            }
        }


        return list;

    }

    @RequestMapping("addOrder")
    public ResultObj addOrder(@RequestBody Cart cart){

        try{
            System.out.println(cart);
            Orders orders = new Orders();
            //生成订单号
            String orderId = getOrderId();
            orders.setOrderId(orderId);

            //通过订单号添加订单详情
            for (CartGoods cartGoodsgoods : cart.getCartGoodsList()) {
                Orderdetail orderdetail = new Orderdetail();
                orderdetail.setOrderId(orderId);
                orderdetail.setTeaName(cartGoodsgoods.getTeaName());
                orderdetail.setTeaNumber(cartGoodsgoods.getTeaNumber());
                orderdetail.setFeedPrice(cartGoodsgoods.getFeedPrice());
                orderdetail.setFeedSelected(cartGoodsgoods.getFeedSelected());
                orderdetail.setTemSelected(cartGoodsgoods.getTemSelected());
                orderdetail.setTeaPrice(cartGoodsgoods.getTeaPrice());
                orderdetail.setSweetSelected(cartGoodsgoods.getSweetSelected());
                this.orderdetailService.save(orderdetail);
            }

            //生成取单号
            orders.setPickNum(getPickNum());
            orders.setPayTime(new Date());
            orders.setRemarks(cart.getRemarks());
            orders.setStore(cart.getStore());
            orders.setAmountMoney(cart.getAmountMoney());
            orders.setHowToGet(cart.getHowToGet());
            orders.setIsOk(0); //设置0为 订单状态
            orders.setCustomerOpenId(cart.getOpenId());
            this.ordersService.save(orders);
        }catch (Exception e){
            e.printStackTrace();
            return ResultObj.ADD_ERROR;
        }

        return ResultObj.ADD_SUCCESS;
    }

    //生成订单号
    public String getOrderId(){
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        String format = formatter.format(date);
        System.out.println(format);
        String ordersOrderId = ordersService.getOrdersId(format);
        String orderId = "";
        if (StringUtils.isEmpty(ordersOrderId)){
            orderId = format + "0001";
        }else{
            int i = Integer.parseInt(ordersOrderId) + 1;
            DecimalFormat df=new DecimalFormat("0000");
            orderId = format + df.format(i);
        }
        return orderId;
    }

    //生成取单号
    public String getPickNum(){
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        String format = formatter.format(date);
        System.out.println(format);
        String pickNum = ordersService.getPickNum(format);
        String pickNum1 = "C";
        if (StringUtils.isEmpty(pickNum)){
            pickNum1 = "C001";
        }else{
            String p = pickNum.substring(1);
            int i = Integer.parseInt(p) + 1;
            DecimalFormat df=new DecimalFormat("000");
            pickNum1 +=  df.format(i);
        }
        return pickNum1;
    }

    @RequestMapping("orders")
    public List<Orders> getOrders(String openId){
        List<Orders> orders = ordersService.getOrdersByCustomerOpenId(openId);
        for (Orders order : orders) {
            List<Orderdetail> orderDetailsByOrderId = this.orderdetailService.getOrderDetailsByOrderId(order.getOrderId());
            if(null!=orderDetailsByOrderId) {
                order.setOrderdetails(orderDetailsByOrderId);
            }
        }
        return orders;
    }

    @RequestMapping("login")
    public DataGridView login(String openId){
        System.out.println(openId);
        //通过openId判断用户注册过
        Userinfo user = this.userinfoService.isOpenIDExist(openId);
        if(user != null){
            return new DataGridView(user);
        }else{
            Userinfo userinfo = new Userinfo();
            userinfo.setOpenId(openId);
            this.userinfoService.save(userinfo);
            userinfo = this.userinfoService.isOpenIDExist(openId);
            return new DataGridView(userinfo);
        }
    }

    /**
     * 加载所有类别
     */
    @RequestMapping("loadAllTeatypeForSelect")
    public DataGridView loadAllProviderForSelect() {
        QueryWrapper<Teatype> queryWrapper=new QueryWrapper<>();
        List<Teatype> list = this.teatypeService.list(queryWrapper);
        return new DataGridView(list);
    }

}
