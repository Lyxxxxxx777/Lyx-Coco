package com.sxt.bus.service;

import com.sxt.bus.domain.Userinfo;
import com.baomidou.mybatisplus.extension.service.IService;
import com.sxt.sys.domain.User;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author lyx
 * @since 2021-04-16
 */
public interface UserinfoService extends IService<Userinfo> {

    public Userinfo isOpenIDExist(String openId);
}
