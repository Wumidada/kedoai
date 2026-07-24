using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Order.Dtos.input
{
    public class UpdateOrderStatusInput
    {
        /// <summary>
        /// 订单ID
        /// </summary>
        public string orderId { get; set; }

        /// <summary>
        /// 订单状态
        /// </summary>
        public string status { get; set; }
    }
}