using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Skill.Dtos.output
{
    public class BrowseSkillsOutput
    {
        /// <summary>
        /// 技能列表
        /// </summary>
        public List<SkillItem> skills { get; set; }

        /// <summary>
        /// 总技能数
        /// </summary>
        public int total { get; set; }

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
            /// 技能分类
            /// </summary>
            public string category { get; set; }

            /// <summary>
            /// 技能评分
            /// </summary>
            public double rating { get; set; }

            /// <summary>
            /// 技能图标URL
            /// </summary>
            public string icon { get; set; }

            /// <summary>
            /// 是否已安装
            /// </summary>
            public bool installed { get; set; }
        }
    }
}