package com.sxt.bus.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 *
 * </p>
 *
 * @author mxg
 * @since 2021-04-04
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("feedinfo")
public class Feedinfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "feedId", type = IdType.AUTO)
    private Integer feedId;

    @TableField("feedName")
    private String feedName;

    @TableField("feedPrice")
    private Integer feedPrice;


}
