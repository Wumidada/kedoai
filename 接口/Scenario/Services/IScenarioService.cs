using Onionbit.Application.Scenario.Dtos.input;
using Onionbit.Application.Scenario.Dtos.output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Scenario.Services
{
    public interface IScenarioService
    {
        /// <summary>
        /// 查询智能体列表
        /// </summary>
        /// <param name="queryAgentListInput">查询智能体列表输入</param>
        /// <returns></returns>
        AgentListOutput QueryAgentList(QueryAgentListInput queryAgentListInput);

        /// <summary>
        /// 获取智能体详情
        /// </summary>
        /// <param name="agentId">智能体ID</param>
        /// <returns></returns>
        AgentDetailOutput GetAgentDetail(string agentId);

        /// <summary>
        /// 创建智能体
        /// </summary>
        /// <param name="createAgentInput">创建智能体输入</param>
        /// <returns></returns>
        CreateAgentOutput CreateAgent(CreateAgentInput createAgentInput);

        /// <summary>
        /// 更新智能体
        /// </summary>
        /// <param name="updateAgentInput">更新智能体输入</param>
        /// <returns></returns>
        UpdateAgentOutput UpdateAgent(UpdateAgentInput updateAgentInput);

        /// <summary>
        /// 删除智能体
        /// </summary>
        /// <param name="agentId">智能体ID</param>
        /// <returns></returns>
        DeleteAgentOutput DeleteAgent(string agentId);

        /// <summary>
        /// 执行智能体
        /// </summary>
        /// <param name="executeAgentInput">执行智能体输入</param>
        /// <returns></returns>
        ExecuteAgentOutput ExecuteAgent(ExecuteAgentInput executeAgentInput);

        /// <summary>
        /// 查询智能体执行状态
        /// </summary>
        /// <param name="executionId">执行ID</param>
        /// <returns></returns>
        AgentExecutionStatusOutput QueryAgentExecutionStatus(string executionId);

        /// <summary>
        /// 查询智能体执行历史
        /// </summary>
        /// <param name="queryAgentExecutionHistoryInput">查询智能体执行历史输入</param>
        /// <returns></returns>
        AgentExecutionHistoryOutput QueryAgentExecutionHistory(QueryAgentExecutionHistoryInput queryAgentExecutionHistoryInput);

        /// <summary>
        /// 停止智能体执行
        /// </summary>
        /// <param name="executionId">执行ID</param>
        /// <returns></returns>
        StopAgentExecutionOutput StopAgentExecution(string executionId);

        /// <summary>
        /// 获取智能体执行结果
        /// </summary>
        /// <param name="executionId">执行ID</param>
        /// <returns></returns>
        AgentExecutionResultOutput GetAgentExecutionResult(string executionId);
    }
}