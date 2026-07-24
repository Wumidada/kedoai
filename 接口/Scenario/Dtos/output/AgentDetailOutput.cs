using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Scenario.Dtos.output
{
    public class AgentDetailOutput
    {
        /// <summary>
        /// 智能体ID
        /// </summary>
        public string AgentId { get; set; }

        /// <summary>
        /// 智能体名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 智能体描述
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 智能体类型
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// 智能体状态
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// 智能体配置
        /// </summary>
        public AgentConfigurationOutput Configuration { get; set; }

        /// <summary>
        /// 智能体参数
        /// </summary>
        public Dictionary<string, object> Parameters { get; set; }

        /// <summary>
        /// 智能体技能列表
        /// </summary>
        public List<SkillItemOutput> Skills { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 最后更新时间
        /// </summary>
        public DateTime UpdateTime { get; set; }

        /// <summary>
        /// 执行次数
        /// </summary>
        public int ExecutionCount { get; set; }
    }

    public class AgentConfigurationOutput
    {
        /// <summary>
        /// 模型
        /// </summary>
        public string Model { get; set; }

        /// <summary>
        /// 温度
        /// </summary>
        public float Temperature { get; set; }

        /// <summary>
        /// 最大 tokens
        /// </summary>
        public int MaxTokens { get; set; }

        /// <summary>
        /// 系统提示
        /// </summary>
        public string SystemPrompt { get; set; }
    }

    public class SkillItemOutput
    {
        /// <summary>
        /// 技能ID
        /// </summary>
        public string SkillId { get; set; }

        /// <summary>
        /// 技能名称
        /// </summary>
        public string SkillName { get; set; }

        /// <summary>
        /// 技能版本
        /// </summary>
        public string SkillVersion { get; set; }
    }
}