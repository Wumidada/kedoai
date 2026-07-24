using Furion.DynamicApiController;
using Microsoft.AspNetCore.Mvc;
using Onionbit.Application.Payment.Dtos.input;
using Onionbit.Application.Payment.Dtos.output;
using Onionbit.Application.Payment.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Payment
{
    public class PaymentServices : IDynamicApiController
    {
        private readonly IPaymentService _paymentService;

        public PaymentServices(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        /// <summary>
        /// 申请退款
        /// </summary>
        /// <param name="refundInput"></param>
        /// <returns></returns>
        [HttpPost]
        public RefundOutput Refund(RefundInput refundInput)
        {
            return _paymentService.Refund(refundInput);
        }

        /// <summary>
        /// 支付回调
        /// </summary>
        /// <param name="callbackInput"></param>
        /// <returns></returns>
        [HttpPost]
        public PaymentCallbackOutput PaymentCallback([FromBody] PaymentCallbackInput callbackInput)
        {
            return _paymentService.PaymentCallback(callbackInput);
        }

        /// <summary>
        /// 支付状态查询
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        [HttpGet]
        public PaymentStatusOutput QueryPaymentStatus([FromQuery] string orderId)
        {
            return _paymentService.QueryPaymentStatus(orderId);
        }
    }
}