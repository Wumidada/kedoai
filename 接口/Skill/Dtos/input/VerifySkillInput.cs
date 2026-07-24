using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Skill.Dtos.input
{
    public class VerifySkillInput
    {
        /// <summary>
        /// 技能ID
        /// </summary>
        public string skillId { get; set; }

        /// <summary>
        /// 用户ID
        /// </summary>
        public string userId { get; set; }
    }
}