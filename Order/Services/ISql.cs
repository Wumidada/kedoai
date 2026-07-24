using Furion.DatabaseAccessor;
// using Onionbit.Application.GPTPPT.Dtos.input;
using Onionbit.Application.Order.Dtos.output;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Order.Services
{
    public interface ISql : ISqlDispatchProxy
    {

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [SqlExecute("select F_ProdId,F_ProdCode,F_ProdeName,F_Price,F_OriginalPrice,F_Months,F_Description from gpt_prodinfo  where F_SystemId=@F_SystemId and F_DeleteMark='0' and F_EnabledMark='1' order by  F_ProdCode asc")]
        List<GPTProdInfoOutput> QueryGPTProdList(string F_SystemId);

        [SqlExecute("select F_ProdId,F_ProdCode,F_ProdName from bas_onion_product")]
        List<OnionProdOutput> QueryOnionProdList();
        

        [SqlExecute("select F_ProdId,F_ProdCode,F_Service_Duration,F_Price,F_OriginalPrice,F_Months,F_Description from bas_onion_product_services where F_ProdId=@F_ProdId and F_DeleteMark='0' and F_EnabledMark='1' order by  F_ProdCode asc")]
        List<OnionProdServicesOutput> QueryOnionProdServices(string F_ProdId);

        [SqlExecute("SELECT F_PayStatus FROM kedo_fin_order where F_OrderNo=@F_OrderNo")]
        DataTable OrderPaymentCompleted(string F_OrderNo);
      


        //public string F_ProdId { set; get; }

        //public string F_ProdCode { set; get; }

        //public string F_ProdeName { set; get; }

        //public string F_Price { set; get; }

        //public string F_OriginalPrice { set; get; }

        //public string F_Months { set; get; }

        //public string F_Description { set; get; }

        

    }
}
