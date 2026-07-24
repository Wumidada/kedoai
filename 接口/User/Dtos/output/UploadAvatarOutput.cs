using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.User.Dtos.output
{
    public class UploadAvatarOutput
    {
        /// <summary>
        /// 头像URL
        /// </summary>
        public string avatarUrl { get; set; }

        /// <summary>
        /// 操作是否成功
        /// </summary>
        public bool success { get; set; }
    }
}