using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Order.Dtos.output
{
    public class OrderDetailOutput
    {
        /// <summary>
        /// 订单ID
        /// </summary>
        public string OrderId { get; set; }

        /// <summary>
        /// 订单号
        /// </summary>
        public string OrderNo { get; set; }

        /// <summary>
        /// 订单状态
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// 商品总价
        /// </summary>
        public decimal Subtotal { get; set; }

        /// <summary>
        /// 运费
        /// </summary>
        public decimal ShippingFee { get; set; }

        /// <summary>
        /// 订单总价
        /// </summary>
        public decimal Total { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 支付时间
        /// </summary>
        public DateTime? PayTime { get; set; }

        /// <summary>
        /// 发货时间
        /// </summary>
        public DateTime? ShipTime { get; set; }

        /// <summary>
        /// 完成时间
        /// </summary>
        public DateTime? CompleteTime { get; set; }

        /// <summary>
        /// 客户信息
        /// </summary>
        public CustomerInfoOutput CustomerInfo { get; set; }

        /// <summary>
        /// 订单商品
        /// </summary>
        public List<OrderProductOutput> Products { get; set; }

        /// <summary>
        /// 物流信息
        /// </summary>
        public LogisticsInfoOutput LogisticsInfo { get; set; }
    }

    public class CustomerInfoOutput
    {
        /// <summary>
        /// 姓名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 电话
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// 地址
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// 邮箱
        /// </summary>
        public string Email { get; set; }
    }

    public class OrderProductOutput
    {
        /// <summary>
        /// 商品ID
        /// </summary>
        public string ProductId { get; set; }

        /// <summary>
        /// 商品名称
        /// </summary>
        public string ProductName { get; set; }

        /// <summary>
        /// 商品数量
        /// </summary>
        public int Quantity { get; set; }

        /// <summary>
        /// 商品单价
        /// </summary>
        public decimal Price { get; set; }

        /// <summary>
        /// 商品图片
        /// </summary>
        public string Image { get; set; }
    }

    public class LogisticsInfoOutput
    {
        /// <summary>
        /// 物流公司
        /// </summary>
        public string Company { get; set; }

        /// <summary>
        /// 物流单号
        /// </summary>
        public string TrackingNumber { get; set; }

        /// <summary>
        /// 物流状态
        /// </summary>
        public string Status { get; set; }
    }
}