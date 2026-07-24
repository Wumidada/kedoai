using Furion.DynamicApiController;
using Microsoft.AspNetCore.Mvc;
using Onionbit.Application.Order.Dtos.input;
using Onionbit.Application.Order.Dtos.output;
using Onionbit.Application.Order.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Order
{
    public class OrderServices : IDynamicApiController
    {
        private readonly IOrderService _orderService;

        public OrderServices(IOrderService orderService)
        {
            _orderService = orderService;
        }

        /// <summary>
        /// 查询订单列表
        /// </summary>
        /// <param name="queryOrderListInput"></param>
        /// <returns></returns>
        [HttpGet]
        public OrderListOutput QueryOrderList([FromQuery] QueryOrderListInput queryOrderListInput)
        {
            return _orderService.QueryOrderList(queryOrderListInput);
        }

        /// <summary>
        /// 查询订单详情
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        [HttpGet]
        public OrderDetailOutput QueryOrderDetail([FromQuery] string orderId)
        {
            return _orderService.QueryOrderDetail(orderId);
        }

        /// <summary>
        /// 创建订单
        /// </summary>
        /// <param name="createOrderInput"></param>
        /// <returns></returns>
        [HttpPost]
        public CreateOrderOutput CreateOrder(CreateOrderInput createOrderInput)
        {
            return _orderService.CreateOrder(createOrderInput);
        }

        /// <summary>
        /// 获取所有订单
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public OrderListOutput GetOrders()
        {
            return _orderService.GetOrders();
        }

        /// <summary>
        /// 获取单个订单
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        [HttpGet]
        public OrderDetailOutput GetOrderById([FromQuery] string orderId)
        {
            return _orderService.GetOrderById(orderId);
        }

        /// <summary>
        /// 更新订单状态
        /// </summary>
        /// <param name="updateOrderStatusInput"></param>
        /// <returns></returns>
        [HttpPatch]
        public UpdateOrderStatusOutput UpdateOrderStatus(UpdateOrderStatusInput updateOrderStatusInput)
        {
            return _orderService.UpdateOrderStatus(updateOrderStatusInput);
        }

        /// <summary>
        /// 取消订单
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        [HttpPatch]
        public CancelOrderOutput CancelOrder([FromQuery] string orderId)
        {
            return _orderService.CancelOrder(orderId);
        }
    }
}