import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  FileText,
  GitFork,
  Menu,
  Play,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'

const releaseUrl = 'https://github.com/shuangmusuihua-source/vision-agent/releases/latest'
const repositoryUrl = 'https://github.com/shuangmusuihua-source/vision-agent'

const workflow = [
  { number: '01', title: '事务工作区', copy: '把同一件事的背景、资料和长期进展放在一起。' },
  { number: '02', title: '任务会话', copy: '为一个具体目标开启会话，不让上下文混进别的工作。' },
  { number: '03', title: '协作研究', copy: '上传文件、联网查找，与 Agent 一起分析和判断。' },
  { number: '04', title: 'Markdown 精修', copy: '让结论进入可预览、可编辑、可比较的工作底稿。' },
  { number: '05', title: 'Skill 交付', copy: '从同一份定稿生成 Slides、DOCX、XLSX、PDF 或 HTML。' },
  { number: '06', title: '知识沉淀', copy: '把值得保留的文档同步到知识库，服务下一项任务。' },
]

const editSteps = [
  { image: '/actual-08-inline-toolbar.png', title: '选中内容', alt: '在 Sumi 中选中需要修改的 Markdown 内容' },
  { image: '/actual-10-inline-prompt.png', title: '说明方向', alt: '向 AI 说明选中内容的修改方向' },
  { image: '/actual-11-inline-review.png', title: '比较新旧', alt: '比较 AI 修改前后的 Markdown 内容' },
  { image: '/actual-12-inline-accepted.png', title: '接受或取消', alt: '决定是否接受 AI 对 Markdown 的修改' },
]

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="返回 sumi 首页">
      <img src="/sumi-app-icon.png" alt="" />
      <span>sumi</span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const closeMenu = () => setOpen(false)
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('resize', closeMenu)
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.removeEventListener('resize', closeMenu)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav id="primary-navigation" className={open ? 'nav is-open' : 'nav'} aria-label="主要导航">
          <a href="#workflow" onClick={() => setOpen(false)}>工作流</a>
          <a href="#field-notes" onClick={() => setOpen(false)}>产品实录</a>
          <a href="#install" onClick={() => setOpen(false)}>安装</a>
          <a href={repositoryUrl} target="_blank" rel="noreferrer"><GitFork size={14} /> GitHub</a>
          <a className="nav-download" href={releaseUrl} target="_blank" rel="noreferrer">下载 macOS 版 <ArrowRight size={14} /></a>
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
    <figure className={`hero-video${playing ? ' is-playing' : ''}`} id="product-video">
      <div className="video-label">
        <span><i /> 真实应用界面</span>
        <small>案例数据均为虚构</small>
      </div>
      <div className="video-frame">
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          poster="/workflow-poster.png"
          aria-label="Sumi 从事务工作区到 Skill 交付的 69 秒完整工作流演示"
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
          <span><Play size={18} fill="currentColor" /></span>
          <strong>看一项工作如何完成</strong>
          <small>69 秒实机操作</small>
        </button>
      </div>
      <figcaption>
        <span>事务 → 任务 → 文档 → 交付</span>
        <strong>一段视频，看完 Sumi 的完整工作方式。</strong>
      </figcaption>
    </figure>
  )
}

function EditCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const goToStep = (index: number) => {
    const nextIndex = Math.max(0, Math.min(editSteps.length - 1, index))
    const track = trackRef.current
    if (!track) return

    track.scrollTo({
      left: nextIndex * track.clientWidth,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
    setActiveIndex(nextIndex)
  }

  return (
    <div className="edit-carousel">
      <div className="edit-carousel-controls">
        <p aria-live="polite"><strong>{String(activeIndex + 1).padStart(2, '0')}</strong> / {String(editSteps.length).padStart(2, '0')}</p>
        <div>
          <button type="button" aria-label="查看上一步" disabled={activeIndex === 0} onClick={() => goToStep(activeIndex - 1)}><ArrowLeft size={18} /></button>
          <button type="button" aria-label="查看下一步" disabled={activeIndex === editSteps.length - 1} onClick={() => goToStep(activeIndex + 1)}><ArrowRight size={18} /></button>
        </div>
      </div>
      <div
        className="edit-carousel-track"
        ref={trackRef}
        role="region"
        aria-label="Markdown AI 修改四步演示，可左右滚动"
        tabIndex={0}
        onScroll={(event) => {
          const track = event.currentTarget
          if (track.clientWidth > 0) setActiveIndex(Math.round(track.scrollLeft / track.clientWidth))
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            goToStep(activeIndex - 1)
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            goToStep(activeIndex + 1)
          }
        }}
      >
        {editSteps.map((step, index) => (
          <figure key={step.title} aria-label={`${index + 1}. ${step.title}`}>
            <img src={step.image} width="1920" height="1080" alt={step.alt} loading="lazy" decoding="async" />
            <figcaption><span>{String(index + 1).padStart(2, '0')}</span><strong>{step.title}</strong></figcaption>
          </figure>
        ))}
      </div>
      <p className="edit-carousel-hint">左右滚动，查看完整修改过程</p>
    </div>
  )
}

