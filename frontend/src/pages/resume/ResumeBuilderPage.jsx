import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  Save,
  Download,
  Sparkles,
  Eye,
  Plus,
  Trash2,
  Check,
  X,
  Award,
  Layout,
  User,
  Briefcase,
  GraduationCap,
  Code,
  FileText
} from 'lucide-react';

// --- Demo Data ---
const DEMO_RESUME = {
  personalInfo: {
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 012-3456',
    location: 'Austin, TX',
    linkedin: 'linkedin.com/in/alexrivera',
    github: 'github.com/arivera-dev',
  },
  summary: 'Innovative Senior Frontend Developer with 7+ years of experience in building responsive, user-centric web applications. Expert in React, TypeScript, and modern CSS frameworks. Proven track record of improving site performance by 35% and mentoring cross-functional teams.',
  skills: 'React, TypeScript, Next.js, Tailwind CSS, Node.js, GraphQL, AWS, Docker, Jest, CI/CD',
  experience: [
    { title: 'Senior Frontend Engineer', company: 'TechFlow Solutions', startDate: '2020-03', endDate: '', current: true, description: 'Led the redesign of the flagship SaaS platform using React and Tailwind CSS, resulting in a 25% increase in user engagement. Architected a reusable component library used by 4 separate product teams.' },
    { title: 'Web Developer', company: 'Pixel Perfect Agency', startDate: '2017-06', endDate: '2020-02', current: false, description: 'Developed and maintained 15+ client websites. Optimized asset delivery pipelines, reducing initial load times by an average of 1.2 seconds across all projects.' }
  ],
  education: [
    { degree: 'B.S. in Computer Science', school: 'University of Texas', startDate: '2013-08', endDate: '2017-05', gpa: '3.9/4.0' }
  ],
  projects: [
    { name: 'AI Design System', description: 'An automated design system generator using machine learning to predict accessibility-compliant color palettes.', technologies: 'React, Python, TensorFlow', link: 'https://github.com' }
  ],
  certifications: [
    { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2022-11' },
    { name: 'Meta Frontend Professional Certificate', issuer: 'Coursera', date: '2021-05' }
  ],
};

const TEMPLATES = [
  { id: 'modern', name: 'Modern Professional', color: 'bg-indigo-600' },
  { id: 'minimal', name: 'Clean Minimal', color: 'bg-slate-800' },
  { id: 'creative', name: 'Accent Creative', color: 'bg-emerald-600' },
];

const App = () => {
  const [currentResume, setCurrentResume] = useState(DEMO_RESUME);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedText, setEnhancedText] = useState('');
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const previewRef = useRef(null);

  const { register, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: currentResume,
  });

  const watchedValues = watch();

  useEffect(() => {
    setCurrentResume(watchedValues);
  }, [watchedValues]);

  const loadDemoData = () => {
    reset(DEMO_RESUME);
  };

  const handleSave = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(watchedValues));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "resume_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleDownloadPDF = () => {
    // In a real browser environment, we'd use html2canvas + jsPDF
    // Here we trigger the browser's native print dialog which is the most reliable "Save to PDF" method
    window.print();
  };

  const handleAIEnhance = async (section, text) => {
    if (!text) return;
    setIsEnhancing(true);
    setTimeout(() => {
      const enhanced = section === 'summary' 
        ? "Dynamic and results-oriented professional with a demonstrated history of excellence in the tech industry. Adept at leveraging cutting-edge technologies to solve complex problems and drive business growth through technical innovation."
        : "Streamlined operational workflows by implementing automated solutions, resulting in a 40% reduction in manual effort and significant cost savings for the organization.";
      setEnhancedText(enhanced);
      setIsEnhancing(false);
    }, 1000);
  };

  // Helper functions for dynamic arrays
  const addItem = (field, template) => {
    const current = watchedValues[field] || [];
    setValue(field, [...current, template]);
  };

  const removeItem = (field, index) => {
    const current = watchedValues[field] || [];
    setValue(field, current.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 py-3 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500">
              ResumeAI
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={loadDemoData}
              className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              Load Demo
            </button>
            <button 
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm font-medium"
            >
              <Eye className="w-4 h-4 mr-2 text-indigo-500" />
              {isPreviewOpen ? 'Edit Content' : 'Full Preview'}
            </button>
            <button 
              onClick={handleDownloadPDF}
              className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition-all text-sm font-bold"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto flex h-[calc(100vh-64px)] overflow-hidden">
        {/* Left: Editor Panel */}
        <div className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${isPreviewOpen ? 'hidden lg:block' : 'w-full'}`}>
          <div className="max-w-3xl mx-auto space-y-8 pb-20">
            
            {/* Template Selector */}
            <section className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="flex items-center mb-4">
                <Layout className="w-5 h-5 mr-2 text-indigo-500" />
                <h2 className="text-lg font-bold">Select Template</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTemplate(t.id)}
                    className={`p-3 rounded-xl border-2 transition-all text-left ${
                      activeTemplate === t.id 
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                        : 'border-transparent bg-gray-50 dark:bg-gray-800 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-full h-2 rounded-full mb-2 ${t.color}`} />
                    <span className="text-xs font-bold uppercase tracking-wider">{t.name}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Personal Info */}
            <Section title="Personal Information" icon={<User className="w-5 h-5" />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Full Name" {...register('personalInfo.name')} />
                <FormInput label="Email" type="email" {...register('personalInfo.email')} />
                <FormInput label="Phone" {...register('personalInfo.phone')} />
                <FormInput label="Location" {...register('personalInfo.location')} />
                <FormInput label="LinkedIn" {...register('personalInfo.linkedin')} />
                <FormInput label="GitHub" {...register('personalInfo.github')} />
              </div>
            </Section>

            {/* Summary */}
            <Section 
              title="Professional Summary" 
              icon={<FileText className="w-5 h-5" />}
              action={
                <button 
                  onClick={() => handleAIEnhance('summary', watchedValues.summary)}
                  className="flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <Sparkles className="w-3 h-3 mr-1" /> AI Enhance
                </button>
              }
            >
              <textarea 
                {...register('summary')}
                className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-32"
                placeholder="Write about your professional journey..."
              />
              {enhancedText && (
                <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100 dark:border-indigo-800 flex justify-between items-start">
                  <p className="text-sm italic text-indigo-900 dark:text-indigo-200">{enhancedText}</p>
                  <button 
                    onClick={() => { setValue('summary', enhancedText); setEnhancedText(''); }}
                    className="p-1 text-indigo-600 hover:bg-indigo-100 rounded"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              )}
            </Section>

            {/* Experience */}
            <Section 
              title="Work Experience" 
              icon={<Briefcase className="w-5 h-5" />}
              action={
                <button 
                  onClick={() => addItem('experience', { title: '', company: '', startDate: '', endDate: '', current: false, description: '' })}
                  className="p-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full"
                >
                  <Plus className="w-4 h-4" />
                </button>
              }
            >
              <div className="space-y-4">
                {watchedValues.experience?.map((exp, i) => (
                  <div key={i} className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl space-y-3 relative group">
                    <button onClick={() => removeItem('experience', i)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <FormInput label="Job Title" {...register(`experience.${i}.title`)} />
                      <FormInput label="Company" {...register(`experience.${i}.company`)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <FormInput label="Start Date" type="month" {...register(`experience.${i}.startDate`)} />
                      <FormInput label="End Date" type="month" disabled={watchedValues.experience[i]?.current} {...register(`experience.${i}.endDate`)} />
                    </div>
                    <textarea 
                      {...register(`experience.${i}.description`)}
                      className="w-full p-3 text-sm rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none h-24"
                      placeholder="Bullet points of your achievements..."
                    />
                  </div>
                ))}
              </div>
            </Section>

            {/* Certifications */}
            <Section 
              title="Certifications" 
              icon={<Award className="w-5 h-5" />}
              action={
                <button 
                  onClick={() => addItem('certifications', { name: '', issuer: '', date: '' })}
                  className="p-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full"
                >
                  <Plus className="w-4 h-4" />
                </button>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {watchedValues.certifications?.map((cert, i) => (
                  <div key={i} className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl space-y-2 relative group">
                    <button onClick={() => removeItem('certifications', i)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <FormInput label="Certification Name" {...register(`certifications.${i}.name`)} />
                    <FormInput label="Issuer" {...register(`certifications.${i}.issuer`)} />
                    <FormInput label="Date" type="month" {...register(`certifications.${i}.date`)} />
                  </div>
                ))}
              </div>
            </Section>

          </div>
        </div>

        {/* Right: Preview Panel */}
        <div className={`bg-gray-200 dark:bg-gray-800 p-8 flex justify-center overflow-y-auto print:p-0 print:bg-white ${isPreviewOpen ? 'flex-1' : 'hidden lg:flex w-1/3'}`}>
          <div className="w-full max-w-[210mm] min-h-[297mm] bg-white text-black shadow-2xl origin-top transition-transform duration-500 print:shadow-none print:m-0" ref={previewRef}>
            <ResumePreview data={watchedValues} template={activeTemplate} />
          </div>
        </div>
      </main>
      
      {/* Floating Save Action */}
      <div className="fixed bottom-6 right-6 print:hidden">
        <button 
          onClick={handleSave}
          className="p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl transition-all transform hover:scale-110 active:scale-95 flex items-center"
        >
          <Save className="w-6 h-6 mr-2" />
          <span className="font-bold">Save Backup</span>
        </button>
      </div>
    </div>
  );
};

// --- Subcomponents ---

const Section = ({ title, icon, children, action }) => (
  <section className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <span className="text-indigo-500">{icon}</span>
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      {action}
    </div>
    {children}
  </section>
);

const FormInput = React.forwardRef(({ label, ...props }, ref) => (
  <div className="space-y-1">
    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">{label}</label>
    <input 
      ref={ref}
      {...props}
      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
    />
  </div>
));

const ResumePreview = ({ data, template }) => {
  const { personalInfo, summary, skills, experience, education, projects, certifications } = data;
  
  const colors = {
    modern: 'text-indigo-700 border-indigo-700',
    minimal: 'text-slate-900 border-slate-900',
    creative: 'text-emerald-700 border-emerald-700',
  };

  const accentColor = colors[template];

  return (
    <div className={`p-10 font-serif leading-relaxed h-full ${template === 'minimal' ? 'font-sans' : ''}`}>
      {/* Header */}
      <header className={`text-center mb-8 pb-6 border-b-2 ${accentColor}`}>
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">{personalInfo?.name || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-bold text-gray-600">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
        </div>
        <div className="mt-2 flex justify-center gap-4 text-xs font-bold">
          {personalInfo?.linkedin && <span className="underline">{personalInfo.linkedin}</span>}
          {personalInfo?.github && <span className="underline">{personalInfo.github}</span>}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-8">
          {/* Summary */}
          {summary && (
            <section>
              <h2 className={`text-sm font-black uppercase tracking-widest mb-3 ${accentColor}`}>Profile</h2>
              <p className="text-sm text-gray-800">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <section>
              <h2 className={`text-sm font-black uppercase tracking-widest mb-4 ${accentColor}`}>Experience</h2>
              <div className="space-y-6">
                {experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-base">{exp.title}</h3>
                      <span className="text-[10px] font-bold text-gray-500 uppercase">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p className="text-xs font-bold text-gray-600 italic mb-2">{exp.company}</p>
                    <p className="text-xs text-gray-800 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <section>
              <h2 className={`text-sm font-black uppercase tracking-widest mb-4 ${accentColor}`}>Projects</h2>
              <div className="space-y-4">
                {projects.map((proj, i) => (
                  <div key={i}>
                    <h3 className="font-bold text-sm">{proj.name} <span className="text-[10px] font-normal text-gray-500 ml-2">{proj.technologies}</span></h3>
                    <p className="text-xs text-gray-700 mt-1">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-4 space-y-8">
          {/* Skills */}
          {skills && (
            <section>
              <h2 className={`text-sm font-black uppercase tracking-widest mb-3 ${accentColor}`}>Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {skills.split(',').map((s, i) => (
                  <span key={i} className="text-[10px] font-bold px-2 py-1 bg-gray-100 rounded tracking-tight">{s.trim()}</span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <section>
              <h2 className={`text-sm font-black uppercase tracking-widest mb-3 ${accentColor}`}>Education</h2>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i}>
                    <h3 className="text-xs font-bold">{edu.degree}</h3>
                    <p className="text-[11px] text-gray-600 leading-tight">{edu.school}</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-1">{edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <section>
              <h2 className={`text-sm font-black uppercase tracking-widest mb-3 ${accentColor}`}>Awards</h2>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <div key={i}>
                    <h3 className="text-xs font-bold">{cert.name}</h3>
                    <p className="text-[10px] text-gray-600">{cert.issuer}</p>
                    <p className="text-[9px] font-bold text-gray-400">{cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      
      {/* Print Styles */}
      <style>{`
        @media print {
          body { background: white !important; }
          .print-hidden { display: none !important; }
          @page { size: A4; margin: 0; }
          .shadow-2xl { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
};

export default App;