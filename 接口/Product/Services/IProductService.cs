using Onionbit.Application.Product.Dtos.output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Product.Services
{
    public interface IProductService
    {
        /// <summary>
        /// 产品详情
        /// </summary>
        /// <param name="prodId"></param>
        /// <returns></returns>
        ProductDetailOutput GetProductDetail(string prodId);

        /// <summary>
        /// 获取产品配置选项
        /// </summary>
        /// <param name="prodId"></param>
        /// <returns></returns>
        List<ProductConfigurationOutput> GetProductConfigurations(string prodId);
    }
}