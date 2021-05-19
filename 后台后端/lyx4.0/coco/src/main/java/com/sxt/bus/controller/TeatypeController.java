package com.sxt.bus.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sxt.bus.domain.Teatype;
import com.sxt.bus.service.TeatypeService;
import com.sxt.bus.vo.TeatypeVo;
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
 * @author lyx
 * @since 2021-03-30
 */
@RestController
@RequestMapping("/teatype")
public class TeatypeController {

    @Autowired
    private TeatypeService teatypeService;

    /**
     * 查询
     */
    @RequestMapping("loadAllTeatype")
    public DataGridView loadAllTeatype(TeatypeVo teatypeVo) {
        IPage<Teatype> page = new Page<>(teatypeVo.getPage(), teatypeVo.getLimit());
        QueryWrapper<Teatype> queryWrapper = new QueryWrapper<>();
        queryWrapper.like(StringUtils.isNotBlank(teatypeVo.getTypeName()), "typeName", teatypeVo.getTypeName());

        this.teatypeService.page(page, queryWrapper);
        List<Teatype> records = page.getRecords();
        return new DataGridView(page.getTotal(), records);
    }

    /**
     * 添加
     */
    @RequestMapping("addTeatype")
    public ResultObj addTeatype(TeatypeVo teatypeVo) {
        try {
            this.teatypeService.save(teatypeVo);
            return ResultObj.ADD_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            return ResultObj.ADD_ERROR;
        }
    }
    /**
     * 修改
     */
    @RequestMapping("updateTeatype")
    public ResultObj updateTeatype(TeatypeVo teatypeVo) {
        try {
            this.teatypeService.updateById(teatypeVo);
            return ResultObj.UPDATE_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            return ResultObj.UPDATE_ERROR;
        }
    }

    /**
     * 删除
     */
    @RequestMapping("deleteTeatype")
    public ResultObj deleteTeatype(Integer id) {
        try {
            this.teatypeService.removeById(id);
            return ResultObj.DELETE_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            return ResultObj.DELETE_ERROR;
        }
    }

    /**
     * 加载所有类别
     */
    @RequestMapping("loadAllTeatypeForSelect")
    public DataGridView loadAllProviderForSelect() {
        QueryWrapper<Teatype> queryWrapper=new QueryWrapper<>();
        List<Teatype> list = this.teatypeService.list(queryWrapper);
        return new DataGridView(list);
    }


}
