<template>
  <div class="aipc-page">
    <SiteNav active-key="aipc" />

    <main>
      <section class="hero section-shell">
        <div class="hero-copy reveal">
          <span class="eyebrow">KedoClaw · 企业智能体一体机</span>
          <h1>为企业内网而生的<br><span>安全可信国产智能体一体机</span></h1>
          <p class="hero-lead">帮助企业打造私有、可控、可持续成长的 AI 数字员工团队</p>
          <div class="hero-tags">
            <span>安全可信</span><span>自主可控</span><span>开箱即用</span><span>持续成长</span>
          </div>
          <a class="primary-action" href="#work">了解 KedoClaw <b>↘</b></a>
        </div>
        <div class="hero-visual reveal delay-1" aria-label="KedoClaw 产品展示">
          <div class="orbit orbit-one" />
          <div class="orbit orbit-two" />
          <div class="product-glow" />
          <img src="@/assets/images/kedoclaw一体机白.jpg" alt="KedoClaw 企业智能体一体机" />
          <div class="visual-chip chip-top"><i /> 内网运行</div>
          <div class="visual-chip chip-bottom"><i /> 数据不出内网</div>
        </div>
      </section>

      <section id="work" class="intro section-shell">
        <div class="section-heading reveal">
          <span class="index">01 / 从问答走向工作</span>
          <h2>AI 的价值正在从“会说”转向“会做”</h2>
          <p>过去 AI 主要用于回答问题、生成内容。企业真正需要的，是能够进入真实工作流程的 AI 数字员工。</p>
        </div>
        <div class="work-grid">
          <article v-for="(item, index) in realWork" :key="item.title" class="work-card reveal">
            <span>0{{ index + 1 }}</span><h3>{{ item.title }}</h3><p>{{ item.desc }}</p>
          </article>
        </div>
        <div class="statement reveal">
          <div>
            <span class="mini-label">企业需要的是 AI 数字员工</span>
            <h3>企业工作不是简单问答，<br>而是复杂、连续、多步骤任务。</h3>
          </div>
          <ul>
            <li>理解业务规则、连接企业数据、调用内部系统</li>
            <li>承担具体岗位任务，而不是停留在演示层面</li>
          </ul>
        </div>
      </section>

      <section class="problem section-shell">
        <div class="section-heading reveal">
          <span class="index">02 / 数字化之后的新问题</span>
          <h2>信息已经在线，工作仍未完全在线</h2>
          <p>企业已有 ERP、OA、CRM、BI、知识库等系统。系统越来越多、数据越来越多，但人依然很忙。</p>
        </div>
        <div class="experience-panel reveal">
          <div class="experience-copy">
            <span class="mini-label">企业经验难以沉淀</span>
            <h3>让知识、流程、经验和能力<br>拥有新的企业载体</h3>
            <p>很多业务规则和判断经验仍存在于人脑中；员工调岗或离职会带走经验，优秀管理者的分析方法和经营判断也难以复制。</p>
          </div>
          <div class="experience-flow">
            <span>业务规则</span><span>分析方法</span><b>能力沉淀</b><span>判断经验</span><span>经营判断</span>
          </div>
          <div class="risk-row"><span>依赖个人经验</span><span>经验流失</span><span>效率下降</span><span>组织能力难提升</span></div>
        </div>
        <div class="roles-grid">
          <article v-for="role in roles" :key="role.title" class="role-card reveal">
            <div class="role-icon">{{ role.icon }}</div><span>{{ role.en }}</span><h3>{{ role.title }}</h3><p>{{ role.desc }}</p><small>{{ role.value }}</small>
          </article>
        </div>
      </section>

      <section class="threshold">
        <div class="section-shell threshold-inner">
          <div class="section-heading light reveal">
            <span class="index">03 / 企业 AI 的核心门槛</span>
            <h2>更关键的是安全、可控、合规、可审计</h2>
            <p>AI 必须知道什么能看、什么不能看，什么能做、什么必须审批。</p>
          </div>
          <div class="question-grid">
            <article v-for="(question, index) in questions" :key="question" class="question reveal"><span>0{{ index + 1 }}</span><p>{{ question }}</p></article>
          </div>
        </div>
      </section>

      <section class="position section-shell">
        <div class="section-heading reveal">
          <span class="index">04 / 产品定位</span>
          <h2>KedoClaw，一体化企业 AI 工作平台</h2>
          <p>面向企业级 AI 应用落地，融合国产一体机、国产大模型、国产操作系统和国产智能体能力。</p>
        </div>
        <div class="position-stage reveal">
          <div class="stack-card"><span>01</span><b>国产一体机</b></div>
          <div class="stack-card"><span>02</span><b>国产大模型</b></div>
          <div class="stack-center"><img src="@/assets/images/kedoclaw一体机白.jpg" alt="KedoClaw 产品外观"><strong>KedoClaw</strong><small>开箱可用 · 私有部署 · 内网运行 · 安全可控</small></div>
          <div class="stack-card"><span>03</span><b>国产操作系统</b></div>
          <div class="stack-card"><span>04</span><b>国产智能体能力</b></div>
        </div>
        <div class="keywords">
          <article v-for="item in keywords" :key="item.title" class="keyword reveal"><span>{{ item.no }}</span><h3>{{ item.title }}</h3><p>{{ item.desc }}</p></article>
        </div>
      </section>

      <section class="deployment section-shell">
        <div class="section-heading reveal">
          <span class="index">05 / 国产一体机</span>
          <h2>让 AI 落在企业现场</h2>
          <p>企业可在自己的机房、专网或内网环境中部署 AI 能力，减少多厂商集成和环境适配成本。</p>
        </div>
        <div class="deployment-layout">
          <div class="network-visual reveal">
            <div class="network-ring ring-a" /><div class="network-ring ring-b" />
            <div class="network-core"><span>K</span><b>企业 AI</b><small>内网 / 专网 / 机房</small></div>
            <span class="node node-a">用户</span><span class="node node-b">知识</span><span class="node node-c">智能体</span><span class="node node-d">日志</span>
          </div>
          <div class="value-list">
            <article v-for="item in deployValues" :key="item.title" class="value-item reveal"><b>{{ item.title }}</b><p>{{ item.desc }}</p></article>
          </div>
        </div>
        <div class="data-banner reveal"><span>DATA STAYS INSIDE</span><h3>数据不出内网，是企业敢用 AI 的前提</h3><p>财务、客户、合同、供应链、经营数据可在内网处理；敏感信息无需上传外部平台，降低数据外泄和合规风险，让 AI 从演示走向真实业务应用。</p></div>
      </section>

      <section class="control section-shell">
        <div class="section-heading reveal">
          <span class="index">06 / 安全边界与信创底座</span>
          <h2>权限、审批、审计贯穿工作过程</h2>
        </div>
        <div class="control-grid">
          <article v-for="item in controls" :key="item.title" class="control-card reveal"><span>{{ item.no }}</span><h3>{{ item.title }}</h3><p>{{ item.desc }}</p></article>
        </div>
        <div class="xinchuang reveal">
          <div><span class="mini-label">符合信创</span><h3>自主可控的 AI 底座</h3><p>信创已成为很多行业数字化建设的重要要求。KedoClaw 按照国产化适配、自主可控和安全可信设计，支持企业搭建长期可持续的 AI 基础能力。</p></div>
          <div class="capability-chain"><span>国产一体机</span><i>×</i><span>国产操作系统</span><i>×</i><span>国产大模型</span><i>×</i><span>国产智能体</span></div>
        </div>
      </section>

      <section class="learn section-shell">
        <div class="section-heading reveal">
          <span class="index">07 / 理解企业，学会工作</span>
          <h2>从企业语境到任务执行</h2>
          <p>企业有大量专有名词、组织结构、指标口径和流程约定。AI 必须理解企业自己的语言。</p>
        </div>
        <div class="learning-path reveal">
          <article v-for="(item,index) in learning" :key="item.title"><span>0{{ index + 1 }}</span><h3>{{ item.title }}</h3><p>{{ item.desc }}</p></article>
        </div>
        <div class="agent-engine reveal">
          <div class="engine-title"><span>国产智能体</span><h3>从回答到执行</h3></div>
          <div class="engine-core">AI<br><small>智能体</small></div>
          <div class="engine-points"><span>任务规划</span><span>工具调用</span><span>上下文记忆</span><span>多系统集成</span><span>执行流程</span><span>多角色协同</span></div>
          <div class="engine-base"><span>权限控制</span><span>过程审计</span><span>结果交付</span></div>
        </div>
      </section>

      <section class="scenarios section-shell">
        <div class="section-heading reveal">
          <span class="index">08 / 典型岗位场景</span>
          <h2>把数字员工放进具体岗位</h2>
        </div>
        <div class="scenario-grid">
          <article v-for="scene in scenarios" :key="scene.title" class="scenario-card reveal"><span>{{ scene.en }}</span><h3>{{ scene.title }}</h3><p>{{ scene.desc }}</p></article>
        </div>
      </section>

      <section class="team">
        <div class="section-shell">
          <div class="section-heading light reveal"><span class="index">09 / 数字员工团队</span><h2>建设企业自己的数字员工团队</h2><p>未来企业不仅管理员工，也要管理数字员工。数字员工与人类员工共同创造价值。</p></div>
          <div class="team-points">
            <article class="reveal"><span>01</span><h3>全面管理</h3><p>管理权限、职责、技能、日志、表现和成长路径，让数字员工可控、可管、可成长。</p></article>
            <article class="reveal"><span>02</span><h3>协同工作</h3><p>多个智能体可共享授权知识、调用指定工具并协同工作。</p></article>
          </div>
          <div class="team-strip reveal"><span v-for="item in teamManagement" :key="item">{{ item }}</span></div>
        </div>
      </section>

      <section class="value section-shell">
        <div class="section-heading reveal"><span class="index">10 / 从沉淀数据到沉淀能力</span><h2>让企业系统沉淀能力</h2></div>
        <div class="systems reveal"><span>ERP<small>沉淀流程</small></span><span>BI<small>沉淀数据</small></span><span>知识库<small>沉淀文档</small></span><span>OA<small>沉淀审批</small></span><b>KedoClaw<small>沉淀能力</small></b></div>
        <div class="core-values">
          <article v-for="item in coreValues" :key="item.title" class="core-value reveal"><span>{{ item.no }}</span><h3>{{ item.title }}</h3><p>{{ item.desc }}</p></article>
        </div>
      </section>

      <section class="closing">
        <div class="section-shell closing-inner reveal">
          <span class="eyebrow">企业 AI 的未来</span>
          <h2>不是单个聊天工具，<br>而是<span>安全可信的数字员工团队</span></h2>
          <p>AI 将运行在企业内网中，遵守权限，理解知识，调用系统，执行流程。</p>
          <div class="closing-line"><span>重复工作可托付</span><span>经验可传承</span><span>能力可复制</span></div>
          <strong>让 AI 成为企业新的生产力</strong>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import SiteNav from '@/components/nav/SiteNav.vue'

