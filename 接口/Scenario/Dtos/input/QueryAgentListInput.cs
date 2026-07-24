using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Scenario.Dtos.input
{
    public class QueryAgentListInput
    {
        /// <summary>
        /// 页码
        /// </summary>
        public int pageIndex { get; set; } = 1;

        /// <summary>
        /// 每页数量
        /// </summary>
        public int pageSize { get; set; } = 10;

        /// <summary>
        /// 搜索关键词
        /// </summary>
        public string keyword { get; set; }

        /// <summary>
        /// 状态
        /// </summary>
        public string status { get; set; }

        /// <summary>
        /// 类型
        /// </summary>
        public string type { get; set; }
    }
}