using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Feedback.Dtos.output
{
    public class SubmitFeedbackOutput
    {
        /// <summary>
        /// 操作是否成功
        /// </summary>
        public bool success { get; set; }

        /// <summary>
        /// 反馈ID
        /// </summary>
        public string feedbackId { get; set; }

        /// <summary>
        /// 提交时间
        /// </summary>
        public string submittedAt { get; set; }
    }
}