using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Payment.Dtos.input
{
    public class RefundInput
    {
        /// <summary>
        /// 订单ID
        /// </summary>
        public string orderId { get; set; }

        /// <summary>
        /// 退款金额
        /// </summary>
        public decimal amount { get; set; }

        /// <summary>
        /// 退款原因
        /// </summary>
        public string reason { get; set; }
    }
}