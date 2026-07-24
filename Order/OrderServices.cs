using Furion.DynamicApiController;
using Microsoft.AspNetCore.Mvc;
// using Onionbit.Application.GPTPPT.Service;
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
        private readonly IOrderService _gptOrderService;

        public OrderServices(IOrderService gptOrderService)
        {
            _gptOrderService = gptOrderService;
        }

        /// <summary>
        /// 查询产品列表（弃用）
        /// </summary>
        /// <param name="F_SystemId"></param>
        /// <returns></returns>
        [HttpGet]
        public List<GPTProdInfoOutput> QueryGPTProdList([FromQuery] string F_SystemId)
        {
            return _gptOrderService.QueryGPTProdList(F_SystemId);
        }
        /// <summary>
        /// 查询产品列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<OnionProdOutput> QueryOnionProdList()
        {
            return _gptOrderService.QueryOnionProdList();
        }

        /// <summary>
        /// 查询产品服务
        /// </summary>
        /// <param name="F_ProdId"></param>
        /// <returns></returns>
        [HttpGet]
        public List<OnionProdServicesOutput> QueryOnionProdServices([FromQuery] string F_ProdId)
        {
            return _gptOrderService.QueryOnionProdServices(F_ProdId);
        }

        /// <summary>
        /// 创建订单
        /// </summary>
        /// <param name="createOrderInput"></param>
        /// <returns></returns>
        [HttpPost]
        public string CreateOrder(CreateOrderInput createOrderInput)
        {
            return _gptOrderService.CreateOrder(createOrderInput);
        }


        /// <summary>
        /// 查询订单支付状态
        /// </summary>
        /// <param name="OrderId"></param>
        /// <returns></returns>
        [HttpGet]
        public OrderPaymentInfoOutput OrderPaymentCompleted([FromQuery] string OrderId)
        {
            return _gptOrderService.OrderPaymentCompleted(OrderId);
        }
    }
}
