package com.sxt.bus.domain;

import cn.hutool.core.date.DateTime;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.Date;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("orders")
public class Orders {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @TableField("pickNum")
    private String pickNum;

    @TableField("pickUpTime")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date pickUpTime;

    // @TableField("payMode")
    // private String payMode;

    private String remarks;

    @TableField("orderId")
    private String orderId;

    @TableField("payTime")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date payTime;

    @TableField("store")
    private String store;

    /**
     * 价格
     */
    @TableField("amountMoney")
    private Double amountMoney;

    /**
     * 取餐时间
     */
    @TableField("howToGet")
    private String howToGet;

    @TableField("isOk")
    private Integer isOk;

    @TableField("customerOpenId")
    private String customerOpenId;

    @TableField(exist=false)
    private List<Goods> cart;

    @TableField(exist=false)
    private List<Orderdetail> orderdetails;

}
