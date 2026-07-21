import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  Download,
  FilePenLine,
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

const flow = ['提出任务', '研究', 'Markdown', 'AI 精修', 'Skill', '交付']
const formats = ['Slides', 'DOCX', 'XLSX', 'PDF', 'HTML']

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="sumi 首页">
      <img src="/sumi-app-icon.png" alt="" />
      <span>sumi</span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = () => setOpen(false)
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('resize', close)
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.removeEventListener('resize', close)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav id="primary-navigation" className={open ? 'nav is-open' : 'nav'} aria-label="主要导航">
          <a href="#case" onClick={() => setOpen(false)}>新品案例</a>
          <a href="#workflow" onClick={() => setOpen(false)}>如何工作</a>
          <a href="#install" onClick={() => setOpen(false)}>安装说明</a>
          <a href={repositoryUrl} target="_blank" rel="noreferrer"><GitFork size={15} /> GitHub</a>
          <a className="nav-cta" href={releaseUrl} target="_blank" rel="noreferrer">下载 macOS 版 <ArrowRight size={15} /></a>
        </nav>
        <button className="nav-toggle" type="button" aria-label={open ? '关闭导航' : '打开导航'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  )
}

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const startVideo = () => {
    void videoRef.current?.play()
  }

  return (
    <figure className={`hero-video${playing ? ' is-playing' : ''}`} id="demo">
      <div className="hero-video-topline">
        <span><i /> 实际应用界面</span>
        <small>虚构演示数据</small>
      </div>
      <div className="hero-video-frame">
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          poster="/workflow-poster.png"
          aria-label="Sumi 从新品规划任务到最终交付的 69 秒实机演示"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        >
          <source src="/sumi-workflow-web.mp4" type="video/mp4" />
          你的浏览器暂不支持 HTML5 视频，可从 GitHub 查看产品说明。
        </video>
        <button className="hero-play" type="button" onClick={startVideo} aria-label="播放 69 秒 Sumi 实机演示">
          <span><Play size={18} fill="currentColor" /></span>
          <strong>看 Sumi 完成一次真实工作</strong>
          <small>69 秒 · 从想法到交付</small>
        </button>
      </div>
      <figcaption><span>新品上市计划</span><strong>研究、成稿、AI 精修，再生成汇报。</strong></figcaption>
    </figure>
  )
}

