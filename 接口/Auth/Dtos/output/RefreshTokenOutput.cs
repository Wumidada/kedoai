using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Auth.Dtos.output
{
    public class RefreshTokenOutput
    {
        /// <summary>
        /// 访问令牌
        /// </summary>
        public string accessToken { get; set; }

        /// <summary>
        /// 刷新令牌
        /// </summary>
        public string refreshToken { get; set; }

        /// <summary>
        /// 令牌过期时间
        /// </summary>
        public long expiresIn { get; set; }
    }
}