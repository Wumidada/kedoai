using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.FlowCenter.Dtos.output
{
    public class ImportFlowOutput
    {
        /// <summary>
        /// 导入是否成功
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// 导入的流程ID
        /// </summary>
        public string FlowId { get; set; }

        /// <summary>
        /// 导入时间
        /// </summary>
        public DateTime ImportTime { get; set; }

        /// <summary>
        /// 错误信息（如果导入失败）
        /// </summary>
        public string ErrorMessage { get; set; }
    }
}