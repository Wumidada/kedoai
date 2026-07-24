using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.User.Dtos.input
{
    public class UpdateUserInfoInput
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        public string f_Id { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        public string f_UserName { get; set; }

        /// <summary>
        /// 邮箱
        /// </summary>
        public string f_Email { get; set; }

        /// <summary>
        /// 公司名称
        /// </summary>
        public string f_CompanyName { get; set; }

        /// <summary>
        /// 行业分类
        /// </summary>
        public string f_IndustryCategory { get; set; }

        /// <summary>
        /// 职位
        /// </summary>
        public string f_Job { get; set; }
    }
}