using Onionbit.Application.Feedback.Dtos.input;
using Onionbit.Application.Feedback.Dtos.output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Feedback.Services
{
    public interface IFeedbackService
    {
        /// <summary>
        /// 提交反馈
        /// </summary>
        /// <param name="submitFeedbackInput"></param>
        /// <returns></returns>
        SubmitFeedbackOutput SubmitFeedback(SubmitFeedbackInput submitFeedbackInput);
    }
}