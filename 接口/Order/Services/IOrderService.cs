using Onionbit.Application.Order.Dtos.input;
using Onionbit.Application.Order.Dtos.output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Order.Services
{
    public interface IOrderService
    {
        /// <summary>
        /// 查询订单列表
        /// </summary>
        /// <param name="queryOrderListInput">查询订单列表输入</param>
        /// <returns></returns>
        OrderListOutput QueryOrderList(QueryOrderListInput queryOrderListInput);

        /// <summary>
        /// 查询订单详情
        /// </summary>
        /// <param name="orderId">订单ID</param>
        /// <returns></returns>
        OrderDetailOutput QueryOrderDetail(string orderId);

        /// <summary>
        /// 创建订单
        /// </summary>
        /// <param name="createOrderInput">创建订单输入</param>
        /// <returns></returns>
        CreateOrderOutput CreateOrder(CreateOrderInput createOrderInput);

        /// <summary>
        /// 获取所有订单
        /// </summary>
        /// <returns></returns>
        OrderListOutput GetOrders();

        /// <summary>
        /// 获取单个订单
        /// </summary>
        /// <param name="orderId">订单ID</param>
        /// <returns></returns>
        OrderDetailOutput GetOrderById(string orderId);

        /// <summary>
        /// 更新订单状态
        /// </summary>
        /// <param name="updateOrderStatusInput">更新订单状态输入</param>
        /// <returns></returns>
        UpdateOrderStatusOutput UpdateOrderStatus(UpdateOrderStatusInput updateOrderStatusInput);

        /// <summary>
        /// 取消订单
        /// </summary>
        /// <param name="orderId">订单ID</param>
        /// <returns></returns>
        CancelOrderOutput CancelOrder(string orderId);
    }
}