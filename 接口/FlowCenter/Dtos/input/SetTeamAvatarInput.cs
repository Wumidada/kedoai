using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.FlowCenter.Dtos.input
{
    public class SetTeamAvatarInput
    {
        /// <summary>
        /// 团队ID
        /// </summary>
        public string f_Id { get; set; }

        /// <summary>
        /// 团队ID
        /// </summary>
        public string f_TeamId { get; set; }

        /// <summary>
        /// 团队头像
        /// </summary>
        public string f_HeadIcon { get; set; }
    }
}