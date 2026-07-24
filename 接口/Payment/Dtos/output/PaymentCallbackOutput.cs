using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Payment.Dtos.output
{
    public class PaymentCallbackOutput
    {
        /// <summary>
        /// 处理是否成功
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// 订单ID
        /// </summary>
        public string OrderId { get; set; }

        /// <summary>
        /// 处理时间
        /// </summary>
        public DateTime ProcessTime { get; set; }

        /// <summary>
        /// 错误信息（如果处理失败）
        /// </summary>
        public string ErrorMessage { get; set; }
    }
}