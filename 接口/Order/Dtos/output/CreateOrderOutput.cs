using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Order.Dtos.output
{
    public class CreateOrderOutput
    {
        /// <summary>
        /// 订单是否创建成功
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// 订单ID
        /// </summary>
        public string OrderId { get; set; }

        /// <summary>
        /// 订单号
        /// </summary>
        public string OrderNo { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 支付链接（如果需要立即支付）
        /// </summary>
        public string PaymentUrl { get; set; }

        /// <summary>
        /// 错误信息（如果创建失败）
        /// </summary>
        public string ErrorMessage { get; set; }
    }
}