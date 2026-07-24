using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Product.Dtos.output
{
    public class ProductDetailOutput
    {
        /// <summary>
        /// 产品ID
        /// </summary>
        public string id { get; set; }

        /// <summary>
        /// 产品名称
        /// </summary>
        public string name { get; set; }

        /// <summary>
        /// 价格
        /// </summary>
        public double price { get; set; }

        /// <summary>
        /// 产品描述
        /// </summary>
        public string description { get; set; }

        /// <summary>
        /// 可选配置列表
        /// </summary>
        public List<ConfigurationItem> configurations { get; set; }

        /// <summary>
        /// 产品图片
        /// </summary>
        public List<string> images { get; set; }

        public class ConfigurationItem
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
            /// 配置值
            /// </summary>
            public string value { get; set; }

            /// <summary>
            /// 配置价格
            /// </summary>
            public double price { get; set; }
        }
    }
}