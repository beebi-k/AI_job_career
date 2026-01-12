import React, { useState, useEffect, createContext, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import {
  User,
  Mail,
  Lock,
  Bell,
  Globe,
  Shield,
  CreditCard,
  Save,
  Trash2,
  Download,
  Moon,
  Sun,
  Check,
  AlertCircle,
  Loader2
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* MOCK STORES                                */
/* -------------------------------------------------------------------------- */

// Simulating Auth Store
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: null,
    tier: 'free',
  });

  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthStore = () => useContext(AuthContext);

// Simulating Theme Store
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeStore = () => useContext(ThemeContext);

/* -------------------------------------------------------------------------- */
/* COMMON COMPONENTS                             */
/* -------------------------------------------------------------------------- */

const Button = ({ children, variant = 'primary', isLoading, className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    outline: "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    ghost: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};

const Input = React.forwardRef(({ label, error, className = '', ...props }, ref) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
    )}
    <input
      ref={ref}
      className={`w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
        ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'}
        ${className}`}
      {...props}
    />
    {error && (
      <p className="text-sm text-red-600 flex items-center mt-1">
        <AlertCircle className="w-3 h-3 mr-1" />
        {error.message}
      </p>
    )}
  </div>
));

const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

/* -------------------------------------------------------------------------- */
/* SETTINGS PAGE                               */
/* -------------------------------------------------------------------------- */

