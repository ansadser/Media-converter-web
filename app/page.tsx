"use client";

import { useCallback, useRef, useState } from "react";
import {
  ArrowRight, AudioLines, Check, ChevronDown, CirclePlay, Clock3, FileAudio,
  FileVideo, Gauge, Headphones, Image as ImageIcon, Loader2, Menu, Mic2,
  Music2, Scissors, Settings2, Sparkles, Upload, Video, X, Zap
} from "lucide-react";

type Tool = { id:string; label:string; icon:React.ElementType; desc:string };
const tools:Tool[] = [
  {id:"mp3",label:"MP3",icon:Music2,desc:"Extract clean audio"},
  {id:"trim",label:"Trim",icon:Scissors,desc:"Cut any section"},
  {id:"speed",label:"Speed",icon:Gauge,desc:"0.25× to 4×"},
  {id:"compress",label:"Compress",icon:Zap,desc:"Smaller file size"},
  {id:"resize",label:"Resize",icon:Settings2,desc:"480p · 720p · 1080p"},
  {id:"bass",label:"Bass Boost",icon:AudioLines,desc:"Punchier low end"},
  {id:"bw",label:"B&W",icon:ImageIcon,desc:"Classic monochrome"},
  {id:"audio",label:"Audio Mix",icon:Headphones,desc:"Blend media tracks"},
];

