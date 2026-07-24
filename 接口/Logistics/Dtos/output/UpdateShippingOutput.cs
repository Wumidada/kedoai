using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Logistics.Dtos.output
{
    public class UpdateShippingOutput
    {
        /// <summary>
        /// 操作是否成功
        /// </summary>
        public bool success { get; set; }

        /// <summary>
        /// 更新后的物流信息
        /// </summary>
        public ShippingInfo shippingInfo { get; set; }

        public class ShippingInfo
        {
            /// <summary>
            /// 快递公司
            /// </summary>
            public string carrier { get; set; }

            /// <summary>
            /// 物流单号
            /// </summary>
            public string trackingNumber { get; set; }

            /// <summary>
            /// 物流状态
            /// </summary>
            public string status { get; set; }

            /// <summary>
            /// 更新时间
            /// </summary>
            public string updatedAt { get; set; }
        }
    }
}