const realWork = [
  { title: '财务工作', desc: '报表核对、数据解释、差异分析' },
  { title: '供应链工作', desc: '库存、订单、交付和异常跟踪' },
  { title: '经营分析', desc: '数据汇总、趋势判断和报告撰写' },
  { title: '管理判断', desc: '持续判断指标变化和业务风险' },
]
const roles = [
  { icon: '↗', en: 'EXECUTOR', title: '执行者', desc: '接住高频、繁琐、重复性工作', value: '自动执行 · 稳定高效 · 释放人力' },
  { icon: '◇', en: 'ASSISTANT', title: '助理', desc: '协助岗位人员完成分析、协同和交付', value: '提升效率 · 协同配合 · 加速交付' },
  { icon: '◎', en: 'ADVISER', title: '参谋', desc: '帮助管理者发现问题、分析原因、辅助决策', value: '洞察全局 · 数据驱动 · 科学决策' },
]
const questions = ['数据能否不出内网？', '模型和应用能否私有部署？', '权限能否精细控制？', '操作过程能否审计？', '是否符合信创要求？', '能否适配国产软硬件生态？']
const keywords = [
  { no: '01', title: '一体化', desc: '硬件、系统、模型、智能体和管理能力一体化' },
  { no: '02', title: '安全化', desc: '数据不出内网，权限可控，过程可审计' },
  { no: '03', title: '国产化', desc: '国产软硬件和信创生态' },
  { no: '04', title: '业务化', desc: '面向真实企业流程和岗位任务落地' },
]
const deployValues = [
  { title: '部署更快', desc: '降低从零搭建复杂度' }, { title: '运行更稳', desc: '硬件、系统、模型和应用一体化适配' },
  { title: '管理更集中', desc: '统一管理用户、权限、知识、智能体和日志' }, { title: '安全更强', desc: '核心数据在企业内部流转' },
]
const controls = [
  { no: '01', title: '角色权限', desc: '不同岗位、部门、角色拥有不同数据访问边界。' },
  { no: '02', title: '审批边界', desc: '符合规则的操作自动处理，高风险或敏感操作需要人工确认。' },
  { no: '03', title: '日志审计', desc: '关键操作结合审批流程和审计机制，确保合规可控。' },
]
const learning = [
  { title: '学习企业知识', desc: '企业制度文档、操作手册、指标说明和历史报告' },
  { title: '连接内部系统', desc: '在授权范围内调用内部系统和业务数据' },
  { title: '执行企业流程', desc: '按照企业设定流程执行任务' },
  { title: '沉淀工作能力', desc: '把任务过程沉淀为可复用能力' },
]
const scenarios = [
  { en: 'FINANCE', title: '财务智能体', desc: '报表核对、费用分析、预算跟踪' }, { en: 'SERVICE', title: '客服智能体', desc: '工单归类、问题总结、服务质量分析' },
  { en: 'SUPPLY', title: '供应链智能体', desc: '库存预警、交付风险识别' }, { en: 'ANALYSIS', title: '经营分析智能体', desc: '指标监控、波动归因、报告生成' },
  { en: 'KNOWLEDGE', title: '知识助理智能体', desc: '制度问答、文档检索、流程指引' },
]
const teamManagement = ['权限管理', '职责管理', '技能管理', '日志管理', '表现管理', '成长路径']
const coreValues = [
  { no: '01', title: '提升效率', desc: '将重复、高频、繁琐工作交给数字员工。' }, { no: '02', title: '保障安全', desc: '内网部署、权限控制、日志审计、数据不外流。' },
  { no: '03', title: '符合信创', desc: '融合国产软硬件、大模型和智能体能力。' }, { no: '04', title: '沉淀能力', desc: '将知识、规则、流程和经验转化为企业数字资产。' },
]

