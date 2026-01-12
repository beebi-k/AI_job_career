import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useThemeStore } from '../../stores/themeStore';
import { useAuthStore } from '../../stores/authStore';
import {
  LayoutDashboard,
  FileText,
  FileEdit,
  Briefcase,
  Settings,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Bell,
  Sparkles,
  Zap
} from 'lucide-react';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Resume Builder', href: '/resume/new', icon: FileText },
    { name: 'Cover Letter', href: '/cover-letter/new', icon: FileEdit },
    { name: 'Portfolio', href: '/portfolio/new', icon: Briefcase },
    { name: 'Job Matcher', href: '/job-matcher', icon: Zap },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex w-full h-full bg-[#f8fafc] dark:bg-[#020617] transition-colors duration-500">
        
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-md lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800/50
          transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}>
          <SidebarContent 
            navigation={navigation} 
            user={user} 
            handleLogout={handleLogout} 
            onClose={() => setSidebarOpen(false)}
            location={location}
            theme={theme}
          />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Header */}
          <header className="h-20 flex items-center justify-between px-6 sm:px-10 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 sticky top-0 z-30">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2.5 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight italic">
                {getPageTitle(location.pathname)}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:ring-2 hover:ring-indigo-500/50 transition-all"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
              </button>

              {/* Notifications */}
              <button className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 relative hover:ring-2 hover:ring-purple-500/50 transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-pink-500 rounded-full border-2 border-white dark:border-slate-950 animate-pulse" />
              </button>

              <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block" />

              {/* Profile Section */}
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[14px] flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-500 to-pink-500">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6 sm:p-10 bg-transparent">
            <div className="max-w-6xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const SidebarContent = ({ navigation, user, handleLogout, onClose, location }) => {
  return (
    <div className="flex flex-col h-full py-6">
      {/* Brand Logo */}
      <div className="px-8 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/40 transform rotate-3">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
            Resume<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">AI</span>
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || 
                          (item.href !== '/dashboard' && location.pathname.startsWith(item.href.replace('/new', '')));
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={`
                group flex items-center px-5 py-3.5 text-sm font-bold rounded-2xl transition-all duration-300
                ${isActive 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 translate-x-1' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400'
                }
              `}
            >
              <item.icon className={`w-5 h-5 mr-4 ${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="px-6 mt-auto">
        <div className="p-5 rounded-3xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
                <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Pro Member</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate w-32">{user?.name || 'Explorer'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-slate-800 text-rose-500 dark:text-rose-400 text-xs font-black rounded-xl border border-rose-100 dark:border-rose-900/30 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

const getPageTitle = (pathname) => {
  const titles = {
    '/dashboard': 'Intelligence Center',
    '/resume': 'Resume Architect',
    '/cover-letter': 'Letter Studio',
    '/portfolio': 'Portfolio Forge',
    '/job-matcher': 'Smart Match',
    '/settings': 'System Settings',
  };
  
  for (const [path, title] of Object.entries(titles)) {
    if (pathname.startsWith(path)) return title;
  }
  return 'ResumeAI';
};

export default MainLayout;