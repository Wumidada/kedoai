using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.FlowCenter.Dtos.input
{
    public class ImportFlowInput
    {
        /// <summary>
        /// 流程文件
        /// </summary>
        public IFormFile file { get; set; }

        /// <summary>
        /// 用户ID
        /// </summary>
        public string userId { get; set; }

        /// <summary>
        /// 团队ID
        /// </summary>
        public string teamId { get; set; }
    }
}