const SettingsContent = () => {
  const { user, updateUser } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Update form values when user context changes
  useEffect(() => {
    setValue('name', user.name);
    setValue('email', user.email);
  }, [user, setValue]);

  const handleProfileUpdate = async (data) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      updateUser({ name: data.name, email: data.email });
      toast.success('Profile updated successfully! 💾');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Password updated successfully! 🔒');
      // Reset password fields via setValue or form reset (simplified here)
      setValue('currentPassword', '');
      setValue('newPassword', '');
      setValue('confirmPassword', '');
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportData = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: 'Preparing download...',
        success: 'Data exported successfully! 📥',
        error: 'Export failed',
      }
    );
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.loading('Deleting account...');
      setTimeout(() => {
        toast.dismiss();
        toast.success('Account deletion initiated. Check your email.');
      }, 1500);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Settings
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <nav className="space-y-1 lg:sticky lg:top-6">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <tab.icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span>{tab.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Profile Information
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Update your photo and personal details here.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(handleProfileUpdate)} className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-white dark:ring-gray-800">
                          {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </div>
                        <button type="button" className="absolute bottom-0 right-0 p-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                          <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </button>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)} Plan Member
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        placeholder="John Doe"
                        error={errors.name}
                        {...register('name', { required: 'Name is required' })}
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        error={errors.email}
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-end pt-4 border-t border-gray-100 dark:border-gray-700">
                      <Button type="submit" isLoading={isSaving}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Password & Security
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Manage your password and security preferences.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(handlePasswordChange)} className="space-y-4">
                      <Input
                        label="Current Password"
                        type="password"
                        placeholder="••••••••"
                        error={errors.currentPassword}
                        {...register('currentPassword', { required: 'Current password is required' })}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="New Password"
                          type="password"
                          placeholder="••••••••"
                          error={errors.newPassword}
                          {...register('newPassword', {
                            required: 'New password is required',
                            minLength: { value: 6, message: 'Must be at least 6 characters' },
                          })}
                        />
                        <Input
                          label="Confirm Password"
                          type="password"
                          placeholder="••••••••"
                          error={errors.confirmPassword}
                          {...register('confirmPassword', {
                            required: 'Please confirm password',
                          })}
                        />
                      </div>
                      <div className="flex justify-end pt-2">
                        <Button type="submit" isLoading={isSaving}>
                          <Shield className="w-4 h-4 mr-2" />
                          Update Password
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Data Export & Deletion
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Export Data</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Download a copy of your personal data.</p>
                        </div>
                        <Button variant="outline" onClick={handleExportData}>
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
                        <div>
                          <h3 className="font-medium text-red-900 dark:text-red-200">Delete Account</h3>
                          <p className="text-sm text-red-700 dark:text-red-300">Permanently delete your account and all data.</p>
                        </div>
                        <Button variant="danger" onClick={handleDeleteAccount}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Choose what we get in touch about.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { id: 'email', label: 'Email Notifications', description: 'Receive daily digests and updates.' },
                      { id: 'marketing', label: 'Marketing Emails', description: 'Receive emails about new products and features.' },
                      { id: 'security', label: 'Security Alerts', description: 'Get notified about suspicious activity.' },
                    ].map((item, idx) => (
                      <div key={item.id} className="flex items-start justify-between pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                        <div className="flex-1 pr-4">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">{item.label}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={idx !== 1} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                    <div className="pt-4 flex justify-end">
                      <Button onClick={() => toast.success('Notification preferences saved!')}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* PREFERENCES TAB (Theme) */}
            {activeTab === 'preferences' && (
              <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Appearance & Language
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Customize your interface experience.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <label className="text-sm font-medium text-gray-900 dark:text-white mb-4 block">
                        Interface Theme
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button
                          onClick={() => theme !== 'light' && toggleTheme()}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left hover:border-blue-400/50 ${
                            theme === 'light'
                              ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 ring-1 ring-blue-500'
                              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Sun className={`w-6 h-6 ${theme === 'light' ? 'text-blue-600' : 'text-gray-500'}`} />
                            {theme === 'light' && <Check className="w-4 h-4 text-blue-600" />}
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white">Light Mode</div>
                          <div className="text-xs text-gray-500 mt-1">Clean and crisp interface</div>
                        </button>

                        <button
                          onClick={() => theme !== 'dark' && toggleTheme()}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left hover:border-blue-400/50 ${
                            theme === 'dark'
                              ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 ring-1 ring-blue-500'
                              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Moon className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-gray-500'}`} />
                            {theme === 'dark' && <Check className="w-4 h-4 text-blue-400" />}
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white">Dark Mode</div>
                          <div className="text-xs text-gray-500 mt-1">Easy on the eyes</div>
                        </button>

                        <button disabled className="opacity-50 cursor-not-allowed relative p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-left bg-gray-50 dark:bg-gray-800/50">
                          <div className="flex items-center justify-between mb-2">
                            <Globe className="w-6 h-6 text-gray-400" />
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white">System</div>
                          <div className="text-xs text-gray-500 mt-1">Sync with OS settings</div>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900 dark:text-white">Language</label>
                        <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>English (US)</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900 dark:text-white">Timezone</label>
                        <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>(GMT-08:00) Pacific Time</option>
                          <option>(GMT-05:00) Eastern Time</option>
                          <option>(GMT+00:00) UTC</option>
                          <option>(GMT+01:00) Central European Time</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* BILLING TAB */}
            {activeTab === 'billing' && (
              <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Subscription Plan
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Manage your billing information and invoices.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
                      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-xs font-medium backdrop-blur-sm border border-white/20 mb-4">
                            Current Plan
                          </div>
                          <h3 className="text-3xl font-bold tracking-tight">Free Tier</h3>
                          <p className="mt-2 text-blue-100 max-w-md">
                            You're currently on the free plan. Upgrade to unlock premium features and unlimited access.
                          </p>
                        </div>
                        <div className="text-left md:text-right">
                          <div className="flex items-baseline md:justify-end gap-1">
                            <span className="text-4xl font-bold">$0</span>
                            <span className="text-blue-200">/mo</span>
                          </div>
                          <Button className="mt-4 bg-white text-blue-600 hover:bg-blue-50 border-0 shadow-lg">
                            Upgrade Now
                          </Button>
                        </div>
                      </div>
                      {/* Decorative circles */}
                      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                       <div>
                         <h4 className="font-medium text-gray-900 dark:text-white mb-4">Included in Free</h4>
                         <ul className="space-y-3">
                           {['3 Resumes per month', 'Basic Templates', 'Standard Support'].map((item) => (
                             <li key={item} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                               <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                               {item}
                             </li>
                           ))}
                         </ul>
                       </div>
                       <div>
                         <h4 className="font-medium text-gray-900 dark:text-white mb-4">Premium Features</h4>
                         <ul className="space-y-3">
                           {['Unlimited Resumes', 'AI-Powered writing assistant', 'Premium Templates', 'Priority Support'].map((item) => (
                             <li key={item} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                               <div className="w-4 h-4 mr-2 rounded-full border border-gray-300 dark:border-gray-600 flex-shrink-0" />
                               {item}
                             </li>
                           ))}
                         </ul>
                       </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN WRAPPER                                */
/* -------------------------------------------------------------------------- */

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SettingsContent />
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: '#059669',
            },
          },
          error: {
            style: {
              background: '#DC2626',
            },
          },
        }} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;