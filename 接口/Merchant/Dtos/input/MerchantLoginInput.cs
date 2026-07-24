using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Merchant.Dtos.input
{
    public class MerchantLoginInput
    {
        /// <summary>
        /// 商家用户名
        /// </summary>
        public string username { get; set; }

        /// <summary>
        /// 商家密码
        /// </summary>
        public string password { get; set; }
    }
}