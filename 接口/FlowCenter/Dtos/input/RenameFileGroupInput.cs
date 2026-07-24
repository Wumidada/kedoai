using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.FlowCenter.Dtos.input
{
    public class RenameFileGroupInput
    {
        /// <summary>
        /// 文件夹ID
        /// </summary>
        public string f_Id { get; set; }

        /// <summary>
        /// 文件夹新名称
        /// </summary>
        public string f_FileGroupNewName { get; set; }

        /// <summary>
        /// 修改用户ID
        /// </summary>
        public string f_ModifyUserId { get; set; }
    }
}