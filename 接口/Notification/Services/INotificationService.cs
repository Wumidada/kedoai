using Onionbit.Application.Notification.Dtos.input;
using Onionbit.Application.Notification.Dtos.output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Notification.Services
{
    public interface INotificationService
    {
        /// <summary>
        /// 获取用户通知
        /// </summary>
        /// <param name="getNotificationsInput"></param>
        /// <returns></returns>
        GetNotificationsOutput GetUserNotifications(GetNotificationsInput getNotificationsInput);

        /// <summary>
        /// 标记通知为已读
        /// </summary>
        /// <param name="notificationId"></param>
        /// <param name="markAsReadInput"></param>
        /// <returns></returns>
        bool MarkNotificationAsRead(string notificationId, MarkAsReadInput markAsReadInput);
    }
}