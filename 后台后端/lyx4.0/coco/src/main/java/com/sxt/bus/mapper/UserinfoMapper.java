package com.sxt.bus.mapper;

import com.sxt.bus.domain.Userinfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author lyx
 * @since 2021-04-16
 */
public interface UserinfoMapper extends BaseMapper<Userinfo> {
    public Userinfo isOpenIDExist(String openId);
}
