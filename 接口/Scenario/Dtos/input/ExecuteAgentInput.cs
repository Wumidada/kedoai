using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Scenario.Dtos.input
{
    public class ExecuteAgentInput
    {
        /// <summary>
        /// 智能体ID
        /// </summary>
        public string agentId { get; set; }

        /// <summary>
        /// 执行参数
        /// </summary>
        public Dictionary<string, object> parameters { get; set; }

        /// <summary>
        /// 执行模式
        /// </summary>
        public string mode { get; set; }

        /// <summary>
        /// 执行超时时间（秒）
        /// </summary>
        public int timeout { get; set; } = 300;
    }
}