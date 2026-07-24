<template>
  <div class="aipc-page">
    <SiteNav active-key="aipc" />

    <main>
      <section class="hero section-shell">
        <div class="hero-copy reveal">
          <span class="eyebrow">KedoClaw · 企业智能体一体机</span>
          <h1>为企业内网而生的<br><span>安全可信国产智能体一体机</span></h1>
          <p>帮助企业打造私有、可控、可持续成长的 AI 数字员工团队</p>
          <div class="hero-tags">
            <span>安全可信</span><span>自主可控</span><span>开箱即用</span><span>持续成长</span>
          </div>
          <a class="primary-action" href="#overview">了解 KedoClaw <b>↘</b></a>
        </div>

        <div class="hero-product reveal delay-1" aria-label="KedoClaw 产品展示">
          <div class="ai-screen">
            <div class="screen-grid" />
            <div class="screen-core"><div class="core-label"><b>AI</b><small>企业智能体</small></div></div>
            <div class="ability ability-a"><i>▣</i><span>知识问答</span></div>
            <div class="ability ability-b"><i>⌁</i><span>智能分析</span></div>
            <div class="ability ability-c"><i>≡</i><span>文档处理</span></div>
            <div class="ability ability-d"><i>⌘</i><span>流程自动化</span></div>
            <div class="ability ability-e"><i>◔</i><span>数据洞察</span></div>
            <div class="ability ability-f"><i>◇</i><span>辅助决策</span></div>
          </div>
          <div class="device-wrap">
            <div class="device-aura" />
            <img src="@/assets/images/kedoclaw-device-transparent.png" alt="KedoClaw 企业智能体一体机" />
            <div class="device-contact-shadow" />
          </div>
          <div class="display-stage"><span /><i /><b /></div>
          <div class="visual-chip chip-top"><i /> 内网运行</div>
          <div class="visual-chip chip-bottom"><i /> 数据不出内网</div>
        </div>
      </section>

      <section id="overview" class="overview section-shell compact-section">
        <div class="section-heading reveal">
          <span class="index">01 / 从问答走向工作</span>
          <h2>AI 的价值正在从“会说”转向“会做”</h2>
          <p>企业真正需要的，是能够理解业务规则、连接企业数据、调用内部系统并承担岗位任务的 AI 数字员工。</p>
        </div>
        <div class="work-grid">
          <article v-for="(item, index) in realWork" :key="item.title" class="interactive-card reveal">
            <span>0{{ index + 1 }}</span><h3>{{ item.title }}</h3><p>{{ item.desc }}</p>
          </article>
        </div>
        <div class="role-strip reveal">
          <article v-for="role in roles" :key="role.title" class="interactive-card">
            <div>{{ role.icon }}</div><span>{{ role.en }}</span><h3>{{ role.title }}</h3><p>{{ role.desc }}</p><small>{{ role.value }}</small>
          </article>
        </div>
      </section>

      <section class="challenge">
        <div class="section-shell compact-section">
          <div class="challenge-copy reveal">
            <span class="index">02 / 企业 AI 的核心门槛</span>
            <h2>信息已经在线，<br>工作与经验仍需沉淀</h2>
            <p>企业已有 ERP、OA、CRM、BI、知识库等系统，但业务规则和判断经验仍大量存在于人脑中。企业 AI 不仅要能执行，更要安全、可控、合规、可审计。</p>
          </div>
          <div class="question-grid">
            <article v-for="(question, index) in questions" :key="question" class="question interactive-card reveal">
              <span>0{{ index + 1 }}</span><p>{{ question }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="product section-shell compact-section">
        <div class="product-heading reveal">
          <div class="section-heading">
            <span class="index">03 / 一体化产品定位</span>
            <h2>KedoClaw，让 AI 落在企业现场</h2>
            <p>融合国产一体机、国产大模型、国产操作系统和国产智能体能力，提供开箱可用、私有部署、内网运行、安全可控的企业 AI 工作平台。</p>
          </div>
          <div class="kedoclaw-wordmark" aria-label="KedoClaw">
            <span>Kedo</span><b>Claw</b><i>ENTERPRISE AI SYSTEM</i>
          </div>
        </div>
        <div class="product-composition reveal">
          <div class="composition-side">
            <article class="interactive-card"><span>01</span><b>国产一体机</b></article>
            <article class="interactive-card"><span>02</span><b>国产大模型</b></article>
          </div>
          <div class="composition-center">
            <div class="mini-screen"><b>AI</b><span>私有 · 可控 · 可持续</span></div>
            <div class="composition-device"><span /><img src="@/assets/images/kedoclaw-device-transparent.png" alt="KedoClaw 产品外观" /><i /></div>
            <div class="mini-stage" />
          </div>
          <div class="composition-side">
            <article class="interactive-card"><span>03</span><b>国产操作系统</b></article>
            <article class="interactive-card"><span>04</span><b>国产智能体能力</b></article>
          </div>
        </div>
        <div class="keyword-grid">
          <article v-for="item in keywords" :key="item.title" class="interactive-card reveal">
            <span>{{ item.no }}</span><h3>{{ item.title }}</h3><p>{{ item.desc }}</p>
          </article>
        </div>
      </section>

      <section class="security compact-section">
        <div class="section-shell security-layout">
          <div class="security-visual reveal">
            <div class="network-ring ring-a" /><div class="network-ring ring-b" />
            <div class="network-core"><span>K</span><b>企业 AI</b><small>内网 / 专网 / 机房</small></div>
            <span class="node node-a">用户</span><span class="node node-b">知识</span><span class="node node-c">智能体</span><span class="node node-d">日志</span>
          </div>
          <div class="security-copy reveal">
            <span class="index">04 / 内网部署与安全边界</span>
            <h2>数据不出内网，<br>是企业敢用 AI 的前提</h2>
            <p>财务、客户、合同、供应链、经营数据可在内网处理，敏感信息无需上传外部平台。</p>
            <div class="security-list">
              <article v-for="item in controls" :key="item.title" class="interactive-row">
                <b>{{ item.title }}</b><span>{{ item.desc }}</span>
              </article>
            </div>
          </div>
        </div>
        <div class="section-shell xinchuang reveal">
          <strong>符合信创 · 自主可控的 AI 底座</strong>
          <div><span>国产一体机</span><i>×</i><span>国产操作系统</span><i>×</i><span>国产大模型</span><i>×</i><span>国产智能体</span></div>
        </div>
      </section>

      <section class="capability section-shell compact-section">
        <div class="section-heading reveal">
          <span class="index">05 / 从理解企业到执行任务</span>
          <h2>让 AI 学会企业自己的工作方式</h2>
          <p>理解专有名词、组织结构、指标口径和流程约定，在授权范围内调用内部系统并执行企业流程。</p>
        </div>
        <div class="agent-panel reveal">
          <div class="agent-core"><div class="core-label"><b>AI</b><span>国产智能体</span></div></div>
          <div class="agent-capabilities">
            <span v-for="item in agentCapabilities" :key="item">{{ item }}</span>
          </div>
          <div class="agent-base"><span>权限控制</span><span>过程审计</span><span>结果交付</span></div>
        </div>
        <div class="scenario-grid">
          <article v-for="scene in scenarios" :key="scene.title" class="interactive-card reveal">
            <span>{{ scene.en }}</span><h3>{{ scene.title }}</h3><p>{{ scene.desc }}</p>
          </article>
        </div>
      </section>

      <section class="future">
        <div class="section-shell compact-section">
          <div class="future-top">
            <div class="section-heading light reveal">
              <span class="index">06 / 数字员工团队</span>
              <h2>从沉淀数据，走向沉淀能力</h2>
              <p>未来企业不仅管理员工，也要管理数字员工。多个智能体可共享授权知识、调用指定工具并协同工作。</p>
            </div>
            <div class="management reveal">
              <span v-for="item in teamManagement" :key="item">{{ item }}</span>
            </div>
          </div>
          <div class="system-line reveal">
            <span>ERP<small>沉淀流程</small></span><span>BI<small>沉淀数据</small></span><span>知识库<small>沉淀文档</small></span><span>OA<small>沉淀审批</small></span><b>KedoClaw<small>沉淀能力</small></b>
          </div>
          <div class="core-values">
            <article v-for="item in coreValues" :key="item.title" class="interactive-card reveal">
              <span>{{ item.no }}</span><h3>{{ item.title }}</h3><p>{{ item.desc }}</p>
            </article>
          </div>
          <div class="closing reveal">
            <span class="eyebrow">企业 AI 的未来</span>
            <h2>不是单个聊天工具，<br>而是<span>安全可信的数字员工团队</span></h2>
            <p>让重复工作可托付、经验可传承、能力可复制，让 AI 成为企业新的生产力。</p>
          </div>
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
  { icon: '↗', en: 'EXECUTOR', title: '执行者', desc: '接住高频、繁琐、重复性工作', value: '自动执行 · 稳定高效' },
  { icon: '◇', en: 'ASSISTANT', title: '助理', desc: '协助岗位人员完成分析、协同和交付', value: '提升效率 · 加速交付' },
  { icon: '◎', en: 'ADVISER', title: '参谋', desc: '发现问题、分析原因、辅助决策', value: '洞察全局 · 科学决策' },
]
const questions = ['数据能否不出内网？', '模型和应用能否私有部署？', '权限能否精细控制？', '操作过程能否审计？', '是否符合信创要求？', '能否适配国产软硬件生态？']
const keywords = [
  { no: '01', title: '一体化', desc: '硬件、系统、模型、智能体和管理能力一体化' },
  { no: '02', title: '安全化', desc: '数据不出内网，权限可控，过程可审计' },
  { no: '03', title: '国产化', desc: '国产软硬件和信创生态' },
  { no: '04', title: '业务化', desc: '面向真实企业流程和岗位任务落地' },
]
const controls = [
  { title: '角色权限', desc: '不同岗位、部门、角色拥有不同的数据访问边界。' },
  { title: '审批边界', desc: '高风险或敏感操作需要人工确认。' },
  { title: '日志审计', desc: '关键操作结合审批流程和审计机制。' },
]
const agentCapabilities = ['理解企业语境', '学习制度与知识', '任务规划', '工具调用', '上下文记忆', '多系统集成', '执行流程', '多角色协同']
const scenarios = [
  { en: 'FINANCE', title: '财务智能体', desc: '报表核对、费用分析、预算跟踪' },
  { en: 'SERVICE', title: '客服智能体', desc: '工单归类、问题总结、服务质量分析' },
  { en: 'SUPPLY', title: '供应链智能体', desc: '库存预警、交付风险识别' },
  { en: 'ANALYSIS', title: '经营分析智能体', desc: '指标监控、波动归因、报告生成' },
  { en: 'KNOWLEDGE', title: '知识助理智能体', desc: '制度问答、文档检索、流程指引' },
]
const teamManagement = ['权限管理', '职责管理', '技能管理', '日志管理', '表现管理', '成长路径']
const coreValues = [
  { no: '01', title: '提升效率', desc: '将重复、高频、繁琐工作交给数字员工。' },
  { no: '02', title: '保障安全', desc: '内网部署、权限控制、日志审计、数据不外流。' },
  { no: '03', title: '符合信创', desc: '融合国产软硬件、大模型和智能体能力。' },
  { no: '04', title: '沉淀能力', desc: '将知识、规则、流程和经验转化为企业数字资产。' },
]

