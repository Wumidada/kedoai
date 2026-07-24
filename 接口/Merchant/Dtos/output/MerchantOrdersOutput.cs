using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Merchant.Dtos.output
{
    public class MerchantOrdersOutput
    {
        /// <summary>
        /// 订单列表
        /// </summary>
        public List<OrderItem> orders { get; set; }

        public class OrderItem
        {
            /// <summary>
            /// 订单ID
            /// </summary>
            public string id { get; set; }

            /// <summary>
            /// 创建时间
            /// </summary>
            public string createdAt { get; set; }

            /// <summary>
            /// 订单状态
            /// </summary>
            public string status { get; set; }

            /// <summary>
            /// 客户信息
            /// </summary>
            public CustomerInfo customerInfo { get; set; }

            /// <summary>
            /// 订单总金额
            /// </summary>
            public double total { get; set; }

            public class CustomerInfo
            {
                /// <summary>
                /// 客户姓名
                /// </summary>
                public string name { get; set; }

                /// <summary>
                /// 客户电话
                /// </summary>
                public string phone { get; set; }

                /// <summary>
                /// 客户地址
                /// </summary>
                public string address { get; set; }
            }
        }
    }
}