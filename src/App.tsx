import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Blocks,
  CalendarClock,
  Cable,
  Check,
  Download,
  FileCheck2,
  GitFork,
  KeyRound,
  Menu,
  Pause,
  Play,
  ShieldCheck,
  X,
} from 'lucide-react'

const releaseUrl = 'https://github.com/shuangmusuihua-source/vision-agent/releases/latest'
const repositoryUrl = 'https://github.com/shuangmusuihua-source/vision-agent'

const workflow = [
  { number: '01', title: '事务工作区', copy: '一项长期事务，一个独立空间。资料和进展都放在这里。' },
  { number: '02', title: '任务会话', copy: '为具体目标新建会话。各做各的，互不串线。' },
  { number: '03', title: '协作执行', copy: '读文件、查资料、用工具。Agent 边做边汇报。' },
  { number: '04', title: 'Markdown', copy: '讨论随手成稿。你可以直接编辑，也能让 AI 精修。' },
  { number: '05', title: 'Skill 交付', copy: '一份定稿，生成 DOCX、XLSX、PPTX、PDF 或 HTML。' },
  { number: '06', title: '知识库', copy: '值得留下的内容，同步到知识库。下次还用得上。' },
]

const workspaceViews = [
  {
    id: 'context',
    tab: '任务协作',
    kicker: '上下文，一直在',
    title: '资料在一起，思路接得上。',
    copy: '每项事务都有工作区，每个目标都有会话。文件、研究和讨论留在原处，回来继续做，不用重新交代。',
    image: '/actual-02-session-overview.png',
    alt: 'Sumi 中使用虚构数据展示的任务会话界面',
    note: '虚构演示任务 · 季度经营复盘',
  },
  {
    id: 'document',
    tab: '文档成稿',
    kicker: 'Markdown，就是工作底稿',
    title: '边讨论，边写成。',
    copy: '直接预览和编辑。想改哪一段，就选中哪一段交给 AI；改前改后放在一起，你确认才算数。',
    image: '/actual-11-inline-review.png',
    alt: 'Sumi 中使用虚构内容展示的 Markdown AI 修改对比界面',
    note: '选中内容 → 说明方向 → 比较 → 决定',
  },
  {
    id: 'deliver',
    tab: 'Skill 交付',
    kicker: '内容定了，格式随你',
    title: '同一份结论，交出不同成品。',
    copy: 'Skill 从已确认的 Markdown 出发，生成汇报、表格、文档、PDF 或网页。产物继续留在会话里。',
    image: '/actual-07-artifact.png',
    alt: 'Sumi 中使用虚构业务内容生成的 HTML 交付物',
    note: 'Markdown → Skill → 最终产物',
  },
]

const editSteps = [
  { image: '/actual-08-inline-toolbar.png', title: '选中内容', alt: '在 Sumi 中选中需要修改的 Markdown 内容' },
  { image: '/actual-10-inline-prompt.png', title: '说明方向', alt: '向 AI 说明选中内容的修改方向' },
  { image: '/actual-11-inline-review.png', title: '比较新旧', alt: '比较 AI 修改前后的 Markdown 内容' },
  { image: '/actual-12-inline-accepted.png', title: '接受或取消', alt: '决定是否接受 AI 对 Markdown 的修改' },
]

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="返回 Sumi 首页">
      <img src="/sumi-app-icon.png" alt="" />
      <span>sumi</span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = () => setOpen(false)
    const escape = (event: KeyboardEvent) => event.key === 'Escape' && close()
    window.addEventListener('resize', close)
    window.addEventListener('keydown', escape)
    return () => {
      window.removeEventListener('resize', close)
      window.removeEventListener('keydown', escape)
    }
  }, [])

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav id="primary-navigation" className={open ? 'nav is-open' : 'nav'} aria-label="主要导航">
          <a href="#workflow" onClick={() => setOpen(false)}>怎么工作</a>
          <a href="#workspace" onClick={() => setOpen(false)}>文档</a>
          <a href="#open-system" onClick={() => setOpen(false)}>扩展</a>
          <a href="#install" onClick={() => setOpen(false)}>下载</a>
          <a href={repositoryUrl} target="_blank" rel="noreferrer"><GitFork size={14} /> GitHub</a>
          <a className="nav-download" href={releaseUrl} target="_blank" rel="noreferrer">下载 Sumi <ArrowRight size={14} /></a>
        </nav>
        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? '关闭导航' : '打开导航'}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  )
}

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.defaultPlaybackRate = 1.5
    video.playbackRate = 1.5
    void video.play().catch(() => undefined)
  }, [])

  return (
    <figure className="hero-video is-playing">
      <div className="window-bar" aria-hidden="true">
        <span /><span /><span />
        <strong>Sumi · 一项工作的全过程</strong>
        <small>以下内容均为虚构演示</small>
      </div>
      <div className="video-frame">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          controls
          playsInline
          preload="metadata"
          poster="/actual-02-session-overview.png"
          aria-label="Sumi 从事务工作区到 Skill 交付的完整工作流演示"
          onLoadedMetadata={(event) => {
            event.currentTarget.defaultPlaybackRate = 1.5
            event.currentTarget.playbackRate = 1.5
            void event.currentTarget.play().catch(() => undefined)
          }}
        >
          <source src="/sumi-workflow-web.mp4" type="video/mp4" />
          你的浏览器暂不支持视频播放。
        </video>
      </div>
    </figure>
  )
}

function WorkspaceShowcase() {
  const [activeId, setActiveId] = useState(workspaceViews[0].id)
  const active = workspaceViews.find((item) => item.id === activeId) ?? workspaceViews[0]
  return (
    <div className="workspace-showcase">
      <div className="workspace-topline">
        <div className="workspace-tabs" role="tablist" aria-label="Sumi 工作过程">
          {workspaceViews.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={activeId === item.id}
              aria-controls="workspace-panel"
              id={`workspace-tab-${item.id}`}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => {
                if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
                event.preventDefault()
                const tabs = Array.from(
                  event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [],
                )
                const currentIndex = tabs.indexOf(event.currentTarget)
                const nextIndex = event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? tabs.length - 1
                    : (currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length
                setActiveId(workspaceViews[nextIndex].id)
                tabs[nextIndex]?.focus()
              }}
            >
              {item.tab}
            </button>
          ))}
        </div>
      </div>
      <div
        className="workspace-panel"
        role="tabpanel"
        id="workspace-panel"
        aria-labelledby={`workspace-tab-${active.id}`}
      >
        <div className="workspace-copy">
          <p className="eyebrow">{active.kicker}</p>
          <h3>{active.title}</h3>
          <p>{active.copy}</p>
          <span>{active.note}</span>
        </div>
        <figure className="product-screen">
          <img src={active.image} width="1920" height="1080" alt={active.alt} />
        </figure>
      </div>
    </div>
  )
}

function EditCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoAdvance, setAutoAdvance] = useState(true)
  const [interactionPaused, setInteractionPaused] = useState(false)

  const goToStep = (index: number) => {
    const next = Math.max(0, Math.min(editSteps.length - 1, index))
    const track = trackRef.current
    if (!track) return
    track.scrollTo({
      left: next * track.clientWidth,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
    setActiveIndex(next)
  }

  useEffect(() => {
    if (!autoAdvance || interactionPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setTimeout(() => goToStep((activeIndex + 1) % editSteps.length), 4200)
    return () => window.clearTimeout(timer)
  }, [activeIndex, autoAdvance, interactionPaused])

  return (
    <div
      className="edit-carousel"
      onPointerEnter={() => setInteractionPaused(true)}
      onPointerLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteractionPaused(false)
      }}
    >
      <div className="carousel-head">
        <p><strong>{String(activeIndex + 1).padStart(2, '0')}</strong> / {String(editSteps.length).padStart(2, '0')}</p>
        <div>
          <button
            type="button"
            aria-label={autoAdvance ? '暂停自动轮播' : '继续自动轮播'}
            aria-pressed={!autoAdvance}
            onClick={() => setAutoAdvance((value) => !value)}
          >
            {autoAdvance ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button type="button" aria-label="查看上一步" disabled={activeIndex === 0} onClick={() => goToStep(activeIndex - 1)}><ArrowLeft size={17} /></button>
          <button type="button" aria-label="查看下一步" disabled={activeIndex === editSteps.length - 1} onClick={() => goToStep(activeIndex + 1)}><ArrowRight size={17} /></button>
        </div>
      </div>
      <div
        className="carousel-track"
        ref={trackRef}
        role="region"
        aria-label="Markdown AI 修改四步演示，可左右滚动"
        tabIndex={0}
        onScroll={(event) => {
          const track = event.currentTarget
          if (track.clientWidth > 0) setActiveIndex(Math.round(track.scrollLeft / track.clientWidth))
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') { event.preventDefault(); goToStep(activeIndex - 1) }
          if (event.key === 'ArrowRight') { event.preventDefault(); goToStep(activeIndex + 1) }
        }}
      >
        {editSteps.map((step, index) => (
          <figure key={step.title} aria-label={`${index + 1}. ${step.title}`}>
            <img src={step.image} width="1920" height="1080" alt={step.alt} loading="lazy" decoding="async" />
            <figcaption><span>{String(index + 1).padStart(2, '0')}</span><strong>{step.title}</strong></figcaption>
          </figure>
        ))}
      </div>
      <p className="carousel-hint">左右滚动或使用方向键</p>
    </div>
  )
}

function FeatureScreenshot({ image, alt, label }: { image: string; alt: string; label: string }) {
  return (
    <figure className="ui-mockup feature-screen">
      <img src={image} width="1440" height="810" alt={alt} loading="lazy" decoding="async" />
      <figcaption><span>最新版 Sumi 界面</span><strong>{label}</strong></figcaption>
    </figure>
  )
}

function App() {
  return (
    <div id="top">
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <Header />

      <main id="main-content" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid shell">
            <div className="hero-copy">
              <p className="eyebrow"><span aria-hidden="true" /> SUMI FOR MACOS</p>
              <h1 id="hero-title"><span className="hero-question">工作有问题，</span><span>Ask sumi。</span></h1>
              <p className="hero-lead">Sumi 是为知识工作准备的 AI 工作台。</p>
              <p className="hero-note">放进资料，和 Agent 一起研究、写作、修改。内容定稿后，再生成能直接交付的文件。</p>
              <div className="hero-actions">
                <a className="button button-dark" href={releaseUrl} target="_blank" rel="noreferrer"><Download size={16} /> 下载 Sumi</a>
                <a className="text-link" href="#workflow">看看 Sumi 怎么工作 <ArrowDown size={15} /></a>
              </div>
              <ul className="hero-facts" aria-label="Sumi 核心特性">
                <li>模型由你选择</li>
                <li>每一步看得见</li>
                <li>文件留在本地</li>
              </ul>
            </div>
            <div className="hero-stage">
              <HeroVideo />
            </div>
          </div>
        </section>

        <section className="statement-section">
          <div className="shell statement-inner">
            <p className="eyebrow">答案，只是开始</p>
            <h2>问完了，<br />接着把事做完。</h2>
            <p>Sumi 会规划任务、读取资料、调用工具，也会在需要你判断时停下来。进度看得见，结果由你确认。</p>
          </div>
        </section>

        <section className="workflow-section" id="workflow" aria-labelledby="workflow-title">
          <div className="shell">
            <header className="section-head">
              <p className="eyebrow">一件事，一条线</p>
              <h2 id="workflow-title">从开题，<br />一路做到交付。</h2>
              <p>任务各有不同。资料、讨论、文档和产物，不必散在不同工具里。</p>
            </header>
            <ol className="workflow-grid">
              {workflow.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="workspace-section" id="workspace" aria-labelledby="workspace-title">
          <div className="shell">
            <header className="center-head">
              <p className="eyebrow">真实工作台</p>
              <h2 id="workspace-title">一边做事，<br />一边成稿。</h2>
              <p>下方均为最新版 Sumi 界面；任务和内容为虚构演示。</p>
            </header>
            <WorkspaceShowcase />
          </div>
        </section>

        <section className="control-section" aria-labelledby="control-title">
          <div className="shell control-layout">
            <div className="control-copy">
              <p className="eyebrow">AI 动手，你点头</p>
              <h2 id="control-title">想怎么改，告诉 Sumi。<br />要不要改，你来定。</h2>
              <p>选中一段，写下修改方向。Sumi 把新旧版本并排放好，确认后才替换原文。</p>
              <ul>
                <li><Check size={14} /> 只动选中的段落</li>
                <li><Check size={14} /> 改前改后，一眼可比</li>
                <li><Check size={14} /> 接受或取消，随时决定</li>
              </ul>
            </div>
            <EditCarousel />
          </div>
        </section>

        <section className="open-section" id="open-system" aria-labelledby="open-title">
          <div className="shell">
            <header className="section-head open-head">
              <p className="eyebrow">按你的习惯来</p>
              <h2 id="open-title">模型自己选，<br />能力接着加。</h2>
              <p>供应商、自动化、连接器和 Skill 都可以自由组合。Sumi 按你的工作方式来。</p>
            </header>

            <div className="feature-row">
              <div className="feature-copy">
                <span className="feature-index">01</span>
                <Cable size={22} />
                <h3>常用哪个模型，你来定。</h3>
                <p>填入 Base URL、API Key 和模型名称。多套连接都能保存，需要时切换。</p>
              </div>
              <FeatureScreenshot
                image="/actual-16-model-settings.png"
                alt="Sumi 使用虚构配置展示自定义模型供应商界面"
                label="模型连接与供应商配置"
              />
            </div>

            <div className="feature-row feature-row-reverse">
              <div className="feature-copy">
                <span className="feature-index">02</span>
                <CalendarClock size={22} />
                <h3>重复的工作，按时自己跑。</h3>
                <p>每天、每周或自定义频率都可以。关联会话、工作区、目录和网址，每次结果都有记录。</p>
              </div>
              <FeatureScreenshot
                image="/actual-17-automation.png"
                alt="Sumi 使用虚构任务展示自动化管理界面"
                label="周期任务与运行记录"
              />
            </div>

            <div className="feature-row">
              <div className="feature-copy">
                <span className="feature-index">03</span>
                <Cable size={22} />
                <h3>飞书里的内容，直接接进来。</h3>
                <p>连接文档、云空间、日历、消息、任务和会议。需要哪些能力，就授权哪些。</p>
              </div>
              <FeatureScreenshot
                image="/actual-18-connectors.png"
                alt="Sumi 使用虚构状态展示连接器界面"
                label="飞书连接器与授权状态"
              />
            </div>

            <div className="feature-row feature-row-reverse">
              <div className="feature-copy">
                <span className="feature-index">04</span>
                <Blocks size={22} />
                <h3>要做什么，就装什么 Skill。</h3>
                <p>启用内置能力，也能安装社区 Skill。无需 Microsoft Office，照样处理 DOCX、XLSX 和 PPTX。</p>
              </div>
              <FeatureScreenshot
                image="/actual-19-skills.png"
                alt="Sumi 展示内置能力与社区 Skill 的界面"
                label="内置能力与社区 Skill"
              />
            </div>
          </div>
        </section>

        <section className="knowledge-section" aria-labelledby="knowledge-title">
          <div className="shell knowledge-layout">
            <div className="knowledge-copy">
              <p className="eyebrow">做完，也留下</p>
              <h2 id="knowledge-title">这次的结论，<br />下次接着用。</h2>
              <p>把值得保留的 Markdown 同步到知识库。搜索、双向链接和图谱，帮你在新任务里找到旧思路。</p>
              <p className="ownership"><ShieldCheck size={15} /> 存不存，由你定。</p>
            </div>
            <figure className="product-screen knowledge-screen">
              <img src="/actual-05-knowledge-sync.png" width="1440" height="810" alt="Sumi 使用虚构内容展示的知识图谱界面" loading="lazy" decoding="async" />
              <figcaption><span>知识库</span><strong>文档、链接与长期上下文</strong></figcaption>
            </figure>
          </div>
        </section>

        <section className="ownership-section">
          <div className="shell ownership-grid">
            <div><ShieldCheck size={20} /><h3>文件，就在你的目录里。</h3><p>工作区、会话产物和知识库，都对应本地真实文件和目录。</p></div>
            <div><KeyRound size={20} /><h3>密钥，交给系统保管。</h3><p>系统支持时，API Key 会由 Electron 安全存储加密。</p></div>
            <div><FileCheck2 size={20} /><h3>操作授权，清清楚楚。</h3><p>文件访问、工具调用和外部权限，会在执行过程中清楚呈现。</p></div>
          </div>
        </section>

        <section className="install-section" id="install" aria-labelledby="install-title">
          <div className="shell install-layout">
            <div>
              <p className="eyebrow">SUMI 1.9 · APPLE SILICON</p>
              <h2 id="install-title">下一项工作，<br /><span>从 Sumi 开始。</span></h2>
            </div>
            <div className="install-copy">
              <p>前往 GitHub Releases 下载 macOS 版。当前版本适用于 Apple Silicon Mac。</p>
              <a className="button button-light" href={releaseUrl} target="_blank" rel="noreferrer"><Download size={17} /> 下载 Sumi</a>
              <small>若系统提示无法验证开发者，请在“系统设置 → 隐私与安全”中仅为 Sumi 单独放行，无需关闭 Gatekeeper。</small>
            </div>
          </div>
        </section>
      </main>

      <footer className="shell footer">
        <Brand />
        <p>从一个问题，做到交付。</p>
        <div>
          <a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub</a>
          <a href="#install">下载与安装</a>
          <span><ShieldCheck size={13} /> 本地工作区</span>
        </div>
      </footer>
    </div>
  )
}

export default App
