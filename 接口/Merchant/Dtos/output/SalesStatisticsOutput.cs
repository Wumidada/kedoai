using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Merchant.Dtos.output
{
    public class SalesStatisticsOutput
    {
        /// <summary>
        /// 总销售额
        /// </summary>
        public double totalSales { get; set; }

        /// <summary>
        /// 订单数量
        /// </summary>
        public int orderCount { get; set; }

        /// <summary>
        /// 销售趋势数据
        /// </summary>
        public List<SalesTrendItem> salesTrend { get; set; }

        /// <summary>
        /// 热销产品列表
        /// </summary>
        public List<TopProduct> topProducts { get; set; }

        public class SalesTrendItem
        {
            /// <summary>
            /// 日期
            /// </summary>
            public string date { get; set; }

            /// <summary>
            /// 销售额
            /// </summary>
            public double sales { get; set; }

            /// <summary>
            /// 订单数
            /// </summary>
            public int orders { get; set; }
        }

        public class TopProduct
        {
            /// <summary>
            /// 产品ID
            /// </summary>
            public string productId { get; set; }

            /// <summary>
            /// 产品名称
            /// </summary>
            public string productName { get; set; }

            /// <summary>
            /// 销售数量
            /// </summary>
            public int quantity { get; set; }

            /// <summary>
            /// 销售金额
            /// </summary>
            public double amount { get; set; }
        }
    }
}