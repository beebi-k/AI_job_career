import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  FileText,
  TrendingUp,
  DollarSign,
  Activity,
  BarChart3,
  Calendar,
  Menu,
  X,
  ChevronRight,
  Download,
  Layout as LayoutIcon,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

const AdminDashboardPage = () => {
  // State for Layout and Navigation
  const [timeRange, setTimeRange] = useState('7d');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('overview'); // 'overview', 'users', 'content', etc.

  // --- Data Objects ---
  const stats = [
    { id: 'users', label: 'Total Users', value: '2,847', change: '+12.5%', icon: Users, color: 'blue' },
    { id: 'active', label: 'Active Users', value: '1,234', change: '+8.2%', icon: Activity, color: 'green' },
    { id: 'content', label: 'Resumes Created', value: '5,678', change: '+23.1%', icon: FileText, color: 'purple' },
    { id: 'revenue', label: 'Revenue', value: '$45,678', change: '+18.7%', icon: DollarSign, color: 'orange' },
  ];

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'Created resume', time: '2 minutes ago' },
    { id: 2, user: 'Jane Smith', action: 'Upgraded to Premium', time: '15 minutes ago' },
    { id: 3, user: 'Bob Johnson', action: 'Generated cover letter', time: '32 minutes ago' },
    { id: 4, user: 'Alice Williams', action: 'Published portfolio', time: '1 hour ago' },
  ];

  const topPerformers = [
    { name: 'Tech Resume', views: 1234, conversions: 89, rate: '7.2%' },
    { name: 'Creative Portfolio', views: 987, conversions: 76, rate: '7.7%' },
    { name: 'Professional Cover Letter', views: 876, conversions: 65, rate: '7.4%' },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
  };

  // --- Sub-Components for Different Views ---

  const DetailView = ({ title, icon: Icon, color }) => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
      <Card className="border-2 border-primary-500/20">
        <CardContent className="p-12 text-center">
          <div className={`mx-auto p-6 rounded-full w-fit mb-4 ${colorClasses[color]}`}>
            <Icon size={48} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title} Management</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Detailed analytics and management tools for {title.toLowerCase()} are loading...</p>
          <button 
            onClick={() => setActiveView('overview')}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 1. Collapsible Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 hidden md:flex flex-col"
      >
        <div className="p-4 flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-700">
          {isSidebarOpen && <span className="font-bold text-xl text-primary-600">AdminPanel</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveView('overview')}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeView === 'overview' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <BarChart3 size={24} />
            {isSidebarOpen && <span className="ml-4 font-medium">Dashboard</span>}
          </button>
          {stats.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeView === item.id ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <item.icon size={24} />
              {isSidebarOpen && <span className="ml-4 font-medium">{item.label.split(' ')[1] || item.label}</span>}
            </button>
          ))}
        </nav>
      </motion.aside>

      {/* 2. Main Content Container */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-[260px]' : 'md:ml-[80px]'}`}>
        <div className="p-6 lg:p-10 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {activeView === 'overview' ? 'Admin Dashboard' : stats.find(s => s.id === activeView)?.label}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {activeView === 'overview' ? 'System-wide performance at a glance' : `Managing ${activeView} data and settings`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all">
                <Download size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeView === 'overview' ? (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Stats Grid - Now Interactive */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveView(stat.id)}
                      className="cursor-pointer"
                    >
                      <Card className="h-full border-none shadow-sm hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                              <div className="flex items-center mt-2 text-green-600 text-sm font-medium">
                                <TrendingUp size={14} className="mr-1" />
                                {stat.change}
                              </div>
                            </div>
                            <div className={`p-4 rounded-2xl ${colorClasses[stat.color]}`}>
                              <stat.icon size={28} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Visual Chart - With Animated Bars */}
                  <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Growth</h2>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary-500" />
                        <span className="text-xs text-gray-500">Active Sessions</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72 flex items-end justify-between gap-2 px-2">
                        {[45, 52, 48, 70, 85, 92, 78, 95, 110, 88, 105, 115].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${(h / 120) * 100}%` }}
                            transition={{ duration: 1, delay: i * 0.05 }}
                            className="flex-1 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-md relative group cursor-pointer"
                          >
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              {h}k
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="mt-6 flex justify-between text-sm font-medium text-gray-400">
                        {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map(m => <span key={m}>{m}</span>)}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Activity Feed - Clickable items */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Real-time Feed</h2>
                      <Activity className="text-primary-500 animate-pulse" size={20} />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {recentActivity.map((act) => (
                          <div key={act.id} className="group flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-xl transition-all">
                            <div className="relative">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                                {act.user[0]}
                              </div>
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{act.user}</p>
                              <p className="text-xs text-gray-500 truncate">{act.action}</p>
                            </div>
                            <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap">{act.time}</span>
                          </div>
                        ))}
                        <button className="w-full py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                          View All Activity
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions - The "I Click it should open" part */}
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">System Actions</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { id: 'users', label: 'User Directory', icon: Users, color: 'blue' },
                        { id: 'content', label: 'Content Audit', icon: FileText, color: 'purple' },
                        { id: 'revenue', label: 'Payouts', icon: DollarSign, color: 'green' },
                        { id: 'analytics', label: 'Full Reports', icon: BarChart3, color: 'orange' },
                      ].map((action) => (
                        <button
                          key={action.id}
                          onClick={() => setActiveView(action.id)}
                          className="flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-primary-500 hover:shadow-lg transition-all group"
                        >
                          <div className={`p-4 rounded-xl mb-3 group-hover:scale-110 transition-transform ${colorClasses[action.color]}`}>
                            <action.icon size={24} />
                          </div>
                          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              /* This triggers when you click any card or sidebar item */
              <DetailView 
                title={stats.find(s => s.id === activeView)?.label || activeView} 
                icon={stats.find(s => s.id === activeView)?.icon || LayoutIcon}
                color={stats.find(s => s.id === activeView)?.color || 'blue'}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;