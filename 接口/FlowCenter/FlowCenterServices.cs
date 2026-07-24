using Furion.DynamicApiController;
using Microsoft.AspNetCore.Mvc;
using Onionbit.Application.FlowCenter.Dtos.input;
using Onionbit.Application.FlowCenter.Dtos.output;
using Onionbit.Application.FlowCenter.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.FlowCenter
{
    public class FlowCenterServices : IDynamicApiController
    {
        private readonly IFlowCenterService _flowCenterService;

        public FlowCenterServices(IFlowCenterService flowCenterService)
        {
            _flowCenterService = flowCenterService;
        }

        /// <summary>
        /// 导出流程
        /// </summary>
        /// <param name="flowId"></param>
        /// <returns></returns>
        [HttpGet]
        public ExportFlowOutput ExportFlow([FromQuery] string flowId)
        {
            return _flowCenterService.ExportFlow(flowId);
        }

        /// <summary>
        /// 导入流程
        /// </summary>
        /// <param name="importFlowInput"></param>
        /// <returns></returns>
        [HttpPost]
        public ImportFlowOutput ImportFlow([FromForm] ImportFlowInput importFlowInput)
        {
            return _flowCenterService.ImportFlow(importFlowInput);
        }

        /// <summary>
        /// 从团队中移除成员
        /// </summary>
        /// <param name="removeMemberInput"></param>
        /// <returns></returns>
        [HttpPost]
        public bool RemoveMemberFromTeam(RemoveMemberInput removeMemberInput)
        {
            return _flowCenterService.RemoveMemberFromTeam(removeMemberInput);
        }

        /// <summary>
        /// 更新成员角色
        /// </summary>
        /// <param name="updateMemberRoleInput"></param>
        /// <returns></returns>
        [HttpPost]
        public bool UpdateMemberRole(UpdateMemberRoleInput updateMemberRoleInput)
        {
            return _flowCenterService.UpdateMemberRole(updateMemberRoleInput);
        }
    }
}