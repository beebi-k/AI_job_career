import React from 'react';
import { Outlet } from 'react-router-dom';
import { FileText, Sparkles, Target, BarChart3, Layout, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AuthLayout = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Side - Branding */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex flex-col space-y-10"
        >
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 rotate-3 group hover:rotate-0 transition-transform duration-300">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                Resume<span className="text-blue-600">AI</span>
              </h1>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                The Future of Careers
              </p>
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-6">
            <h2 className="text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Build a resume that <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400">
                commands attention.
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
              Leverage industry-leading AI to transform your career history into a high-performance narrative that beats the ATS.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-6">
            <FeatureItem
              icon={<Sparkles className="w-5 h-5" />}
              title="AI-Powered Enhancement"
              description="Transform basic bullet points into quantified achievements."
              color="blue"
              delay={0.1}
            />
            <FeatureItem
              icon={<Target className="w-5 h-5" />}
              title="ATS Optimization"
              description="Engineered to pass through the toughest screening filters."
              color="indigo"
              delay={0.2}
            />
            <FeatureItem
              icon={<Layout className="w-5 h-5" />}
              title="Premium Templates"
              description="Hand-crafted designs tailored for modern recruiters."
              color="purple"
              delay={0.3}
            />
          </div>
        </motion.div>

        {/* Right Side - Auth Forms */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md mx-auto relative"
        >
          {/* Decorative Glow behind the card */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white dark:border-slate-800 p-10 overflow-hidden">
            <Outlet />
          </div>
          
          {/* Trust Badge */}
          <div className="mt-8 flex items-center justify-center space-x-6 text-slate-400 dark:text-slate-500">
             <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-xs font-bold uppercase tracking-tighter">Secure Auth</span>
             </div>
             <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-xs font-bold uppercase tracking-tighter">AI Ready</span>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title, description, color, delay }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex items-start space-x-4 group"
    >
      <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 duration-300 ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 leading-snug">{description}</p>
      </div>
    </motion.div>
  );
};

export default AuthLayout;