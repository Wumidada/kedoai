using Furion.DynamicApiController;
using Microsoft.AspNetCore.Mvc;
using Onionbit.Application.Scenario.Dtos.input;
using Onionbit.Application.Scenario.Dtos.output;
using Onionbit.Application.Scenario.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Scenario
{
    public class ScenarioServices : IDynamicApiController
    {
        private readonly IScenarioService _scenarioService;

        public ScenarioServices(IScenarioService scenarioService)
        {
            _scenarioService = scenarioService;
        }

        /// <summary>
        /// 查询智能体列表
        /// </summary>
        /// <param name="queryAgentListInput"></param>
        /// <returns></returns>
        [HttpGet]
        public AgentListOutput QueryAgentList([FromQuery] QueryAgentListInput queryAgentListInput)
        {
            return _scenarioService.QueryAgentList(queryAgentListInput);
        }

        /// <summary>
        /// 获取智能体详情
        /// </summary>
        /// <param name="agentId"></param>
        /// <returns></returns>
        [HttpGet]
        public AgentDetailOutput GetAgentDetail([FromQuery] string agentId)
        {
            return _scenarioService.GetAgentDetail(agentId);
        }

        /// <summary>
        /// 创建智能体
        /// </summary>
        /// <param name="createAgentInput"></param>
        /// <returns></returns>
        [HttpPost]
        public CreateAgentOutput CreateAgent(CreateAgentInput createAgentInput)
        {
            return _scenarioService.CreateAgent(createAgentInput);
        }

        /// <summary>
        /// 更新智能体
        /// </summary>
        /// <param name="updateAgentInput"></param>
        /// <returns></returns>
        [HttpPost]
        public UpdateAgentOutput UpdateAgent(UpdateAgentInput updateAgentInput)
        {
            return _scenarioService.UpdateAgent(updateAgentInput);
        }

        /// <summary>
        /// 删除智能体
        /// </summary>
        /// <param name="agentId"></param>
        /// <returns></returns>
        [HttpPost]
        public DeleteAgentOutput DeleteAgent([FromQuery] string agentId)
        {
            return _scenarioService.DeleteAgent(agentId);
        }

        /// <summary>
        /// 执行智能体
        /// </summary>
        /// <param name="executeAgentInput"></param>
        /// <returns></returns>
        [HttpPost]
        public ExecuteAgentOutput ExecuteAgent(ExecuteAgentInput executeAgentInput)
        {
            return _scenarioService.ExecuteAgent(executeAgentInput);
        }

        /// <summary>
        /// 查询智能体执行状态
        /// </summary>
        /// <param name="executionId"></param>
        /// <returns></returns>
        [HttpGet]
        public AgentExecutionStatusOutput QueryAgentExecutionStatus([FromQuery] string executionId)
        {
            return _scenarioService.QueryAgentExecutionStatus(executionId);
        }

        /// <summary>
        /// 查询智能体执行历史
        /// </summary>
        /// <param name="queryAgentExecutionHistoryInput"></param>
        /// <returns></returns>
        [HttpGet]
        public AgentExecutionHistoryOutput QueryAgentExecutionHistory([FromQuery] QueryAgentExecutionHistoryInput queryAgentExecutionHistoryInput)
        {
            return _scenarioService.QueryAgentExecutionHistory(queryAgentExecutionHistoryInput);
        }

        /// <summary>
        /// 停止智能体执行
        /// </summary>
        /// <param name="executionId"></param>
        /// <returns></returns>
        [HttpPost]
        public StopAgentExecutionOutput StopAgentExecution([FromQuery] string executionId)
        {
            return _scenarioService.StopAgentExecution(executionId);
        }

        /// <summary>
        /// 获取智能体执行结果
        /// </summary>
        /// <param name="executionId"></param>
        /// <returns></returns>
        [HttpGet]
        public AgentExecutionResultOutput GetAgentExecutionResult([FromQuery] string executionId)
        {
            return _scenarioService.GetAgentExecutionResult(executionId);
        }
    }
}