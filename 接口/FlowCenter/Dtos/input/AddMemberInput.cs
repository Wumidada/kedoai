using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.FlowCenter.Dtos.input
{
    public class AddMemberInput
    {
        /// <summary>
        /// 团队ID
        /// </summary>
        public string f_TeamId { get; set; }

        /// <summary>
        /// 用户ID
        /// </summary>
        public string f_UserId { get; set; }

        /// <summary>
        /// 角色ID
        /// </summary>
        public string f_RoleId { get; set; }
    }
}