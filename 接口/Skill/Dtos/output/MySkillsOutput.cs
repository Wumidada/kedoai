using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Skill.Dtos.output
{
    public class MySkillsOutput
    {
        /// <summary>
        /// 技能列表
        /// </summary>
        public List<SkillItem> skills { get; set; }

        public class SkillItem
        {
            /// <summary>
            /// 技能ID
            /// </summary>
            public string id { get; set; }

            /// <summary>
            /// 技能名称
            /// </summary>
            public string name { get; set; }

            /// <summary>
            /// 技能描述
            /// </summary>
            public string description { get; set; }

            /// <summary>
            /// 技能图标URL
            /// </summary>
            public string icon { get; set; }

            /// <summary>
            /// 技能类型
            /// </summary>
            public string type { get; set; }

            /// <summary>
            /// 创建时间
            /// </summary>
            public string createdAt { get; set; }
        }
    }
}