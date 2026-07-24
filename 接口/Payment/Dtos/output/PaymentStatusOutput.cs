using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Payment.Dtos.output
{
    public class PaymentStatusOutput
    {
        /// <summary>
        /// 订单ID
        /// </summary>
        public string OrderId { get; set; }

        /// <summary>
        /// 支付状态
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// 支付金额
        /// </summary>
        public decimal Amount { get; set; }

        /// <summary>
        /// 支付时间
        /// </summary>
        public DateTime? PayTime { get; set; }

        /// <summary>
        /// 支付方式
        /// </summary>
        public string PayMethod { get; set; }

        /// <summary>
        /// 交易号
        /// </summary>
        public string TransactionId { get; set; }
    }
}