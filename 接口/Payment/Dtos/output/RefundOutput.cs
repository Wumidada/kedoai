using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Payment.Dtos.output
{
    public class RefundOutput
    {
        /// <summary>
        /// 退款是否成功
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// 退款单号
        /// </summary>
        public string RefundId { get; set; }

        /// <summary>
        /// 退款时间
        /// </summary>
        public DateTime RefundTime { get; set; }

        /// <summary>
        /// 错误信息（如果退款失败）
        /// </summary>
        public string ErrorMessage { get; set; }
    }
}