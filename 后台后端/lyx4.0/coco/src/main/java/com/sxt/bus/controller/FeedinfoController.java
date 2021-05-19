package com.sxt.bus.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sxt.bus.domain.Feedinfo;
import com.sxt.bus.service.FeedinfoService;
import com.sxt.bus.vo.FeedinfoVo;
import com.sxt.sys.common.DataGridView;
import com.sxt.sys.common.ResultObj;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author mxg
 * @since 2021-04-04
 */
@RestController
@RequestMapping("/feedinfo")
public class FeedinfoController {

    @Autowired
    private FeedinfoService feedinfoService;

    /**
     * 查询
     */
    @RequestMapping("loadAllFeedinfo")
    public DataGridView loadAllFeedinfo(FeedinfoVo feedinfoVo) {
        IPage<Feedinfo> page = new Page<>(feedinfoVo.getPage(), feedinfoVo.getLimit());
        QueryWrapper<Feedinfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.like(StringUtils.isNotBlank(feedinfoVo.getFeedName()), "feedName", feedinfoVo.getFeedName());

        this.feedinfoService.page(page, queryWrapper);
        List<Feedinfo> records = page.getRecords();
        return new DataGridView(page.getTotal(), records);
    }

    /**
     * 添加
     */
    @RequestMapping("addFeedinfo")
    public ResultObj addFeedinfo(FeedinfoVo feedinfoVo) {
        try {
            this.feedinfoService.save(feedinfoVo);
            return ResultObj.ADD_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            return ResultObj.ADD_ERROR;
        }
    }
    /**
     * 修改
     */
    @RequestMapping("updateFeedinfo")
    public ResultObj updateFeedinfo(FeedinfoVo feedinfoVo) {
        try {
            this.feedinfoService.updateById(feedinfoVo);
            return ResultObj.UPDATE_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            return ResultObj.UPDATE_ERROR;
        }
    }

    /**
     * 删除
     */
    @RequestMapping("deleteFeedinfo")
    public ResultObj deleteFeedinfo(Integer id) {
        try {
            this.feedinfoService.removeById(id);
            return ResultObj.DELETE_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            return ResultObj.DELETE_ERROR;
        }
    }

    /**
     * 查询所有加料以供选择
     */
    @RequestMapping("getAllFeedinfo")
    public List<Feedinfo> getAllFeedinfo() {
        return this.feedinfoService.list();
    }
}
