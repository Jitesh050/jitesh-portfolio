import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, ExternalLink, Play, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMessage } from "../lib/contact.functions";
// All media is self-hosted from /public/media so the site works on any host.
const m = (path: string) => ({ url: `/media/${path}` });
const trackwiseDemo = m("videos/trackwise-demo.mp4");
const comphubDemo = m("videos/comphub-demo.mp4");
const sentinalDemo = m("videos/sentinal-demo.mp4");
const mvjCertificate = m("certificates/mvj-course-completion.pdf");
const latestResume = m("docs/jitesh-k-resume.pdf");
const sentiusInternshipLetter = m("certificates/sentius-internship-letter.pdf");
const adobeHackathonCertificate = m("certificates/adobe-india-hackathon.pdf");
const androidWorkshopCertificate = m("certificates/android-workshop.pdf");
const backendWorkshopCertificate = m("certificates/backend-workshop.pdf");
const ebscoTrainingCertificate = m("certificates/ebsco-training.pdf");
const frontendWorkshopCertificate = m("certificates/frontend-workshop.pdf");
const googleGenAiCertificate = m("certificates/google-gen-ai-study-jams.pdf");
const nicPresidentCertificate = m("certificates/nic-president-appreciation.png");
const pbctfCertificate = m("certificates/pbctf-4.pdf");
const pixelGenesisCertificate = m("certificates/pixelgenesis-organizer.pdf");
const vibeHackCertificate = m("certificates/vibe-hack-2.pdf");
const adobeLogo = m("logos/adobe.png");
const androidLogo = m("logos/android.png");
const ebscoLogo = m("logos/ebsco.png");
const gdgLogo = m("logos/gdg.png");
const gdscLogo = m("logos/gdsc.png");
const pbctfLogo = m("logos/pbctf.png");
const vertechxLogo = m("logos/vertechx.png");
const vibeHackLogo = m("logos/vibehack.png");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jitesh K | AI Engineer" },
      { name: "description", content: "AI Engineer building production-ready RAG, LLM, and computer vision systems." },
      { property: "og:title", content: "Jitesh K | AI Engineer" },
      { property: "og:description", content: "Selected AI engineering work, experience, and experiments by Jitesh K." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

type Project = { title: string; tagline: string; problem: string; impact: string; image: string; video?: string; code?: string };

const projects: Project[] = [
  { title: "TrackWise", tagline: "Railway station management system", problem: "Managing train schedules, commuter traffic, and ticket bookings at busy railway stations is complex and often leads to delays, confusion, or miscommunication for passengers.", impact: "Built a real-time railway dashboard that streamlines live train updates, ticket booking, and station management for faster, clearer commuter journeys.", image: "/img/TrackWise.png", video: trackwiseDemo.url, code: "https://github.com/GarvLakhina/Smart-Rail.git" },
  { title: "Report Agent", tagline: "AI financial research system", problem: "Answering one financial question can mean searching hundreds of annual-report pages across thousands of listed companies.", impact: "Built a checkpointed pipeline for 2,000+ NSE companies and a cited RAG assistant using MiniLM, SQLite vector storage, LangChain, and Groq LLaMA 3.3 70B.", image: "/img/ReportAgent.png" },
  { title: "YOLOv8 Vision", tagline: "Real-time object detection", problem: "Reliable object tracking in live streams depends on an optimized path from preprocessing to inference.", impact: "Built production-ready detection pipelines with YOLOv8, OpenCV, and PyTorch for real-time image and video inference.", image: "/img/YOLOv8.png" },
  { title: "Complaint Hub", tagline: "Issue management system", problem: "Student concerns often go unresolved because there is no clear shared channel for reporting and follow-up.", impact: "Created one platform for students to raise complaints and for teachers to review, track, and resolve them.", image: "/img/ComplaintHub.png", video: comphubDemo.url, code: "https://github.com/Jitesh050/Complaint-Hub-.git" },
  { title: "Sentinal-AI", tagline: "Cybersecurity scanning platform", problem: "Security teams need a clearer way to surface and monitor threats across changing systems.", impact: "Built an AI-assisted security experience that brings scanning, threat visibility, and monitoring into a focused workflow.", image: "/img/Sentinal AI.png", video: sentinalDemo.url, code: "https://github.com/Jitesh050/Sentinal-AI.git" },
];

const timeline = [
  { category: "work", date: "Jul 2026 — Present", title: "AI Engineer", subtitle: "Sentius Technologies Pvt Ltd · Full-time", logo: "/img/sentius_logo.png", description: "Developing production AI models, scalable inference pipelines, and LLM-powered services for enterprise applications.", certificate: undefined, tags: ["Python", "FastAPI", "LLMs", "RAG"] },
  { category: "internship", date: "Jan — Jun 2026", title: "AI Engineer Intern", subtitle: "Sentius Technologies Pvt Ltd · 6-month internship", logo: "/img/sentius_logo.png", description: "Built and validated AI applications and inference pipelines, leading to a full-time conversion.", certificate: sentiusInternshipLetter.url, tags: ["Python", "PyTorch", "Machine Learning"] },
  { category: "college", date: "2024 — 2025", title: "President", subtitle: "NIC Club · MVJ College of Engineering", logo: "/img/nic_logo.png", description: "Led a 30+ member technical club, organized AI workshops and hackathons, and mentored junior developers.", certificate: nicPresidentCertificate.url, tags: ["Leadership", "Mentoring"] },
  { category: "college", date: "2022 — 2026", title: "B.E. Computer Science", subtitle: "MVJ College of Engineering · VTU", logo: "/img/MVJ logo.png", description: "Completed a Bachelor of Engineering in Computer Science & Engineering.", certificate: mvjCertificate.url, tags: ["Computer Science", "Engineering"] },
];

const skills = ["Python", "Java", "JavaScript", "C++", "PyTorch", "TensorFlow", "LangChain", "Hugging Face", "YOLOv8", "OpenCV", "FastAPI", "REST APIs", "MySQL", "MongoDB", "SQLite", "Pandas", "NumPy", "Tableau", "Power BI", "Git", "GitHub", "Docker", "Google Cloud"];

const certificates = [
  { title: "Vibe Hack 2.0 — Top 5,000 Teams", issuer: "Hack With India · BuildwithIndia", date: "", logo: vibeHackLogo.url, file: vibeHackCertificate.url },
  { title: "Google Gen AI Study Jams 2024", issuer: "Google Developer Groups · MVJCE", date: "Jun 2024", logo: gdgLogo.url, file: googleGenAiCertificate.url },
  { title: "Android Development Workshop 2023", issuer: "Google Developer Student Clubs · MVJCE", date: "Dec 2023", logo: androidLogo.url, file: androidWorkshopCertificate.url },
  { title: "EBSCO eBooks / ECM Training", issuer: "EBSCO Information Services", date: "Dec 2025", logo: ebscoLogo.url, file: ebscoTrainingCertificate.url },
  { title: "Frontend Web Development Workshop", issuer: "Google Developer Student Clubs · MVJCE", date: "Jun 2024", logo: gdscLogo.url, file: frontendWorkshopCertificate.url },
  { title: "Backend Web Development Workshop", issuer: "Google Developer Student Clubs · MVJCE", date: "Sep 2024", logo: gdscLogo.url, file: backendWorkshopCertificate.url },
  { title: "Adobe India Hackathon — Round 1", issuer: "Adobe · Unstop", date: "", logo: adobeLogo.url, file: adobeHackathonCertificate.url },
  { title: "PixelGenesis 24-Hour Hackathon", issuer: "Organizer · VertechX 13.0", date: "Nov 2025", logo: vertechxLogo.url, file: pixelGenesisCertificate.url },
  { title: "PBCTF 4.0", issuer: "Point Blank", date: "Aug 2025", logo: pbctfLogo.url, file: pbctfCertificate.url },
  { title: "NIC President — Appreciation", issuer: "Nova Innovative Compskey · MVJCE", date: "2024–25", logo: "/img/nic_logo.png", file: nicPresidentCertificate.url },
];

function ProjectPreview({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const play = () => {
    if (!project.video || !ref.current) return;
    if (!ref.current.src) ref.current.src = project.video;
    ref.current.play().catch(() => undefined);
  };
  const stop = () => {
    if (!ref.current) return;
    ref.current.pause();
    ref.current.currentTime = 0;
  };
  return (
    <button type="button" className="project-visual group/media" onMouseEnter={play} onMouseLeave={stop} onClick={onOpen} aria-label={project.video ? `Play ${project.title} demo` : `View ${project.title}`}>
      <img src={project.image} alt={`${project.title} interface`} className="project-image" />
      {project.video && <video ref={ref} muted loop playsInline preload="none" className="project-video" />}
      <span className="project-play"><Play aria-hidden="true" /> <span>{project.video ? "Play demo" : "Project image"}</span></span>
    </button>
  );
}

function CursorFX() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0;
    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      const target = e.target as HTMLElement;
      ring.classList.toggle("is-active", !!target.closest("a, button, .project-visual, input, textarea"));
    };
    const loop = () => {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const elements = document.querySelectorAll(".editorial-reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0, rootMargin: "0px 0px 15% 0px" });
    elements.forEach((element) => observer.observe(element));
    // Safety net: never leave content hidden (e.g. hash jumps, fast scrolling).
    const fallback = window.setTimeout(() => elements.forEach((el) => el.classList.add("is-visible")), 1200);
    return () => { observer.disconnect(); window.clearTimeout(fallback); };
  }, [filter]);

  useEffect(() => {
    document.body.style.overflow = videoSrc ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [videoSrc]);

  const closeVideo = () => { modalVideoRef.current?.pause(); setVideoSrc(null); };
  const visibleTimeline = timeline.filter((item) => filter === "all" || (filter === "jobs" && ["work", "internship"].includes(item.category)) || item.category === filter);

  const onContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);
    try {
      await sendContactMessage({ data: { name: String(data.get("name") || ""), email: String(data.get("email") || ""), message: String(data.get("message") || "") } });
      form.reset();
      setNotice("Message sent. I’ll get back to you soon.");
    } catch {
      // Fallback for any host without email configured: open the visitor's mail app.
      const subject = encodeURIComponent(`Portfolio contact from ${data.get("name") || ""}`);
      const body = encodeURIComponent(`${data.get("message") || ""}\n\n— ${data.get("name") || ""} (${data.get("email") || ""})`);
      window.location.href = `mailto:jitesh0510@gmail.com?subject=${subject}&body=${body}`;
      setNotice("Opening your email app to send the message.");
    } finally {
      setSending(false);
      window.setTimeout(() => setNotice(null), 4500);
    }
  };

  return (
    <div className="portfolio-shell">
      <CursorFX />
      <header className="editorial-nav">
        <a href="#top" className="font-display text-lg font-bold">JITESH K.</a>
        <nav aria-label="Main navigation" className="flex items-center gap-5 text-xs uppercase md:gap-9">
          <a href="#story">Story</a><a href="#work">Work</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="top" className="editorial-hero">
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-topline"><span>AI Engineer · Bengaluru</span><span>Portfolio / 2026</span></div>
          <div className="hero-copy">
            <p className="eyebrow hero-kicker">Production AI · RAG · Computer Vision</p>
            <div className="hero-name-wrap"><h1>Jitesh K<span>.</span></h1></div>
            <div className="hero-subline">
              <p>Building production-ready AI systems at the intersection of <em>research</em> and real-world utility.</p>
              <a href="#story" className="scroll-cue"><ArrowDown aria-hidden="true" /><span>Explore</span></a>
            </div>
          </div>
          <div className="hero-side-mark" aria-hidden="true"><span /><p>Available for collaborations</p><span /></div>
        </section>

        <section id="story" className="story-section editorial-reveal">
          <p className="section-index">01 / The narrative</p>
          <div className="story-grid">
            <h2>Bridging <span>machine intelligence</span> and human intent.</h2>
            <div className="story-copy">
              <p>I engineer AI systems from prototype to production—combining retrieval, language models, computer vision, and thoughtful backend architecture.</p>
              <p>My work is grounded in practical outcomes: faster research, clearer workflows, and tools people can confidently use.</p>
              <div className="story-links">
                <a href={latestResume.url} target="_blank" rel="noreferrer">Resume <ArrowUpRight /></a>
                <a href="https://www.linkedin.com/in/jitesh0510" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a>
                <a href="https://github.com/Jitesh050" target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="work-section">
          <div className="section-heading editorial-reveal"><p className="section-index">02 / Selected work</p><h2>Systems<br/><span>I’ve built.</span></h2></div>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-row editorial-reveal" key={project.title}>
                <div className="project-title"><span>0{index + 1} / {project.tagline}</span><h3>{project.title}</h3></div>
                <ProjectPreview project={project} onOpen={() => project.video && setVideoSrc(project.video)} />
                <div className="project-copy"><p>{project.impact}</p><div className="project-links">{project.video && <button type="button" onClick={() => project.video && setVideoSrc(project.video)}>Live demo <ArrowUpRight /></button>}{project.code && <a href={project.code} target="_blank" rel="noreferrer">Source <ArrowUpRight /></a>}</div></div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="experience-section">
          <div className="section-heading editorial-reveal"><p className="section-index">03 / Path</p><h2>Experience<br/><span>& education.</span></h2></div>
          <div className="filter-row" aria-label="Filter experience">
            {[{ key: "all", label: "All" }, { key: "jobs", label: "Jobs" }, { key: "college", label: "College" }].map((item) => <Button key={item.key} type="button" variant={filter === item.key ? "default" : "outline"} onClick={() => setFilter(item.key)}>{item.label}</Button>)}
          </div>
          <div className="timeline-list">
            {visibleTimeline.map((item) => (
              <article className="timeline-row editorial-reveal" key={`${item.date}-${item.title}`}>
                <p>{item.date}</p><div><div className="timeline-title"><img src={item.logo} alt="" /><div><h3>{item.title}</h3><span>{item.subtitle}</span></div></div><p>{item.description}</p><div className="tag-list">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{item.certificate && <a className="text-link" href={item.certificate} target="_blank" rel="noreferrer">View certificate <ExternalLink /></a>}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="skills-section editorial-reveal">
          <p className="section-index">04 / Toolkit</p>
          <div className="skills-grid"><h2>Tools for<br/>thinking<br/><span>& shipping.</span></h2><div>{skills.map((skill, index) => <span key={skill}><small>{String(index + 1).padStart(2, "0")}</small>{skill}</span>)}</div></div>
        </section>

        <section id="certifications" className="cert-section">
          <div className="section-heading editorial-reveal"><p className="section-index">05 / Learning</p><h2>Credentials<br/><span>& milestones.</span></h2></div>
          <div className="certificate-list">
            {certificates.map((item, index) => (
              <a href={item.file} target="_blank" rel="noreferrer" className="certificate-row editorial-reveal" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span><img src={item.logo} alt={`${item.issuer} logo`} /><div><h3>{item.title}</h3><p>{item.issuer}</p></div><time>{item.date}</time><ArrowUpRight />
              </a>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <p className="section-index">06 / Available for collaborations</p>
          <h2>Start a<br/><span>project.</span></h2>
          <div className="contact-grid">
            <div><p>Have an AI product, research problem, or ambitious idea? Tell me what you’re building.</p><a href="mailto:jitesh0510@gmail.com">jitesh0510@gmail.com <ArrowUpRight /></a></div>
            <form onSubmit={onContactSubmit}>
              <label>Name<Input name="name" placeholder="Your name" required /></label>
              <label>Email<Input name="email" type="email" placeholder="you@example.com" required /></label>
              <label className="field-wide">Message<Textarea name="message" placeholder="A little about your project" rows={4} required /></label>
              <Button type="submit" size="lg" disabled={sending}>{sending ? "Sending…" : "Send message"}<ArrowUpRight /></Button>
              {notice && <p role="status" className="form-notice">{notice}</p>}
            </form>
          </div>
          <footer><span>© 2026 Jitesh K.</span><span>Bengaluru, India</span><div><a href="https://www.linkedin.com/in/jitesh0510" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/Jitesh050" target="_blank" rel="noreferrer">GitHub</a></div></footer>
        </section>
      </main>

      {videoSrc && <div className="video-modal" role="dialog" aria-modal="true" aria-label="Project demo" onClick={closeVideo}><div onClick={(event) => event.stopPropagation()}><Button variant="secondary" size="icon" onClick={closeVideo} aria-label="Close video"><X /></Button><video ref={modalVideoRef} controls playsInline autoPlay src={videoSrc} /></div></div>}
    </div>
  );
}
