using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Order.Dtos.output
{
    public class CancelOrderOutput
    {
        /// <summary>
        /// 订单是否取消成功
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// 订单ID
        /// </summary>
        public string OrderId { get; set; }

        /// <summary>
        /// 取消时间
        /// </summary>
        public DateTime CancelTime { get; set; }

        /// <summary>
        /// 错误信息（如果取消失败）
        /// </summary>
        public string ErrorMessage { get; set; }
    }
}