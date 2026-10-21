<template>
  <!-- Decorative introduction only: never blocks scrolling or page interaction. -->
  <div class="security-shield-overlay" :class="{ 'is-fading': fading }" aria-hidden="true">
    <div class="shield-backdrop"></div>
    <div class="shield-stage">
      <div class="shield-eyebrow"><span></span> KEDO SECURITY</div>
      <div class="shield-art">
        <div class="shield-halo"></div>
        <svg class="shield-orbits" viewBox="0 0 480 440" fill="none">
          <circle cx="240" cy="211" r="179" stroke="#66ba92" stroke-opacity=".22" />
          <circle cx="240" cy="211" r="160" stroke="#66ba92" stroke-opacity=".18" stroke-dasharray="2 9" />
          <g class="shield-orbit-spin">
            <path d="M61 211a179 179 0 0 1 179-179" stroke="url(#kedo-orbit-line)" stroke-width="1.5" stroke-linecap="round" />
            <circle cx="240" cy="32" r="3.5" fill="#28c981" />
            <circle cx="240" cy="390" r="3" fill="#6bdb9c" />
          </g>
          <path d="M29 211h16m390 0h16M240 6v12m0 386v12" stroke="#88bda0" stroke-opacity=".55" />
          <defs>
            <linearGradient id="kedo-orbit-line" x1="61" y1="211" x2="240" y2="32" gradientUnits="userSpaceOnUse">
              <stop stop-color="#81e0ac" stop-opacity="0"/><stop offset="1" stop-color="#2cbe79"/>
            </linearGradient>
          </defs>
        </svg>
        <svg class="shield-crystal" viewBox="0 0 360 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="kedo-shield-shape" d="M180 32C222 60 264 74 305 82V186C305 269 258 326 180 368C102 326 55 269 55 186V82C96 74 138 60 180 32Z" />
            <linearGradient id="kedo-shield-edge" x1="71" y1="51" x2="296" y2="333" gradientUnits="userSpaceOnUse">
              <stop stop-color="#effff4"/><stop offset=".25" stop-color="#a0efbe"/><stop offset=".5" stop-color="#39a66e"/><stop offset=".76" stop-color="#d2ffe3"/><stop offset="1" stop-color="#58cd8c"/>
            </linearGradient>
            <linearGradient id="kedo-shield-glass" x1="86" y1="72" x2="281" y2="323" gradientUnits="userSpaceOnUse">
              <stop stop-color="#b8f5ce" stop-opacity=".96"/><stop offset=".36" stop-color="#58d994" stop-opacity=".9"/><stop offset=".7" stop-color="#19a966" stop-opacity=".95"/><stop offset="1" stop-color="#087744"/>
            </linearGradient>
            <linearGradient id="kedo-shield-facet" x1="180" y1="60" x2="180" y2="350" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" stop-opacity=".5"/><stop offset="1" stop-color="white" stop-opacity="0"/>
            </linearGradient>
            <linearGradient id="kedo-shield-shine" x1="0" y1="0" x2="1" y2=".3">
              <stop stop-color="white" stop-opacity="0"/><stop offset=".5" stop-color="white" stop-opacity=".42"/><stop offset="1" stop-color="white" stop-opacity="0"/>
            </linearGradient>
            <linearGradient id="kedo-shield-medallion" x1="136" y1="142" x2="225" y2="236" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" stop-opacity=".95"/><stop offset="1" stop-color="#daffe8" stop-opacity=".65"/>
            </linearGradient>
            <filter id="kedo-shield-shadow" x="-40%" y="-25%" width="180%" height="165%">
              <feDropShadow dx="0" dy="18" stdDeviation="14" flood-color="#167344" flood-opacity=".18"/>
              <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#125e37" flood-opacity=".12"/>
            </filter>
            <clipPath id="kedo-shield-clip"><use href="#kedo-shield-shape"/></clipPath>
          </defs>
          <!-- Slim, layered crystal edge rather than a heavy metal bezel. -->
          <g filter="url(#kedo-shield-shadow)">
            <use href="#kedo-shield-shape" transform="translate(0 5)" fill="#359565" stroke="#85d4a5" stroke-width="1.5"/>
            <use href="#kedo-shield-shape" fill="url(#kedo-shield-edge)" stroke="white" stroke-opacity=".9" stroke-width="1.5"/>
            <path d="M180 44C220 70 258 83 294 91V186C294 261 252 314 180 355C108 314 66 261 66 186V91C102 83 140 70 180 44Z" fill="url(#kedo-shield-glass)" stroke="#269b61" stroke-opacity=".45"/>
            <path d="M180 55C217 78 251 91 284 99V187C284 254 246 305 180 344C114 305 76 254 76 187V99C109 91 143 78 180 55Z" stroke="white" stroke-opacity=".5" stroke-width=".8"/>
            <path d="M180 45V354C108 314 66 261 66 186V91C102 83 140 70 180 45Z" fill="url(#kedo-shield-facet)"/>
            <path d="M67 93L180 190L293 93M180 190V353" stroke="white" stroke-opacity=".14" />
            <g stroke="#dbffe8" stroke-width="1" stroke-opacity=".6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M86 150h22l21 21m-43 43h22l20-20m146-44h-22l-21 21m43 43h-22l-20-20M155 278v-20l15-15m35 35v-20l-15-15"/>
              <circle cx="86" cy="150" r="2.5"/><circle cx="86" cy="214" r="2.5"/><circle cx="274" cy="150" r="2.5"/><circle cx="274" cy="214" r="2.5"/>
            </g>
            <g class="shield-seal">
              <circle cx="180" cy="190" r="59" stroke="#e5fff0" stroke-opacity=".32" stroke-width="1"/>
              <circle cx="180" cy="190" r="48" fill="url(#kedo-shield-medallion)" stroke="white" stroke-width="1.5"/>
              <path class="shield-check" d="M159 190l14 14 29-30" stroke="#13834b" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" pathLength="1"/>
            </g>
            <path d="M164 302h32" stroke="#c8ffdb" stroke-width="2" stroke-linecap="round" stroke-opacity=".75"/>
            <g clip-path="url(#kedo-shield-clip)">
              <path class="shield-light-sweep" d="M-140 0h90l230 400H90Z" fill="url(#kedo-shield-shine)"/>
            </g>
            <path d="M57 137V84C99 76 141 60 180 34" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
          </g>
        </svg>
        <div class="shield-ground"></div>
      </div>
      <div class="shield-caption">
        <div class="shield-label">多维防护 · 安全守护</div>
        <div class="shield-description">让每一次智能协作，都安心可靠</div>
        <div class="shield-capabilities"><span>流量检测</span><i></i><span>漏洞扫描</span><i></i><span>资产测绘</span><i></i><span>仿真蜜罐</span></div>
        <div class="shield-timeline"><span></span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ fading: boolean }>()
