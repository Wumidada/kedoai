using Onionbit.Application.Merchant.Dtos.input;
using Onionbit.Application.Merchant.Dtos.output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Merchant.Services
{
    public interface IMerchantService
    {
        /// <summary>
        /// 商家登录
        /// </summary>
        /// <param name="loginInput"></param>
        /// <returns></returns>
        MerchantLoginOutput Login(MerchantLoginInput loginInput);

        /// <summary>
        /// 商家登出
        /// </summary>
        /// <param name="logoutInput"></param>
        /// <returns></returns>
        bool Logout(MerchantLogoutInput logoutInput);

        /// <summary>
        /// 获取商家订单列表
        /// </summary>
        /// <param name="getOrdersInput"></param>
        /// <returns></returns>
        MerchantOrdersOutput GetOrders(MerchantGetOrdersInput getOrdersInput);

        /// <summary>
        /// 更新订单状态
        /// </summary>
        /// <param name="orderId"></param>
        /// <param name="updateStatusInput"></param>
        /// <returns></returns>
        UpdateOrderStatusOutput UpdateOrderStatus(string orderId, UpdateOrderStatusInput updateStatusInput);

        /// <summary>
        /// 销售统计
        /// </summary>
        /// <param name="salesStatisticsInput"></param>
        /// <returns></returns>
        SalesStatisticsOutput GetSalesStatistics(SalesStatisticsInput salesStatisticsInput);
    }
}