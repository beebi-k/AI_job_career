import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Upload,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  BookOpen,
  Target,
  FileText,
  MapPin,
  IndianRupee,
  Building2,
  Briefcase,
  Sparkles
} from 'lucide-react';
import Button from '../../components/common/Button';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

const JobMatcherPage = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Preferences (Indian Context)
  const [myNeeds] = useState({
    preferredLocation: 'Bengaluru / Remote',
    expectedPackage: '25 - 35 LPA',
    roleLevel: 'Senior Engineer',
    preferredTech: 'React, Node.js, AWS'
  });

  // Color mappings consistent with Dashboard
  const colorClasses = {
    blue: 'bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-800',
    green: 'bg-green-50/50 dark:bg-green-900/10 text-green-600 dark:text-green-400 ring-1 ring-green-200 dark:ring-green-800',
    purple: 'bg-purple-50/50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 ring-1 ring-purple-200 dark:ring-purple-800',
    orange: 'bg-orange-50/50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 ring-1 ring-orange-200 dark:ring-orange-800',
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.docx')) {
        toast.error('Please upload a PDF or DOCX file');
        return;
      }
      setSelectedFile(file);
      toast.success(`Resume "${file.name}" uploaded successfully!`);
    }
  };

  const handleAnalyze = async () => {
    if (!jobDescription) {
      toast.error('Please enter a job description');
      return;
    }

    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = {
        matchScore: 88,
        recommendation: {
          company: 'Zomato / Swiggy (Product Engineering)',
          location: 'Gurugram / Bengaluru (Hybrid)',
          package: '₹28 - 32 LPA',
          role: 'Senior Frontend Engineer',
          reason: 'Matches your expertise in high-scale React apps and salary expectations.'
        },
        skillsMatched: [
          { skill: 'React / Next.js', status: 'matched' },
          { skill: 'Tailwind CSS', status: 'matched' },
          { skill: 'TypeScript', status: 'matched' },
          { skill: 'Node.js', status: 'matched' },
          { skill: 'System Design', status: 'improve' },
          { skill: 'GraphQL', status: 'missing' },
        ],
        suggestions: [
          'Highlight experience with Indian payment gateways (Razorpay/PayU) if applicable.',
          'Add your contributions to open-source or high-traffic Indian consumer apps.',
          'Quantify achievements: "Reduced latency for 1M+ monthly active users in India market."'
        ],
      };
      
      setAnalysisResult(result);
      toast.success('Analysis complete! 📊');
    } catch (error) {
      toast.error('Failed to analyze');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score) => score >= 80 ? 'text-green-600' : score >= 60 ? 'text-orange-600' : 'text-red-600';

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-4 md:p-8 space-y-8 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        className="relative z-10"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Job Matcher</span> 🇮🇳
        </h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
          Match your profile with top Indian product companies.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-white/70 dark:bg-gray-900/50 backdrop-blur-md">
            <CardHeader className="border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                Requirements <Sparkles className="w-4 h-4 text-orange-400" />
              </h2>
            </CardHeader>
            <CardContent className="p-6">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.docx" className="hidden" />
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste JD here (e.g. We are looking for a Senior React Dev in Bengaluru...)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/50 text-gray-900 dark:text-white min-h-[300px] outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />

              {selectedFile && (
                <div className={`mt-4 flex items-center p-3 rounded-xl ${colorClasses.green}`}>
                  <FileText className="w-4 h-4 mr-2" />
                  <span className="text-sm font-bold truncate">{selectedFile.name}</span>
                </div>
              )}

              <div className="mt-6 flex gap-4">
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing || !jobDescription} 
                  className="flex-1 py-6 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:scale-105 transition-transform"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Match'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleUploadClick}
                  className="px-6 border-none ring-1 ring-gray-200 dark:ring-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {selectedFile ? 'Change' : 'Resume'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {analysisResult && (
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25"></div>
                <Card className="relative border-none bg-white dark:bg-gray-950 overflow-hidden">
                  <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-500" /> Best Fit
                      </h2>
                      <span className={`text-3xl font-black ${getScoreColor(analysisResult.matchScore)}`}>
                        {analysisResult.matchScore}%
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${colorClasses.blue}`}><Building2 className="w-4 h-4" /></div>
                        <div>
                          <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">Company</p>
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{analysisResult.recommendation.company}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${colorClasses.purple}`}><MapPin className="w-4 h-4" /></div>
                        <div>
                          <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">Location</p>
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{analysisResult.recommendation.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${colorClasses.green}`}><IndianRupee className="w-4 h-4" /></div>
                        <div>
                          <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">Package</p>
                          <p className="text-sm font-bold text-green-600">{analysisResult.recommendation.package}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${colorClasses.orange}`}><Briefcase className="w-4 h-4" /></div>
                        <div>
                          <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">Role</p>
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{analysisResult.recommendation.role}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm italic text-gray-500 dark:text-gray-400 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                      "{analysisResult.recommendation.reason}"
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          {analysisResult && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <Card className="border-none shadow-sm bg-white/70 dark:bg-gray-900/50 backdrop-blur-md">
                <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Skills Analysis</h2>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  {analysisResult.skillsMatched.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-950/50 rounded-xl ring-1 ring-gray-100 dark:ring-gray-800">
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{item.skill}</span>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-tighter ${
                        item.status === 'matched' ? colorClasses.green : 
                        item.status === 'missing' ? 'bg-red-50 text-red-600 ring-1 ring-red-200' : colorClasses.orange
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-white/70 dark:bg-gray-900/50 backdrop-blur-md">
                <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Optimization Tips</h2>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {analysisResult.suggestions.map((s, i) => (
                    <div key={i} className={`flex gap-4 p-4 rounded-xl ${colorClasses.blue}`}>
                      <BookOpen className="w-5 h-5 shrink-0" />
                      <p className="text-sm font-medium leading-relaxed">{s}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobMatcherPage;