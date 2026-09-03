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
  Play,
  ShieldCheck,
  X,
} from 'lucide-react'

const releaseUrl = 'https://github.com/shuangmusuihua-source/vision-agent/releases/latest'
const repositoryUrl = 'https://github.com/shuangmusuihua-source/vision-agent'

const workflow = [
  { number: '01', title: '事务', copy: '把同一件事的背景、资料和长期进展放进一个工作区。' },
  { number: '02', title: '任务', copy: '围绕明确目标创建会话，让上下文彼此独立。' },
  { number: '03', title: '执行', copy: 'Agent 读取文件、联网研究、调用工具并持续汇报进度。' },
  { number: '04', title: '文档', copy: '结论进入可编辑、可比较的 Markdown 工作底稿。' },
  { number: '05', title: '交付', copy: '用 Skill 生成 DOCX、XLSX、PPTX、PDF 或 HTML。' },
  { number: '06', title: '知识', copy: '把值得复用的内容同步到知识库并建立关联。' },
]

const workspaceViews = [
  {
    id: 'context',
    tab: '研究协作',
    kicker: '上下文持续存在',
    title: '资料、讨论和产物，围绕同一项任务。',
    copy: '工作区承接事务，会话聚焦目标。上传文件、联网研究与 Agent 的判断都留在任务上下文里。',
    image: '/actual-02-session-overview.png',
    alt: 'Sumi 中使用虚构数据展示的任务会话界面',
    note: '虚构演示任务 · 季度经营复盘',
  },
  {
    id: 'document',
    tab: '文档精修',
    kicker: 'Markdown 不是临时回答',
    title: '边协作，边形成一份真正可用的文档。',
    copy: '预览、直接编辑、选区改写、比较新旧版本。每一次 AI 修改都由你决定接受或取消。',
    image: '/actual-11-inline-review.png',
    alt: 'Sumi 中使用虚构内容展示的 Markdown AI 修改对比界面',
    note: '选中内容 → 说明方向 → 比较 → 决定',
  },
  {
    id: 'deliver',
    tab: 'Skill 交付',
    kicker: '同一份结论，多种格式',
    title: '先把内容定稿，再生成专业交付物。',
    copy: 'Skill 读取已经确认的 Markdown，生成适合汇报、协作或存档的文件，并在会话中保留结果。',
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
          <a href="#workflow" onClick={() => setOpen(false)}>工作流</a>
          <a href="#workspace" onClick={() => setOpen(false)}>工作台</a>
          <a href="#open-system" onClick={() => setOpen(false)}>开放能力</a>
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
  const [playing, setPlaying] = useState(false)

  return (
    <figure className={`hero-video${playing ? ' is-playing' : ''}`}>
      <div className="window-bar" aria-hidden="true">
        <span /><span /><span />
        <strong>Sumi · 完整工作流</strong>
        <small>演示数据均为虚构</small>
      </div>
      <div className="video-frame">
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          poster="/workflow-poster.png"
          aria-label="Sumi 从事务工作区到 Skill 交付的完整工作流演示"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        >
          <source src="/sumi-workflow-web.mp4" type="video/mp4" />
          你的浏览器暂不支持视频播放。
        </video>
        <button
          className="video-play"
          type="button"
          aria-label="播放 Sumi 完整工作流演示"
          onClick={() => void videoRef.current?.play()}
        >
          <span><Play size={17} fill="currentColor" /></span>
          <strong>看一项工作如何完成</strong>
          <small>69 秒真实操作</small>
        </button>
      </div>
    </figure>
  )
}

function WorkspaceShowcase() {
  const [activeId, setActiveId] = useState(workspaceViews[0].id)
  const active = workspaceViews.find((item) => item.id === activeId) ?? workspaceViews[0]

  return (
    <div className="workspace-showcase">
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

  return (
    <div className="edit-carousel">
      <div className="carousel-head">
        <p><strong>{String(activeIndex + 1).padStart(2, '0')}</strong> / {String(editSteps.length).padStart(2, '0')}</p>
        <div>
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
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">SUMI FOR MACOS</p>
            <h1 id="hero-title">把一项工作，<span>真正做完。</span></h1>
            <p className="hero-lead">Sumi 是面向知识工作的 AI 工作台。</p>
            <p className="hero-note">从资料、研究和多轮协作，到可编辑的 Markdown、专业交付物与知识沉淀，都在同一条工作流里持续发生。</p>
            <div className="hero-actions">
              <a className="button button-dark" href={releaseUrl} target="_blank" rel="noreferrer"><Download size={16} /> 下载 macOS 版</a>
              <a className="text-link" href="#workflow">看看如何工作 <ArrowDown size={15} /></a>
            </div>
            <ul className="hero-facts" aria-label="Sumi 核心特性">
              <li>模型自己配置</li>
              <li>过程由你掌握</li>
              <li>成果留在本地</li>
            </ul>
          </div>
          <HeroVideo />
        </section>

        <section className="statement-section">
          <div className="shell statement-inner">
            <p className="eyebrow">NOT JUST AN ANSWER</p>
            <h2>不只是回答问题。<br />而是把工作推进到底。</h2>
            <p>Agent 可以规划、调用工具和生成文件；你始终能看到任务进度、处理授权、回答关键问题，并决定最终结果。</p>
          </div>
        </section>

        <section className="workflow-section" id="workflow" aria-labelledby="workflow-title">
          <div className="shell">
            <header className="section-head">
              <p className="eyebrow">ONE CONTINUOUS WORKFLOW</p>
              <h2 id="workflow-title">一条工作流，<br />从问题走到交付。</h2>
              <p>不同任务可以有不同方法，但上下文、过程与成果不必散落在不同工具里。</p>
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
              <p className="eyebrow">THE WORKBENCH</p>
              <h2 id="workspace-title">工作在推进，<br />文档也在成形。</h2>
              <p>真实 Sumi 界面，所有业务内容均为虚构演示数据。</p>
            </header>
            <WorkspaceShowcase />
          </div>
        </section>

        <section className="control-section" aria-labelledby="control-title">
          <div className="shell control-layout">
            <div className="control-copy">
              <p className="eyebrow">AI EDIT / YOU DECIDE</p>
              <h2 id="control-title">AI 可以修改。<br />决定权仍然在你。</h2>
              <p>选择一段内容，说明修改方向，比较新旧版本，再接受或取消。原文不会在确认前被覆盖。</p>
              <ul>
                <li><Check size={14} /> 只修改选中的内容</li>
                <li><Check size={14} /> 修改前后清楚可比</li>
                <li><Check size={14} /> 随时接受或取消</li>
              </ul>
            </div>
            <EditCarousel />
          </div>
        </section>

        <section className="open-section" id="open-system" aria-labelledby="open-title">
          <div className="shell">
            <header className="section-head open-head">
              <p className="eyebrow">OPEN BY DESIGN</p>
              <h2 id="open-title">工作流统一，<br />工具保持开放。</h2>
              <p>模型、自动化、连接器和 Skill 都可以按任务组合。Sumi 负责把它们组织进同一套工作方式。</p>
            </header>

            <div className="feature-row">
              <div className="feature-copy">
                <span className="feature-index">01</span>
                <Cable size={22} />
                <h3>不绑定单一模型供应商</h3>
                <p>配置 Base URL、API Key 和模型名称，保存多套模型连接，按任务切换。</p>
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
                <h3>把重复任务交给自动化</h3>
                <p>按每天、每周或自定义频率执行；关联会话、工作区、目录与网址，并记录每次结果。</p>
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
                <h3>把飞书接进任务上下文</h3>
                <p>连接文档、云空间、日历、消息、任务、会议与更多飞书能力；权限按业务域逐项授权。</p>
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
                <h3>用 Skill 扩展专业能力</h3>
                <p>启用内置能力，安装社区 Skill。无需 Microsoft Office，也能处理 DOCX、XLSX 与 PPTX。</p>
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
              <p className="eyebrow">KEEP WHAT MATTERS</p>
              <h2 id="knowledge-title">交付会结束，<br />知识会留下。</h2>
              <p>把有长期价值的 Markdown 同步到知识库。全局搜索、双向链接与图谱，让已经形成的判断在下一项任务中继续发挥作用。</p>
              <p className="ownership"><ShieldCheck size={15} /> 是否沉淀，由你决定。</p>
            </div>
            <figure className="product-screen knowledge-screen">
              <img src="/actual-05-knowledge-sync.png" width="1440" height="810" alt="Sumi 使用虚构内容展示的知识图谱界面" loading="lazy" decoding="async" />
              <figcaption><span>知识库</span><strong>文档、链接与长期上下文</strong></figcaption>
            </figure>
          </div>
        </section>

        <section className="ownership-section">
          <div className="shell ownership-grid">
            <div><ShieldCheck size={20} /><h3>文件留在你的目录</h3><p>工作区、会话产物与知识库都对应真实的本地文件和目录。</p></div>
            <div><KeyRound size={20} /><h3>凭据由系统保护</h3><p>API Key 在系统支持时使用 Electron 安全存储加密。</p></div>
            <div><FileCheck2 size={20} /><h3>操作需要明确授权</h3><p>文件访问、工具调用与外部权限在执行过程中清楚呈现。</p></div>
          </div>
        </section>

        <section className="install-section" id="install" aria-labelledby="install-title">
          <div className="shell install-layout">
            <div>
              <p className="eyebrow">SUMI 1.9 · APPLE SILICON</p>
              <h2 id="install-title">下一项工作，<br /><span>用 Sumi 做完。</span></h2>
            </div>
            <div className="install-copy">
              <p>从 GitHub Releases 下载 macOS 版。当前发布配置面向 Apple Silicon。</p>
              <a className="button button-light" href={releaseUrl} target="_blank" rel="noreferrer"><Download size={17} /> 前往下载</a>
              <small>若系统提示无法验证开发者，请在“系统设置 → 隐私与安全”中仅为 Sumi 单独放行，无需关闭 Gatekeeper。</small>
            </div>
          </div>
        </section>
      </main>

      <footer className="shell footer">
        <Brand />
        <p>把一项工作，真正做完。</p>
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
