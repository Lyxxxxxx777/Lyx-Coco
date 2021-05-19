package com.sxt.bus.mapper;

import com.sxt.bus.domain.Goods;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author mxg
 * @since 2021-02-21
 */
@Mapper
@Repository
public interface GoodsMapper extends BaseMapper<Goods> {

    List<Goods> getGoodsByCateId(int cateid);

}
