using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Scenario.Dtos.output
{
    public class AgentListOutput
    {
        /// <summary>
        /// 智能体列表
        /// </summary>
        public List<AgentItemOutput> Agents { get; set; }

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

    public class AgentItemOutput
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
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 最后更新时间
        /// </summary>
        public DateTime UpdateTime { get; set; }

        /// <summary>
        /// 技能数量
        /// </summary>
        public int SkillCount { get; set; }
    }
}