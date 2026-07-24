using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Notification.Dtos.output
{
    public class GetNotificationsOutput
    {
        /// <summary>
        /// 通知列表
        /// </summary>
        public List<NotificationItem> notifications { get; set; }

        /// <summary>
        /// 总通知数
        /// </summary>
        public int total { get; set; }

        /// <summary>
        /// 未读通知数
        /// </summary>
        public int unreadCount { get; set; }

        public class NotificationItem
        {
            /// <summary>
            /// 通知ID
            /// </summary>
            public string id { get; set; }

            /// <summary>
            /// 通知类型
            /// </summary>
            public string type { get; set; }

            /// <summary>
            /// 通知标题
            /// </summary>
            public string title { get; set; }

            /// <summary>
            /// 通知内容
            /// </summary>
            public string content { get; set; }

            /// <summary>
            /// 通知时间
            /// </summary>
            public string createdAt { get; set; }

            /// <summary>
            /// 是否已读
            /// </summary>
            public bool read { get; set; }

            /// <summary>
            /// 通知链接
            /// </summary>
            public string link { get; set; }
        }
    }
}