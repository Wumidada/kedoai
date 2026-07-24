using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Skill.Dtos.input
{
    public class CreateSkillInput
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        public string userId { get; set; }

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
        /// 技能配置
        /// </summary>
        public object config { get; set; }
    }
}