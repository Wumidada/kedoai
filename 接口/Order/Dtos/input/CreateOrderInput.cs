using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Order.Dtos.input
{
    public class CreateOrderInput
    {
        /// <summary>
        /// 订单商品
        /// </summary>
        public List<OrderItem> items { get; set; }

        /// <summary>
        /// 商品总价
        /// </summary>
        public decimal subtotal { get; set; }

        /// <summary>
        /// 运费
        /// </summary>
        public decimal shippingFee { get; set; }

        /// <summary>
        /// 订单总价
        /// </summary>
        public decimal total { get; set; }

        /// <summary>
        /// 客户信息
        /// </summary>
        public CustomerInfo customerInfo { get; set; }
    }

    public class OrderItem
    {
        /// <summary>
        /// 商品ID
        /// </summary>
        public string productId { get; set; }

        /// <summary>
        /// 商品名称
        /// </summary>
        public string productName { get; set; }

        /// <summary>
        /// 商品数量
        /// </summary>
        public int quantity { get; set; }

        /// <summary>
        /// 商品单价
        /// </summary>
        public decimal price { get; set; }
    }

    public class CustomerInfo
    {
        /// <summary>
        /// 姓名
        /// </summary>
        public string name { get; set; }

        /// <summary>
        /// 电话
        /// </summary>
        public string phone { get; set; }

        /// <summary>
        /// 地址
        /// </summary>
        public string address { get; set; }

        /// <summary>
        /// 邮箱
        /// </summary>
        public string email { get; set; }
    }
}