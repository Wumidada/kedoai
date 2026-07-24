using Onionbit.Application.FlowCenter.Dtos.input;
using Onionbit.Application.FlowCenter.Dtos.output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.FlowCenter.Services
{
    public interface IFlowCenterService
    {
        /// <summary>
        /// 导出流程
        /// </summary>
        /// <param name="flowId">流程ID</param>
        /// <returns></returns>
        ExportFlowOutput ExportFlow(string flowId);

        /// <summary>
        /// 导入流程
        /// </summary>
        /// <param name="importFlowInput">导入流程输入</param>
        /// <returns></returns>
        ImportFlowOutput ImportFlow(ImportFlowInput importFlowInput);

        /// <summary>
        /// 从团队中移除成员
        /// </summary>
        /// <param name="removeMemberInput">移除成员输入</param>
        /// <returns></returns>
        bool RemoveMemberFromTeam(RemoveMemberInput removeMemberInput);

        /// <summary>
        /// 更新成员角色
        /// </summary>
        /// <param name="updateMemberRoleInput">更新成员角色输入</param>
        /// <returns></returns>
        bool UpdateMemberRole(UpdateMemberRoleInput updateMemberRoleInput);
    }
}