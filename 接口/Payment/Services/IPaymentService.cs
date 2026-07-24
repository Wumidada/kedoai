using Onionbit.Application.Payment.Dtos.input;
using Onionbit.Application.Payment.Dtos.output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Payment.Services
{
    public interface IPaymentService
    {
        /// <summary>
        /// 申请退款
        /// </summary>
        /// <param name="refundInput">退款输入</param>
        /// <returns></returns>
        RefundOutput Refund(RefundInput refundInput);

        /// <summary>
        /// 支付回调
        /// </summary>
        /// <param name="callbackInput">回调输入</param>
        /// <returns></returns>
        PaymentCallbackOutput PaymentCallback(PaymentCallbackInput callbackInput);

        /// <summary>
        /// 支付状态查询
        /// </summary>
        /// <param name="orderId">订单ID</param>
        /// <returns></returns>
        PaymentStatusOutput QueryPaymentStatus(string orderId);
    }
}