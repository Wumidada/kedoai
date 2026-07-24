using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Scenario.Dtos.input
{
    public class QueryAgentExecutionHistoryInput
    {
        /// <summary>
        /// 智能体ID
        /// </summary>
        public string agentId { get; set; }

        /// <summary>
        /// 页码
        /// </summary>
        public int pageIndex { get; set; } = 1;

        /// <summary>
        /// 每页数量
        /// </summary>
        public int pageSize { get; set; } = 10;

        /// <summary>
        /// 开始时间
        /// </summary>
        public string startTime { get; set; }

        /// <summary>
        /// 结束时间
        /// </summary>
        public string endTime { get; set; }

        /// <summary>
        /// 状态
        /// </summary>
        public string status { get; set; }
    }
}