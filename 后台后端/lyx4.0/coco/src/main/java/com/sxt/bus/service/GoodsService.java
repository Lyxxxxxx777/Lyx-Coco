package com.sxt.bus.service;

import com.sxt.bus.domain.Goods;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author mxg
 * @since 2021-02-21
 */
public interface GoodsService extends IService<Goods> {

    List<Goods> getGoodsByCateId(int cateid);

}
