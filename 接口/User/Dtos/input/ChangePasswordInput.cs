using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.User.Dtos.input
{
    public class ChangePasswordInput
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        public string f_Id { get; set; }

        /// <summary>
        /// 旧密码
        /// </summary>
        public string f_OldPassword { get; set; }

        /// <summary>
        /// 新密码
        /// </summary>
        public string f_NewPassword { get; set; }
    }
}