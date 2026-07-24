using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.System.Dtos.output
{
    public class SystemInfoOutput
    {
        /// <summary>
        /// 系统名称
        /// </summary>
        public string systemName { get; set; }

        /// <summary>
        /// 系统版本
        /// </summary>
        public string version { get; set; }

        /// <summary>
        /// 系统状态
        /// </summary>
        public string status { get; set; }

        /// <summary>
        /// 系统运行时间
        /// </summary>
        public string uptime { get; set; }

        /// <summary>
        /// 服务器信息
        /// </summary>
        public ServerInfo serverInfo { get; set; }

        public class ServerInfo
        {
            /// <summary>
            /// 服务器名称
            /// </summary>
            public string name { get; set; }

            /// <summary>
            /// 服务器IP
            /// </summary>
            public string ip { get; set; }

            /// <summary>
            /// 操作系统
            /// </summary>
            public string os { get; set; }

            /// <summary>
            /// 内存使用情况
            /// </summary>
            public MemoryInfo memory { get; set; }

            public class MemoryInfo
            {
                /// <summary>
                /// 总内存
                /// </summary>
                public long total { get; set; }

                /// <summary>
                /// 已使用内存
                /// </summary>
                public long used { get; set; }

                /// <summary>
                /// 内存使用率
                /// </summary>
                public double usage { get; set; }
            }
        }
    }
}