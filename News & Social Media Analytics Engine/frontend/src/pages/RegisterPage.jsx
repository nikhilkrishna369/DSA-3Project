import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, User, AtSign, Lock, Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-4

  // Check password strength dynamically
  useEffect(() => {
    const pwd = formData.password;
    let strength = 0;
    if (pwd.length > 0) strength = 1;
    if (pwd.length >= 6 && /[a-zA-Z]/.test(pwd) && /\d/.test(pwd)) strength = 2;
    if (pwd.length >= 8 && /[a-zA-Z]/.test(pwd) && /\d/.test(pwd)) strength = 3;
    if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /\d/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) strength = 4;
    
    setPasswordStrength(strength);
  }, [formData.password]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!formData.username || !usernameRegex.test(formData.username)) {
      newErrors.username = 'Username must be 3-20 characters (letters, numbers, underscores)';
    }
    
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms of Service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (register) {
        await register(formData);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      navigate('/dashboard');
    } catch (err) {
      setErrors({ form: 'Registration failed. Please try again or use different credentials.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const renderStrengthBar = () => {
    const bars = [1, 2, 3, 4];
    let color = 'bg-slate-700';
    let label = '';
    
    if (passwordStrength === 1) { color = 'bg-red-500'; label = 'Weak'; }
    if (passwordStrength === 2) { color = 'bg-amber-500'; label = 'Fair'; }
    if (passwordStrength === 3) { color = 'bg-blue-500'; label = 'Good'; }
    if (passwordStrength === 4) { color = 'bg-emerald-500'; label = 'Strong'; }
    
    if (passwordStrength === 0) return null;

    return (
      <div className="mt-2">
        <div className="flex gap-1 mb-1">
          {bars.map((bar) => (
            <div 
              key={bar} 
              className={`h-1.5 flex-1 rounded-full ${bar <= passwordStrength ? color : 'bg-slate-700'} transition-colors duration-300`}
            ></div>
          ))}
        </div>
        <p className={`text-xs font-medium ${color.replace('bg-', 'text-')}`}>{label}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans flex flex-row-reverse">
      {/* Right Panel - Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-slate-950 border-l border-slate-800 p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] right-[10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[80px] animate-pulse"></div>
          <div className="absolute bottom-[20%] left-[10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full mix-blend-screen filter blur-[80px] animate-[pulse_7s_ease-in-out_infinite_reverse]"></div>
        </div>

        <div className="relative z-10 text-right">
          <NavLink to="/" className="flex items-center justify-end gap-2 mb-16 inline-flex ml-auto">
            <span className="text-3xl font-bold bg-gradient-to-l from-blue-400 to-violet-500 bg-clip-text text-transparent">
              NewsIQ
            </span>
            <Zap className="w-8 h-8 text-blue-500" />
          </NavLink>

          <h1 className="text-4xl font-bold leading-tight mb-6 text-white text-right">
            Join the future of <br /> media analytics
          </h1>
          <p className="text-slate-400 text-lg max-w-md ml-auto mb-12 text-right">
            Create an account to monitor trends, map story relationships, and filter duplicate content instantly.
          </p>

          <div className="space-y-6 flex flex-col items-end">
            {[
              'Advanced sentiment & trend analysis',
              'Custom priority thresholds',
              'API access for developers'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-slate-300">{feature}</span>
                <CheckCircle2 className="w-5 h-5 text-violet-500 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-sm text-slate-500 mt-auto pt-12 text-right">
          &copy; {new Date().getFullYear()} NewsIQ DSA Project.
        </div>
      </div>

      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-y-auto min-h-screen">
        <NavLink to="/" className="lg:hidden flex items-center gap-2 absolute top-8 left-8">
          <Zap className="w-6 h-6 text-blue-500" />
          <span className="text-xl font-bold text-white">NewsIQ</span>
        </NavLink>

        <div className="bg-slate-800 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-black/50 border border-slate-700 w-full max-w-md my-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>
            <p className="text-slate-400">Join NewsIQ and start analyzing</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errors.form && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                {errors.form}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="fullName">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-slate-500" /></div>
                <input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleChange} className={`block w-full pl-10 pr-3 py-2.5 bg-black border ${errors.fullName ? 'border-red-500' : 'border-slate-700 focus:border-blue-500'} rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`} placeholder="John Doe" />
              </div>
              {errors.fullName && <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><AtSign className="h-5 w-5 text-slate-500" /></div>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={`block w-full pl-10 pr-3 py-2.5 bg-black border ${errors.email ? 'border-red-500' : 'border-slate-700 focus:border-blue-500'} rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`} placeholder="you@example.com" />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="username">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-slate-500 font-medium">@</span></div>
                <input id="username" name="username" type="text" value={formData.username} onChange={handleChange} className={`block w-full pl-9 pr-3 py-2.5 bg-black border ${errors.username ? 'border-red-500' : 'border-slate-700 focus:border-blue-500'} rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`} placeholder="username" />
              </div>
              {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-slate-500" /></div>
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className={`block w-full pl-10 pr-10 py-2.5 bg-black border ${errors.password ? 'border-red-500' : 'border-slate-700 focus:border-blue-500'} rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`} placeholder="••••••••" />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {renderStrengthBar()}
              {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-slate-500" /></div>
                <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} className={`block w-full pl-10 pr-10 py-2.5 bg-black border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-700 focus:border-blue-500'} rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`} placeholder="••••••••" />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-start mt-2">
              <div className="flex items-center h-5">
                <input id="agreeTerms" name="agreeTerms" type="checkbox" checked={formData.agreeTerms} onChange={handleChange} className="h-4 w-4 rounded border-slate-700 bg-black text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900" />
              </div>
              <div className="ml-2 text-sm">
                <label htmlFor="agreeTerms" className={`font-medium ${errors.agreeTerms ? 'text-red-400' : 'text-slate-300'}`}>
                  I agree to the <a href="#" className="text-blue-400 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
                </label>
              </div>
            </div>
            {errors.agreeTerms && <p className="text-sm text-red-400 -mt-2">{errors.agreeTerms}</p>}

            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2.5 px-4 mt-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <NavLink to="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Sign in &rarr;
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
