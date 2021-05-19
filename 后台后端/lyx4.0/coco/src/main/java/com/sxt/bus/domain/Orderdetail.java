package com.sxt.bus.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * <p>
 *
 * </p>
 *
 * @author mxg
 * @since 2021-03-23
 */
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("orderdetail")
public class Orderdetail implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @TableField("orderId")
    private String orderId;

    @TableField("teaName")
    private String teaName;

    @TableField("teaNumber")
    private Integer teaNumber;

    @TableField("teaPrice")
    private Double teaPrice;

    @TableField("feedSelected")
    private String feedSelected;

    @TableField("feedPrice")
    private Double feedPrice;

    @TableField("temSelected")
    private String temSelected;

    @TableField("sweetSelected")
    private String sweetSelected;


}
