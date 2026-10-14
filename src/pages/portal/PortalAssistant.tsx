import React, { useState } from 'react';
import { Bot, Send, Sparkles, ShieldCheck, Terminal, HelpCircle } from 'lucide-react';
import { CLINIC_CONFIG, DR_STANISLAV_GOLYAND } from '../../data/clinicData';

export const PortalAssistant: React.FC = () => {
  const [testInput, setTestInput] = useState('');
  const [testOutput, setTestOutput] = useState('');
  const [testing, setTesting] = useState(false);

  const handleTestPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testInput.trim()) return;

    setTesting(true);
    setTestOutput('');

    try {
      const res = await fetch('/api/receptionist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: testInput, history: [] })
      });
      const data = await res.json();
      setTestOutput(data.reply || "No response received.");
    } catch (err: any) {
      setTestOutput("Assistant fallback triggered: " + err.message);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-[#162C54]">Gemini AI Receptionist Knowledge & Test Bench</h2>
          <p className="text-xs text-slate-500">Inspect system instructions and verify model responses</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono px-3 py-1 bg-slate-100 rounded-lg">
          <span>Model: gemini-3.8-flash</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Knowledge Base Inspector (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-[#162C54]">Active Guardrails & Rules</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="font-bold text-[#162C54]">1. No Clinical Diagnosis</span>
              <p>The model explicitly refuses diagnostic queries, referring patients to an in-office exam.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="font-bold text-[#162C54]">2. Emergency 911 Redirection</span>
              <p>Life threats require 911; urgent toothaches advise calling (718) 948-6500 directly.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="font-bold text-[#162C54]">3. Verified Lead Clinician</span>
              <p>Always attributes care to Dr. Stanislav Golyand, DDS (DDS NYU, Downstate Medical Center).</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="font-bold text-[#162C54]">4. Official Zocdoc Separation</span>
              <p>Directs official clinical appointments to verified Zocdoc or phone.</p>
            </div>
          </div>
        </div>

        {/* Live Test Bench (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Terminal className="w-4 h-4 text-[#204270]" />
            <h3 className="text-sm font-bold text-[#162C54]">Live Prompt Test Bench</h3>
          </div>

          <form onSubmit={handleTestPrompt} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Test Query</label>
              <input
                type="text"
                placeholder="e.g. Do you do implants? What are your hours?"
                value={testInput}
                onChange={e => setTestInput(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#7DAED6]"
              />
            </div>

            <button
              type="submit"
              disabled={testing || !testInput.trim()}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#162C54] hover:bg-[#204270] disabled:bg-slate-300 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{testing ? 'Evaluating...' : 'Test Assistant'}</span>
            </button>
          </form>

          {testOutput && (
            <div className="space-y-1 pt-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Model Output</span>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                {testOutput}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
