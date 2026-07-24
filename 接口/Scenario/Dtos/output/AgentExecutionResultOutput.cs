using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Scenario.Dtos.output
{
    public class AgentExecutionResultOutput
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
        /// 执行状态
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// 执行结果
        /// </summary>
        public object Result { get; set; }

        /// <summary>
        /// 执行日志
        /// </summary>
        public List<string> Logs { get; set; }

        /// <summary>
        /// 执行开始时间
        /// </summary>
        public DateTime StartTime { get; set; }

        /// <summary>
        /// 执行结束时间
        /// </summary>
        public DateTime EndTime { get; set; }

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