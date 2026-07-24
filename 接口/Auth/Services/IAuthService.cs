using Onionbit.Application.Auth.Dtos.input;
using Onionbit.Application.Auth.Dtos.output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Auth.Services
{
    public interface IAuthService
    {
        /// <summary>
        /// 用户登出
        /// </summary>
        /// <returns></returns>
        bool Logout();

        /// <summary>
        /// 刷新令牌
        /// </summary>
        /// <param name="refreshTokenInput"></param>
        /// <returns></returns>
        RefreshTokenOutput RefreshToken(RefreshTokenInput refreshTokenInput);
    }
}