using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Notification.Dtos.input
{
    public class GetNotificationsInput
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        public string userId { get; set; }

        /// <summary>
        /// 页码
        /// </summary>
        public int pageIndex { get; set; }

        /// <summary>
        /// 每页数量
        /// </summary>
        public int pageSize { get; set; }
    }
}