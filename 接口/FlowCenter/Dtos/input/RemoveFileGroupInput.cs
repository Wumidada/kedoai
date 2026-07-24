using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.FlowCenter.Dtos.input
{
    public class RemoveFileGroupInput
    {
        /// <summary>
        /// 文件夹ID
        /// </summary>
        public string f_Id { get; set; }

        /// <summary>
        /// 删除用户ID
        /// </summary>
        public string f_DeleteUserId { get; set; }
    }
}