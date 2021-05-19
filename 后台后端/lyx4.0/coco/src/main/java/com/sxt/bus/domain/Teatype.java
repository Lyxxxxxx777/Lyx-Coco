package com.sxt.bus.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * <p>
 *
 * </p>
 *
 * @author mxg
 * @since 2021-03-30
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("teatype")
public class Teatype implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "typeId", type = IdType.AUTO)
    private Integer typeId;

    @TableField("typeName")
    private String typeName;

    @TableField("typeDescribe")
    private String typeDescribe;

    @TableField("typeImage0")
    private String typeImage0;

    @TableField("typeImage1")
    private String typeImage1;


}