export default function Home(){
  const inputRef=useRef<HTMLInputElement>(null);
  const [file,setFile]=useState<File|null>(null);
  const [drag,setDrag]=useState(false);
  const [tool,setTool]=useState("mp3");
  const [mobileOpen,setMobileOpen]=useState(false);
  const [speed,setSpeed]=useState(1);
  const [duration,setDuration]=useState("");
  const [status,setStatus]=useState<"idle"|"ready"|"processing">("idle");

  const pick=useCallback((f?:File)=>{
    if(!f)return;
    if(!f.type.startsWith("video/")&&!f.type.startsWith("audio/")) return;
    setFile(f); setStatus("ready");
  },[]);

  const process=()=>{ if(!file)return; setStatus("processing"); setTimeout(()=>setStatus("ready"),900); };

  return <main className="min-h-screen overflow-hidden">
    <nav className="nav">
      <div className="brand"><span className="brand-mark"><Sparkles size={17}/></span><span>Media<span className="muted">Flow</span></span></div>
      <div className="nav-links"><a href="#tools">Tools</a><a href="#how">How it works</a><a href="#about">About</a></div>
      <button className="mobile-menu" onClick={()=>setMobileOpen(!mobileOpen)}><Menu size={20}/></button>
      <a className="nav-cta" href="#converter">Start converting <ArrowRight size={15}/></a>
    </nav>
    {mobileOpen&&<div className="mobile-links"><a href="#tools">Tools</a><a href="#how">How it works</a><a href="#about">About</a></div>}

    <section className="hero">
      <div className="hero-glow one"/><div className="hero-glow two"/>
      <div className="eyebrow"><span className="dot"/> FAST • PRIVATE • SIMPLE</div>
      <h1>Turn your media into<br/><span>something better.</span></h1>
      <p className="hero-copy">Convert, trim, compress and enhance video or audio in a clean workspace built for speed.</p>
      <div className="hero-actions"><a href="#converter" className="primary">Upload media <Upload size={17}/></a><a href="#tools" className="secondary">Explore tools <ArrowRight size={16}/></a></div>
      <div className="trust"><span><Check size={14}/> No signup</span><span><Check size={14}/> Simple controls</span><span><Check size={14}/> Mobile friendly</span></div>
    </section>

    <section id="converter" className="workspace-wrap">
      <div className="workspace">
        <div className="workspace-head"><div><div className="section-kicker">CONVERTER</div><h2>Drop your media here</h2></div><span className="format-pill">VIDEO / AUDIO</span></div>
        {!file ? <div className={"dropzone "+(drag?"drag":"")} onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);pick(e.dataTransfer.files[0])}} onClick={()=>inputRef.current?.click()}>
          <input ref={inputRef} hidden type="file" accept="video/*,audio/*" onChange={e=>pick(e.target.files?.[0])}/>
          <div className="upload-icon"><Upload size={26}/></div><h3>Drag & drop your file</h3><p>or click to browse from your device</p><div className="file-types"><span><FileVideo size={14}/> MP4</span><span><FileAudio size={14}/> MP3</span><span>WEBM</span><span>MOV</span><span>WAV</span></div>
        </div> : <div className="editor">
          <div className="file-card"><div className="file-icon">{file.type.startsWith("video")?<Video size={21}/>:<Mic2 size={21}/>}</div><div className="file-info"><b>{file.name}</b><span>{(file.size/1024/1024).toFixed(2)} MB</span></div><button className="icon-btn" onClick={()=>{setFile(null);setStatus("idle")}}><X size={17}/></button></div>
          <div className="tool-grid">{tools.map(t=>{const I=t.icon;return <button key={t.id} className={"tool "+(tool===t.id?"active":"")} onClick={()=>setTool(t.id)}><I size={18}/><span>{t.label}</span><small>{t.desc}</small></button>})}</div>
          <div className="controls">
            {tool==="speed"&&<><label>Speed <b>{speed}×</b></label><input className="range" type="range" min=".25" max="4" step=".25" value={speed} onChange={e=>setSpeed(+e.target.value)}/><div className="range-labels"><span>0.25×</span><span>1×</span><span>4×</span></div><label className="duration-label">Or target duration</label><input className="text-input" placeholder="e.g. 03:00" value={duration} onChange={e=>setDuration(e.target.value)}/></>}
            {tool==="trim"&&<><label>Cut range</label><div className="dual-input"><input className="text-input" placeholder="Start 00:00"/><input className="text-input" placeholder="End 00:30"/></div></>}
            {tool==="resize"&&<><label>Output quality</label><div className="option-row">{["480p","720p","1080p"].map(x=><button className="option" key={x}>{x}</button>)}</div></>}
            {tool==="compress"&&<><label>Compression level</label><div className="option-row">{["Light","Balanced","Maximum"].map(x=><button className="option" key={x}>{x}</button>)}</div></>}
            {!["speed","trim","resize","compress"].includes(tool)&&<div className="simple-control"><CirclePlay size={17}/><span>Ready to apply <b>{tools.find(x=>x.id===tool)?.label}</b></span></div>}
          </div>
          <button className="convert-btn" onClick={process} disabled={status==="processing"}>{status==="processing"?<><Loader2 className="spin" size={18}/> Preparing…</>:<>Convert media <ArrowRight size={18}/></>}</button>
          <p className="workspace-note"><Clock3 size={13}/> Your browser UI is ready. Connect a processing API to run FFmpeg conversions.</p>
        </div>}
      </div>
    </section>

    <section id="tools" className="section"><div className="section-kicker">EVERYDAY TOOLS</div><h2>Everything you need,<br/><span>nothing you don’t.</span></h2><div className="feature-grid">{tools.map(t=>{const I=t.icon;return <div className="feature" key={t.id}><div className="feature-icon"><I size={19}/></div><h3>{t.label}</h3><p>{t.desc}</p></div>})}</div></section>
    <section id="how" className="how section"><div><div className="section-kicker">HOW IT WORKS</div><h2>Three steps.<br/><span>Zero clutter.</span></h2></div><div className="steps"><div><b>01</b><h3>Upload</h3><p>Drop your video or audio into the converter.</p></div><div><b>02</b><h3>Choose</h3><p>Pick a tool and tune the settings you need.</p></div><div><b>03</b><h3>Export</h3><p>Process your media and download the result.</p></div></div></section>
    <footer id="about"><div className="brand"><span className="brand-mark"><Sparkles size={15}/></span>MediaFlow</div><span>Built for smooth media workflows.</span></footer>
  </main>
}