let observer: IntersectionObserver | null = null
let interactiveCards: HTMLElement[] = []
let pageElement: HTMLElement | null = null

const resetCard = (card: HTMLElement) => {
  card.style.setProperty('--rotate-x', '0deg')
  card.style.setProperty('--rotate-y', '0deg')
  card.style.setProperty('--card-scale', '1')
}

const handleCardMove = (event: PointerEvent) => {
  const card = event.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1)
  const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1)

  card.style.setProperty('--pointer-x', `${x * 100}%`)
  card.style.setProperty('--pointer-y', `${y * 100}%`)
  card.style.setProperty('--rotate-x', `${(0.5 - y) * 5}deg`)
  card.style.setProperty('--rotate-y', `${(x - 0.5) * 6}deg`)
}

const handleCardLeave = (event: PointerEvent) => resetCard(event.currentTarget as HTMLElement)
const handleCardDown = (event: PointerEvent) => (event.currentTarget as HTMLElement).style.setProperty('--card-scale', '.985')
const handleCardUp = (event: PointerEvent) => (event.currentTarget as HTMLElement).style.setProperty('--card-scale', '1')
const handlePagePointer = (event: PointerEvent) => {
  pageElement?.style.setProperty('--page-pointer-x', `${event.clientX}px`)
  pageElement?.style.setProperty('--page-pointer-y', `${event.clientY}px`)
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 })
  document.querySelectorAll('.reveal').forEach((element) => observer?.observe(element))

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    interactiveCards = Array.from(document.querySelectorAll<HTMLElement>('.interactive-card'))
    interactiveCards.forEach((card) => {
      card.addEventListener('pointermove', handleCardMove)
      card.addEventListener('pointerleave', handleCardLeave)
      card.addEventListener('pointerdown', handleCardDown)
      card.addEventListener('pointerup', handleCardUp)
    })
    pageElement = document.querySelector<HTMLElement>('.aipc-page')
    pageElement?.addEventListener('pointermove', handlePagePointer)
  }
})

