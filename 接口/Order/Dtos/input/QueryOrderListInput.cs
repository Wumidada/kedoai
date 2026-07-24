using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Order.Dtos.input
{
    public class QueryOrderListInput
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        public string userId { get; set; }

        /// <summary>
        /// 页码
        /// </summary>
        public int pageIndex { get; set; } = 1;

        /// <summary>
        /// 每页数量
        /// </summary>
        public int pageSize { get; set; } = 10;

        /// <summary>
        /// 订单状态
        /// </summary>
        public string status { get; set; }
    }
}