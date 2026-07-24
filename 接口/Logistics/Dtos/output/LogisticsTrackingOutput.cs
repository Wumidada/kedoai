using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Logistics.Dtos.output
{
    public class LogisticsTrackingOutput
    {
        /// <summary>
        /// 物流单号
        /// </summary>
        public string trackingNumber { get; set; }

        /// <summary>
        /// 快递公司
        /// </summary>
        public string carrier { get; set; }

        /// <summary>
        /// 物流轨迹列表
        /// </summary>
        public List<LogisticsTrace> traces { get; set; }

        public class LogisticsTrace
        {
            /// <summary>
            /// 时间
            /// </summary>
            public string time { get; set; }

            /// <summary>
            /// 地点
            /// </summary>
            public string location { get; set; }

            /// <summary>
            /// 描述
            /// </summary>
            public string description { get; set; }
        }
    }
}