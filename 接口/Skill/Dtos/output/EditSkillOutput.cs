using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Skill.Dtos.output
{
    public class EditSkillOutput
    {
        /// <summary>
        /// 操作是否成功
        /// </summary>
        public bool success { get; set; }

        /// <summary>
        /// 更新后的技能信息
        /// </summary>
        public SkillInfo skill { get; set; }

        public class SkillInfo
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
        }
    }
}