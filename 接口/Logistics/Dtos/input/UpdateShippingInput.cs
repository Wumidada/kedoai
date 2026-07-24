using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Logistics.Dtos.input
{
    public class UpdateShippingInput
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
    }
}