package com.sxt.bus.vo;

import com.sxt.bus.domain.Feedinfo;
import com.sxt.bus.domain.Teatype;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class FeedinfoVo extends Feedinfo {

	/*
	 *
	 */
	private static final long serialVersionUID = 1L;

	private Integer page = 1;
	private Integer limit = 10;

}
