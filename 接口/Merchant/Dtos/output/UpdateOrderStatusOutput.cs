using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Merchant.Dtos.output
{
    public class UpdateOrderStatusOutput
    {
        /// <summary>
        /// 操作是否成功
        /// </summary>
        public bool success { get; set; }

        /// <summary>
        /// 更新后的订单状态
        /// </summary>
        public string status { get; set; }
    }
}