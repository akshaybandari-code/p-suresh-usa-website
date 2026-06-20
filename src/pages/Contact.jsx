import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Globe2,
  Building2
} from 'lucide-react';
import { servicesData } from '../data/mockData';
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO';

const initialForm = {
  name: '',
  email: '',
  country: '',
  company: '',
  service: '',
  timezone: '',
  message: ''
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [toast, setToast] = useState(null);
  const formCardRef = useRef(null);
  
  const location = useLocation();

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // If redirected from services with pre-selected query
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceName = params.get('service');
    if (serviceName) {
      setForm(prev => ({ ...prev, service: serviceName }));
    }
  }, [location]);

  const validate = () => {
    const tempErrors = {};
    if (!form.name.trim()) tempErrors.name = 'Please enter your name.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }
    if (!form.country.trim()) tempErrors.country = 'Please select your country.';
    if (!form.service) tempErrors.service = 'Please select a service.';
    if (!form.timezone) tempErrors.timezone = 'Please select a time zone.';
    if (!form.message.trim()) tempErrors.message = 'Please describe your requirements.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const getEnvValue = (value, fallback) => {
    if (!value || typeof value !== 'string') return fallback;
    const trimmed = value.trim();
    if (!trimmed || trimmed === 'undefined' || trimmed === 'null' || trimmed === '""' || trimmed === "''") {
      return fallback;
    }
    const clean = trimmed.replace(/^["']|["']$/g, '').trim();
    if (!clean || clean.startsWith('YOUR_') || clean === 'undefined' || clean === 'null') {
      return fallback;
    }
    return clean;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setTimeout(() => {
        formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const serviceId = getEnvValue(import.meta.env.VITE_EMAILJS_SERVICE_ID, 'service_5s0hmfk');
    const templateIdAdmin = getEnvValue(import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 'template_amj1887');
    const templateIdUser = getEnvValue(import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID, 'template_j98n75g');
    const publicKey = getEnvValue(import.meta.env.VITE_EMAILJS_PUBLIC_KEY, 'b-MFsKjqa8bydKNQ4');

    const randomId = `SUURESH-26-${Math.floor(1000 + Math.random() * 9005)}`;

    const templateParams = {
      name: form.name,
      from_name: form.name,
      email: form.email,
      from_email: form.email,
      reply_to: form.email,
      country: form.country,
      company: form.company || 'N/A',
      service: form.service,
      timezone: form.timezone,
      message: form.message,
      ticketId: randomId,
      ticket_id: randomId
    };

    try {
      emailjs.init({
        publicKey: publicKey
      });

      await Promise.all([
        emailjs.send(serviceId, templateIdAdmin, templateParams, { publicKey: publicKey }),
        emailjs.send(serviceId, templateIdUser, templateParams, { publicKey: publicKey })
      ]);

      setIsSubmitting(false);
      setSubmitted(true);
      setTicketId(randomId);
      setForm(initialForm);
      setErrors({});
      setToast({
        type: 'success',
        list: [
          '✓ Inquiry submitted successfully',
          '✓ Confirmation email sent'
        ]
      });

      // Scroll smoothly to the top of the form
      setTimeout(() => {
        formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    } catch (err) {
      const errorText = err?.text || err?.message || (typeof err === 'string' ? err : '');
      const detailedError = errorText ? `Submission Error: ${errorText}. Please verify your client configuration.` : 'Something went wrong. Please try again later.';
      setSubmitError(detailedError);
      setIsSubmitting(false);
      setToast({
        type: 'error',
        list: [
          'Unable to send inquiry.',
          errorText ? `Error details: ${errorText}` : 'Please try again later.'
        ]
      });
      setTimeout(() => {
        formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  };

  return (
    <div className="bg-theme-background text-theme-text-primary min-h-screen transition-colors duration-200 pb-16">
      <SEO title="Contact Us - Schedule Consultation" description="Get in touch with P. Suuresh & Associates to discuss your tax filings, financial disclosures, and US-India residency planning." url="https://www.suureshusa.com/contact" />
      {/* Header section */}
      <section className="bg-theme-surface py-16 border-b border-theme-border text-center select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-2xs uppercase tracking-widest text-amber-500 font-mono">Contact Us</p>
          <h1 className="text-4xl font-extrabold font-display text-theme-text-primary">
            Schedule a Consultation
          </h1>
          <p className="text-xs sm:text-sm text-theme-text-secondary max-w-2xl mx-auto font-sans">
            Get in touch with us to discuss your tax filings, financial disclosures, or pre-migration tax planning.
          </p>
        </div>
      </section>

      {/* Main Split Interface */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LHS: Contacts & Offices Information */}
          <div className="lg:col-span-5 space-y-10">
            
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-display text-theme-text-primary">
                Our Offices
              </h2>
              <p className="text-xs text-theme-text-secondary leading-relaxed font-sans">
                You can reach us at our US coordination office or our India headquarters. Physical meetings are available by appointment only.
              </p>
            </div>

            {/* Offices details cards */}
            <div className="space-y-6">
              
              {/* USA Coordination */}
              <div className="p-5 bg-theme-surface border border-theme-border rounded-xl space-y-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-amber-500" />
                  <h3 className="text-sm font-bold font-display text-theme-text-primary">
                    United States Coordination Office
                  </h3>
                </div>
                <div className="space-y-2 text-xs text-theme-text-secondary font-sans">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>60 Church St, Financial District, Manhattan, NY 10007</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>+1 (212) 459-9023</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>Mon - Fri • 09:00 AM - 06:00 PM EST</span>
                  </p>
                </div>
              </div>

              {/* India HQ */}
              <div className="p-5 bg-theme-surface border border-theme-border rounded-xl space-y-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-500" />
                  <h3 className="text-sm font-bold font-display text-theme-text-primary">
                    India Head Office
                  </h3>
                </div>
                <div className="space-y-2 text-xs text-theme-text-secondary font-sans">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>P. Suuresh Chambers, Somajiguda Road, Hyderabad, TS, 500082</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>+91 (40) 2339-4450</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>Mon - Sat • 10:00 AM - 07:00 PM IST</span>
                  </p>
                </div>
              </div>

            </div>

            {/* General details */}
            <div className="space-y-3.5 border-t border-theme-border pt-8 text-xs text-theme-text-secondary">
              <p className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-amber-500" />
                <span>Client Support: <strong>tax@suureshusa.com</strong></span>
              </p>
              <p className="leading-relaxed">
                Existing clients can also reach out directly to their assigned service team members via their dedicated contact coordinates.
              </p>
            </div>

          </div>

          {/* RHS: Interactive Contact Form */}
          <div className="lg:col-span-7" ref={formCardRef}>
            <div className="bg-theme-card border border-theme-border rounded-2xl p-6 sm:p-10 shadow-sm">
              
              <AnimatePresence mode="wait">
                
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="space-y-2 border-b border-theme-border pb-4 mb-2">
                      <h3 className="text-lg font-bold font-display text-theme-text-primary">Consultation Request Form</h3>
                      <p className="text-xs text-theme-text-secondary">Please provide the details below so we can direct your inquiry to the appropriate tax professional.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="form-name" className="block text-2xs font-mono uppercase tracking-wider text-theme-text-secondary font-bold">
                          Full Name *
                        </label>
                        <input
                          id="form-name"
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="e.g. Dr. Amit Patel"
                          className="w-full px-4 py-2.5 text-sm bg-theme-input-bg text-theme-text-primary border border-theme-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 hover:border-slate-400 dark:hover:border-zinc-650 transition-all font-sans"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-2xs font-mono flex items-center gap-1 mt-1.5 animate-pulse">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="form-email" className="block text-2xs font-mono uppercase tracking-wider text-theme-text-secondary font-bold">
                          Email Address *
                        </label>
                        <input
                          id="form-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="amit.patel@example.com"
                          className="w-full px-4 py-2.5 text-sm bg-theme-input-bg text-theme-text-primary border border-theme-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 hover:border-slate-400 dark:hover:border-zinc-650 transition-all font-sans"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-2xs font-mono flex items-center gap-1 mt-1.5 animate-pulse">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.email}
                          </p>
                        )}
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      {/* Country */}
                      <div className="space-y-2">
                        <label htmlFor="form-country" className="block text-2xs font-mono uppercase tracking-wider text-theme-text-secondary font-bold">
                          Current Country of Residence *
                        </label>
                        <input
                          id="form-country"
                          type="text"
                          value={form.country}
                          onChange={(e) => setForm({ ...form, country: e.target.value })}
                          placeholder="e.g. United States"
                          className="w-full px-4 py-2.5 text-sm bg-theme-input-bg text-theme-text-primary border border-theme-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 hover:border-slate-400 dark:hover:border-zinc-650 transition-all font-sans"
                        />
                        {errors.country && (
                          <p className="text-red-500 text-2xs font-mono flex items-center gap-1 mt-1.5 animate-pulse">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.country}
                          </p>
                        )}
                      </div>

                      {/* Company (Optional) */}
                      <div className="space-y-2">
                        <label htmlFor="form-company" className="block text-2xs font-mono uppercase tracking-wider text-theme-text-secondary font-bold">
                          Company Name (Optional)
                        </label>
                        <input
                          id="form-company"
                          type="text"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          placeholder="e.g. ZettaScale Systems"
                          className="w-full px-4 py-2.5 text-sm bg-theme-input-bg text-theme-text-primary border border-theme-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 hover:border-slate-400 dark:hover:border-zinc-650 transition-all font-sans"
                        />
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      {/* Service of Interest */}
                      <div className="space-y-2">
                        <label htmlFor="form-service" className="block text-2xs font-mono uppercase tracking-wider text-theme-text-secondary font-bold">
                          Service Requested *
                        </label>
                        <select
                          id="form-service"
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          className="w-full px-4 py-2.5 text-sm bg-theme-input-bg text-theme-text-primary border border-theme-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 hover:border-slate-400 dark:hover:border-zinc-650 transition-all cursor-pointer font-sans"
                        >
                          <option value="" className="bg-theme-card text-theme-text-primary">Select service line...</option>
                          {servicesData.map((s) => (
                            <option key={s.id} value={s.title} className="bg-theme-card text-theme-text-primary">{s.title.split(' (')[0]}</option>
                          ))}
                        </select>
                        {errors.service && (
                          <p className="text-red-500 text-2xs font-mono flex items-center gap-1 mt-1.5 animate-pulse">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.service}
                          </p>
                        )}
                      </div>

                      {/* Preferred Time Zone */}
                      <div className="space-y-2">
                        <label htmlFor="form-timezone" className="block text-2xs font-mono uppercase tracking-wider text-theme-text-secondary font-bold">
                          Preferred Call Timezone *
                        </label>
                        <select
                          id="form-timezone"
                          value={form.timezone}
                          onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                          className="w-full px-4 py-2.5 text-sm bg-theme-input-bg text-theme-text-primary border border-theme-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 hover:border-slate-400 dark:hover:border-zinc-650 transition-all cursor-pointer font-sans"
                        >
                          <option value="" className="bg-theme-card text-theme-text-primary">Select timezone...</option>
                          <option value="EST" className="bg-theme-card text-theme-text-primary">US Eastern Time (EST/EDT)</option>
                          <option value="CST" className="bg-theme-card text-theme-text-primary">US Central Time (CST/CDT)</option>
                          <option value="PST" className="bg-theme-card text-theme-text-primary">US Pacific Time (PST/PDT)</option>
                          <option value="IST" className="bg-theme-card text-theme-text-primary">Indian Standard Time (IST)</option>
                          <option value="GMT" className="bg-theme-card text-theme-text-primary">Greenwich Mean Time (GMT)</option>
                        </select>
                        {errors.timezone && (
                          <p className="text-red-500 text-2xs font-mono flex items-center gap-1 mt-1.5 animate-pulse">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.timezone}
                          </p>
                        )}
                      </div>

                    </div>

                    {/* Message Area */}
                    <div className="space-y-2">
                      <label htmlFor="form-message" className="block text-2xs font-mono uppercase tracking-wider text-theme-text-secondary font-bold">
                        Message / Details of Your Inquiry *
                      </label>
                      <textarea
                        id="form-message"
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Please describe how we can assist you with your tax or compliance needs."
                        className="w-full px-4 py-2.5 text-sm bg-theme-input-bg text-theme-text-primary border border-theme-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 hover:border-slate-400 dark:hover:border-zinc-650 transition-all font-sans"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-2xs font-mono flex items-center gap-1 mt-1.5 animate-pulse">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.message}
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <div className="p-4 bg-red-50 dark:bg-rose-950/20 text-red-800 dark:text-red-350 border border-red-200 dark:border-red-900/40 rounded-xl text-left text-xs sm:text-sm font-sans flex items-start gap-2.5 animate-pulse">
                        <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                        <div>
                          <p className="font-bold">Submission Error</p>
                          <p className="mt-0.5">Something went wrong. Please try again later.</p>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      id="form-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-slate-900 dark:bg-zinc-100 hover:bg-slate-950 dark:hover:bg-zinc-50 text-white dark:text-slate-950 text-sm font-semibold rounded-lg transition-all duration-200 ease-in-out hover:shadow-md focus:outline-none flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Contact Form</span>
                        </>
                      )}
                    </button>

                  </motion.form>
                ) : (
                  <motion.div
                    key="success-form"
                    className="py-6 space-y-6 max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    {/* Highly readable, high-contrast premium success green card */}
                    <div className="p-6 md:p-8 bg-[#E8F8F1] dark:bg-emerald-950/30 border border-[#A7F3D0] dark:border-emerald-900/40 rounded-xl text-left space-y-4 shadow-3xs font-sans">
                      <div className="flex gap-3.5 items-start">
                        <CheckCircle2 className="w-6 h-6 shrink-0 text-[#10B981] dark:text-emerald-400 mt-0.5" />
                        <div className="space-y-4 w-full">
                          <h4 className="text-base sm:text-lg font-bold text-[#065F46] dark:text-emerald-300 leading-snug">
                            ✓ Thank you for contacting P. Suuresh &amp; Associates.
                          </h4>
                          <div className="space-y-3 text-xs sm:text-sm text-[#374151] dark:text-zinc-200 leading-relaxed font-semibold">
                            <p>
                              Your inquiry has been received successfully.
                            </p>
                            <p>
                              A confirmation email has been sent to your email address.
                            </p>
                            <div className="pt-3 border-t border-[#A7F3D0] dark:border-emerald-900/30 font-medium text-[#374151] dark:text-zinc-300 select-none">
                              Our team will review your request and respond within 24–48 business hours.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Styled Reference Section as a separate modern card */}
                    <div className="p-5 bg-theme-surface border border-theme-border rounded-xl space-y-3.5 text-left font-mono text-[11px] sm:text-xs">
                      <div className="text-[10px] select-none font-bold uppercase tracking-wider text-theme-text-secondary border-b border-theme-border pb-2">
                        Reference Details
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between gap-4">
                          <span className="text-theme-text-secondary">REFERENCE REF:</span>
                          <span className="text-theme-text-primary font-bold select-all">{ticketId}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-theme-text-secondary font-normal">SERVICE CATEGORY:</span>
                          <span className="text-theme-text-primary font-semibold">US-INDIA TAX ADVISORY</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-theme-text-secondary font-normal">ESTIMATED RESPONSE TIME:</span>
                          <span className="text-amber-500 font-bold select-none">WITHIN 24-48 BUSINESS HOURS</span>
                        </div>
                      </div>
                    </div>

                    {/* "Submit another query" action styled elegantly as a modern secondary button */}
                    <div className="pt-2">
                      <button
                        id="reset-form-success-btn"
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-3 inline-flex items-center justify-center gap-2 text-xs font-bold rounded-lg bg-theme-surface hover:bg-theme-border text-theme-text-primary hover:text-amber-500 font-mono transition-all duration-200 border border-theme-border shadow-2xs hover:shadow-xs cursor-pointer select-none active:scale-98"
                      >
                        Submit Another Query
                      </button>
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>

            </div>
          </div>

        </div>
      </main>

      {/* Strict disclaimer footnote requested explicitly by the user */}
      <section className="bg-theme-surface py-8 border-y border-theme-border">
        <div className="max-w-4xl mx-auto px-4 text-center text-3xs sm:text-2xs text-theme-text-secondary space-y-4">
          <div className="space-y-1">
            <p className="flex items-center justify-center gap-1.5 font-semibold text-theme-text-primary">
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
              Confidentiality &amp; Data Protection
            </p>
            <p className="font-sans leading-relaxed">
              Any details submitted through this form are kept strictly confidential and used solely to evaluate your query. P. Suuresh &amp; Associates maintains professional standard data protection protocols and does not share your information with third-party marketing agencies.
            </p>
          </div>
          <div className="pt-3 border-t border-theme-border/60 max-w-2xl mx-auto">
            <p className="italic font-sans text-theme-text-secondary leading-relaxed">
              <strong>Disclaimer:</strong> This website provides general information only and should not be construed as legal, tax, or accounting advice. Please consult our professionals for advice specific to your circumstances.
            </p>
          </div>
        </div>
      </section>

      {/* Floating Toast Alert Overlay */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 15, transition: { duration: 0.15 } }}
            className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 p-4 rounded-xl border shadow-xl max-w-sm w-[90vw] sm:w-[360px] font-sans ${
              toast.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/95 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60'
                : 'bg-red-50 dark:bg-rose-950/95 text-red-800 dark:text-red-350 border-red-200 dark:border-red-900/60'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 space-y-1">
              <p className="font-bold text-xs sm:text-sm leading-none">
                {toast.type === 'success' ? 'Submission Successful' : 'Submission Failed'}
              </p>
              <div className="text-2xs sm:text-xs opacity-90 leading-relaxed font-semibold space-y-1 pt-1">
                {toast.list ? (
                  toast.list.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))
                ) : (
                  <p>{toast.message}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-current opacity-60 hover:opacity-100 font-mono text-xs cursor-pointer select-none px-1"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
