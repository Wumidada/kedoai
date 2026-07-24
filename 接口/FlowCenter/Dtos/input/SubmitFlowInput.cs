using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.FlowCenter.Dtos.input
{
    public class SubmitFlowInput
    {
        /// <summary>
        /// 流程名称
        /// </summary>
        public string f_Caption { get; set; }

        /// <summary>
        /// 流程描述
        /// </summary>
        public string f_Description { get; set; }

        /// <summary>
        /// 创建用户ID
        /// </summary>
        public string f_CreateUserId { get; set; }

        /// <summary>
        /// 团队ID
        /// </summary>
        public string f_TeamId { get; set; }

        /// <summary>
        /// 流程方案数据
        /// </summary>
        public string f_OnionFlowSchemeData { get; set; }

        /// <summary>
        /// 团队流程文件组
        /// </summary>
        public string f_TeamOnionFlowFileGroup { get; set; }
    }
}