using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.FlowCenter.Dtos.output
{
    public class ExportFlowOutput
    {
        /// <summary>
        /// 导出文件URL
        /// </summary>
        public string FileUrl { get; set; }

        /// <summary>
        /// 文件名
        /// </summary>
        public string FileName { get; set; }

        /// <summary>
        /// 导出时间
        /// </summary>
        public DateTime ExportTime { get; set; }
    }
}