using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Feedback.Dtos.input
{
    public class SubmitFeedbackInput
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        public string userId { get; set; }

        /// <summary>
        /// 反馈内容
        /// </summary>
        public string content { get; set; }

        /// <summary>
        /// 反馈类型
        /// </summary>
        public string type { get; set; }

        /// <summary>
        /// 联系方式
        /// </summary>
        public string contact { get; set; }
    }
}