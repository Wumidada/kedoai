using Furion.DynamicApiController;
using Microsoft.AspNetCore.Mvc;
using Onionbit.Application.Auth.Dtos.input;
using Onionbit.Application.Auth.Dtos.output;
using Onionbit.Application.Auth.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Auth
{
    public class AuthServices : IDynamicApiController
    {
        private readonly IAuthService _authService;

        public AuthServices(IAuthService authService)
        {
            _authService = authService;
        }

        /// <summary>
        /// 用户登出
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public bool Logout()
        {
            return _authService.Logout();
        }

        /// <summary>
        /// 刷新令牌
        /// </summary>
        /// <param name="refreshTokenInput"></param>
        /// <returns></returns>
        [HttpPost]
        public RefreshTokenOutput RefreshToken(RefreshTokenInput refreshTokenInput)
        {
            return _authService.RefreshToken(refreshTokenInput);
        }
    }
}