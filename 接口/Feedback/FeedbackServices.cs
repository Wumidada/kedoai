using Furion.DynamicApiController;
using Microsoft.AspNetCore.Mvc;
using Onionbit.Application.Feedback.Dtos.input;
using Onionbit.Application.Feedback.Dtos.output;
using Onionbit.Application.Feedback.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Feedback
{
    public class FeedbackServices : IDynamicApiController
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackServices(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        /// <summary>
        /// 提交反馈
        /// </summary>
        /// <param name="submitFeedbackInput"></param>
        /// <returns></returns>
        [HttpPost]
        public SubmitFeedbackOutput SubmitFeedback(SubmitFeedbackInput submitFeedbackInput)
        {
            return _feedbackService.SubmitFeedback(submitFeedbackInput);
        }
    }
}