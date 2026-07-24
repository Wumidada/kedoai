using Onionbit.Application.Logistics.Dtos.input;
using Onionbit.Application.Logistics.Dtos.output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Logistics.Services
{
    public interface ILogisticsService
    {
        /// <summary>
        /// 更新物流信息
        /// </summary>
        /// <param name="orderId"></param>
        /// <param name="updateShippingInput"></param>
        /// <returns></returns>
        UpdateShippingOutput UpdateShipping(string orderId, UpdateShippingInput updateShippingInput);

        /// <summary>
        /// 查询物流轨迹
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        LogisticsTrackingOutput GetLogisticsTracking(string orderId);
    }
}