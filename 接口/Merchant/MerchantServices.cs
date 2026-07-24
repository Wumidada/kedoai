using Furion.DynamicApiController;
using Microsoft.AspNetCore.Mvc;
using Onionbit.Application.Merchant.Dtos.input;
using Onionbit.Application.Merchant.Dtos.output;
using Onionbit.Application.Merchant.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Merchant
{
    public class MerchantServices : IDynamicApiController
    {
        private readonly IMerchantService _merchantService;

        public MerchantServices(IMerchantService merchantService)
        {
            _merchantService = merchantService;
        }

        /// <summary>
        /// 商家登录
        /// </summary>
        /// <param name="loginInput"></param>
        /// <returns></returns>
        [HttpPost]
        public MerchantLoginOutput Login(MerchantLoginInput loginInput)
        {
            return _merchantService.Login(loginInput);
        }

        /// <summary>
        /// 商家登出
        /// </summary>
        /// <param name="logoutInput"></param>
        /// <returns></returns>
        [HttpPost]
        public bool Logout(MerchantLogoutInput logoutInput)
        {
            return _merchantService.Logout(logoutInput);
        }

        /// <summary>
        /// 获取商家订单列表
        /// </summary>
        /// <param name="getOrdersInput"></param>
        /// <returns></returns>
        [HttpGet]
        public MerchantOrdersOutput GetOrders([FromQuery] MerchantGetOrdersInput getOrdersInput)
        {
            return _merchantService.GetOrders(getOrdersInput);
        }

        /// <summary>
        /// 更新订单状态
        /// </summary>
        /// <param name="orderId"></param>
        /// <param name="updateStatusInput"></param>
        /// <returns></returns>
        [HttpPatch]
        public UpdateOrderStatusOutput UpdateOrderStatus(string orderId, UpdateOrderStatusInput updateStatusInput)
        {
            return _merchantService.UpdateOrderStatus(orderId, updateStatusInput);
        }

        /// <summary>
        /// 销售统计
        /// </summary>
        /// <param name="salesStatisticsInput"></param>
        /// <returns></returns>
        [HttpGet]
        public SalesStatisticsOutput GetSalesStatistics([FromQuery] SalesStatisticsInput salesStatisticsInput)
        {
            return _merchantService.GetSalesStatistics(salesStatisticsInput);
        }
    }
}