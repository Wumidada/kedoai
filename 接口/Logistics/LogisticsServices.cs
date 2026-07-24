using Furion.DynamicApiController;
using Microsoft.AspNetCore.Mvc;
using Onionbit.Application.Logistics.Dtos.input;
using Onionbit.Application.Logistics.Dtos.output;
using Onionbit.Application.Logistics.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Logistics
{
    public class LogisticsServices : IDynamicApiController
    {
        private readonly ILogisticsService _logisticsService;

        public LogisticsServices(ILogisticsService logisticsService)
        {
            _logisticsService = logisticsService;
        }

        /// <summary>
        /// 更新物流信息
        /// </summary>
        /// <param name="orderId"></param>
        /// <param name="updateShippingInput"></param>
        /// <returns></returns>
        [HttpPatch]
        public UpdateShippingOutput UpdateShipping(string orderId, UpdateShippingInput updateShippingInput)
        {
            return _logisticsService.UpdateShipping(orderId, updateShippingInput);
        }

        /// <summary>
        /// 查询物流轨迹
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        [HttpGet]
        public LogisticsTrackingOutput GetLogisticsTracking(string orderId)
        {
            return _logisticsService.GetLogisticsTracking(orderId);
        }
    }
}