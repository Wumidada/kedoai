using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.FlowCenter.Dtos.input
{
    public class CreateTeamInput
    {
        /// <summary>
        /// 团队名称
        /// </summary>
        public string f_TeamName { get; set; }

        /// <summary>
        /// 创建用户ID
        /// </summary>
        public string f_CreateUserId { get; set; }

        /// <summary>
        /// 团队描述
        /// </summary>
        public string f_Description { get; set; }
    }
}