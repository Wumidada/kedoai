using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Scenario.Dtos.output
{
    public class CreateAgentOutput
    {
        /// <summary>
        /// 智能体是否创建成功
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// 智能体ID
        /// </summary>
        public string AgentId { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 错误信息（如果创建失败）
        /// </summary>
        public string ErrorMessage { get; set; }
    }
}