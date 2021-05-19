package com.sxt.bus.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sxt.bus.domain.*;
import com.sxt.bus.service.*;
import com.sxt.bus.vo.GoodsVo;
import com.sxt.sys.common.AppFileUtils;
import com.sxt.sys.common.Constast;
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
 * @since 2021-02-21
 */
@RestController
@RequestMapping("/goods")
public class GoodsController {

    @Autowired
    private GoodsService goodsService;

    @Autowired
    private TeatypeService teatypeService;

    @Autowired
    private FeedinfoService feedinfoService;

    /**
     * 查询
     */
    @RequestMapping("loadAllGoods")
    public DataGridView loadAllGoods(GoodsVo goodsVo) {
        IPage<Goods> page = new Page<>(goodsVo.getPage(), goodsVo.getLimit());
        QueryWrapper<Goods> queryWrapper = new QueryWrapper<>();
        System.out.println();
        queryWrapper.eq(goodsVo.getTypeId()!=null&&goodsVo.getTypeId()!=0,"typeId",goodsVo.getTypeId());
        queryWrapper.like(StringUtils.isNotBlank(goodsVo.getTeaName()), "teaName", goodsVo.getTeaName());
        this.goodsService.page(page, queryWrapper);
        List<Goods> records = page.getRecords();
        System.out.println(records);
        for (Goods goods : records) {
            Teatype teatype = this.teatypeService.getById(goods.getTypeId());
            if(null!=teatype) {
                goods.setTypeName(teatype.getTypeName());
            }
            System.out.println(goods);
            if(StringUtils.isNotEmpty(goods.getFeedArr())){
                String[] split = goods.getFeedArr().split(",");
                String feedName = "";
                for (int i = 0; i < split.length ; i++) {
                    Feedinfo feedinfo = this.feedinfoService.getById(split[i]);
                    feedName +=feedinfo.getFeedName();
                    if(i+1 != split.length){
                        feedName += ",";
                    }
                }
                goods.setFeedName(feedName);
            }
        }

        return new DataGridView(page.getTotal(), records);
    }

    /**
     * 添加
     */
    @RequestMapping("addGoods")
    public ResultObj addGoods(GoodsVo goodsVo) {
        try {
            if(goodsVo.getTeaImage()!=null&&goodsVo.getTeaImage().endsWith("_temp")) {
                String newName= AppFileUtils.renameFile(goodsVo.getTeaImage());
                goodsVo.setTeaImage(newName);
            }
            this.goodsService.save(goodsVo);
            return ResultObj.ADD_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            return ResultObj.ADD_ERROR;
        }
    }

    /**
     * 修改
     */
    @RequestMapping("updateGoods")
    public ResultObj updateGoods(GoodsVo goodsVo) {
        try {
            // //说明是不默认图片
            // if(!(goodsVo.getGoodsimg()!=null&&goodsVo.getGoodsimg().equals(Constast.IMAGES_DEFAULTGOODSIMG_PNG))) {
            //     if(goodsVo.getGoodsimg().endsWith("_temp")) {
            //         String newName=AppFileUtils.renameFile(goodsVo.getGoodsimg());
            //         goodsVo.setGoodsimg(newName);
            //         //删除原先的图片
            //         String oldPath=this.goodsService.getById(goodsVo.getId()).getGoodsimg();
            //         AppFileUtils.removeFileByPath(oldPath);
            //     }
            // }
            this.goodsService.updateById(goodsVo);
            return ResultObj.UPDATE_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            return ResultObj.UPDATE_ERROR;
        }
    }

    /**
     * 删除
     */
    @RequestMapping("deleteGoods")
    public ResultObj deleteGoods(Integer id,String goodsimg) {
        try {
            //删除原文件
            // AppFileUtils.removeFileByPath(goodsimg);
            this.goodsService.removeById(id);
            return ResultObj.DELETE_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            return ResultObj.DELETE_ERROR;
        }
    }
}
