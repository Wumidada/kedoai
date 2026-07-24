using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Scenario.Dtos.input
{
    public class CreateAgentInput
    {
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

    public class AgentConfiguration
    {
        /// <summary>
        /// 模型
        /// </summary>
        public string model { get; set; }

        /// <summary>
        /// 温度
        /// </summary>
        public float temperature { get; set; }

        /// <summary>
        /// 最大 tokens
        /// </summary>
        public int maxTokens { get; set; }

        /// <summary>
        /// 系统提示
        /// </summary>
        public string systemPrompt { get; set; }
    }
}