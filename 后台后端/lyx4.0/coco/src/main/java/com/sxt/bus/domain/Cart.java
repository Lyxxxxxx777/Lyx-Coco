package com.sxt.bus.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    private int isOk;
    private Date payTime;
    private String store;
    private Double amountMoney;
    private String howToGet;
    private Date pickUpTime;
    private String remarks;
    private List<CartGoods> cartGoodsList;
    private String openId;



}
