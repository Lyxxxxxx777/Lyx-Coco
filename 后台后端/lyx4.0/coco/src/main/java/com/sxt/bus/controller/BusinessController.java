package com.sxt.bus.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 业务管理的路由器
 * @author LJH
 *
 */
@Controller
@RequestMapping("/bus")
public class BusinessController {


	/**
	 * 跳转到类别管理
	 */
	@RequestMapping("toCategoryManager")
	public String toCategoryManager() {
		return "business/category/categoryManager";
	}
	/**
	 * 跳转到客户管理
	 */
	@RequestMapping("toCustomerManager")
	public String toCustomerManager() {
		return "business/customer/customerManager";
	}
	/**
	 * 跳转到供应商管理
	 */
	@RequestMapping("toProviderManager")
	public String toProviderManager() {
		return "business/provider/providerManager";
	}
	/**
	 * 跳转到商品管理
	 */
	@RequestMapping("toGoodsManager")
	public String toGoodsManager() {
		return "business/goods/goodsManager";
	}
	/**
	 * 跳转到进货管理
	 */
	@RequestMapping("toInportManager")
	public String toInportManager() {
		return "business/inport/inportManager";
	}
	/**
	 * 跳转到退货查询管理
	 */
	@RequestMapping("toOutportManager")
	public String toOutportManager() {
		return "business/outport/outportManager";
	}

	/**
	 * 跳转到订单管理
	 */
	@RequestMapping("toOrdersManager")
	public String toOrdersManager() {
		return "business/orders/ordersManager";
	}

	/**
	 * 跳转到商品类别管理
	 */
	@RequestMapping("toTeatypeManager")
	public String toTeatypeManager() {
		return "business/teatype/teatypeManager";
	}

	/**
	 * 跳转到商品加料管理
	 */
	@RequestMapping("toFeedinfoManager")
	public String toFeedinfoManager() {
		return "business/feedinfo/feedinfoManager";
	}

	/**
	 * 跳转到统计
	 */
	@RequestMapping("toStatisticsManager")
	public String toSstatisticsManager() {
		return "business/statistics/statisticsManager";
	}
}
