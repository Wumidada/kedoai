using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Scenario.Dtos.input
{
    public class UpdateAgentInput
    {
        /// <summary>
        /// 智能体ID
        /// </summary>
        public string agentId { get; set; }

        /// <summary>
        /// 智能体名称
        /// </summary>
        public string name { get; set; }

        /// <summary>
        /// 智能体描述
        /// </summary>
        public string description { get; set; }

        /// <summary>
        /// 智能体类型
        /// </summary>
        public string type { get; set; }

        /// <summary>
        /// 智能体配置
        /// </summary>
        public AgentConfiguration configuration { get; set; }

        /// <summary>
        /// 智能体参数
        /// </summary>
        public Dictionary<string, object> parameters { get; set; }

        /// <summary>
        /// 智能体技能列表
        /// </summary>
        public List<string> skills { get; set; }
    }
}