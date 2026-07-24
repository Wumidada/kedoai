using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Merchant.Dtos.input
{
    public class SalesStatisticsInput
    {
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