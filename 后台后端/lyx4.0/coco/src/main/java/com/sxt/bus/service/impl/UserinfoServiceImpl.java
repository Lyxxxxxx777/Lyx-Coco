package com.sxt.bus.service.impl;

import com.sxt.bus.domain.Userinfo;
import com.sxt.bus.mapper.UserinfoMapper;
import com.sxt.bus.service.UserinfoService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sxt.sys.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author lyx
 * @since 2021-04-16
 */
@Service
public class UserinfoServiceImpl extends ServiceImpl<UserinfoMapper, Userinfo> implements UserinfoService {

    @Autowired
    private UserinfoMapper userinfoMapper;

    public Userinfo isOpenIDExist(String openId){
        return userinfoMapper.isOpenIDExist(openId);
    }
}
