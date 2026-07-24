using Furion;
using Furion.DependencyInjection;
using Furion.FriendlyException;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Onionbit.Application.Order.Dtos.input;
using Onionbit.Application.Order.Dtos.output;
using Onionbit.Comm;
using System;
using System.Collections.Generic;
using System.Data;

namespace Onionbit.Application.Order.Services
{
    public class OrderService : IOrderService, IScoped
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly ISql _sql;
        private readonly RabbitMQHelper _rabbitMQ;
        private readonly string MessageQueueName;
        private readonly ILogger<OrderService> _logger;
        public OrderService(ILogger<OrderService> logger, IHttpContextAccessor contextAccessor, ISql sql, [FromServices] IConfiguration configuration, RabbitMQHelper rabbitMQ)
        {
            _contextAccessor = contextAccessor;
            _sql = sql;
            MessageQueueName = configuration["RabbitMQConfigurations:BIData"];
            _rabbitMQ = rabbitMQ;
            _logger = logger;
        }

        /// <summary>
        /// 创建订单
        /// </summary>
        /// <param name="createOrderInput"></param>
        /// <returns></returns>
        public string CreateOrder(CreateOrderInput createOrderInput)
        {
            string mOrderId = Guid.NewGuid().ToString();
            var sqls = new List<string>();
            string mInsert = @"insert into fin_order(F_OrderId,F_OrderNo,F_ProdId,F_Date,F_Status,F_UserId,F_PayProject,F_Amount,F_CreateDate,F_DeleteMark,F_Remark)
                               VALUES('{0}', '{1}', '{2}', '{3}', '{4}', '{5}','{6}','{7}','{8}','{9}','{10}')";
            mInsert = string.Format(mInsert, mOrderId, mOrderId, createOrderInput.F_ProdId, DateTime.Now.ToString("yyyy-MM-dd"), "0", createOrderInput.F_UserId, createOrderInput.F_PayProject, createOrderInput.F_Amount, DateTime.Now, "0", createOrderInput.F_Remark);
            sqls.Add(mInsert);
            if (!_rabbitMQ.Enqueue(MessageQueueName, new RabbitMQResponse()
            {
                host = App.HttpContext?.Request.Host.Value,
                data = JsonConvert.SerializeObject(new EqueueDataModel() { name = "BIData", businessTopic = "BIData", key = "BIData", sqls = sqls })
            })) throw Oops.Bah("创建订单失败").StatusCode(201);
            return mOrderId;
        }


        public List<GPTProdInfoOutput> QueryGPTProdList(string F_SystemId)
        {
            return _sql.QueryGPTProdList(F_SystemId);
        }

        public List<OnionProdOutput> QueryOnionProdList()
        {
            return _sql.QueryOnionProdList();
        }

        public List<OnionProdServicesOutput> QueryOnionProdServices(string F_ProdId)
        {

            return _sql.QueryOnionProdServices(F_ProdId);
        }


        /// <summary>
        /// 获取订单支付状态
        /// </summary>
        /// <param name="F_OrderNo"></param>
        /// <returns></returns>
        public OrderPaymentInfoOutput OrderPaymentCompleted(string F_OrderNo)
        {
            OrderPaymentInfoOutput orderPaymentInfoOutput = new OrderPaymentInfoOutput();

            DataTable dataTable = _sql.OrderPaymentCompleted(F_OrderNo);

            if (dataTable.Rows.Count == 0)
            {
                orderPaymentInfoOutput.PayStatus = false;
                orderPaymentInfoOutput.PayMsg = "无当前订单信息";
            }
            else
            {
                if (dataTable.Rows[0]["F_PayStatus"].ToString().Trim() == "2")
                {
                    orderPaymentInfoOutput.PayStatus = true;
                    orderPaymentInfoOutput.PayMsg = "支付成功";
                }
                else
                {
                    orderPaymentInfoOutput.PayStatus = false;
                    orderPaymentInfoOutput.PayMsg = "未支付";
                }
            }
            return orderPaymentInfoOutput;
        }

    }
}
