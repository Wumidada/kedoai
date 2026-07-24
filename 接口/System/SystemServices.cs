using Furion.DynamicApiController;
using Microsoft.AspNetCore.Mvc;
using Onionbit.Application.System.Dtos.output;
using Onionbit.Application.System.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.System
{
    public class SystemServices : IDynamicApiController
    {
        private readonly ISystemService _systemService;

        public SystemServices(ISystemService systemService)
        {
            _systemService = systemService;
        }

        /// <summary>
        /// 获取系统信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public SystemInfoOutput GetSystemInfo()
        {
            return _systemService.GetSystemInfo();
        }

        /// <summary>
        /// 获取版本信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public VersionInfoOutput GetVersionInfo()
        {
            return _systemService.GetVersionInfo();
        }
    }
}