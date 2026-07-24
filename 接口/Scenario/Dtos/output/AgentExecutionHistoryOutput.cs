using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Scenario.Dtos.output
{
    public class AgentExecutionHistoryOutput
    {
        /// <summary>
        /// 执行历史列表
        /// </summary>
        public List<AgentExecutionHistoryItemOutput> Executions { get; set; }

        /// <summary>
        /// 总记录数
        /// </summary>
        public int TotalCount { get; set; }

        /// <summary>
        /// 总页数
        /// </summary>
        public int TotalPages { get; set; }

        /// <summary>
        /// 当前页码
        /// </summary>
        public int CurrentPage { get; set; }
    }

    public class AgentExecutionHistoryItemOutput
    {
        /// <summary>
        /// 执行ID
        /// </summary>
        public string ExecutionId { get; set; }

        /// <summary>
        /// 智能体ID
        /// </summary>
        public string AgentId { get; set; }

        /// <summary>
        /// 智能体名称
        /// </summary>
        public string AgentName { get; set; }

        /// <summary>
        /// 执行状态
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// 执行开始时间
        /// </summary>
        public DateTime StartTime { get; set; }

        /// <summary>
        /// 执行结束时间
        /// </summary>
        public DateTime? EndTime { get; set; }

        /// <summary>
        /// 执行耗时（秒）
        /// </summary>
        public int Duration { get; set; }

        /// <summary>
        /// 错误信息（如果执行失败）
        /// </summary>
        public string ErrorMessage { get; set; }
    }
}