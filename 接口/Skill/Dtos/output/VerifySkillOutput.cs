using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Skill.Dtos.output
{
    public class VerifySkillOutput
    {
        /// <summary>
        /// 是否有权限
        /// </summary>
        public bool hasPermission { get; set; }

        /// <summary>
        /// 技能信息
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
        }
    }
}