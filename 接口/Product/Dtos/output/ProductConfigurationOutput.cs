using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Product.Dtos.output
{
    public class ProductConfigurationOutput
    {
        /// <summary>
        /// 配置ID
        /// </summary>
        public string id { get; set; }

        /// <summary>
        /// 配置名称
        /// </summary>
        public string name { get; set; }

        /// <summary>
        /// 配置类型
        /// </summary>
        public string type { get; set; }

        /// <summary>
        /// 配置选项
        /// </summary>
        public List<ConfigurationOption> options { get; set; }

        public class ConfigurationOption
        {
            /// <summary>
            /// 选项ID
            /// </summary>
            public string id { get; set; }

            /// <summary>
            /// 选项名称
            /// </summary>
            public string name { get; set; }

            /// <summary>
            /// 选项值
            /// </summary>
            public string value { get; set; }

            /// <summary>
            /// 选项价格
            /// </summary>
            public double price { get; set; }
        }
    }
}