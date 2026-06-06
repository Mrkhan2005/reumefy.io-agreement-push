import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import type { AgreementData } from '../context/OrderContext';
import { 
  Database, 
  Settings, 
  Download, 
  Trash2, 
  CheckCircle, 
  Layers, 
  Copy, 
  Check, 
  FileText,
  DollarSign,
  Users,
  Lock,
  LogOut,
  ShieldAlert
} from 'lucide-react';
import jsPDF from 'jspdf';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState<AgreementData[]>([]);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [scriptCopied, setScriptCopied] = useState(false);

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Load agreements, config, and session authorization status on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('resumefy_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }

    const savedAgreements = localStorage.getItem('resumefy_agreements');
    if (savedAgreements) {
      setAgreements(JSON.parse(savedAgreements));
    }

    const savedWebhook = localStorage.getItem('resumefy_gsheet_webhook');
    if (savedWebhook) {
      setWebhookUrl(savedWebhook);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'ResumefyAdmin2026') {
      sessionStorage.setItem('resumefy_admin_auth', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Administrator Access Key. Access Denied.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('resumefy_admin_auth');
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('resumefy_gsheet_webhook', webhookUrl);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleClearAgreements = () => {
    if (window.confirm('Are you sure you want to clear all agreement database logs? This action is permanent.')) {
      localStorage.removeItem('resumefy_agreements');
      setAgreements([]);
    }
  };

  const handleDeleteItem = (index: number) => {
    if (window.confirm('Delete this agreement record?')) {
      const updated = [...agreements];
      updated.splice(index, 1);
      localStorage.setItem('resumefy_agreements', JSON.stringify(updated));
      setAgreements(updated);
    }
  };

  const handleCopyScript = () => {
    const appsScript = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Add columns: Ref Num, Timestamp, Client Name, Client Email, Selected Services, Total Price, Signature Type
    sheet.appendRow([
      data.referenceNumber,
      new Date(data.timestamp),
      data.clientName,
      data.clientEmail,
      data.selectedServices.map(function(s) { return s.name + (s.details ? ' (' + s.details + ')' : ''); }).join(', '),
      data.totalPrice,
      data.signatureType
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success", "received": data.referenceNumber}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
    navigator.clipboard.writeText(appsScript);
    setScriptCopied(true);
    setTimeout(() => setScriptCopied(false), 3000);
  };

  const handleDownloadCSV = () => {
    if (agreements.length === 0) return;
    
    const headers = ['Reference Number', 'Date Signed', 'Client Name', 'Client Email', 'Selected Services', 'Total Price (USD)', 'Signature Type'];
    
    const rows = agreements.map(item => [
      item.referenceNumber,
      new Date(item.timestamp).toLocaleString(),
      item.clientName,
      item.clientEmail,
      item.selectedServices.map(s => s.name).join('; '),
      item.totalPrice,
      item.signatureType
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Resumefy_Agreements_Master_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const triggerPDFDownload = (item: AgreementData) => {
    const doc = new jsPDF();
    const dateFormatted = new Date(item.timestamp).toLocaleDateString();

    // Reconstruct matching luxury contract PDF styling
    doc.setFillColor(10, 15, 30);
    doc.rect(0, 0, 210, 45, 'F');
    doc.setTextColor(212, 175, 55);
    doc.setFont('times', 'bold');
    doc.setFontSize(26);
    doc.text('RESUMEFY.IO', 20, 25);
    doc.setTextColor(248, 249, 250);
    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    doc.text('Your Career, Professionally Elevated.', 20, 34);

    doc.setTextColor(17, 24, 39);
    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.text('CLIENT SERVICES AGREEMENT', 20, 60);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Reference: ${item.referenceNumber}`, 20, 70);
    doc.text(`Date: ${dateFormatted}`, 20, 75);
    doc.text(`Governing Law: State of Texas`, 20, 80);

    doc.setFillColor(244, 245, 247);
    doc.rect(20, 88, 170, 25, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 24, 39);
    doc.text('CLIENT INFORMATION', 25, 94);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${item.clientName}`, 25, 100);
    doc.text(`Email: ${item.clientEmail}`, 25, 106);

    doc.setFont('times', 'bold');
    doc.setFontSize(14);
    doc.text('ITEMIZED ORDER DETAILS', 20, 128);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Service Item', 20, 136);
    doc.text('Price (USD)', 160, 136);
    doc.setDrawColor(212, 175, 55);
    doc.line(20, 138, 190, 138);

    let currentY = 145;
    doc.setFont('helvetica', 'normal');
    doc.text('ATS-Optimized Resume (Complimentary)', 20, currentY);
    doc.text('$0.00', 160, currentY);
    currentY += 8;

    item.selectedServices.forEach(s => {
      doc.text(`${s.name} ${s.details ? ' (' + s.details + ')' : ''}`, 20, currentY);
      doc.text(`$${s.price}.00`, 160, currentY);
      currentY += 8;
    });

    doc.setDrawColor(200, 200, 200);
    doc.line(20, currentY, 190, currentY);
    currentY += 8;

    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL DUE TODAY:', 20, currentY);
    doc.setTextColor(212, 175, 55);
    doc.text(`$${item.totalPrice}.00`, 160, currentY);
    doc.setTextColor(17, 24, 39);

    currentY += 20;
    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.text('ELECTRONIC SIGNATURE RECORD', 20, currentY);
    currentY += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text('This document has been signed electronically in accordance with the E-SIGN Act and the Texas', 20, currentY);
    currentY += 4;
    doc.text('Uniform Electronic Transactions Act (TUETA). Both parties agree to the terms as of execution date.', 20, currentY);
    currentY += 12;

    doc.setDrawColor(220, 220, 220);
    doc.line(20, currentY, 95, currentY);
    doc.line(115, currentY, 190, currentY);
    
    currentY += 6;
    doc.setTextColor(17, 24, 39);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('For Resumefy.io Team', 20, currentY);
    doc.text('For Client (Digital Authorization)', 115, currentY);

    currentY += 5;
    doc.setFont('helvetica', 'normal');
    doc.text('Authorized Signatory', 20, currentY);
    doc.text(item.clientName, 115, currentY);

    if (item.signatureType === 'draw' && item.signatureData) {
      try {
        doc.addImage(item.signatureData, 'PNG', 120, currentY - 22, 50, 15);
      } catch (err) {
        console.error('Error drawing image:', err);
      }
    } else if (item.signatureData) {
      doc.setFont('times', 'italic');
      doc.setFontSize(16);
      doc.setTextColor(212, 175, 55);
      doc.text(item.signatureData, 120, currentY - 10);
    }

    doc.save(`Resumefy_Agreement_${item.referenceNumber}.pdf`);
  };

  // Calculations for stats
  const totalPayout = agreements.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalAppsCount = agreements.filter(item => item.selectedServices.some(s => s.name.includes('Job Applications'))).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center px-4 py-12 relative font-sans">
        {/* Background video overlays */}
        <div className="absolute inset-0 grid-overlay z-0 pointer-events-none opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,15,30,0.6)_0%,rgba(10,15,30,0.95)_100%)] z-0 pointer-events-none" />

        <div className="relative max-w-md w-full glass-panel-elevated rounded-2xl p-8 shadow-[0_0_50px_rgba(212,175,55,0.15)] border border-gold-border/30 z-10 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold">
              <Lock size={28} />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-bold text-2xl text-text-primary">
              Admin Access Required
            </h2>
            <p className="text-xs text-text-muted max-w-xs mx-auto">
              Please enter the administrator passcode to view customer agreements and configure sheet integrations.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {loginError && (
              <div className="p-3 rounded bg-red-500/10 border border-red-500/30 text-red-200 text-xs font-semibold flex items-center gap-2">
                <ShieldAlert size={14} className="shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold tracking-widest text-text-muted uppercase mb-2">
                Administrator Access Key
              </label>
              <input
                type="password"
                required
                placeholder="Enter access code"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-gold-border/25 text-text-primary focus:border-accent-gold outline-none text-sm font-semibold tracking-widest text-center placeholder:tracking-normal placeholder:font-normal placeholder:text-xs transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-lg gold-btn-gradient text-bg-primary font-bold text-sm transition-all duration-200 cursor-pointer border border-accent-gold-light/20"
            >
              Verify Passcode
            </button>
          </form>

          <div className="pt-2">
            <button
              onClick={() => navigate('/')}
              className="text-xs text-text-muted hover:text-accent-gold transition-colors font-medium underline cursor-pointer"
            >
              ← Back to Portal Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pb-24 md:pb-16 font-sans">
      <Navbar />

      {/* Hero Header */}
      <div className="relative py-10 md:py-14 text-center border-b border-gold-border/10">
        <div className="absolute inset-0 grid-overlay opacity-30 z-0 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 z-10 space-y-3">
          <div className="flex justify-center items-center gap-3">
            <div className="inline-flex items-center gap-2 text-accent-gold bg-accent-gold/10 border border-accent-gold/20 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Database size={12} />
              Master Portal Control Console
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-text-muted hover:text-red-400 border border-gold-border/10 hover:border-red-500/30 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer bg-bg-card/50"
            >
              <LogOut size={11} />
              Sign Out
            </button>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
            Resumefy.io Agreement Database
          </h2>
          <p className="text-sm text-text-muted max-w-md mx-auto">
            Manage signed legal agreements, configure real-time cloud spreadsheet webhooks, and audit customer data.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        
        {/* STATS PANELS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-panel rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 bg-accent-gold/15 text-accent-gold rounded-lg">
              <Users size={24} />
            </div>
            <div>
              <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Total Signed Clients</span>
              <p className="text-2xl font-black text-text-primary mt-0.5">{agreements.length}</p>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 bg-success-green/15 text-success-green rounded-lg">
              <DollarSign size={24} />
            </div>
            <div>
              <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Total Value Secured</span>
              <p className="text-2xl font-black text-success-green mt-0.5">${totalPayout}</p>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 bg-accent-gold/15 text-accent-gold rounded-lg">
              <Layers size={24} />
            </div>
            <div>
              <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Supervised Applications</span>
              <p className="text-2xl font-black text-text-primary mt-0.5">{totalAppsCount} Contracts</p>
            </div>
          </div>
        </div>

        {/* TWO COLUMN INTEGRATION & SETTINGS PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Webhook Configurations (cols 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel-elevated rounded-xl p-6 border border-gold-border/30 shadow-xl space-y-6">
              <div className="flex items-center gap-2 border-b border-gold-border/10 pb-3">
                <Settings size={18} className="text-accent-gold" />
                <h3 className="text-md font-bold text-text-primary">Cloud Sheet Integration</h3>
              </div>

              {/* Hook Configuration Form */}
              <form onSubmit={handleSaveWebhook} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-text-muted uppercase mb-2">
                    Google Sheets Webhook URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/..."
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full px-3 py-2.5 rounded bg-bg-primary border border-gold-border/20 text-text-primary focus:border-accent-gold outline-none text-xs font-medium transition-all"
                  />
                  <p className="text-[10px] text-text-muted mt-1.5 leading-relaxed">
                    Paste your Google Apps Script Web App URL. When client agreements are signed, row entries stream live into your Google Spreadsheet.
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent-gold hover:bg-accent-gold-light text-bg-primary font-bold text-xs rounded transition-colors cursor-pointer"
                  >
                    Save Integration Webhook
                  </button>
                  {settingsSaved && (
                    <span className="text-xs text-success-green flex items-center gap-1">
                      <CheckCircle size={12} /> Saved!
                    </span>
                  )}
                </div>
              </form>

              {/* Copy Script Container */}
              <div className="border-t border-gold-border/10 pt-4 space-y-3">
                <span className="block text-xs font-bold text-text-primary">
                  1-Min Google Sheets App Script Code
                </span>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  Inside your Google Sheet, click <strong>Extensions &gt; Apps Script</strong>. Replace the boilerplate code with this handler, click <strong>Deploy &gt; New Deployment</strong> (select Web App, set access to "Anyone"), and paste the Web App URL above!
                </p>
                
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-gold-border/30 hover:border-accent-gold text-text-muted hover:text-accent-gold font-bold text-xs transition-colors cursor-pointer"
                >
                  {scriptCopied ? (
                    <>
                      <Check size={14} className="text-success-green" />
                      Code Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy Google Apps Script Handler
                    </>
                  )}
                </button>
              </div>

              {/* Notion Integration Instruction */}
              <div className="border-t border-gold-border/10 pt-4 space-y-2">
                <span className="block text-xs font-bold text-text-primary">
                  Notion Integration Guide
                </span>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  To sync signed contracts to Notion, paste your webhook URL from automations like <strong>Make.com</strong> or <strong>Zapier</strong> in the field above, mapped to push database items directly to your Notion workspace!
                </p>
              </div>
            </div>
          </div>

          {/* Master Table Grid (cols 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel-elevated rounded-xl p-6 border border-gold-border/30 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gold-border/10 pb-4">
                <div className="flex items-center gap-2">
                  <Database size={18} className="text-accent-gold" />
                  <h3 className="text-md font-bold text-text-primary">Signed Agreements Database</h3>
                </div>

                {/* Database actions */}
                {agreements.length > 0 && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleDownloadCSV}
                      className="flex items-center gap-1 px-3 py-1.5 rounded bg-accent-gold/10 border border-accent-gold/30 hover:border-accent-gold text-accent-gold font-bold text-xs transition-all cursor-pointer"
                    >
                      <Download size={12} />
                      Export CSV
                    </button>
                    <button
                      onClick={handleClearAgreements}
                      className="flex items-center gap-1 px-3 py-1.5 rounded bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500 text-red-300 font-bold text-xs transition-all cursor-pointer"
                    >
                      <Trash2 size={12} />
                      Clear Logs
                    </button>
                  </div>
                )}
              </div>

              {/* Data Table */}
              {agreements.length === 0 ? (
                <div className="py-24 text-center text-text-muted text-xs font-medium space-y-2">
                  <p>No customer agreement records have been signed yet.</p>
                  <p className="text-[10px]">Records will compile here automatically once users sign the contract on Page 2.</p>
                  <div className="pt-2">
                    <button
                      onClick={() => navigate('/')}
                      className="text-xs text-accent-gold font-semibold underline cursor-pointer"
                    >
                      Go to Page 1 and Sign a Service
                    </button>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto legal-scrollbar max-h-[500px]">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gold-border/20 text-text-muted text-[10px] uppercase font-bold tracking-wider">
                        <th className="py-3 px-2">Ref Code</th>
                        <th className="py-3 px-2">Client Details</th>
                        <th className="py-3 px-2">Selected Packages</th>
                        <th className="py-3 px-2 text-right">Price</th>
                        <th className="py-3 px-2 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold-border/5">
                      {agreements.map((item, idx) => (
                        <tr key={idx} className="hover:bg-bg-primary/30 transition-colors">
                          {/* Ref Code */}
                          <td className="py-4 px-2 font-mono font-bold text-accent-gold-light select-all">
                            {item.referenceNumber}
                            <span className="block text-[9px] font-sans text-text-muted mt-0.5">
                              {new Date(item.timestamp).toLocaleDateString()}
                            </span>
                          </td>

                          {/* Client Details */}
                          <td className="py-4 px-2">
                            <span className="font-bold text-text-primary block">{item.clientName}</span>
                            <span className="text-[10px] text-text-muted block select-all">{item.clientEmail}</span>
                          </td>

                          {/* Selected Services */}
                          <td className="py-4 px-2 max-w-[200px] truncate leading-relaxed">
                            {item.selectedServices.map((s, i) => (
                              <span key={i} className="block text-[10px] text-text-muted">
                                • {s.name}
                              </span>
                            ))}
                          </td>

                          {/* Price */}
                          <td className="py-4 px-2 text-right font-bold text-text-primary">
                            ${item.totalPrice}
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-2 text-center">
                            <div className="flex justify-center gap-1.5">
                              <button
                                onClick={() => triggerPDFDownload(item)}
                                className="p-2 rounded bg-bg-primary border border-gold-border/20 text-text-muted hover:text-accent-gold hover:border-accent-gold transition-colors cursor-pointer"
                                title="Download signed PDF contract"
                              >
                                <FileText size={12} />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(idx)}
                                className="p-2 rounded bg-bg-primary border border-red-500/10 text-text-muted hover:text-red-400 hover:border-red-400/40 transition-colors cursor-pointer"
                                title="Delete record"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
