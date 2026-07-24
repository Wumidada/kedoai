using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Skill.Dtos.output
{
    public class PurchaseSkillOutput
    {
        /// <summary>
        /// 操作是否成功
        /// </summary>
        public bool success { get; set; }

        /// <summary>
        /// 订单ID
        /// </summary>
        public string orderId { get; set; }

        /// <summary>
        /// 支付链接
        /// </summary>
        public string paymentUrl { get; set; }
    }
}