let observer: IntersectionObserver | null = null
let cards: HTMLElement[] = []
let page: HTMLElement | null = null

const resetCard = (card: HTMLElement) => {
  card.style.setProperty('--rotate-x', '0deg')
  card.style.setProperty('--rotate-y', '0deg')
  card.style.setProperty('--card-scale', '1')
}
const moveCard = (event: PointerEvent) => {
  const card = event.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1)
  const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1)
  card.style.setProperty('--pointer-x', `${x * 100}%`)
  card.style.setProperty('--pointer-y', `${y * 100}%`)
  card.style.setProperty('--rotate-x', `${(0.5 - y) * 5}deg`)
  card.style.setProperty('--rotate-y', `${(x - 0.5) * 6}deg`)
}
const leaveCard = (event: PointerEvent) => resetCard(event.currentTarget as HTMLElement)
const pressCard = (event: PointerEvent) => (event.currentTarget as HTMLElement).style.setProperty('--card-scale', '.985')
const releaseCard = (event: PointerEvent) => (event.currentTarget as HTMLElement).style.setProperty('--card-scale', '1')
const movePage = (event: PointerEvent) => {
  page?.style.setProperty('--page-x', `${event.clientX}px`)
  page?.style.setProperty('--page-y', `${event.clientY}px`)
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach((element) => observer?.observe(element))
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    cards = Array.from(document.querySelectorAll<HTMLElement>('.interactive-card'))
    cards.forEach((card) => {
      card.addEventListener('pointermove', moveCard)
      card.addEventListener('pointerleave', leaveCard)
      card.addEventListener('pointerdown', pressCard)
      card.addEventListener('pointerup', releaseCard)
    })
    page = document.querySelector('.aipc-page')
    page?.addEventListener('pointermove', movePage)
  }
})

