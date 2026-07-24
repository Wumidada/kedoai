using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Scenario.Dtos.output
{
    public class UpdateAgentOutput
    {
        /// <summary>
        /// 智能体是否更新成功
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// 智能体ID
        /// </summary>
        public string AgentId { get; set; }

        /// <summary>
        /// 更新时间
        /// </summary>
        public DateTime UpdateTime { get; set; }

        /// <summary>
        /// 错误信息（如果更新失败）
        /// </summary>
        public string ErrorMessage { get; set; }
    }
}