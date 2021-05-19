package com.sxt.bus.controller;


import com.sxt.bus.domain.Userinfo;
import com.sxt.bus.service.UserinfoService;
import com.sxt.sys.common.DataGridView;
import com.sxt.sys.common.ResultObj;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author lyx
 * @since 2021-04-16
 */
@RestController
@CrossOrigin
@RequestMapping("/userinfo")
public class UserinfoController {

    @Autowired
    private UserinfoService userinfoService;

    /**
     * 修改
     */
    @RequestMapping("updateUserinfo")
    public DataGridView updateWXUser(@RequestBody Userinfo userinfo) {
        try {
            this.userinfoService.updateById(userinfo);
            return new DataGridView(userinfo);
        } catch (Exception e) {
            e.printStackTrace();
            return new DataGridView();
        }
    }
}