onUnmounted(() => {
  observer?.disconnect()
  interactiveCards.forEach((card) => {
    card.removeEventListener('pointermove', handleCardMove)
    card.removeEventListener('pointerleave', handleCardLeave)
    card.removeEventListener('pointerdown', handleCardDown)
    card.removeEventListener('pointerup', handleCardUp)
  })
  pageElement?.removeEventListener('pointermove', handlePagePointer)
})
</script>

<style scoped lang="scss">
:global(html) { scroll-behavior: smooth; }
.aipc-page { --ink:#10182e; --muted:#65708a; --blue:#4067ed; --purple:#7656e8; --line:#e4e9f4; --page-pointer-x:50vw; --page-pointer-y:30vh; position:relative; isolation:isolate; overflow:hidden; color:var(--ink); background:#fff; font-family:"Inter","PingFang SC","Microsoft YaHei",sans-serif; }
.aipc-page::before { content:""; position:fixed; z-index:-1; inset:0; pointer-events:none; opacity:.72; background:radial-gradient(520px circle at var(--page-pointer-x) var(--page-pointer-y),rgba(84,105,239,.075),transparent 65%); }
main { padding-top:72px; } .section-shell { width:min(1180px,calc(100% - 48px)); margin:0 auto; } section { position:relative; }
.intro::before,.position::before,.control::before,.scenarios::before { content:""; position:absolute; z-index:-1; inset:0; pointer-events:none; opacity:.32; background-image:linear-gradient(rgba(64,103,237,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(64,103,237,.055) 1px,transparent 1px); background-size:64px 64px; mask-image:linear-gradient(to bottom,transparent,black 18%,black 82%,transparent); }
.interactive-card { --rotate-x:0deg; --rotate-y:0deg; --card-scale:1; --pointer-x:50%; --pointer-y:50%; position:relative; isolation:isolate; overflow:hidden; transform:perspective(900px) rotateX(var(--rotate-x)) rotateY(var(--rotate-y)) scale(var(--card-scale)); transform-style:preserve-3d; will-change:transform; transition:transform .18s ease-out,border-color .25s ease,box-shadow .25s ease,background-color .25s ease; }
.interactive-card::before { content:""; position:absolute; z-index:0; inset:0; pointer-events:none; opacity:0; background:radial-gradient(330px circle at var(--pointer-x) var(--pointer-y),rgba(101,114,242,.17),transparent 55%); transition:opacity .25s ease; }
.interactive-card::after { content:""; position:absolute; z-index:3; inset:0; pointer-events:none; border-radius:inherit; opacity:0; padding:1px; background:linear-gradient(120deg,rgba(255,255,255,.85),rgba(102,115,241,.52),transparent 55%); mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude; transition:opacity .25s ease; }
.interactive-card:hover { border-color:rgba(94,108,229,.38)!important; box-shadow:0 22px 55px rgba(35,48,94,.14),0 3px 10px rgba(35,48,94,.06); }
.interactive-card:hover::before,.interactive-card:hover::after { opacity:1; }
.interactive-card:active { transition-duration:.08s; box-shadow:0 9px 22px rgba(35,48,94,.12),inset 0 2px 5px rgba(42,54,104,.08); }
.interactive-card > * { position:relative; z-index:1; transform:translateZ(8px); }
.interactive-row { position:relative; transition:padding .25s ease,color .25s ease,background-color .25s ease; }
.interactive-row::before { content:""; position:absolute; left:-12px; top:20%; bottom:20%; width:3px; border-radius:3px; background:linear-gradient(var(--blue),var(--purple)); transform:scaleY(0); transition:transform .25s ease; }
.interactive-row:hover { padding-left:14px; padding-right:14px; background:linear-gradient(90deg,rgba(76,100,232,.055),transparent); }
.interactive-row:hover::before { transform:scaleY(1); }
.hero { min-height:760px; display:grid; grid-template-columns:1.08fr .92fr; align-items:center; gap:48px; padding-block:82px 96px; }
.hero::before { content:""; position:absolute; width:760px; height:760px; right:-280px; top:-100px; border-radius:50%; background:radial-gradient(circle,rgba(100,87,229,.13),transparent 67%); }
.eyebrow,.mini-label { display:inline-flex; align-items:center; gap:9px; color:var(--blue); font-size:13px; font-weight:700; letter-spacing:.13em; text-transform:uppercase; }
.eyebrow::before,.mini-label::before { content:""; width:24px; height:2px; background:linear-gradient(90deg,var(--blue),var(--purple)); }
h1 { font-size:clamp(42px,5vw,70px); line-height:1.13; letter-spacing:-.055em; margin:24px 0; font-weight:760; } h1 span,h2 span { color:transparent; background:linear-gradient(105deg,var(--blue),var(--purple)); background-clip:text; }
.hero-lead { max-width:590px; color:var(--muted); font-size:20px; line-height:1.8; } .hero-tags { display:flex; flex-wrap:wrap; gap:10px; margin:28px 0 36px; }.hero-tags span { border:1px solid var(--line); padding:8px 14px; border-radius:30px; font-size:13px; color:#44506b; background:#fff; }
.primary-action { display:inline-flex; gap:32px; align-items:center; padding:14px 18px 14px 24px; border-radius:6px; color:#fff; background:linear-gradient(100deg,var(--blue),var(--purple)); text-decoration:none; box-shadow:0 16px 36px rgba(76,91,222,.25); }.primary-action b { display:grid; place-items:center; width:30px; height:30px; border-radius:50%; background:rgba(255,255,255,.2); }
.hero-visual { position:relative; min-height:520px; display:grid; place-items:center; }.hero-visual img { position:relative; z-index:3; width:min(100%,480px); border-radius:24px; mix-blend-mode:multiply; filter:drop-shadow(0 30px 30px rgba(21,32,70,.2)); }.product-glow { position:absolute; width:370px;height:370px;border-radius:50%;background:radial-gradient(circle,#dfe4ff,transparent 68%); }.orbit { position:absolute;border:1px solid rgba(91,103,213,.18);border-radius:50%; }.orbit-one { width:460px;height:460px;animation:spin 22s linear infinite; }.orbit-two { width:550px;height:550px;border-style:dashed;animation:spin 32s linear reverse infinite; }.visual-chip { position:absolute; z-index:4; padding:11px 16px; border:1px solid rgba(91,103,213,.14); border-radius:10px; background:rgba(255,255,255,.84); backdrop-filter:blur(12px); box-shadow:0 12px 32px rgba(40,49,90,.12); font-size:13px; }.visual-chip i { display:inline-block;width:7px;height:7px;border-radius:50%;background:#5e6eea;margin-right:7px;box-shadow:0 0 0 5px rgba(94,110,234,.12);}.chip-top{right:0;top:105px}.chip-bottom{left:0;bottom:110px}
.section-heading { max-width:760px; margin-bottom:50px; }.section-heading .index { display:block;color:var(--blue);font:700 12px/1.2 monospace;letter-spacing:.12em;text-transform:uppercase;margin-bottom:20px}.section-heading h2 { font-size:clamp(32px,4vw,52px);line-height:1.2;letter-spacing:-.045em;margin:0 0 18px}.section-heading p { color:var(--muted);font-size:17px;line-height:1.85;margin:0}.section-heading.light h2{color:#fff}.section-heading.light p{color:#aeb8d3}.section-heading.light .index{color:#9e9cff}
.intro,.problem,.position,.deployment,.control,.learn,.scenarios,.value { padding-block:110px; }.work-grid { display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--line);border-radius:14px;overflow:hidden}.work-card{padding:32px 26px;min-height:190px;border-right:1px solid var(--line);background:linear-gradient(150deg,#fff,#fafbff)}.work-card:last-child{border:0}.work-card span,.keyword span,.control-card>span,.core-value>span{font:700 12px monospace;color:#7c89a5}.work-card h3{font-size:19px;margin:35px 0 10px}.work-card p{font-size:14px;color:var(--muted);line-height:1.7}.statement{display:grid;grid-template-columns:1fr 1fr;gap:70px;margin-top:36px;padding:54px;border-radius:14px;background:#f4f6fc}.statement h3{font-size:27px;line-height:1.5;margin:15px 0 0}.statement ul{margin:0;padding:0;list-style:none;align-self:center}.statement li{padding:16px 0 16px 27px;border-bottom:1px solid #dce2f0;color:#49556f;position:relative}.statement li::before{content:"";position:absolute;left:0;top:24px;width:8px;height:8px;border-radius:50%;background:var(--blue)}
.problem{border-top:1px solid #f0f2f7}.experience-panel{padding:52px;border:1px solid var(--line);border-radius:18px;background:linear-gradient(120deg,#fbfcff,#f3f5fc);display:grid;grid-template-columns:1fr 1fr;gap:30px}.experience-copy h3{font-size:28px;line-height:1.45;margin:15px 0}.experience-copy p{color:var(--muted);line-height:1.8}.experience-flow{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-content:center}.experience-flow span,.experience-flow b{padding:15px;border:1px solid #dfe4f1;background:#fff;border-radius:8px;text-align:center;font-size:13px}.experience-flow b{grid-column:1/3;color:#fff;background:linear-gradient(100deg,var(--blue),var(--purple));border:0}.risk-row{grid-column:1/3;display:grid;grid-template-columns:repeat(4,1fr);gap:1px;margin-top:12px;background:#dfe4ef;border-radius:8px;overflow:hidden}.risk-row span{background:#fff;padding:13px;text-align:center;font-size:12px;color:#68738d}.roles-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:24px}.role-card{padding:38px;border:1px solid var(--line);border-radius:14px}.role-card:hover{box-shadow:0 20px 50px rgba(38,51,98,.1)}.role-icon{width:48px;height:48px;display:grid;place-items:center;border-radius:12px;background:#eef1ff;color:var(--blue);font-size:24px}.role-card>span{display:block;margin-top:34px;color:#929cb3;font:11px monospace;letter-spacing:.16em}.role-card h3{font-size:25px;margin:8px 0 14px}.role-card p{color:var(--muted);line-height:1.7;min-height:48px}.role-card small{display:block;border-top:1px solid var(--line);padding-top:16px;color:#47536e}
.threshold,.team{background:#11172c;color:#fff}.threshold::after,.team::after{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:48px 48px;pointer-events:none}.threshold-inner,.team>.section-shell{padding-block:110px;position:relative;z-index:1}.question-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.question{padding:30px;border:1px solid #2b3452;background:rgba(255,255,255,.03);border-radius:10px}.question.interactive-card::before,.team-points .interactive-card::before{background:radial-gradient(330px circle at var(--pointer-x) var(--pointer-y),rgba(124,132,255,.22),transparent 58%)}.question.interactive-card:hover,.team-points .interactive-card:hover{border-color:rgba(134,142,255,.55)!important;box-shadow:0 24px 58px rgba(2,7,24,.38),0 0 28px rgba(91,98,224,.1)}.question span{color:#777dea;font:12px monospace}.question p{font-size:17px;margin:30px 0 0;color:#e8ebf5}
.position-stage{display:grid;grid-template-columns:1fr 1.4fr 1fr;grid-template-rows:1fr 1fr;gap:14px;align-items:stretch}.stack-center{grid-column:2;grid-row:1/3;min-height:370px;border-radius:16px;background:#f5f7fc;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px}.stack-center img{width:75%;max-height:235px;object-fit:cover;mix-blend-mode:multiply;border-radius:15px}.stack-center strong{font-size:24px}.stack-center small{color:var(--muted);margin-top:8px}.stack-card{border:1px solid var(--line);border-radius:14px;padding:30px;display:flex;flex-direction:column;justify-content:space-between;min-height:170px}.stack-card span{font:12px monospace;color:#8792aa}.stack-card b{font-size:17px}.keywords,.control-grid,.core-values{display:grid;grid-template-columns:repeat(4,1fr);margin-top:22px;border:1px solid var(--line);border-radius:14px;overflow:hidden}.keyword,.core-value{padding:30px;border-right:1px solid var(--line)}.keyword:last-child,.core-value:last-child{border:0}.keyword h3,.core-value h3{font-size:21px;margin:30px 0 12px}.keyword p,.core-value p{color:var(--muted);line-height:1.7;font-size:14px}
.deployment{background:#fafbfe}.deployment-layout{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center}.network-visual{height:450px;position:relative;display:grid;place-items:center}.network-core{z-index:2;width:160px;height:160px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;background:linear-gradient(145deg,var(--blue),var(--purple));box-shadow:0 20px 50px rgba(66,84,214,.25)}.network-core>span{font-size:32px;font-weight:800}.network-core small{opacity:.72;margin-top:7px}.network-ring{position:absolute;border:1px dashed #cbd2e6;border-radius:50%}.ring-a{width:290px;height:290px}.ring-b{width:420px;height:420px}.node{position:absolute;padding:10px 17px;border:1px solid var(--line);background:#fff;border-radius:30px;font-size:13px;box-shadow:0 8px 25px rgba(34,49,89,.08)}.node-a{top:32px}.node-b{right:5px}.node-c{bottom:32px}.node-d{left:5px}.value-item{padding:24px 0;border-bottom:1px solid var(--line);display:grid;grid-template-columns:140px 1fr;gap:20px}.value-item b{font-size:18px}.value-item p{margin:0;color:var(--muted)}.data-banner{margin-top:65px;padding:55px;border-radius:16px;background:linear-gradient(110deg,#172142,#3d3e91);color:#fff}.data-banner>span{font:11px monospace;letter-spacing:.18em;color:#9ea9e9}.data-banner h3{font-size:30px;margin:17px 0}.data-banner p{max-width:850px;line-height:1.8;color:#c2cae2}
.control-grid{grid-template-columns:repeat(3,1fr)}.control-card{padding:38px;border-right:1px solid var(--line)}.control-card:last-child{border:0}.control-card h3{font-size:22px;margin:34px 0 12px}.control-card p{color:var(--muted);line-height:1.8}.xinchuang{margin-top:24px;padding:52px;border-radius:16px;background:#f3f5fc;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}.xinchuang h3{font-size:30px;margin:15px 0}.xinchuang p{color:var(--muted);line-height:1.8}.capability-chain{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:center}.capability-chain span{padding:16px;border-radius:8px;background:#fff;border:1px solid var(--line);text-align:center;font-size:13px}.capability-chain i{font-style:normal;color:var(--purple)}
.learning-path{display:grid;grid-template-columns:repeat(4,1fr);position:relative}.learning-path::before{content:"";position:absolute;left:10%;right:10%;top:20px;height:1px;background:#cbd2e5}.learning-path article{position:relative;padding:0 22px}.learning-path span{position:relative;z-index:1;display:grid;place-items:center;width:40px;height:40px;border-radius:50%;color:#fff;background:var(--blue);font:11px monospace}.learning-path h3{font-size:18px;margin-top:28px}.learning-path p{font-size:14px;line-height:1.7;color:var(--muted)}.agent-engine{margin-top:65px;padding:45px;border-radius:18px;background:#11172c;color:#fff;display:grid;grid-template-columns:1fr 150px 1.5fr;gap:35px;align-items:center}.engine-title span{color:#919be8;font-size:12px}.engine-title h3{font-size:30px;margin:8px 0}.engine-core{display:grid;place-items:center;width:140px;height:140px;border:1px solid #6871cf;border-radius:50%;font-size:35px;text-align:center;box-shadow:inset 0 0 40px rgba(96,101,226,.25)}.engine-core small{font-size:12px;color:#aeb6d0}.engine-points{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.engine-points span,.engine-base span{padding:12px;border:1px solid #303a59;border-radius:7px;color:#cbd2e5;font-size:13px}.engine-base{grid-column:1/4;display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.engine-base span{text-align:center;background:#1b2340;color:#aeb7ff}
.scenario-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}.scenario-card{grid-column:span 2;min-height:220px;padding:32px;border:1px solid var(--line);border-radius:13px;background:linear-gradient(150deg,#fff,#fafbff)}.scenario-card:nth-child(4){grid-column:2/span 2}.scenario-card span{font:11px monospace;letter-spacing:.12em;color:#7784e0}.scenario-card h3{font-size:21px;margin:60px 0 12px}.scenario-card p{color:var(--muted)}
.team-points{display:grid;grid-template-columns:1fr 1fr;gap:15px}.team-points article{padding:38px;border:1px solid #2b3554;border-radius:12px;background:rgba(255,255,255,.025)}.team-points span{font:12px monospace;color:#8a90eb}.team-points h3{font-size:23px}.team-points p{color:#adb7cf;line-height:1.8}.team-strip{display:grid;grid-template-columns:repeat(6,1fr);margin-top:15px;border:1px solid #2b3554;border-radius:10px;overflow:hidden}.team-strip span{padding:18px;text-align:center;border-right:1px solid #2b3554;color:#cbd2e4;font-size:13px}.systems{display:flex;align-items:stretch;gap:10px}.systems>span,.systems>b{flex:1;padding:28px 18px;border:1px solid var(--line);border-radius:10px;font-size:18px}.systems small{display:block;margin-top:12px;color:var(--muted);font-weight:400}.systems b{color:#fff;background:linear-gradient(115deg,var(--blue),var(--purple));border:0}.systems b small{color:#dce0ff}.core-values{margin-top:24px}
.closing{padding-block:130px;background:linear-gradient(135deg,#f4f6ff,#fff 50%,#f8f4ff)}.closing-inner{text-align:center}.closing h2{font-size:clamp(38px,5vw,66px);line-height:1.2;letter-spacing:-.05em;margin:28px 0}.closing p{font-size:18px;color:var(--muted)}.closing-line{display:flex;justify-content:center;gap:12px;margin:38px 0}.closing-line span{padding:12px 18px;border:1px solid var(--line);border-radius:30px;background:#fff}.closing strong{display:block;font-size:22px;color:var(--blue)}
.reveal{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease}.reveal.is-visible{opacity:1;transform:none}.delay-1{transition-delay:.12s}@keyframes spin{to{transform:rotate(360deg)}}
@media(max-width:900px){main{padding-top:64px}.hero{grid-template-columns:1fr;padding-top:70px}.hero-visual{min-height:420px}.work-grid,.keywords,.core-values{grid-template-columns:repeat(2,1fr)}.work-card:nth-child(2),.keyword:nth-child(2),.core-value:nth-child(2){border-right:0}.work-card,.keyword,.core-value{border-bottom:1px solid var(--line)}.statement,.experience-panel,.deployment-layout,.xinchuang{grid-template-columns:1fr}.roles-grid,.question-grid{grid-template-columns:1fr}.position-stage{grid-template-columns:1fr 1fr;grid-template-rows:auto}.stack-center{grid-column:1/3;grid-row:auto}.control-grid{grid-template-columns:1fr}.control-card{border-right:0;border-bottom:1px solid var(--line)}.learning-path{grid-template-columns:repeat(2,1fr);gap:35px}.learning-path::before{display:none}.agent-engine{grid-template-columns:1fr}.engine-base{grid-column:auto}.scenario-grid{grid-template-columns:1fr 1fr}.scenario-card,.scenario-card:nth-child(4){grid-column:auto}.team-strip{grid-template-columns:repeat(3,1fr)} }
@media(max-width:600px){.section-shell{width:min(100% - 30px,1180px)}.hero{min-height:auto;padding-block:55px}.hero-visual{min-height:330px}.hero-visual img{width:85%}.orbit-one{width:300px;height:300px}.orbit-two{width:350px;height:350px}.visual-chip{display:none}.intro,.problem,.position,.deployment,.control,.learn,.scenarios,.value,.threshold-inner,.team>.section-shell{padding-block:76px}.work-grid,.keywords,.core-values,.team-points,.scenario-grid{grid-template-columns:1fr}.work-card,.keyword,.core-value{border-right:0}.statement,.experience-panel,.xinchuang,.data-banner{padding:30px}.statement{gap:30px}.experience-panel{display:block}.experience-flow{margin-top:30px}.risk-row{grid-column:auto;grid-template-columns:1fr 1fr}.roles-grid{grid-template-columns:1fr}.question-grid{grid-template-columns:1fr}.position-stage{display:flex;flex-direction:column}.stack-center{order:-1}.deployment-layout{gap:20px}.network-visual{height:350px}.ring-b{width:320px;height:320px}.ring-a{width:230px;height:230px}.value-item{grid-template-columns:1fr;gap:8px}.capability-chain{grid-template-columns:1fr}.capability-chain i{display:none}.learning-path{grid-template-columns:1fr}.agent-engine{padding:28px}.engine-points{grid-template-columns:1fr}.engine-base{grid-template-columns:1fr}.team-strip{grid-template-columns:1fr 1fr}.systems{display:grid;grid-template-columns:1fr 1fr}.closing-line{flex-direction:column;align-items:center}}
@media(hover:none),(pointer:coarse){.interactive-card{transform:none!important}.interactive-card::before,.interactive-card::after{display:none}.interactive-card:hover{box-shadow:none}.interactive-row:hover{padding-left:0;padding-right:0;background:none}}
@media(prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none}.orbit{animation:none}.interactive-card{transform:none!important;transition:none}.aipc-page::before{display:none}}
</style>
