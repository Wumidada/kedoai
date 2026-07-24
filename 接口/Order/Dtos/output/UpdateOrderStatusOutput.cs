using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Order.Dtos.output
{
    public class UpdateOrderStatusOutput
    {
        /// <summary>
        /// 订单状态是否更新成功
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// 订单ID
        /// </summary>
        public string OrderId { get; set; }

        /// <summary>
        /// 新的订单状态
        /// </summary>
        public string NewStatus { get; set; }

        /// <summary>
        /// 更新时间
        /// </summary>
        public DateTime UpdateTime { get; set; }

        /// <summary>
        /// 错误信息（如果更新失败）
        /// </summary>
        public string ErrorMessage { get; set; }
    }
}