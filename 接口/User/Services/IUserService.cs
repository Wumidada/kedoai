using Onionbit.Application.User.Dtos.input;
using Onionbit.Application.User.Dtos.output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.User.Services
{
    public interface IUserService
    {
        /// <summary>
        /// 更新用户信息
        /// </summary>
        /// <param name="updateUserInfoInput"></param>
        /// <returns></returns>
        bool UpdateUserInfo(UpdateUserInfoInput updateUserInfoInput);

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="changePasswordInput"></param>
        /// <returns></returns>
        bool ChangePassword(ChangePasswordInput changePasswordInput);

        /// <summary>
        /// 上传头像
        /// </summary>
        /// <param name="uploadAvatarInput"></param>
        /// <returns></returns>
        UploadAvatarOutput UploadAvatar(UploadAvatarInput uploadAvatarInput);
    }
}