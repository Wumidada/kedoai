using Furion.DynamicApiController;
using Microsoft.AspNetCore.Mvc;
using Onionbit.Application.Skill.Dtos.input;
using Onionbit.Application.Skill.Dtos.output;
using Onionbit.Application.Skill.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Skill
{
    public class SkillServices : IDynamicApiController
    {
        private readonly ISkillService _skillService;

        public SkillServices(ISkillService skillService)
        {
            _skillService = skillService;
        }

        /// <summary>
        /// 技能商店浏览
        /// </summary>
        /// <param name="browseSkillsInput"></param>
        /// <returns></returns>
        [HttpGet]
        public BrowseSkillsOutput BrowseSkills([FromQuery] BrowseSkillsInput browseSkillsInput)
        {
            return _skillService.BrowseSkills(browseSkillsInput);
        }

        /// <summary>
        /// 技能分类
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<SkillCategoryOutput> GetSkillCategories()
        {
            return _skillService.GetSkillCategories();
        }

        /// <summary>
        /// 安装技能
        /// </summary>
        /// <param name="installSkillInput"></param>
        /// <returns></returns>
        [HttpPost]
        public InstallSkillOutput InstallSkill(InstallSkillInput installSkillInput)
        {
            return _skillService.InstallSkill(installSkillInput);
        }

        /// <summary>
        /// 卸载技能
        /// </summary>
        /// <param name="uninstallSkillInput"></param>
        /// <returns></returns>
        [HttpPost]
        public UninstallSkillOutput UninstallSkill(UninstallSkillInput uninstallSkillInput)
        {
            return _skillService.UninstallSkill(uninstallSkillInput);
        }

        /// <summary>
        /// 我的技能
        /// </summary>
        /// <param name="mySkillsInput"></param>
        /// <returns></returns>
        [HttpGet]
        public MySkillsOutput GetMySkills([FromQuery] MySkillsInput mySkillsInput)
        {
            return _skillService.GetMySkills(mySkillsInput);
        }

        /// <summary>
        /// 创建技能
        /// </summary>
        /// <param name="createSkillInput"></param>
        /// <returns></returns>
        [HttpPost]
        public CreateSkillOutput CreateSkill(CreateSkillInput createSkillInput)
        {
            return _skillService.CreateSkill(createSkillInput);
        }

        /// <summary>
        /// 编辑技能
        /// </summary>
        /// <param name="skillId"></param>
        /// <param name="editSkillInput"></param>
        /// <returns></returns>
        [HttpPut]
        public EditSkillOutput EditSkill(string skillId, EditSkillInput editSkillInput)
        {
            return _skillService.EditSkill(skillId, editSkillInput);
        }

        /// <summary>
        /// 移除技能
        /// </summary>
        /// <param name="skillId"></param>
        /// <param name="removeSkillInput"></param>
        /// <returns></returns>
        [HttpDelete]
        public RemoveSkillOutput RemoveSkill(string skillId, RemoveSkillInput removeSkillInput)
        {
            return _skillService.RemoveSkill(skillId, removeSkillInput);
        }

        /// <summary>
        /// 购买技能
        /// </summary>
        /// <param name="purchaseSkillInput"></param>
        /// <returns></returns>
        [HttpPost]
        public PurchaseSkillOutput PurchaseSkill(PurchaseSkillInput purchaseSkillInput)
        {
            return _skillService.PurchaseSkill(purchaseSkillInput);
        }

        /// <summary>
        /// 购买记录
        /// </summary>
        /// <param name="purchaseHistoryInput"></param>
        /// <returns></returns>
        [HttpGet]
        public PurchaseHistoryOutput GetPurchaseHistory([FromQuery] PurchaseHistoryInput purchaseHistoryInput)
        {
            return _skillService.GetPurchaseHistory(purchaseHistoryInput);
        }

        /// <summary>
        /// 验证技能使用权限
        /// </summary>
        /// <param name="verifySkillInput"></param>
        /// <returns></returns>
        [HttpPost]
        public VerifySkillOutput VerifySkill(VerifySkillInput verifySkillInput)
        {
            return _skillService.VerifySkill(verifySkillInput);
        }
    }
}