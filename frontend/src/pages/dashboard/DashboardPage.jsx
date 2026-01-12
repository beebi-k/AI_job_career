import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  FileEdit,
  Briefcase,
  TrendingUp,
  Plus,
  ArrowRight,
  Download,
  Eye,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [recentDocuments, setRecentDocuments] = useState([
    { id: 1, type: 'resume', title: 'Software Engineer Resume', date: '2024-01-15', views: 45 },
    { id: 2, type: 'cover-letter', title: 'Google Cover Letter', date: '2024-01-14', views: 23 },
    { id: 3, type: 'portfolio', title: 'John Doe Portfolio', date: '2024-01-13', views: 156 },
  ]);

  const stats = [
    { label: 'Total Resumes', value: '3', icon: FileText, change: '+2 this month', color: 'blue' },
    { label: 'Cover Letters', value: '5', icon: FileEdit, change: '+3 this month', color: 'green' },
    { label: 'Portfolios', value: '1', icon: Briefcase, change: 'Last updated 2d ago', color: 'purple' },
    { label: 'Profile Views', value: '224', icon: TrendingUp, change: '+18% from last week', color: 'orange' },
  ];

  const quickActions = [
    {
      title: 'Create Resume',
      description: 'Build a professional resume with AI',
      icon: FileText,
      color: 'blue',
      onClick: () => navigate('/resume/new'),
    },
    {
      title: 'Cover Letter',
      description: 'Write personalized cover letters',
      icon: FileEdit,
      color: 'green',
      onClick: () => navigate('/cover-letter/new'),
    },
    {
      title: 'Portfolio',
      description: 'Showcase your work online',
      icon: Briefcase,
      color: 'purple',
      onClick: () => navigate('/portfolio/new'),
    },
  ];

  // Enhanced color classes with gradients and ring highlights
  const colorClasses = {
    blue: 'bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-800',
    green: 'bg-green-50/50 dark:bg-green-900/10 text-green-600 dark:text-green-400 ring-1 ring-green-200 dark:ring-green-800',
    purple: 'bg-purple-50/50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 ring-1 ring-purple-200 dark:ring-purple-800',
    orange: 'bg-orange-50/50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 ring-1 ring-orange-200 dark:ring-orange-800',
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-4 md:p-8 space-y-8">
      {/* Background Decorative Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">John!</span> 👋
        </h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
          Your career progress looks great this week.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white/70 dark:bg-gray-900/50 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-4xl font-black text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {stat.change}
                      </p>
                    </div>
                  </div>
                  <div className={`p-4 rounded-2xl ${colorClasses[stat.color]}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10"
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
          Quick Actions <Sparkles className="w-4 h-4 text-orange-400" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card
              key={action.title}
              className="group relative overflow-hidden border-none bg-white dark:bg-gray-900 shadow-md hover:shadow-2xl transition-all cursor-pointer ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-blue-500/50"
              onClick={action.onClick}
            >
              <CardContent className="p-8">
                <div className={`inline-flex p-3 rounded-xl ${colorClasses[action.color]} mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                  <action.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {action.description}
                </p>
                <div className="mt-6 flex items-center font-bold text-blue-600 dark:text-blue-400">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Recent Documents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative z-10"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Recent Documents
          </h2>
          <Button variant="ghost" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 font-semibold">
            View All
          </Button>
        </div>
        <Card className="border-none shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-5 hover:bg-slate-50/80 dark:hover:bg-gray-800/40 transition-all group"
                >
                  <div className="flex items-center space-x-5">
                    <div className={`p-3 rounded-xl ${colorClasses[doc.type === 'resume' ? 'blue' : doc.type === 'cover-letter' ? 'green' : 'purple']}`}>
                      {doc.type === 'resume' && <FileText className="w-5 h-5" />}
                      {doc.type === 'cover-letter' && <FileEdit className="w-5 h-5" />}
                      {doc.type === 'portfolio' && <Briefcase className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-sm font-medium text-gray-400">
                        {doc.type.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} • {doc.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="hidden sm:flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                      <Eye className="w-4 h-4 mr-2" />
                      {doc.views}
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-full hover:bg-white shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="font-bold text-gray-700 dark:text-gray-300">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Pro Tip - Enhanced with Gradient Border look */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="relative group z-10"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <Card className="relative bg-white dark:bg-gray-950 border-none">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white shadow-lg">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    Optimize Your Resume
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-xl text-lg">
                    Our AI scans your documents for <span className="text-blue-600 font-bold">Action Verbs</span> and <span className="text-purple-600 font-bold">Quantifiable Results</span> to increase your hireability.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => navigate('/resume/new')}
                className="w-full md:w-auto px-8 py-6 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:scale-105 transition-transform"
              >
                Try AI Builder
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardPage;