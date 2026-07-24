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
        /// 创建支付订单 
        /// </summary>
        /// <param name="createOrderInput"></param>
        /// <returns></returns>
        public string CreateOrder(CreateOrderInput createOrderInput);


        public List<GPTProdInfoOutput> QueryGPTProdList(string F_SystemId);

        public List<OnionProdOutput> QueryOnionProdList();
        public List<OnionProdServicesOutput> QueryOnionProdServices(string F_ProdId);

        OrderPaymentInfoOutput OrderPaymentCompleted(string OrderId);
    }
}
