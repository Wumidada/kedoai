using Furion.DynamicApiController;
using Microsoft.AspNetCore.Mvc;
using Onionbit.Application.Product.Dtos.input;
using Onionbit.Application.Product.Dtos.output;
using Onionbit.Application.Product.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Product
{
    public class ProductServices : IDynamicApiController
    {
        private readonly IProductService _productService;

        public ProductServices(IProductService productService)
        {
            _productService = productService;
        }

        /// <summary>
        /// 产品详情
        /// </summary>
        /// <param name="prodId"></param>
        /// <returns></returns>
        [HttpGet]
        public ProductDetailOutput GetProductDetail([FromQuery] string prodId)
        {
            return _productService.GetProductDetail(prodId);
        }

        /// <summary>
        /// 获取产品配置选项
        /// </summary>
        /// <param name="prodId"></param>
        /// <returns></returns>
        [HttpGet]
        public List<ProductConfigurationOutput> GetProductConfigurations([FromQuery] string prodId)
        {
            return _productService.GetProductConfigurations(prodId);
        }
    }
}