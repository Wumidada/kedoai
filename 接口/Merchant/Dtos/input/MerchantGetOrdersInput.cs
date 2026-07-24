using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Merchant.Dtos.input
{
    public class MerchantGetOrdersInput
    {
        /// <summary>
        /// 订单状态筛选
        /// </summary>
        public string status { get; set; }

        /// <summary>
        /// 开始日期
        /// </summary>
        public string startDate { get; set; }

        /// <summary>
        /// 结束日期
        /// </summary>
        public string endDate { get; set; }
    }
}