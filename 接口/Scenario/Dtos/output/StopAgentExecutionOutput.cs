using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Scenario.Dtos.output
{
    public class StopAgentExecutionOutput
    {
        /// <summary>
        /// 停止是否成功
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// 执行ID
        /// </summary>
        public string ExecutionId { get; set; }

        /// <summary>
        /// 停止时间
        /// </summary>
        public DateTime StopTime { get; set; }

        /// <summary>
        /// 错误信息（如果停止失败）
        /// </summary>
        public string ErrorMessage { get; set; }
    }
}