using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Scenario.Dtos.output
{
    public class DeleteAgentOutput
    {
        /// <summary>
        /// 智能体是否删除成功
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// 智能体ID
        /// </summary>
        public string AgentId { get; set; }

        /// <summary>
        /// 删除时间
        /// </summary>
        public DateTime DeleteTime { get; set; }

        /// <summary>
        /// 错误信息（如果删除失败）
        /// </summary>
        public string ErrorMessage { get; set; }
    }
}