function App() {
  return (
    <div id="top">
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <Header />

      <main id="main-content" tabIndex={-1}>
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-haze" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">SUMI / MACOS AI WORKBENCH</p>
            <h1 id="hero-title">工作有<br />问题，<br /><span>Ask sumi.</span></h1>
            <p className="hero-lead">把资料、研究、写作和交付，放进同一条工作流。</p>
            <p className="hero-note">Sumi 是面向知识工作的 macOS AI 工作台。你从一个真实任务开始，和 Agent 一起推进，最后带走自己的文档与交付物。</p>
            <div className="hero-actions">
              <a className="button button-dark" href={releaseUrl} target="_blank" rel="noreferrer"><Download size={16} /> 下载 macOS 版</a>
              <a className="text-link" href="#workflow">了解工作流 <ArrowDown size={15} /></a>
            </div>
            <p className="hero-principle"><span>对话只是过程</span><strong>文档才是留下来的工作。</strong></p>
          </div>
          <HeroVideo />
        </section>

        <section className="workflow-section" id="workflow" aria-labelledby="workflow-title">
          <div className="shell">
            <div className="section-heading workflow-heading">
              <p className="eyebrow">ONE CONTINUOUS WORKFLOW</p>
              <h2 id="workflow-title">一项工作，<br />不该散落在<br />六个工具里。</h2>
              <p>Sumi 把事务背景、任务会话、参考资料和正在形成的文档放在一起。上下文不断，工作才能一直往前走。</p>
            </div>

            <ol className="workflow-grid">
              {workflow.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </li>
              ))}
            </ol>

            <div className="workflow-summary">
              <p><span>输入</span>问题、资料、公开信息</p>
              <ArrowRight size={18} aria-hidden="true" />
              <p><span>过程</span>研究、协作、写作、精修</p>
              <ArrowRight size={18} aria-hidden="true" />
              <p><span>结果</span>工作底稿、交付物、知识</p>
            </div>
          </div>
        </section>

        <section className="field-notes" id="field-notes" aria-labelledby="field-notes-title">
          <div className="shell notes-intro">
            <p className="eyebrow">A REAL INTERFACE / A FICTIONAL CASE</p>
            <div>
              <h2 id="field-notes-title">下面，用一项<br />虚构工作，<br />走完这条链路。</h2>
              <p>演示任务是虚构的「新品上市计划」。它只是一个例子；换成市场调研、用户画像、功能规划或日常维护，工作方式不变。</p>
            </div>
          </div>

          <article className="chapter shell">
            <div className="chapter-copy">
              <p className="chapter-number">01 / CONTEXT</p>
              <h2>先把事情<br />放对地方。</h2>
              <p>为事务建立工作区，再为眼前的目标创建任务会话。文件、联网研究、讨论和判断都围绕同一个任务展开，不必反复补充背景。</p>
              <ul className="plain-list">
                <li><span>工作区</span>承接持续推进的事务</li>
                <li><span>会话</span>聚焦此刻要完成的任务</li>
                <li><span>Agent</span>读取资料并补充公开信息</li>
              </ul>
            </div>
            <figure className="screen-figure screen-context">
              <img src="/actual-02-session-overview.png" width="1920" height="1080" alt="Sumi 中虚构新品上市计划的任务会话界面" loading="lazy" decoding="async" />
              <figcaption><span>任务上下文</span><strong>资料、研究与产物留在同一个会话。</strong></figcaption>
            </figure>
          </article>

          <article className="chapter chapter-document shell">
            <figure className="screen-figure screen-document">
              <img src="/actual-03-markdown.png" width="1920" height="1080" alt="Sumi Markdown 工作文档的预览与编辑界面" loading="lazy" decoding="async" />
              <figcaption><span>Markdown 工作底稿</span><strong>能预览，也能直接编辑。</strong></figcaption>
            </figure>
            <div className="chapter-copy">
              <p className="chapter-number">02 / DOCUMENT</p>
              <h2>边协作，<br />边形成文档。</h2>
              <p>结论不会只停在聊天记录里。它进入一份你真正拥有的 Markdown，能够继续修改、保存和复用。</p>
              <blockquote>“先把判断写清楚，再决定用什么形式交付。”</blockquote>
            </div>
          </article>

          <section className="inline-edit shell" aria-labelledby="inline-edit-title">
            <div className="inline-edit-heading">
              <p className="chapter-number">AI EDIT / YOU DECIDE</p>
              <h2 id="inline-edit-title">AI 改的是你选中的那一段。<br />是否采用，由你决定。</h2>
              <p>选择内容、说明修改方向、比较新旧版本，然后接受或取消。原文不会在你确认前被悄悄覆盖。</p>
            </div>
            <EditCarousel />
          </section>

          <section className="deliverable-section" aria-labelledby="deliverable-title">
            <div className="deliverable-haze" aria-hidden="true" />
            <div className="shell deliverable-inner">
              <div className="deliverable-heading">
                <p className="chapter-number">03 / DELIVER</p>
                <h2 id="deliverable-title">一个底稿，<br />多种交付。</h2>
                <p>内容定稿后，再调用 Skill。Sumi 读取同一份 Markdown，把已经确认的结论生成适合交付的格式。</p>
              </div>
              <div className="format-list" aria-label="可生成的交付格式">
                <span>Slides</span><span>DOCX</span><span>XLSX</span><span>PDF</span><span>HTML</span>
              </div>
              <figure className="screen-figure generation-figure">
                <img src="/actual-15-generation-143.png" width="1920" height="1080" alt="Sumi 使用 Skill 生成交付物时实时显示最新内容和行数" loading="lazy" decoding="async" />
                <figcaption><span><Sparkles size={13} /> 正在生成 · 143 行</span><strong>最新内容和行数实时更新。</strong></figcaption>
              </figure>
              <div className="artifact-pair">
                <div className="artifact-copy">
                  <FileText size={24} />
                  <p>Markdown 是内容源头。Skill 改变交付形式，不改变已经确认的结论。</p>
                  <span>工作底稿 → 专业 Skill → 最终产物</span>
                </div>
                <figure className="screen-figure artifact-figure">
                  <img src="/actual-07-artifact.png" width="1920" height="1080" alt="由虚构新品上市计划 Markdown 生成的 HTML 汇报" loading="lazy" decoding="async" />
                  <figcaption><span>生成结果</span><strong>可直接查看和交付的 HTML 汇报。</strong></figcaption>
                </figure>
              </div>
            </div>
          </section>

          <section className="knowledge-section shell" aria-labelledby="knowledge-title">
            <div className="knowledge-copy">
              <p className="chapter-number">04 / REMEMBER</p>
              <h2 id="knowledge-title">交付完成，<br />知识还在。</h2>
              <p>有长期价值的 Markdown，可以由你同步到知识库。下一项工作开始时，成熟的判断不必从头再来。</p>
              <p className="knowledge-choice"><Check size={15} /> 是否沉淀，由用户决定。</p>
            </div>
            <figure className="screen-figure knowledge-figure">
              <img src="/actual-05-knowledge-sync.png" width="1920" height="1080" alt="Sumi 将虚构工作文档同步到知识库的界面" loading="lazy" decoding="async" />
              <figcaption><span>知识同步</span><strong>让这次工作的好结论，服务下一次工作。</strong></figcaption>
            </figure>
          </section>
        </section>

        <section className="install-section" id="install" aria-labelledby="install-title">
          <div className="shell install-inner">
            <div className="install-heading">
              <p className="eyebrow">START ON MACOS</p>
              <h2 id="install-title">把下一件工作，<br />交给 Sumi。</h2>
              <p>从 GitHub Releases 获取应用。若 macOS 首次打开时提示无法验证开发者，可在“隐私与安全”中只为 Sumi 单独放行。</p>
              <a className="button button-light" href={releaseUrl} target="_blank" rel="noreferrer"><Download size={17} /> 前往下载</a>
            </div>
            <ol className="install-steps">
              <li><span>01</span><div><h3>下载应用</h3><p>从项目的 GitHub Releases 页面获取当前发行版本。</p></div></li>
              <li><span>02</span><div><h3>移入应用程序</h3><p>完成下载后，将 Sumi 放入 macOS“应用程序”文件夹。</p></div></li>
              <li><span>03</span><div><h3>必要时单独放行</h3><p>系统设置 → 隐私与安全 → 仍要打开。无需全局关闭 Gatekeeper。</p></div></li>
            </ol>
          </div>
        </section>

        <section className="closing-section" aria-labelledby="closing-title">
          <div className="closing-haze" aria-hidden="true" />
          <div className="shell closing-inner">
            <p className="eyebrow">FROM QUESTION TO DELIVERY</p>
            <h2 id="closing-title">不是多问一句。<br />是把工作往前推一步。</h2>
            <div>
              <p>事务、任务、协作、文档、交付与知识，在一条工作流里连续发生。</p>
              <a className="button button-dark" href={releaseUrl} target="_blank" rel="noreferrer">下载 Sumi <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="shell footer">
        <Brand />
        <p>工作有问题，Ask sumi。</p>
        <div>
          <a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub</a>
          <a href="#install">安装说明</a>
          <span><ShieldCheck size={13} /> 不采集工作内容</span>
        </div>
      </footer>
    </div>
  )
}

export default App
