using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.FlowCenter.Dtos.input
{
    public class RemoveMemberInput
    {
        /// <summary>
        /// 团队ID
        /// </summary>
        public string f_TeamId { get; set; }

        /// <summary>
        /// 成员ID
        /// </summary>
        public string f_MemberId { get; set; }
    }
}