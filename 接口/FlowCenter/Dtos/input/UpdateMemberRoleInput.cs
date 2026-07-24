using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.FlowCenter.Dtos.input
{
    public class UpdateMemberRoleInput
    {
        /// <summary>
        /// 团队ID
        /// </summary>
        public string f_TeamId { get; set; }

        /// <summary>
        /// 成员ID
        /// </summary>
        public string f_MemberId { get; set; }

        /// <summary>
        /// 角色ID
        /// </summary>
        public string f_RoleId { get; set; }
    }
}