onUnmounted(() => {
  observer?.disconnect()
  cards.forEach((card) => {
    card.removeEventListener('pointermove', moveCard)
    card.removeEventListener('pointerleave', leaveCard)
    card.removeEventListener('pointerdown', pressCard)
    card.removeEventListener('pointerup', releaseCard)
  })
  page?.removeEventListener('pointermove', movePage)
})
</script>

<style scoped lang="scss">
:global(html) { scroll-behavior: smooth; }
.aipc-page { --ink:#10182e; --muted:#64708a; --blue:#3569ee; --cyan:#20c8ee; --purple:#7656e8; --line:#e3e8f3; --page-x:50vw; --page-y:30vh; position:relative; isolation:isolate; overflow:hidden; color:var(--ink); background:#fff; font-family:"Inter","PingFang SC","Microsoft YaHei",sans-serif; }
.aipc-page::before { content:""; position:fixed; z-index:-1; inset:0; pointer-events:none; background:radial-gradient(500px circle at var(--page-x) var(--page-y),rgba(72,105,238,.07),transparent 68%); }
main { padding-top:72px; }
.section-shell { width:min(1180px,calc(100% - 48px)); margin:0 auto; }
.compact-section { padding-block:82px; }
.index { display:block; margin-bottom:17px; color:var(--blue); font:700 12px/1.2 monospace; letter-spacing:.13em; text-transform:uppercase; }
.section-heading { max-width:790px; margin-bottom:38px; }
.section-heading h2,.challenge-copy h2,.security-copy h2,.closing h2 { margin:0 0 16px; font-size:clamp(31px,3.6vw,50px); line-height:1.18; letter-spacing:-.045em; }
.section-heading p,.challenge-copy>p,.security-copy>p,.closing>p { margin:0; color:var(--muted); font-size:16px; line-height:1.8; }
.eyebrow { display:inline-flex; align-items:center; gap:9px; color:var(--blue); font-size:13px; font-weight:700; letter-spacing:.13em; }
.eyebrow::before { content:""; width:24px; height:2px; background:linear-gradient(90deg,var(--blue),var(--purple)); }

.hero { min-height:710px; display:grid; grid-template-columns:1.04fr .96fr; align-items:center; gap:38px; padding-block:64px 78px; }
.hero::before { content:""; position:absolute; z-index:-1; width:720px; height:720px; right:-300px; top:-130px; border-radius:50%; background:radial-gradient(circle,rgba(67,109,237,.13),transparent 68%); }
.hero-copy h1 { margin:22px 0; font-size:clamp(42px,4.8vw,67px); line-height:1.13; letter-spacing:-.055em; }
.hero-copy h1 span,.closing h2 span { color:transparent; background:linear-gradient(105deg,var(--blue),var(--purple)); background-clip:text; }
.hero-copy>p { max-width:580px; margin:0; color:var(--muted); font-size:19px; line-height:1.75; }
.hero-tags { display:flex; flex-wrap:wrap; gap:9px; margin:25px 0 31px; }
.hero-tags span { padding:7px 13px; border:1px solid var(--line); border-radius:30px; background:rgba(255,255,255,.8); color:#48546d; font-size:12px; }
.primary-action { display:inline-flex; align-items:center; gap:26px; padding:13px 16px 13px 22px; border-radius:7px; color:#fff; background:linear-gradient(100deg,var(--blue),var(--purple)); box-shadow:0 15px 34px rgba(67,83,210,.23); text-decoration:none; }
.primary-action b { display:grid; place-items:center; width:29px; height:29px; border-radius:50%; background:rgba(255,255,255,.18); }

.hero-product { position:relative; min-height:570px; perspective:1000px; }
.ai-screen { position:absolute; z-index:1; top:20px; left:7%; width:86%; height:330px; border:1px solid rgba(62,181,239,.34); border-radius:32px; background:linear-gradient(145deg,rgba(255,255,255,.5),rgba(218,241,255,.18)); box-shadow:inset 0 0 45px rgba(64,184,245,.08),0 18px 60px rgba(59,112,197,.1); backdrop-filter:blur(8px); transform:rotateX(2deg); }
.ai-screen::before,.ai-screen::after { content:""; position:absolute; inset:12px; border:1px solid rgba(63,190,244,.14); border-radius:24px; }
.ai-screen::after { inset:auto 10% -1px; height:1px; border:0; background:linear-gradient(90deg,transparent,var(--cyan),transparent); box-shadow:0 0 14px var(--cyan); }
.screen-grid { position:absolute; inset:0; border-radius:inherit; opacity:.28; background-image:linear-gradient(rgba(57,161,232,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(57,161,232,.08) 1px,transparent 1px); background-size:28px 28px; mask-image:radial-gradient(circle,#000,transparent 75%); }
.screen-core { position:absolute; left:50%; top:50%; width:105px; height:105px; transform:translate(-50%,-50%) rotate(30deg); display:grid; place-items:center; color:#fff; border:1px solid #6ddcff; border-radius:25px; background:linear-gradient(145deg,#175ee9,#11bdea); box-shadow:0 0 0 10px rgba(38,168,240,.08),0 0 36px rgba(24,135,238,.35); }
.core-label { display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; text-align:center; line-height:1; transform:rotate(-30deg); transform-origin:center; }.screen-core b{display:block;font-size:35px}.screen-core small{display:block;margin-top:7px;font-size:9px;line-height:1;opacity:.82}
.ability { position:absolute; display:flex; align-items:center; gap:7px; padding:8px 10px; border:1px solid rgba(54,167,230,.18); border-radius:9px; color:#43516b; background:rgba(255,255,255,.54); font-size:11px; }
.ability i { display:grid; place-items:center; width:22px; height:22px; border-radius:6px; color:#1677ed; background:rgba(43,139,239,.1); font-style:normal; }.ability-a{left:9%;top:17%}.ability-b{right:8%;top:14%}.ability-c{left:5%;top:45%}.ability-d{right:5%;top:44%}.ability-e{left:12%;bottom:15%}.ability-f{right:10%;bottom:14%}
.ability::after { content:""; position:absolute; width:45px; height:1px; background:linear-gradient(90deg,rgba(25,195,232,.8),transparent); }.ability-a::after,.ability-c::after,.ability-e::after{left:100%}.ability-b::after,.ability-d::after,.ability-f::after{right:100%;transform:rotate(180deg)}
.device-wrap { position:absolute; z-index:4; left:50%; bottom:54px; width:72%; max-width:442px; aspect-ratio:2.51/1; transform:translateX(-50%); pointer-events:none; }
.device-wrap img { position:absolute; z-index:2; inset:0; width:100%; height:100%; object-fit:contain; filter:contrast(1.02) saturate(.97) drop-shadow(0 20px 16px rgba(32,51,91,.24)); image-rendering:auto; }
.device-aura { position:absolute; z-index:0; left:50%; top:49%; width:92%; height:78%; transform:translate(-50%,-50%); border-radius:50%; background:radial-gradient(ellipse,rgba(73,191,246,.18),rgba(94,111,234,.07) 44%,transparent 72%); filter:blur(12px); }
.device-contact-shadow { position:absolute; z-index:1; left:50%; bottom:-1%; width:68%; height:19%; transform:translateX(-50%); border-radius:50%; background:rgba(30,62,117,.17); filter:blur(13px); }
.display-stage { position:absolute; z-index:2; left:50%; bottom:18px; width:92%; height:150px; transform:translateX(-50%); border-radius:50%; background:radial-gradient(ellipse at center,rgba(255,255,255,.94) 0 30%,rgba(116,207,255,.4) 31% 34%,rgba(227,242,255,.8) 35% 48%,rgba(65,155,238,.25) 49% 52%,rgba(238,246,255,.8) 53% 66%,transparent 67%); filter:drop-shadow(0 15px 22px rgba(45,98,171,.12)); }
.display-stage::before,.display-stage::after,.display-stage span,.display-stage i,.display-stage b { content:""; position:absolute; inset:26% 12%; border:1px solid rgba(64,171,238,.3); border-radius:50%; box-shadow:0 0 18px rgba(47,172,239,.2); }
.display-stage::after { inset:38% 22%; }.display-stage span{inset:15% 5%;border-style:dashed}.display-stage i{inset:47% 31%;background:rgba(45,135,225,.08)}.display-stage b{inset:5% 0;border-color:rgba(86,160,229,.13)}
.visual-chip { position:absolute; z-index:6; padding:10px 14px; border:1px solid rgba(91,103,213,.14); border-radius:9px; background:rgba(255,255,255,.84); backdrop-filter:blur(12px); box-shadow:0 10px 28px rgba(40,49,90,.11); font-size:12px; }
.visual-chip i { display:inline-block; width:7px; height:7px; margin-right:7px; border-radius:50%; background:#5e6eea; box-shadow:0 0 0 5px rgba(94,110,234,.12); }.chip-top{right:-2%;top:104px}.chip-bottom{left:-1%;bottom:95px}

.interactive-card { --rotate-x:0deg; --rotate-y:0deg; --card-scale:1; --pointer-x:50%; --pointer-y:50%; position:relative; isolation:isolate; overflow:hidden; transform:perspective(900px) rotateX(var(--rotate-x)) rotateY(var(--rotate-y)) scale(var(--card-scale)); transform-style:preserve-3d; will-change:transform; transition:transform .18s ease-out,border-color .25s ease,box-shadow .25s ease; }
.interactive-card::before { content:""; position:absolute; z-index:0; inset:0; opacity:0; pointer-events:none; background:radial-gradient(300px circle at var(--pointer-x) var(--pointer-y),rgba(86,111,239,.17),transparent 56%); transition:opacity .25s; }
.interactive-card::after { content:""; position:absolute; z-index:3; inset:0; padding:1px; border-radius:inherit; opacity:0; pointer-events:none; background:linear-gradient(120deg,rgba(255,255,255,.9),rgba(90,110,239,.5),transparent 55%); mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude; transition:opacity .25s; }
.interactive-card:hover { border-color:rgba(87,106,226,.38)!important; box-shadow:0 20px 48px rgba(35,48,94,.13); }.interactive-card:hover::before,.interactive-card:hover::after{opacity:1}.interactive-card:active{transition-duration:.08s;box-shadow:0 8px 20px rgba(35,48,94,.12),inset 0 2px 5px rgba(42,54,104,.08)}.interactive-card>*{position:relative;z-index:1;transform:translateZ(7px)}

.overview::before,.product::before,.capability::before { content:""; position:absolute; z-index:-1; inset:0; opacity:.28; background-image:linear-gradient(rgba(64,103,237,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(64,103,237,.05) 1px,transparent 1px); background-size:64px 64px; mask-image:linear-gradient(to bottom,transparent,#000 18%,#000 82%,transparent); }
.work-grid { display:grid; grid-template-columns:repeat(4,1fr); border:1px solid var(--line); border-radius:14px; overflow:hidden; }
.work-grid article { min-height:155px; padding:25px; border-right:1px solid var(--line); background:rgba(255,255,255,.82); }.work-grid article:last-child{border:0}.work-grid span,.keyword-grid article>span,.core-values article>span{color:#7d89a5;font:700 11px monospace}.work-grid h3{margin:27px 0 8px;font-size:18px}.work-grid p,.keyword-grid p,.core-values p{margin:0;color:var(--muted);font-size:13px;line-height:1.65}
.role-strip { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:18px; }.role-strip article{padding:25px;border:1px solid var(--line);border-radius:13px;background:#fff}.role-strip article>div{float:left;display:grid;place-items:center;width:40px;height:40px;margin-right:16px;border-radius:10px;color:var(--blue);background:#eef2ff;font-size:20px}.role-strip article>span{font:10px monospace;letter-spacing:.13em;color:#929cb3}.role-strip h3{margin:4px 0 12px;font-size:21px}.role-strip p{clear:both;padding-top:14px;margin:0;color:var(--muted);font-size:13px}.role-strip small{display:block;margin-top:12px;padding-top:11px;border-top:1px solid var(--line);color:#53607a}

.challenge { color:#fff; background:#11172c; }.challenge::after,.future::after{content:"";position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:48px 48px}.challenge>.section-shell{display:grid;grid-template-columns:.88fr 1.12fr;gap:70px;align-items:center;position:relative;z-index:1}.challenge-copy .index,.section-heading.light .index{color:#8da3ff}.challenge-copy>p,.section-heading.light p{color:#adb8d2}.question-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.question{min-height:105px;padding:20px;border:1px solid #2b3452;border-radius:10px;background:rgba(255,255,255,.035)}.question::before{background:radial-gradient(280px circle at var(--pointer-x) var(--pointer-y),rgba(116,130,255,.22),transparent 58%)}.question>span{color:#7e89fa;font:11px monospace}.question p{margin:20px 0 0;color:#edf0f9;font-size:14px}

.product-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:44px}.product-heading .section-heading{flex:1}.kedoclaw-wordmark{display:grid;grid-template-columns:auto auto;align-items:end;flex:0 0 auto;margin-top:28px;color:#10182e;font-size:clamp(34px,4vw,56px);font-weight:760;line-height:.86;letter-spacing:-.06em}.kedoclaw-wordmark span{color:transparent;background:linear-gradient(115deg,#17213d 5%,#4358d9 72%);background-clip:text}.kedoclaw-wordmark b{color:#10182e;font-weight:820}.kedoclaw-wordmark i{grid-column:1/3;margin-top:12px;padding-top:9px;border-top:1px solid rgba(70,94,205,.28);color:#697694;font:700 8px/1 monospace;letter-spacing:.32em;text-align:right}.product-composition{position:relative;display:grid;grid-template-columns:.8fr 1.4fr .8fr;gap:16px;align-items:center}.composition-side{position:relative;z-index:5;display:grid;gap:12px}.composition-side article{min-height:110px;padding:23px;border:1px solid var(--line);border-radius:12px;background:#fff;display:flex;flex-direction:column;justify-content:space-between}.composition-side span{font:11px monospace;color:#8994ac}.composition-center{position:relative;z-index:1;min-height:330px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;pointer-events:none}.composition-device{position:relative;z-index:2;width:76%;max-width:430px;aspect-ratio:2.51/1;margin-bottom:34px}.composition-device img{position:absolute;z-index:2;inset:0;width:100%;height:100%;object-fit:contain;filter:contrast(1.02) saturate(.97) drop-shadow(0 18px 15px rgba(35,51,87,.22));image-rendering:auto}.composition-device span{position:absolute;z-index:0;inset:5% 2%;border-radius:50%;background:radial-gradient(ellipse,rgba(63,188,241,.16),rgba(79,101,226,.06) 48%,transparent 72%);filter:blur(10px)}.composition-device i{position:absolute;z-index:1;left:50%;bottom:-2%;width:68%;height:18%;transform:translateX(-50%);border-radius:50%;background:rgba(39,70,124,.15);filter:blur(11px)}.mini-screen{position:absolute;z-index:1;top:0;width:74%;height:195px;border:1px solid rgba(55,183,237,.3);border-radius:22px;background:rgba(226,247,255,.2);display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--blue)}.mini-screen b{font-size:36px}.mini-screen span{font-size:10px;letter-spacing:.12em}.mini-stage{position:absolute;z-index:0;bottom:-20px;width:100%;height:95px;border-radius:50%;background:radial-gradient(ellipse,rgba(255,255,255,.9) 0 31%,rgba(61,183,239,.35) 32% 36%,rgba(218,239,255,.8) 37% 58%,transparent 60%)}.keyword-grid,.core-values{display:grid;grid-template-columns:repeat(4,1fr);margin-top:22px;border:1px solid var(--line);border-radius:14px;overflow:hidden}.keyword-grid article,.core-values article{padding:25px;border-right:1px solid var(--line);background:#fff}.keyword-grid article:last-child,.core-values article:last-child{border:0}.keyword-grid h3,.core-values h3{margin:24px 0 9px;font-size:19px}

.security{background:#f6f8fc}.security-layout{display:grid;grid-template-columns:.9fr 1.1fr;gap:70px;align-items:center}.security-visual{position:relative;height:390px;display:grid;place-items:center}.network-core{z-index:2;width:145px;height:145px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;background:linear-gradient(145deg,var(--blue),var(--purple));box-shadow:0 20px 50px rgba(66,84,214,.25)}.network-core>span{font-size:30px;font-weight:800}.network-core small{margin-top:6px;opacity:.72}.network-ring{position:absolute;border:1px dashed #c7d0e5;border-radius:50%}.ring-a{width:270px;height:270px}.ring-b{width:380px;height:380px}.node{position:absolute;padding:9px 15px;border:1px solid var(--line);border-radius:25px;background:#fff;box-shadow:0 8px 24px rgba(34,49,89,.08);font-size:12px}.node-a{top:17px}.node-b{right:2px}.node-c{bottom:17px}.node-d{left:2px}.security-list{margin-top:25px;border-top:1px solid #dce2ee}.security-list article{display:grid;grid-template-columns:100px 1fr;gap:18px;padding:16px 0;border-bottom:1px solid #dce2ee}.security-list b{font-size:15px}.security-list span{color:var(--muted);font-size:13px}.interactive-row{transition:padding .25s,background .25s}.interactive-row:hover{padding-inline:12px;background:linear-gradient(90deg,rgba(66,98,230,.06),transparent)}.xinchuang{margin-top:45px;padding:26px 32px;border:1px solid #dfe5f1;border-radius:13px;background:#fff;display:flex;align-items:center;justify-content:space-between;gap:25px}.xinchuang strong{font-size:18px}.xinchuang>div{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.xinchuang span{padding:9px 11px;border-radius:7px;background:#f2f5fb;font-size:11px}.xinchuang i{color:var(--purple);font-style:normal}

.agent-panel{display:grid;grid-template-columns:170px 1fr;gap:28px;align-items:center;padding:30px;border-radius:15px;background:linear-gradient(115deg,#111a36,#34357f);color:#fff}.agent-core{grid-row:1/3;width:140px;height:140px;border:1px solid #67d9f3;border-radius:28px;transform:rotate(30deg);display:grid;place-items:center;background:linear-gradient(145deg,#205fe4,#16b8e2);box-shadow:0 0 35px rgba(37,168,237,.26)}.agent-core .core-label{transform:rotate(-30deg)}.agent-core b{display:block;font-size:42px;line-height:1}.agent-core span{display:block;margin-top:8px;font-size:10px;line-height:1}.agent-capabilities{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}.agent-capabilities span,.agent-base span{padding:11px;border:1px solid rgba(255,255,255,.12);border-radius:7px;background:rgba(255,255,255,.05);text-align:center;font-size:12px}.agent-base{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.agent-base span{color:#aeeaff;border-color:rgba(57,201,235,.2)}.scenario-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:18px}.scenario-grid article{min-height:150px;padding:22px;border:1px solid var(--line);border-radius:12px;background:#fff}.scenario-grid article>span{font:10px monospace;letter-spacing:.12em;color:#7d88a2}.scenario-grid h3{margin:27px 0 9px;font-size:17px}.scenario-grid p{margin:0;color:var(--muted);font-size:12px;line-height:1.6}

.future{position:relative;color:#fff;background:#11172c}.future>.section-shell{position:relative;z-index:1}.future-top{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center}.management{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.management span{padding:13px;border:1px solid #303957;border-radius:8px;background:rgba(255,255,255,.035);text-align:center;color:#d8ddeb;font-size:12px}.system-line{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:15px 0}.system-line span,.system-line b{padding:17px;border:1px solid #303957;border-radius:9px;text-align:center;font-size:15px}.system-line small{display:block;margin-top:5px;color:#929ebd;font-size:10px;font-weight:400}.system-line b{border-color:#5263ce;background:linear-gradient(120deg,#293967,#3d3f8c)}.future .core-values{border-color:#303957}.future .core-values article{border-color:#303957;background:rgba(255,255,255,.025)}.future .core-values h3{color:#fff}.future .core-values p{color:#aeb8d0}.future .interactive-card::before{background:radial-gradient(280px circle at var(--pointer-x) var(--pointer-y),rgba(116,130,255,.2),transparent 58%)}.closing{margin-top:62px;padding-top:58px;border-top:1px solid #2d3653;text-align:center}.closing .eyebrow{color:#9ab2ff}.closing h2{margin:20px auto 17px;max-width:850px}.closing>p{color:#b0bbd4}

.reveal{opacity:1;transform:none}.reveal.is-visible{animation:reveal-in .65s ease both}.delay-1.is-visible{animation-delay:.12s}@keyframes reveal-in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@media(max-width:1000px){.product-heading{align-items:center}.kedoclaw-wordmark{font-size:42px}.hero{grid-template-columns:1fr;min-height:auto}.hero-copy{text-align:center}.hero-copy>p{margin:auto}.hero-tags{justify-content:center}.hero-product{width:min(650px,100%);margin:auto}.challenge>.section-shell,.security-layout,.future-top{grid-template-columns:1fr}.product-composition{grid-template-columns:1fr 1.4fr 1fr}.scenario-grid{grid-template-columns:repeat(3,1fr)}.chip-top{right:1%}.chip-bottom{left:1%}}
@media(max-width:720px){.product-heading{display:block}.kedoclaw-wordmark{display:inline-block;margin:0 0 30px;font-size:38px}main{padding-top:64px}.section-shell{width:min(100% - 28px,1180px)}.compact-section{padding-block:62px}.hero{padding-block:48px 55px}.hero-copy h1{font-size:39px}.hero-product{min-height:465px}.ai-screen{height:275px;left:2%;width:96%}.ability{padding:6px;font-size:9px}.ability i{width:18px;height:18px}.device-wrap{width:88%;max-width:442px;bottom:60px}.display-stage{height:115px;bottom:16px}.visual-chip{font-size:10px}.chip-top{top:90px}.chip-bottom{bottom:78px}.work-grid,.keyword-grid,.core-values{grid-template-columns:repeat(2,1fr)}.work-grid article,.keyword-grid article,.core-values article{border-bottom:1px solid var(--line)}.role-strip{grid-template-columns:1fr}.challenge>.section-shell{gap:35px}.question-grid{grid-template-columns:1fr 1fr}.product-composition{grid-template-columns:1fr}.composition-side{grid-template-columns:1fr 1fr}.composition-center{grid-row:1}.security-visual{height:350px}.xinchuang{align-items:flex-start;flex-direction:column}.agent-panel{grid-template-columns:1fr}.agent-core{grid-row:auto;margin:auto}.agent-capabilities{grid-template-columns:repeat(2,1fr)}.scenario-grid{grid-template-columns:repeat(2,1fr)}.management{grid-template-columns:repeat(2,1fr)}.system-line{grid-template-columns:repeat(2,1fr)}.system-line b{grid-column:1/3}}
@media(max-width:480px){.hero-copy h1{font-size:34px}.hero-product{min-height:415px}.ai-screen{height:245px}.screen-core{width:80px;height:80px}.screen-core b{font-size:28px}.ability-e,.ability-f{display:none}.device-wrap{bottom:54px}.work-grid,.question-grid,.keyword-grid,.core-values,.scenario-grid{grid-template-columns:1fr}.agent-base{grid-template-columns:1fr}.network-ring.ring-b{width:320px;height:320px}.security-visual{height:330px}.visual-chip{display:none}}
@media(hover:none),(pointer:coarse){.interactive-card{transform:none!important}.interactive-card::before,.interactive-card::after{display:none}.interactive-card:hover{box-shadow:none}.interactive-row:hover{padding-inline:0;background:none}}
@media(prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none}.interactive-card{transform:none!important;transition:none}.aipc-page::before{display:none}}
</style>
