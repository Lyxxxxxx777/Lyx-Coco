package com.sxt.bus.domain;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 *
 * </p>
 *
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("goods")
public class Goods implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @TableField("typeId")
    private Integer typeId;

    @TableField("teaPrice")
    private Double teaPrice;

    @TableField("teaImage")
    private String teaImage;

    @TableField("teaDescribe")
    private String teaDescribe;

    @TableField("teaName")
    private String teaName;

    private Integer available;

    @TableField("feedArr")
    private String feedArr;

    @TableField("temArr")
    private String temArr;

    @TableField("sweetArr")
    private String sweetArr;

    @TableField(exist=false)
    private String typeName;

    @TableField(exist=false)
    private String feedName;

    @TableField(exist=false)
    private String[] temName;

    @TableField(exist=false)
    private String[] sweetName;

    @TableField(exist=false)
    private List<Feedinfo> feedinfos;

    @TableField(exist=false)
    private Integer teaNumber;


}
