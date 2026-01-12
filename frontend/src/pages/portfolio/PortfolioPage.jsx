import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
  Save,
  Eye,
  Plus,
  Trash2,
  ExternalLink,
  Github,
  Mail,
  Linkedin,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

const PortfolioPage = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: 'Anu', 
      slug: 'anu-portfolio',
      about: 'A highly motivated and detail-oriented Computer Science graduate with strong analytical skills and a passion for software development. Proficient in building scalable web applications and AI-driven solutions.',
      skills: 'React JS, Next JS, Tailwind CSS, Node JS, Springboot, MongoDB, Python, TensorFlow, AWS',
      projects: [
        {
          name: 'E-commerce Website',
          description: 'A modern and responsive e-commerce built using React and Tailwind.',
          technologies: 'React JS, Tailwind CSS, Stripe API',
          githubUrl: 'https://github.com',
          liveUrl: 'https://demo.com',
          imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000',
        },
        {
          name: 'AI Image Generator',
          description: 'A platform that uses DALL-E API to generate unique artistic images from text prompts.',
          technologies: 'Node.js, OpenAI, React',
          githubUrl: 'https://github.com',
          liveUrl: 'https://demo.com',
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
        },
        {
          name: 'Crypto Dashboard',
          description: 'Real-time cryptocurrency tracking dashboard with live price charts and news feed.',
          technologies: 'Next.js, Chart.js, CoinGecko API',
          githubUrl: 'https://github.com',
          liveUrl: 'https://demo.com',
          imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=1000',
        },
      ],
      experience: [
        {
          title: 'Senior Developer',
          company: 'TECHFLOW SYSTEMS',
          startDate: '2022',
          endDate: 'Present',
          description: 'Leading the frontend architecture for the core SaaS product.',
        },
        {
          title: 'Software Engineer Intern',
          company: 'STARTUP HUB',
          startDate: '2020',
          endDate: '2022',
          description: 'Assisted in building scalable API endpoints and UI components.',
        }
      ],
      contact: {
        email: 'anu@example.com',
        linkedin: 'https://linkedin.com/in/anu',
        github: 'https://github.com/anu',
        twitter: '',
      },
    },
  });

  const watchedValues = watch();

  const handleSave = () => {
    try {
      const dataStr = JSON.stringify(watchedValues, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${watchedValues.slug || 'portfolio'}-data.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Portfolio data downloaded to your drive! 💾');
    } catch (error) {
      toast.error('Failed to save file.');
    }
  };

  const addProject = () => {
    const newProject = { name: '', description: '', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '' };
    setValue('projects', [...(watchedValues.projects || []), newProject]);
  };

  const removeProject = (index) => {
    const updatedProjects = watchedValues.projects.filter((_, i) => i !== index);
    setValue('projects', updatedProjects);
  };

  const addExperience = () => {
    const newExperience = { title: '', company: '', startDate: '', endDate: '', description: '' };
    setValue('experience', [...(watchedValues.experience || []), newExperience]);
  };

  const removeExperience = (index) => {
    const updatedExperience = watchedValues.experience.filter((_, i) => i !== index);
    setValue('experience', updatedExperience);
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setValue('title', title);
    setValue('slug', generateSlug(title));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 dark:bg-gray-900/50 min-h-screen transition-colors duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio Forge</h1>
        <p className="text-gray-500 dark:text-gray-400">Create, preview, and download your developer portfolio.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Panel */}
        <div className="space-y-6 h-[calc(100vh-180px)] overflow-y-auto pr-2 custom-scrollbar">
          <Card className="bg-white dark:bg-gray-800 border-none shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
            <CardHeader><h2 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Identity</h2></CardHeader>
            <CardContent className="space-y-4">
              <Input label="Full Name" className="dark:text-white" {...register('title', { required: true })} onChange={handleTitleChange} />
              <Input label="Portfolio URL Slug" className="dark:text-white" {...register('slug')} />
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Professional Bio</label>
                <textarea {...register('about')} className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 min-h-[100px] focus:ring-2 focus:ring-purple-500 outline-none" />
              </div>
              <Input label="Skills (Tags)" placeholder="React, Python, Node..." className="dark:text-white" {...register('skills')} />
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-none shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Projects ({watchedValues.projects?.length})</h2>
              <Button size="sm" variant="outline" className="dark:border-gray-600 dark:text-gray-300" onClick={addProject}><Plus className="w-4 h-4 mr-1"/> Add</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {watchedValues.projects?.map((_, index) => (
                <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl relative bg-gray-50/50 dark:bg-gray-900/50">
                  <button onClick={() => removeProject(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  <div className="grid gap-3">
                    <Input label="Project Name" className="dark:text-white" {...register(`projects.${index}.name`)} />
                    <Input label="Technologies" className="dark:text-white" {...register(`projects.${index}.technologies`)} />
                    <Input label="Image URL" className="dark:text-white" {...register(`projects.${index}.imageUrl`)} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-none shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Experience</h2>
              <Button size="sm" variant="outline" className="dark:border-gray-600 dark:text-gray-300" onClick={addExperience}><Plus className="w-4 h-4 mr-1"/> Add</Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {watchedValues.experience?.map((_, index) => (
                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-900/50">
                        <Input label="Title" className="dark:text-white" {...register(`experience.${index}.title`)} />
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <Input label="Company" className="dark:text-white" {...register(`experience.${index}.company`)} />
                            <Input label="Year/Date" className="dark:text-white" {...register(`experience.${index}.startDate`)} />
                        </div>
                    </div>
                ))}
            </CardContent>
          </Card>

          <div className="flex gap-4 sticky bottom-0 bg-gray-50 dark:bg-gray-900 py-4 border-t border-gray-200 dark:border-gray-800">
            <Button className="flex-1 dark:text-white dark:border-gray-700" variant="outline" onClick={() => setIsPreviewOpen(!isPreviewOpen)}>
              <Eye className="w-4 h-4 mr-2" /> {isPreviewOpen ? 'Hide' : 'Show'} Preview
            </Button>
            <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white border-none" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" /> Save to Drive
            </Button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="h-[calc(100vh-180px)]">
           {isPreviewOpen ? (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full overflow-y-auto rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] shadow-2xl custom-scrollbar">
                <PortfolioPreview data={watchedValues} />
             </motion.div>
           ) : (
             <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl text-gray-400 italic text-center p-8 bg-white/50 dark:bg-gray-800/20">
                <div>
                  <Eye className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Click "Show Preview" to visualize your portfolio layout.</p>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const PortfolioPreview = ({ data }) => {
  if (!data) return null;

  return (
    <div className="text-gray-900 dark:text-white selection:bg-purple-500/30 font-sans transition-colors duration-300">
      {/* HERO SECTION */}
      <section className="relative p-8 md:p-12 min-h-[450px] flex flex-col justify-center overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-[120px]" />
        
        <div className="relative z-10 space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-widest uppercase">
            Portfolio Preview
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white">
            Hi, I am <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 dark:from-blue-400 dark:via-purple-500 dark:to-pink-500">
              {data.title || 'Your Name'}
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl leading-relaxed">
            {data.about}
          </p>
          <div className="flex gap-4 pt-4">
             <button className="px-8 py-3 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-600/20">
               VIEW RESUME
             </button>
             <div className="flex items-center gap-3 ml-4 text-gray-400 dark:text-gray-500">
                <Github className="w-5 h-5 hover:text-gray-900 dark:hover:text-white cursor-pointer transition" />
                <Linkedin className="w-5 h-5 hover:text-gray-900 dark:hover:text-white cursor-pointer transition" />
             </div>
          </div>
        </div>
      </section>

      <div className="p-8 md:p-12 space-y-20">
        {/* SKILLS SECTION */}
        <section>
          <div className="flex items-center gap-4 mb-8">
             <h2 className="text-2xl font-bold tracking-tighter uppercase italic text-gray-900 dark:text-white">Skills</h2>
             <div className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-800"></div>
          </div>
          <div className="flex flex-wrap gap-2">
              {data.skills?.split(',').map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:border-purple-500/50 transition">
                      {skill.trim()}
                  </span>
              ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section>
          <div className="flex items-center gap-4 mb-8">
             <h2 className="text-2xl font-bold tracking-tighter uppercase italic text-gray-900 dark:text-white">Featured Projects</h2>
             <div className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-800"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects?.map((project, i) => project.name && (
              <div key={i} className="group bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all flex flex-col shadow-sm">
                 <div className="h-40 overflow-hidden bg-gray-100 dark:bg-gray-900 relative">
                    {project.imageUrl ? (
                        <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 dark:opacity-80" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 italic text-xs">No Preview Image</div>
                    )}
                 </div>
                 <div className="p-6 space-y-3 flex-1">
                    <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">{project.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-3 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {project.technologies?.split(',').map((t, idx) => (
                            <span key={idx} className="text-[9px] uppercase font-bold px-2 py-1 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded">
                                {t.trim()}
                            </span>
                        ))}
                    </div>
                 </div>
                 <div className="px-6 pb-6 flex gap-4">
                    <a href={project.githubUrl} className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center gap-1 transition">
                        <Github className="w-3 h-3" /> Code
                    </a>
                    <a href={project.liveUrl} className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 flex items-center gap-1 transition">
                        <ExternalLink className="w-3 h-3" /> Demo
                    </a>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* CAREER PATH */}
        <section>
          <div className="flex items-center gap-4 mb-8">
             <h2 className="text-2xl font-bold tracking-tighter uppercase italic text-gray-900 dark:text-white">Career</h2>
             <div className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-800"></div>
          </div>
          <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-2 space-y-10">
            {data.experience?.map((exp, i) => exp.title && (
                <div key={i} className="relative pl-8">
                    <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-purple-600 border-4 border-white dark:border-[#0a0a0a]" />
                    <span className="text-blue-600 dark:text-blue-400 font-mono text-xs">{exp.startDate} - {exp.endDate}</span>
                    <h3 className="text-lg font-bold mt-1 text-gray-900 dark:text-white">{exp.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{exp.company}</p>
                    <p className="text-gray-500 dark:text-gray-500 mt-2 text-xs leading-relaxed italic">"{exp.description}"</p>
                </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="text-center pb-12">
           <div className="inline-block p-1 px-4 mb-4 rounded-full border border-gray-200 dark:border-gray-800 text-[10px] text-gray-500 dark:text-gray-500 uppercase tracking-widest">Available for projects</div>
           <h2 className="text-3xl font-black mb-8 uppercase text-gray-900 dark:text-white">Get In Touch</h2>
           <div className="flex justify-center gap-6">
             {data.contact?.email && (
               <a href={`mailto:${data.contact.email}`} className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition">
                 <Mail className="w-6 h-6" />
               </a>
             )}
             <a href={data.contact?.linkedin} className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition">
               <Linkedin className="w-6 h-6" />
             </a>
           </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioPage;