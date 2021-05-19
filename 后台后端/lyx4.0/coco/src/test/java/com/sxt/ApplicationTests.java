package com.sxt;

import com.sxt.bus.service.GoodsService;
import com.sxt.bus.service.OrdersService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationTests {

	@Autowired
	private GoodsService goodsService;

	@Autowired
	OrdersService ordersService;

	@Test
	public void contextLoads() {
		// Date date = new Date();
		// SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		// String format = formatter.format(date);
		// System.out.println(format);
		// String ordersSort_num = ordersService.getOrdersSort_num(format);
		// String sort_num = "";
		// if (StringUtils.isEmpty(ordersSort_num)){
		// 	sort_num = "6001";
		// }else{
		// 	int i = Integer.parseInt(ordersSort_num) + 1;
		// 	sort_num = String.valueOf(i);
		// }
		// System.out.println(sort_num);

	}

}
