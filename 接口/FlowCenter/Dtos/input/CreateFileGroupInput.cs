using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.FlowCenter.Dtos.input
{
    public class CreateFileGroupInput
    {
        /// <summary>
        /// 文件夹名称
        /// </summary>
        public string f_Caption { get; set; }

        /// <summary>
        /// 团队ID
        /// </summary>
        public string f_TeamId { get; set; }

        /// <summary>
        /// 创建用户ID
        /// </summary>
        public string f_CreateUserId { get; set; }
    }
}