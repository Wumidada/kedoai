using Onionbit.Application.System.Dtos.output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.System.Services
{
    public interface ISystemService
    {
        /// <summary>
        /// 获取系统信息
        /// </summary>
        /// <returns></returns>
        SystemInfoOutput GetSystemInfo();

        /// <summary>
        /// 获取版本信息
        /// </summary>
        /// <returns></returns>
        VersionInfoOutput GetVersionInfo();
    }
}