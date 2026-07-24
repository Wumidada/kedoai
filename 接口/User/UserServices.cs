using Furion.DynamicApiController;
using Microsoft.AspNetCore.Mvc;
using Onionbit.Application.User.Dtos.input;
using Onionbit.Application.User.Dtos.output;
using Onionbit.Application.User.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.User
{
    public class UserServices : IDynamicApiController
    {
        private readonly IUserService _userService;

        public UserServices(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// 更新用户信息
        /// </summary>
        /// <param name="updateUserInfoInput"></param>
        /// <returns></returns>
        [HttpPost]
        public bool UpdateUserInfo(UpdateUserInfoInput updateUserInfoInput)
        {
            return _userService.UpdateUserInfo(updateUserInfoInput);
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="changePasswordInput"></param>
        /// <returns></returns>
        [HttpPost]
        public bool ChangePassword(ChangePasswordInput changePasswordInput)
        {
            return _userService.ChangePassword(changePasswordInput);
        }

        /// <summary>
        /// 上传头像
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost]
        public UploadAvatarOutput UploadAvatar([FromForm] UploadAvatarInput uploadAvatarInput)
        {
            return _userService.UploadAvatar(uploadAvatarInput);
        }
    }
}