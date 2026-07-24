using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Payment.Dtos.input
{
    public class PaymentCallbackInput
    {
        /// <summary>
        /// 订单ID
        /// </summary>
        public string orderId { get; set; }

        /// <summary>
        /// 支付状态
        /// </summary>
        public string status { get; set; }

        /// <summary>
        /// 支付金额
        /// </summary>
        public decimal amount { get; set; }

        /// <summary>
        /// 支付时间
        /// </summary>
        public DateTime payTime { get; set; }

        /// <summary>
        /// 支付方式
        /// </summary>
        public string payMethod { get; set; }

        /// <summary>
        /// 交易号
        /// </summary>
        public string transactionId { get; set; }

        /// <summary>
        /// 签名
        /// </summary>
        public string signature { get; set; }
    }
}