function App() {
  return (
    <div id="top">
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="hero shell">
          <div className="hero-copy">
            <p className="overline">FROM IDEA TO DELIVERY</p>
            <h1>工作有问题，<br /><span>Ask sumi.</span></h1>
            <p className="hero-line">一句话开始。一份能交付的成果结束。</p>
            <p className="hero-support">Sumi 和你一起研究、写作、修改，再用 Skill 把定稿变成真正可用的交付物。</p>
            <div className="hero-actions">
              <a className="button button-primary" href={releaseUrl} target="_blank" rel="noreferrer"><Download size={17} /> 下载 macOS 版</a>
              <a className="button button-quiet" href="#workflow"><ArrowRight size={16} /> 拆解完整流程</a>
            </div>
            <div className="hero-meta"><span>v1.6.0</span><i /><span>macOS · Apple Silicon</span><i /><span>开源</span></div>
          </div>

          <HeroVideo />
        </section>

        <section className="promise-band" aria-label="Sumi 工作链路">
          <div className="shell promise-inner">
            <strong>不是回答工作。是完成工作。</strong>
            <div>{flow.map((item, index) => <span key={item}>{item}{index < flow.length - 1 && <ArrowRight size={13} />}</span>)}</div>
          </div>
        </section>

        <section className="case-section" id="case">
          <div className="shell">
            <div className="case-heading">
              <div><p className="overline">ONE TASK · ONE CONTEXT</p><p>不是六个工具。是一项工作自然向前。</p></div>
              <h2>一个新品想法，<br />一路做到立项汇报。</h2>
            </div>

            <ol className="case-flow">
              {flow.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></li>)}
            </ol>
            <div className="case-outcome" aria-label="新品规划案例结果">
              <p><strong>输入</strong><span>访谈、问卷与一个待验证的想法</span></p>
              <ArrowRight size={18} />
              <p><strong>工作底稿</strong><span>可预览、编辑与持续精修的 Markdown</span></p>
              <ArrowRight size={18} />
              <p><strong>交付</strong><span>可直接汇报的新品立项 Slides</span></p>
            </div>
          </div>
        </section>

        <section className="story-section" id="workflow">
          <article className="story shell">
            <div className="story-copy">
              <span className="story-number">01</span>
              <p className="overline">RESEARCH IN CONTEXT</p>
              <h2>先把问题<br />研究清楚。</h2>
              <p>上传访谈与问卷，让 Agent 补充公开信息。读取、搜索、判断和文件生成都留在同一个任务会话。</p>
              <div className="evidence"><span><b>12</b> 位访谈对象</span><span><b>286</b> 份问卷</span><span><b>3–15</b> 人目标团队</span></div>
            </div>
            <figure className="story-screen"><img src="/actual-02-session-overview.png" width="1920" height="1080" alt="Sumi 市场机会研究任务会话与成果概览" loading="lazy" decoding="async" /><figcaption>一边研究，一边留下证据。</figcaption></figure>
          </article>

          <article className="story story-reverse shell">
            <div className="story-copy">
              <span className="story-number">02</span>
              <p className="overline">A DOCUMENT YOU OWN</p>
              <h2>对话不是终点。<br />Markdown 才是底稿。</h2>
              <p>结论进入一份你真正拥有的 Markdown：能预览、能直接编辑，也能选中具体段落继续让 AI 修改、解释、审阅或回答。</p>
              <ul><li><Check size={15} /> 内容可见、可改、可保存</li><li><Check size={15} /> AI 修改只作用于选中内容</li><li><Check size={15} /> 是否采用，始终由用户决定</li></ul>
            </div>
            <div className="edit-journey">
              <figure className="edit-feature"><img src="/actual-03-markdown.png" width="1920" height="1080" alt="Sumi Markdown 预览与编辑界面" loading="lazy" decoding="async" /><figcaption><FilePenLine size={15} /> 先预览，也可以直接编辑</figcaption></figure>
              <div className="edit-steps" aria-label="Markdown AI 修改完整过程">
                <figure><span>01</span><img src="/actual-08-inline-toolbar.png" width="1920" height="1080" alt="选中 Markdown 文本并打开 AI 修改浮窗" loading="lazy" decoding="async" /><figcaption>选中文本</figcaption></figure>
                <figure><span>02</span><img src="/actual-10-inline-prompt.png" width="1920" height="1080" alt="输入选中文本的 AI 修改方向" loading="lazy" decoding="async" /><figcaption>输入方向</figcaption></figure>
                <figure><span>03</span><img src="/actual-11-inline-review.png" width="1920" height="1080" alt="比较 AI 修改前后的内容" loading="lazy" decoding="async" /><figcaption>对比新旧</figcaption></figure>
                <figure><span>04</span><img src="/actual-12-inline-accepted.png" width="1920" height="1080" alt="确认 AI 修改并写回 Markdown" loading="lazy" decoding="async" /><figcaption>接受或取消</figcaption></figure>
              </div>
            </div>
          </article>

          <article className="skill-story shell">
            <div className="skill-heading">
              <span className="story-number">03</span>
              <div><p className="overline">MARKDOWN IN, DELIVERABLE OUT</p><h2>定稿，才交给 Skill。</h2></div>
              <p>Skill 先读取已经确认的完整 Markdown，再用专业方法把同一份结论变成不同交付。</p>
            </div>
            <div className="skill-pipeline">
              <div className="pipeline-node source"><FileText size={22} /><small>工作底稿</small><strong>市场机会研究.md</strong></div>
              <ArrowRight className="pipeline-arrow" />
              <div className="pipeline-node skill"><Sparkles size={22} /><small>专业方法</small><strong>Frontend Slides</strong></div>
              <ArrowRight className="pipeline-arrow" />
              <div className="pipeline-node output"><span className="format-row">{formats.map((item) => <i key={item}>{item}</i>)}</span><small>最终交付</small><strong>新品立项汇报</strong></div>
            </div>
            <figure className="generation-screen"><img src="/actual-15-generation-143.png" width="1920" height="1080" alt="Sumi 使用 Skill 生成产物时实时展示最新内容与行数" loading="lazy" decoding="async" /><figcaption><span>正在生成内容 · 143 行</span><strong>最新内容和行数实时更新；完成后卡片自动消失。</strong></figcaption></figure>
            <div className="delivery-pair">
              <figure><img src="/actual-02-session-overview.png" width="1920" height="1080" alt="Sumi 源 Markdown 与 Skill 产物的关系" loading="lazy" decoding="async" /><figcaption>源文档与产物一起维护</figcaption></figure>
              <figure><img src="/actual-07-artifact.png" width="1920" height="1080" alt="由市场机会研究 Markdown 生成的最终 HTML 汇报" loading="lazy" decoding="async" /><figcaption>真实生成的 HTML 汇报</figcaption></figure>
            </div>
          </article>
        </section>

        <section className="knowledge-strip">
          <div className="shell knowledge-inner">
            <div><p className="overline">KEEP WHAT MATTERS</p><h2>交付完成。<br />好结论继续留下。</h2><p>高质量 Markdown 由你决定是否同步到知识库，继续服务下一项任务。</p></div>
            <img src="/actual-05-knowledge-sync.png" width="1920" height="1080" alt="Sumi 工作文档、Skill 产物与知识同步状态" loading="lazy" decoding="async" />
          </div>
        </section>

        <section className="install-section" id="install">
          <div className="shell install-heading"><div><p className="overline">INSTALL ON MACOS</p><h2>下载。放行。开始工作。</h2></div><p><ShieldCheck size={18} /> 当前版本未使用 Apple Developer ID 签名，请只从 GitHub Releases 下载。</p></div>
          <ol className="shell install-grid">
            <li><span>01</span><h3>下载</h3><p>下载 Apple Silicon 版本，将 sumi 拖入“应用程序”。</p></li>
            <li><span>02</span><h3>尝试打开</h3><p>看到“无法验证开发者”提示后，关闭提示窗口。</p></li>
            <li><span>03</span><h3>单独放行</h3><p>系统设置 → 隐私与安全 → 仍要打开。无需关闭 Gatekeeper。</p></li>
          </ol>
        </section>

        <section className="privacy-strip" id="privacy" aria-labelledby="privacy-title">
          <div className="shell privacy-inner"><p className="overline">PRIVACY BY DEFAULT</p><h2 id="privacy-title">你的工作，<br />不该被追踪。</h2><p>本站不设置广告追踪 Cookie，也不采集你的工作内容。视频仅预读取播放信息，完整内容在播放时加载；下载由你主动发起。部署平台可能保留用于安全与稳定性的基础访问日志。</p></div>
        </section>

        <section className="final-cta">
          <div className="shell final-inner">
            <div><p className="overline">YOUR NEXT REAL TASK</p><h2>下一件工作，<br />Ask sumi.</h2></div>
            <a className="button button-light" href={releaseUrl} target="_blank" rel="noreferrer"><Download size={18} /> 下载 macOS 版</a>
          </div>
        </section>
      </main>
      <footer className="shell footer"><Brand /><p>让知识工作从想法走到交付。</p><div><a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub</a><a href="#install">安装说明</a><a href="#privacy">隐私</a></div></footer>
    </div>
  )
}

export default App
