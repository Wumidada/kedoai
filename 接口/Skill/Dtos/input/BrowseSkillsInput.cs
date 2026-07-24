using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Skill.Dtos.input
{
    public class BrowseSkillsInput
    {
        /// <summary>
        /// 技能分类
        /// </summary>
        public string category { get; set; }

        /// <summary>
        /// 搜索关键词
        /// </summary>
        public string keyword { get; set; }

        /// <summary>
        /// 页码
        /// </summary>
        public int page { get; set; }

        /// <summary>
        /// 每页数量
        /// </summary>
        public int pageSize { get; set; }
    }
}