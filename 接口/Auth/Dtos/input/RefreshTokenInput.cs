using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Auth.Dtos.input
{
    public class RefreshTokenInput
    {
        /// <summary>
        /// 刷新令牌
        /// </summary>
        public string refreshToken { get; set; }
    }
}