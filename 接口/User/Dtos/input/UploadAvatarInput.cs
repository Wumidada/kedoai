using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.User.Dtos.input
{
    public class UploadAvatarInput
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        public string userId { get; set; }

        /// <summary>
        /// 头像文件
        /// </summary>
        public IFormFile file { get; set; }
    }
}