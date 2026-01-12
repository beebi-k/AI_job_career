import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Save, Download, Sparkles, Eye, FileText, Wand2, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';
import { Card, CardHeader, CardContent } from '../../components/common/Card';
import { useNavigate } from 'react-router-dom';

const CoverLetterPage = () => {
  const navigate = useNavigate();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { register, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      recipientName: '',
      companyName: '',
      jobTitle: '',
      jobDescription: '',
      userSkills: '',
      tone: 'formal',
      content: '',
    },
  });

  const watchedValues = watch();

  // Color mappings consistent with Dashboard
  const colorClasses = {
    blue: 'bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-800',
    green: 'bg-green-50/50 dark:bg-green-900/10 text-green-600 dark:text-green-400 ring-1 ring-green-200 dark:ring-green-800',
    purple: 'bg-purple-50/50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 ring-1 ring-purple-200 dark:ring-purple-800',
  };

  const generateAILetter = (data) => {
    const { recipientName, companyName, jobTitle, jobDescription, tone, userSkills } = data;
    const recipient = recipientName || 'Hiring Manager';
    const skillsList = userSkills ? userSkills.split(',').map(s => s.trim()) : ['relevant industry skills'];

    const openers = {
      formal: `I am writing to formally express my enthusiastic interest in the ${jobTitle} position at ${companyName}.`,
      confident: `With a proven track record of delivering high-impact results, I am excited to show how I can drive success as your next ${jobTitle} at ${companyName}.`,
      creative: `I’ve always admired ${companyName}’s approach to innovation, and I couldn't resist the opportunity to apply for the ${jobTitle} role.`,
    };

    const bodies = {
      formal: `My background in the industry has equipped me with a deep understanding of the requirements mentioned in your job description, specifically regarding ${jobDescription.substring(0, 50)}...`,
      confident: `I don't just meet the requirements for this role—I exceed them. My expertise in ${skillsList.join(', ')} makes me a plug-and-play asset for your current team.`,
      creative: `I thrive at the intersection of logic and imagination. My experience with ${skillsList[0]} allows me to solve problems in ways others might overlook.`,
    };

    return `Dear ${recipient},\n\n${openers[tone] || openers.formal}\n\n${bodies[tone] || bodies.formal}\n\nThroughout my career, I have focused on sharpening my skills in ${skillsList.join(' and ')}. Your job description emphasizes a need for excellence, and my professional history demonstrates a consistent ability to meet that standard. I am particularly drawn to ${companyName} because of your reputation for excellence and growth.\n\nI would welcome the chance to discuss how my unique blend of experience and passion can contribute to the continued success of your team. Thank you for your time and consideration.\n\nBest regards,\n\n[Your Name]`;
  };

  const handleGenerate = () => {
    const { companyName, jobTitle, jobDescription } = watchedValues;
    if (!companyName || !jobTitle || !jobDescription) {
      toast.error('Please fill in the Job Title, Company, and Description first.');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const refinedLetter = generateAILetter(watchedValues);
      setValue('content', refinedLetter);
      setIsGenerating(false);
      toast.success('High-quality letter generated! ✨');
    }, 2000);
  };

  const inputClass = "w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all backdrop-blur-sm";

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-4 md:p-8 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              AI Cover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Letter Pro</span>
            </h1>
            <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
              Smart, tone-aware generation for your next career move.
            </p>
          </motion.div>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="w-fit text-gray-500 hover:text-blue-600 font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-6"
          >
            <Card className="border-none shadow-sm bg-white/70 dark:bg-gray-900/50 backdrop-blur-md">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800 flex flex-row items-center gap-2">
                <div className={`p-2 rounded-lg ${colorClasses.blue}`}>
                  <Wand2 className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Smart Context</h2>
              </CardHeader>
              <CardContent className="space-y-5 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Company Name*</label>
                    <input {...register('companyName')} className={inputClass} placeholder="e.g. Google" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Target Job Title*</label>
                    <input {...register('jobTitle')} className={inputClass} placeholder="e.g. Senior Developer" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Your Key Skills</label>
                  <input {...register('userSkills')} className={inputClass} placeholder="React, Python, Project Management" />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Job Description*</label>
                  <textarea {...register('jobDescription')} className={`${inputClass} min-h-[120px] resize-none`} placeholder="Paste requirements here..." />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Desired Tone</label>
                  <select {...register('tone')} className={inputClass}>
                    <option value="formal">👔 Professional & Formal</option>
                    <option value="confident">💪 Bold & Confident</option>
                    <option value="creative">🎨 Modern & Creative</option>
                  </select>
                </div>

                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating} 
                  className="w-full py-6 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:scale-[1.02] transition-transform shadow-lg disabled:opacity-70"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2"><Sparkles className="animate-spin" /> Analyzing Requirements...</span>
                  ) : (
                    <span className="flex items-center gap-2">Generate Personalized Letter <Sparkles className="w-4 h-4 text-orange-400" /></span>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white/70 dark:bg-gray-900/50 backdrop-blur-md overflow-hidden">
               <CardHeader className="flex flex-row justify-between items-center py-4 px-6 bg-slate-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Editor</span>
                <Sparkles className="w-4 h-4 text-orange-400" />
               </CardHeader>
               <textarea 
                 {...register('content')} 
                 className="w-full p-8 bg-transparent text-gray-900 dark:text-white font-serif min-h-[450px] outline-none leading-relaxed text-lg" 
                 placeholder="AI generated content will appear here..."
               />
            </Card>

            <div className="flex flex-col sm:flex-row justify-end gap-4 pb-12">
              <Button 
                variant="ghost" 
                onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                className="font-bold text-gray-600 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-800"
              >
                <Eye className="w-4 h-4 mr-2" /> Live Preview
              </Button>
              <Button 
                className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all"
              >
                <Download className="w-4 h-4 mr-2" /> Download PDF
              </Button>
            </div>
          </motion.div>

          {/* Document Preview Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="sticky top-8">
              <div className="text-xs font-black text-gray-400 uppercase mb-4 tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Document Preview
              </div>
              <div className="bg-white dark:bg-gray-900 p-12 shadow-2xl border-none ring-1 ring-gray-200 dark:ring-gray-800 min-h-[800px] rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                {!watchedValues.content ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-300 dark:text-gray-700 space-y-4">
                    <FileText size={100} strokeWidth={1} className="opacity-20" />
                    <p className="font-bold text-xl opacity-40">Waiting for details...</p>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap text-gray-800 dark:text-slate-200 font-serif leading-loose text-base">
                    {watchedValues.content}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPage;