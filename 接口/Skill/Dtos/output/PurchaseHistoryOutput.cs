using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Skill.Dtos.output
{
    public class PurchaseHistoryOutput
    {
        /// <summary>
        /// 购买记录列表
        /// </summary>
        public List<PurchaseRecord> records { get; set; }

        /// <summary>
        /// 总记录数
        /// </summary>
        public int total { get; set; }

        public class PurchaseRecord
        {
            /// <summary>
            /// 记录ID
            /// </summary>
            public string id { get; set; }

            /// <summary>
            /// 技能ID
            /// </summary>
            public string skillId { get; set; }

            /// <summary>
            /// 技能名称
            /// </summary>
            public string skillName { get; set; }

            /// <summary>
            /// 购买价格
            /// </summary>
            public double price { get; set; }

            /// <summary>
            /// 购买时间
            /// </summary>
            public string purchaseTime { get; set; }
        }
    }
}