</script>

<style scoped lang="scss">
.security-shield-overlay {
  position: fixed;
  inset: 0;
  z-index: 900;
  display: grid;
  place-items: center;
  pointer-events: none;
  isolation: isolate;
}
.shield-backdrop {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(244, 253, 247, .97) 0%, rgba(244, 252, 247, .87) 30%, rgba(240, 249, 244, .5) 64%, rgba(242, 250, 245, .16) 100%);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  transition: opacity .8s ease;
}
.shield-stage {
  width: min(520px, 94vw);
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  animation: crystal-enter .7s cubic-bezier(.22, 1, .36, 1) both;
}
.shield-eyebrow {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #648474;
  font: 500 10px/20px system-ui, sans-serif;
  letter-spacing: .26em;
  span { width: 5px; height: 5px; border-radius: 50%; background: #26b86d; box-shadow: 0 0 0 4px rgba(38, 184, 109, .08); }
}
.shield-art { position: relative; width: min(440px, 88vw); aspect-ratio: 480 / 440; margin: 8px 0 0; }
.shield-halo { position: absolute; inset: 9%; border-radius: 50%; background: radial-gradient(circle, rgba(64, 205, 122, .19), rgba(140, 230, 174, .08) 55%, transparent 72%); }
.shield-orbits { position: absolute; inset: 0; width: 100%; height: 100%; }
.shield-orbit-spin { transform-origin: 240px 211px; animation: crystal-orbit 24s linear infinite; }
.shield-crystal { position: absolute; width: 72%; height: auto; left: 14%; top: 0; overflow: visible; animation: crystal-float 5s ease-in-out .7s infinite; }
.shield-seal { animation: crystal-seal .65s ease-out .25s both; transform-origin: 180px 190px; }
.shield-check { stroke-dasharray: 1; stroke-dashoffset: 1; animation: crystal-check .6s ease .5s forwards; }
.shield-light-sweep { animation: crystal-sweep 1.6s ease-in-out .4s both; }
.shield-ground { position: absolute; bottom: 5%; left: 32%; width: 36%; height: 12px; background: radial-gradient(ellipse, rgba(36, 133, 77, .17), transparent 70%); filter: blur(5px); }
.shield-caption { position: relative; margin-top: 2px; animation: crystal-caption .6s ease .25s both; }
.shield-label { color: #20583b; font-size: 23px; line-height: 1.5; font-weight: 600; letter-spacing: .12em; }
.shield-description { margin-top: 8px; color: #688574; font-size: 13px; letter-spacing: .08em; }
.shield-capabilities {
  margin-top: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
  color: #658571;
  font-size: 10px;
  letter-spacing: .06em;
  i { width: 3px; height: 3px; background: #7abd95; border-radius: 50%; }
}
.shield-timeline {
  width: 80px;
  height: 2px;
  margin: 20px auto 0;
  overflow: hidden;
  border-radius: 2px;
  background: rgba(89, 169, 120, .15);
  span { display: block; height: 100%; background: linear-gradient(90deg, #86dba4, #29b96f); transform-origin: left; animation: crystal-timeline 3s linear both; }
}
.is-fading {
  .shield-backdrop { opacity: 0; }
  .shield-stage { animation: crystal-exit .8s ease both; }
}
@keyframes crystal-enter { from { opacity: 0; transform: translateY(18px) scale(.94); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes crystal-exit { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-12px); } }
@keyframes crystal-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes crystal-orbit { to { transform: rotate(360deg); } }
@keyframes crystal-seal { from { opacity: 0; transform: scale(.9); } to { opacity: 1; transform: scale(1); } }
@keyframes crystal-check { to { stroke-dashoffset: 0; } }
@keyframes crystal-sweep { from { transform: translateX(-150px); } to { transform: translateX(530px); } }
@keyframes crystal-caption { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes crystal-timeline { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@media (max-width: 600px), (max-height: 700px) {
  .shield-art { width: min(330px, 84vw, 54vh); }
  .shield-label { font-size: 20px; }
  .shield-description { font-size: 12px; }
  .shield-capabilities { gap: 8px; margin-top: 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .shield-stage, .shield-crystal, .shield-orbit-spin, .shield-seal, .shield-check, .shield-caption, .shield-timeline span { animation: none; }
  .shield-check { stroke-dashoffset: 0; }
  .shield-light-sweep { display: none; }
  .is-fading .shield-stage { animation: none; opacity: 0; transition: opacity .2s; }
  .shield-backdrop { backdrop-filter: none; -webkit-backdrop-filter: none; }
}
</style>
