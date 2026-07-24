using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Order.Dtos.input
{
    public class CreateOrderInput
    {
        //public string F_OrderId { set; get; }
        //public string F_OrderNo { set; get; }
        //public string F_Date { set; get; }
        //public int F_Status { set; get; }
        public string F_UserId { set; get; }
        public string F_PayProject { set; get; }
        public decimal F_Amount { set; get; }

        /// <summary>
        /// 产品编号
        /// </summary>
        public string F_ProdId { set; get; }  //是什么类型的产品  

        public string F_Remark { set; get; }

    }
}
