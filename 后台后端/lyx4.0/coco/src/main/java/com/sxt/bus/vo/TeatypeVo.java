package com.sxt.bus.vo;

import com.sxt.bus.domain.Teatype;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class TeatypeVo extends Teatype {

	/*
	 *
	 */
	private static final long serialVersionUID = 1L;

	private Integer page = 1;
	private Integer limit = 10;

}
