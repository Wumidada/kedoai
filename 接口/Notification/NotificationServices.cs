using Furion.DynamicApiController;
using Microsoft.AspNetCore.Mvc;
using Onionbit.Application.Notification.Dtos.input;
using Onionbit.Application.Notification.Dtos.output;
using Onionbit.Application.Notification.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Notification
{
    public class NotificationServices : IDynamicApiController
    {
        private readonly INotificationService _notificationService;

        public NotificationServices(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        /// <summary>
        /// 获取用户通知
        /// </summary>
        /// <param name="getNotificationsInput"></param>
        /// <returns></returns>
        [HttpGet]
        public GetNotificationsOutput GetUserNotifications([FromQuery] GetNotificationsInput getNotificationsInput)
        {
            return _notificationService.GetUserNotifications(getNotificationsInput);
        }

        /// <summary>
        /// 标记通知为已读
        /// </summary>
        /// <param name="notificationId"></param>
        /// <param name="markAsReadInput"></param>
        /// <returns></returns>
        [HttpPost]
        public bool MarkNotificationAsRead(string notificationId, MarkAsReadInput markAsReadInput)
        {
            return _notificationService.MarkNotificationAsRead(notificationId, markAsReadInput);
        }
    }
}