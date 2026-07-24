using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.System.Dtos.output
{
    public class VersionInfoOutput
    {
        /// <summary>
        /// 当前版本
        /// </summary>
        public string currentVersion { get; set; }

        /// <summary>
        /// 最新版本
        /// </summary>
        public string latestVersion { get; set; }

        /// <summary>
        /// 是否需要更新
        /// </summary>
        public bool needUpdate { get; set; }

        /// <summary>
        /// 更新说明
        /// </summary>
        public string updateDescription { get; set; }

        /// <summary>
        /// 更新时间
        /// </summary>
        public string updateTime { get; set; }

        /// <summary>
        /// 更新链接
        /// </summary>
        public string updateUrl { get; set; }
    }
}