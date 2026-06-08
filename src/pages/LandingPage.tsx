import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import Navbar from '../components/shared/Navbar';
import GoldButton from '../components/shared/GoldButton';
import { 
  FileText, 
  Mail, 
  Compass, 
  Globe, 
  Search, 
  Award, 
  Briefcase, 
  Video, 
  TrendingUp, 
  HelpCircle, 
  Upload, 
  Check, 
  CheckCircle,
  XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setClientName, setClientEmail } = useOrder();
  
  // Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [targetRole, setTargetRole] = useState('');
  
  // File upload states
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Smooth scroll helper
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Drag and Drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (selectedFile: File): boolean => {
    setFileError('');
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase() || '';
    
    if (!allowedExtensions.includes(fileExtension)) {
      setFileError('Invalid file type. Only PDF, DOC, and DOCX are allowed.');
      return false;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
      setFileError('File size exceeds 5MB limit.');
      return false;
    }
    
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        simulateFileUpload(droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        simulateFileUpload(selectedFile);
      }
    }
  };

  const simulateFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 20;
      });
    }, 100);
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setFileError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim() || !email.trim() || !phone.trim() || !targetRole.trim()) {
      setFormError('Please fill out all personal and career fields.');
      return;
    }

    if (!file) {
      setFormError('Please upload your resume to complete your signup.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API registration, store client details in OrderContext, and transition
    setTimeout(() => {
      setClientName(fullName);
      setClientEmail(email);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Auto-redirect to services portal after showing success screen
      setTimeout(() => {
        navigate('/portal');
      }, 1500);
    }, 1200);
  };

  const servicesGrid = [
    {
      title: "Resume Writing & ATS Optimization",
      icon: <FileText className="text-accent-gold" size={24} />,
      desc: "Your resume is screened by software before any human reads it. We build yours to clear automated filters and tell a compelling, achievement-driven story."
    },
    {
      title: "Cover Letter Development",
      icon: <Mail className="text-accent-gold" size={24} />,
      desc: "Personalized, employer-focused, and written to add genuine value to your application rather than simply repeating what your resume already says."
    },
    {
      title: "Career Strategy Consultation",
      icon: <Compass className="text-accent-gold" size={24} />,
      desc: "A focused, one-on-one session built around your goals. Walk away with an honest assessment and a clear, actionable roadmap for your next steps."
    },
    {
      title: "LinkedIn & Social Profile Optimization",
      icon: <Globe className="text-accent-gold" size={24} />,
      desc: "Recruiters search these platforms daily. We rebuild every section with strategic, keyword-rich content that puts your profile in front of active searches."
    },
    {
      title: "AI-Powered Job Search Support",
      icon: <Search className="text-accent-gold" size={24} />,
      desc: "Continuous search sweeps matched precisely to your target profile. Human professionals take over to submit customized, cap-free applications."
    },
    {
      title: "Career Coaching & Interview Prep",
      icon: <Award className="text-accent-gold" size={24} />,
      desc: "Realistic mock interviews, communication coaching, presence building, and salary negotiation prep so you walk in ready and walk out hired."
    },
    {
      title: "Personal Branding Solutions",
      icon: <Briefcase className="text-accent-gold" size={24} />,
      desc: "A professional pitch deck and design portfolio website providing a polished, always-available digital presence that makes the right impression."
    },
    {
      title: "Video Screening Profile",
      icon: <Video className="text-accent-gold" size={24} />,
      desc: "A professionally scripted, edited video introduction putting a face, voice, and narrative to your name before formal interviewing begins."
    },
    {
      title: "Post-Offer Onboarding Support",
      icon: <TrendingUp className="text-accent-gold" size={24} />,
      desc: "Structured role planning with a personalized 30, 60, and 90-day strategy to help you hit the ground running and thrive from day one."
    },
    {
      title: "On-Demand Expert Consulting",
      icon: <HelpCircle className="text-accent-gold" size={24} />,
      desc: "Direct access to our subject matter experts when you face specific career hurdles, providing the targeted guidance and strategy you need."
    }
  ];

  return (
    <div className="relative min-h-screen font-sans">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative py-12 md:py-24 overflow-hidden border-b border-gold-border/10 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-4 z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-accent-gold/10 border border-accent-gold/30 rounded-full px-4.5 py-1.5 animate-gold-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-accent-gold-light">
              Supercharged by AI. Delivered by Experts.
            </span>
          </div>
          
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl text-text-primary tracking-tight leading-[1.15]">
            Siddiqui Bro LLC <br />
            <span className="gold-text-gradient italic">Your Career, Elevated.</span>
          </h1>
          
          <p className="mt-4 text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto font-sans leading-relaxed">
            Professional career services designed to help you find the right opportunity, present yourself with confidence, and get hired faster.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <GoldButton onClick={scrollToForm} className="px-8 py-3.5 text-sm">
              Sign Up Free →
            </GoldButton>
            <button
              onClick={() => navigate('/portal')}
              className="px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-accent-gold hover:text-accent-gold-light border border-accent-gold/30 hover:border-accent-gold/60 rounded-xl transition-all cursor-pointer bg-bg-card/40 hover:bg-bg-card/70"
            >
              Book a Consultation
            </button>
          </div>

          <p className="pt-2 text-xs font-semibold text-accent-gold-light tracking-wide">
            Sign Up Free. Because Your Career Deserves Better. No Credit Card. No Commitment. No Catch.
          </p>
        </div>
      </section>

      {/* 2. REALITY & GAP SECTION */}
      <section className="py-16 md:py-24 border-b border-gold-border/10 bg-bg-card/20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 border-b border-gold-border/20 pb-2">
              <span className="text-accent-gold">✦</span>
              <h2 className="font-display text-xl font-bold tracking-tight text-text-primary">
                The Reality of Today's Job Market
              </h2>
            </div>
            
            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans">
              Qualified professionals get passed over every single day. Not because they lack the ability. Because their resume never cleared the algorithm, their profile never appeared in the right search, or their application looked exactly like every other one in the pile.
            </p>
            
            <p className="text-sm sm:text-base font-medium text-text-primary leading-relaxed font-sans">
              The hiring process has fundamentally changed. The way most people search for jobs has not.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-8 border border-gold-border/30 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-accent-gold/5 rounded-full blur-xl pointer-events-none" />
            <h3 className="font-display text-2xl font-bold text-accent-gold mb-4">
              We Close That Gap.
            </h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
              We combine intelligent technology with genuine human expertise to help you present yourself powerfully, reach the right employers, and navigate the modern hiring process with the clarity and confidence that turns a job search into a career move.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SIGNUP REGISTRATION FORM */}
      <section id="signup" ref={formRef} className="py-16 md:py-24 border-b border-gold-border/10 relative">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center space-y-2 mb-10">
            <h2 className="font-display font-bold text-3xl text-text-primary">
              Create Your Free Account
            </h2>
            <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
              Upload your resume and tell us where you want to go. No commitment, no fees.
            </p>
          </div>

          <div className="glass-panel-elevated rounded-2xl border border-gold-border/35 shadow-2xl p-6 md:p-10 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-success-green/10 border border-success-green text-success-green rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(34,197,94,0.15)]">
                    <CheckCircle size={44} className="stroke-[1.5] animate-bounce" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold text-text-primary">
                      Profile Created Successfully!
                    </h3>
                    <p className="text-sm text-text-muted max-w-sm mx-auto leading-relaxed">
                      Your resume has been processed. Redirecting you to the services portal to finalize your onboarding plan...
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleFormSubmit}
                  className="space-y-8"
                >
                  {formError && (
                    <div className="p-3.5 rounded bg-red-500/10 border border-red-500/30 text-red-200 text-xs font-semibold flex items-center gap-2">
                      <XCircle size={14} className="shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* PERSONAL INFO */}
                    <div className="space-y-5">
                      <h3 className="text-xs font-bold tracking-wider text-accent-gold uppercase border-b border-gold-border/10 pb-2 mb-2">
                        Personal Information
                      </h3>
                      
                      <div>
                        <label className="block text-[10px] font-semibold tracking-wider text-text-muted uppercase mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Johnson"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-gold-border/20 text-text-primary focus:border-accent-gold outline-none text-xs font-medium transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold tracking-wider text-text-muted uppercase mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="you@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-gold-border/20 text-text-primary focus:border-accent-gold outline-none text-xs font-medium transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold tracking-wider text-text-muted uppercase mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+1 (000) 000-0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-gold-border/20 text-text-primary focus:border-accent-gold outline-none text-xs font-medium transition-all"
                        />
                      </div>
                    </div>

                    {/* CAREER INFO & RESUME */}
                    <div className="space-y-5">
                      <h3 className="text-xs font-bold tracking-wider text-accent-gold uppercase border-b border-gold-border/10 pb-2 mb-2">
                        Career Information
                      </h3>

                      <div>
                        <label className="block text-[10px] font-semibold tracking-wider text-text-muted uppercase mb-2">
                          Target Role
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Senior Product Manager"
                          value={targetRole}
                          onChange={(e) => setTargetRole(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-gold-border/20 text-text-primary focus:border-accent-gold outline-none text-xs font-medium transition-all"
                        />
                      </div>

                      {/* File Dropzone */}
                      <div>
                        <label className="block text-[10px] font-semibold tracking-wider text-text-muted uppercase mb-2">
                          Upload Resume
                        </label>
                        
                        <div
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer flex flex-col justify-center items-center min-h-[120px] ${
                            dragActive 
                              ? 'border-accent-gold bg-accent-gold/5 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                              : file 
                              ? 'border-success-green/40 bg-success-green/5' 
                              : 'border-gold-border/25 hover:border-gold-border/45 bg-bg-primary/30'
                          }`}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                          />

                          {file ? (
                            <div className="space-y-2 w-full text-center">
                              <div className="w-10 h-10 rounded-full bg-success-green/10 text-success-green flex items-center justify-center mx-auto">
                                <Check size={18} />
                              </div>
                              <div className="text-xs font-semibold text-text-primary truncate max-w-[200px] mx-auto">
                                {file.name}
                              </div>
                              {isUploading ? (
                                <div className="w-2/3 bg-bg-primary rounded-full h-1.5 mx-auto overflow-hidden">
                                  <div className="bg-accent-gold h-full" style={{ width: `${uploadProgress}%` }}></div>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile();
                                  }}
                                  className="text-[10px] text-red-400 hover:text-red-300 font-bold uppercase tracking-wider underline cursor-pointer"
                                >
                                  Remove File
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="text-text-muted flex justify-center">
                                <Upload size={24} className="stroke-[1.5] text-accent-gold/70" />
                              </div>
                              <p className="text-xs font-bold text-text-primary">
                                Drop your file here or <span className="text-accent-gold underline">click to browse</span>
                              </p>
                              <p className="text-[10px] text-text-muted">
                                PDF, DOC, DOCX — up to 5MB
                              </p>
                            </div>
                          )}
                        </div>
                        {fileError && <p className="text-[10px] text-red-400 font-semibold mt-1">⚠️ {fileError}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gold-border/10 space-y-4">
                    <GoldButton type="submit" disabled={isSubmitting} fullWidth className="py-4 text-sm">
                      {isSubmitting ? 'Processing Resume...' : 'Sign Up Free'}
                    </GoldButton>
                    
                    <p className="text-[9px] text-text-muted text-center leading-relaxed">
                      By signing up you agree to our Terms of Service and Privacy Policy. Siddiqui Bro LLC provides career consulting and educational support only. Employment outcomes are not guaranteed and vary by individual.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE DO - GRID */}
      <section id="services" className="py-20 md:py-28 border-b border-gold-border/10 bg-bg-card/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <span className="text-accent-gold text-xl">◆</span>
            <h2 className="text-lg font-bold tracking-wider uppercase text-text-primary">
              What We Do
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesGrid.map((item, index) => (
              <div
                key={index}
                className="glass-panel p-6 rounded-xl border border-gold-border/15 hover:border-accent-gold/40 hover:shadow-[0_0_20px_rgba(212,175,55,0.08)] transition-all duration-300 flex flex-col gap-4 group cursor-default"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-accent-gold/5 border border-gold-border/15 group-hover:border-accent-gold/30 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-sans font-bold text-sm text-text-primary tracking-tight leading-snug">
                    {item.title}
                  </h3>
                </div>
                
                <p className="text-xs text-text-muted leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY RESUMEFY - COMPARATIVE */}
      <section id="why-us" className="py-20 md:py-28 border-b border-gold-border/10 bg-bg-card/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center space-y-2 mb-12">
            <span className="text-accent-gold text-[10px] font-bold tracking-widest uppercase">Comparative Standard</span>
            <h2 className="font-display font-bold text-3xl text-text-primary">
              Why Siddiqui Bro LLC
            </h2>
            <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
              How we differentiate ourselves from industry baselines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
            {/* Mills */}
            <div className="glass-panel p-5 rounded-xl border border-gold-border/10 text-center flex flex-col justify-between opacity-70 hover:opacity-100 transition-opacity">
              <div>
                <span className="text-2xl mb-3 block">📄</span>
                <h4 className="font-sans font-bold text-sm text-text-primary mb-2">Resume Mills</h4>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Hand you a standardized template document, charge a fee, and disappear with no follow-through.
                </p>
              </div>
            </div>

            {/* Boards */}
            <div className="glass-panel p-5 rounded-xl border border-gold-border/10 text-center flex flex-col justify-between opacity-70 hover:opacity-100 transition-opacity">
              <div>
                <span className="text-2xl mb-3 block">🔍</span>
                <h4 className="font-sans font-bold text-sm text-text-primary mb-2">Job Boards</h4>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Hand you a blank search bar, flood you with hundreds of irrelevant postings, and wish you luck.
                </p>
              </div>
            </div>

            {/* Spams */}
            <div className="glass-panel p-5 rounded-xl border border-gold-border/10 text-center flex flex-col justify-between opacity-70 hover:opacity-100 transition-opacity">
              <div>
                <span className="text-2xl mb-3 block">🤖</span>
                <h4 className="font-sans font-bold text-sm text-text-primary mb-2">Automated Bots</h4>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Flood employer inboxes with spam applications that trigger automated rejections instantly.
                </p>
              </div>
            </div>

            {/* Resumefy */}
            <div className="glass-panel rounded-xl p-6 border border-accent-gold shadow-[0_0_20px_rgba(212,175,55,0.08)] bg-accent-gold/5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent-gold text-bg-primary text-[8px] font-black tracking-widest uppercase py-0.5 px-3 rounded-bl">
                Leader
              </div>
              <div>
                <span className="text-2xl mb-3 block">✨</span>
                <h4 className="font-sans font-black text-sm text-accent-gold mb-2">Siddiqui Bro LLC</h4>
                <p className="text-[11px] text-text-primary leading-relaxed font-semibold">
                  We bring intelligent technology, dedicated human execution, and genuine end-to-end support together in one coordinate system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHO WE WORK WITH */}
      <section className="py-20 md:py-28 border-b border-gold-border/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center space-y-2 mb-12">
            <span className="text-accent-gold text-[10px] font-bold tracking-widest uppercase">Our Focus Candidates</span>
            <h2 className="font-display font-bold text-3xl text-text-primary">
              Who We Work With
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl border border-gold-border/15 bg-bg-card/40 hover:border-accent-gold/30 transition-all text-center">
              <span className="text-xs font-bold text-accent-gold uppercase tracking-wider block mb-2">Industry Switchers</span>
              <p className="text-xs text-text-muted leading-relaxed">Professionals making bold moves into new industries, leadership roles, or competitive fields.</p>
            </div>
            
            <div className="p-5 rounded-xl border border-gold-border/15 bg-bg-card/40 hover:border-accent-gold/30 transition-all text-center">
              <span className="text-xs font-bold text-accent-gold uppercase tracking-wider block mb-2">Executives</span>
              <p className="text-xs text-text-muted leading-relaxed">Executives and senior leaders who require a sophisticated, high-caliber approach tailored to their level.</p>
            </div>

            <div className="p-5 rounded-xl border border-gold-border/15 bg-bg-card/40 hover:border-accent-gold/30 transition-all text-center">
              <span className="text-xs font-bold text-accent-gold uppercase tracking-wider block mb-2">Emergent Talents</span>
              <p className="text-xs text-text-muted leading-relaxed">Emerging professionals who understand that building a career on the right foundation is a critical investment.</p>
            </div>

            <div className="p-5 rounded-xl border border-gold-border/15 bg-bg-card/40 hover:border-accent-gold/30 transition-all text-center">
              <span className="text-xs font-bold text-accent-gold uppercase tracking-wider block mb-2">Serious Candidates</span>
              <p className="text-xs text-text-muted leading-relaxed">Anyone who is serious about their career, values their time, and knows the right support changes everything.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GET STARTED TODAY BANNER */}
      <section className="py-20 md:py-28 relative text-center border-b border-gold-border/10 bg-bg-card/25">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-gold/5 rounded-full blur-[110px] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-4 z-10 space-y-6">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-text-primary tracking-tight">
            Get Started Today
          </h2>
          
          <p className="text-sm sm:text-base text-text-muted max-w-lg mx-auto leading-relaxed">
            Your next opportunity is out there. The only thing standing between you and it is a strategy built to find it, materials built to win it, and a team built to support you.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4">
            <GoldButton onClick={scrollToForm} className="px-6 py-3.5 text-xs">
              Sign Up Free
            </GoldButton>
            <button
              onClick={scrollToForm}
              className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-accent-gold hover:text-accent-gold-light border border-accent-gold/30 hover:border-accent-gold/60 rounded-xl transition-all cursor-pointer bg-bg-card/40 hover:bg-bg-card/70"
            >
              Upload My Resume
            </button>
            <button
              onClick={() => navigate('/portal')}
              className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-text-primary hover:text-accent-gold border border-gold-border/20 hover:border-accent-gold/50 rounded-xl transition-all cursor-pointer bg-bg-card/20 hover:bg-bg-card/45"
            >
              Book a Consultation
            </button>
          </div>

          <p className="text-xs text-text-muted italic">
            No credit card. No commitment. No catch. Just a smarter way to take control of your career.
          </p>
        </div>
      </section>

      {/* 8. NOTICE FOOTER */}
      <footer id="compliance" className="py-12 bg-bg-primary text-center border-t border-gold-border/5 relative z-10 font-sans">
        <div className="max-w-5xl mx-auto px-4 space-y-6">
          <div className="flex justify-center mb-2">
            <span className="font-display font-bold text-lg text-text-primary">
              Siddiqui Bro <span className="text-accent-gold">LLC</span>
            </span>
          </div>

          <p className="text-[10px] text-text-muted leading-relaxed max-w-3xl mx-auto text-left sm:text-center">
            <strong>Important Notice:</strong> Siddiqui Bro LLC provides career consulting, coaching, resume development, personal branding, and related professional services. All guidance and consulting support is provided for informational and educational purposes only. We do not access client employer systems, devices, networks, or platforms under any circumstances. Employment decisions are made solely by employers. Individual results vary based on qualifications, experience, market conditions, and employer requirements. Clients are solely responsible for applying any guidance within their own professional context.
          </p>
          
          <div className="text-[9px] text-text-muted border-t border-gold-border/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Siddiqui Bro LLC. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent-gold transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-accent-gold transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
