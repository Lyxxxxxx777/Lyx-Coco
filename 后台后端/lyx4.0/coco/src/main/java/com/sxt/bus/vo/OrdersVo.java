package com.sxt.bus.vo;

import com.sxt.bus.domain.Orders;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class OrdersVo extends Orders {

	/*
	 *
	 */
	private static final long serialVersionUID = 1L;

	private Integer page = 1;
	private Integer limit = 10;

}
