using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Merchant.Dtos.output
{
    public class MerchantLoginOutput
    {
        /// <summary>
        /// 认证令牌
        /// </summary>
        public string token { get; set; }

        /// <summary>
        /// 商家信息
        /// </summary>
        public MerchantInfo merchantInfo { get; set; }

        public class MerchantInfo
        {
            /// <summary>
            /// 商家ID
            /// </summary>
            public string id { get; set; }

            /// <summary>
            /// 商家名称
            /// </summary>
            public string name { get; set; }

            /// <summary>
            /// 商家邮箱
            /// </summary>
            public string email { get; set; }

            /// <summary>
            /// 商家电话
            /// </summary>
            public string phone { get; set; }
        }
    }
}