using Onionbit.Application.Skill.Dtos.input;
using Onionbit.Application.Skill.Dtos.output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onionbit.Application.Skill.Services
{
    public interface ISkillService
    {
        /// <summary>
        /// 技能商店浏览
        /// </summary>
        /// <param name="browseSkillsInput"></param>
        /// <returns></returns>
        BrowseSkillsOutput BrowseSkills(BrowseSkillsInput browseSkillsInput);

        /// <summary>
        /// 技能分类
        /// </summary>
        /// <returns></returns>
        List<SkillCategoryOutput> GetSkillCategories();

        /// <summary>
        /// 安装技能
        /// </summary>
        /// <param name="installSkillInput"></param>
        /// <returns></returns>
        InstallSkillOutput InstallSkill(InstallSkillInput installSkillInput);

        /// <summary>
        /// 卸载技能
        /// </summary>
        /// <param name="uninstallSkillInput"></param>
        /// <returns></returns>
        UninstallSkillOutput UninstallSkill(UninstallSkillInput uninstallSkillInput);

        /// <summary>
        /// 我的技能
        /// </summary>
        /// <param name="mySkillsInput"></param>
        /// <returns></returns>
        MySkillsOutput GetMySkills(MySkillsInput mySkillsInput);

        /// <summary>
        /// 创建技能
        /// </summary>
        /// <param name="createSkillInput"></param>
        /// <returns></returns>
        CreateSkillOutput CreateSkill(CreateSkillInput createSkillInput);

        /// <summary>
        /// 编辑技能
        /// </summary>
        /// <param name="skillId"></param>
        /// <param name="editSkillInput"></param>
        /// <returns></returns>
        EditSkillOutput EditSkill(string skillId, EditSkillInput editSkillInput);

        /// <summary>
        /// 移除技能
        /// </summary>
        /// <param name="skillId"></param>
        /// <param name="removeSkillInput"></param>
        /// <returns></returns>
        RemoveSkillOutput RemoveSkill(string skillId, RemoveSkillInput removeSkillInput);

        /// <summary>
        /// 购买技能
        /// </summary>
        /// <param name="purchaseSkillInput"></param>
        /// <returns></returns>
        PurchaseSkillOutput PurchaseSkill(PurchaseSkillInput purchaseSkillInput);

        /// <summary>
        /// 购买记录
        /// </summary>
        /// <param name="purchaseHistoryInput"></param>
        /// <returns></returns>
        PurchaseHistoryOutput GetPurchaseHistory(PurchaseHistoryInput purchaseHistoryInput);

        /// <summary>
        /// 验证技能使用权限
        /// </summary>
        /// <param name="verifySkillInput"></param>
        /// <returns></returns>
        VerifySkillOutput VerifySkill(VerifySkillInput verifySkillInput);
    }
}