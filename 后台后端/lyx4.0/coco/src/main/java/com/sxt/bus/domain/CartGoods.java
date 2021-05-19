package com.sxt.bus.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartGoods {
    private int teaNumber;
    private String teaName;
    private Double teaPrice;
    private String feedSelected;
    private Double feedPrice;
    private String temSelected;
    private String sweetSelected;
}
