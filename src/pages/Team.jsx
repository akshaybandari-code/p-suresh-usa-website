import React from 'react';
import useTeam from '../hooks/useTeam';
import { Award, ShieldCheck, Mail, Phone } from 'lucide-react';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';

export default function Team() {
  const { data: teamMembers, loading, error } = useTeam();
  const teamList = teamMembers || [];

  return (
    <div className="bg-theme-background text-theme-text-primary min-h-screen transition-colors duration-200 pb-16">
      <SEO title="Our Partners" description="Meet our leading practice partners—specialist Chartered Accountants and US CPAs navigating cross-border tax." url="https://www.suureshusa.com/team" />
      {/* Header section */}
      <section className="bg-theme-surface py-16 border-b border-theme-border text-center select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-2xs uppercase tracking-widest text-amber-500 font-mono">Bilateral Practice Partners</p>
          <h1 className="text-4xl font-extrabold font-display text-theme-text-primary col-span-1">
            Chartered Accountants &amp; Tax Consultants
          </h1>
          <p className="text-xs sm:text-sm text-theme-text-secondary max-w-2xl mx-auto font-sans leading-relaxed">
            Our professionals advise clients on dual US-India tax filings and compliance, backed by active ICAI and US CPA credentials.
          </p>
        </div>
      </section>

      {/* Partners Cards list */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {teamList.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <p className="text-xl text-theme-text-secondary">No content available.</p>
            </div>
          ) : teamList.map((member) => {
            const initials = (member.name || '').split(' ').map(n => n[0]).join('').replace(',', '');
            const expertiseList = member.expertise || [];
            const credentialsList = member.credentials || [];
            return (
              <div
                key={member.id}
                id={`team-card-${member.id}`}
                className="bg-theme-card border border-theme-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] relative overflow-hidden"
              >
                
                {/* Visual Bio Header */}
                <div className="space-y-6">
                  
                  {/* Photo Replacement Placeholder Card */}
                  <div className="w-full h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-955 rounded-xl relative flex flex-col justify-end p-5 overflow-hidden shadow-inner">
                    {/* Abstract design elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                    
                    {/* Big Stylized Initials watermark */}
                    <div className="absolute -top-6 -left-6 opacity-10 text-[9rem] font-bold select-none text-white font-display">
                      {initials}
                    </div>

                    {/* Support profiles with true images if available from CMS */}
                    {member.profileImage && (
                      <img 
                        referrerPolicy="no-referrer"
                        src={member.profileImage}
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-35 hover:opacity-50 transition-opacity duration-350"
                      />
                    )}

                    <div className="relative z-10 text-white space-y-0.5">
                      <p className="text-2xs font-mono tracking-widest text-amber-400 uppercase">PARTNER PORTRAIT</p>
                      <h3 className="text-xl font-bold font-display leading-tight">{member.name}</h3>
                      <p className="text-xs text-white/80">{member.role}</p>
                    </div>
                  </div>

                  {/* Bio Paragraph */}
                  <div className="space-y-4">
                    <p className="text-xs text-theme-text-secondary leading-relaxed font-sans">
                      {member.bio}
                    </p>

                    {/* Expertise Bullets */}
                    {expertiseList.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-2xs font-mono uppercase tracking-widest text-theme-text-secondary font-bold">Core Advisory Areas</p>
                        <div className="flex flex-wrap gap-1.5">
                          {expertiseList.map((exp, expIdx) => (
                            <span
                              key={expIdx}
                              className="px-2.5 py-0.5 bg-theme-surface border border-theme-border text-[10.5px] rounded-md font-sans text-theme-text-secondary"
                            >
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Credentials Checklist */}
                    {credentialsList.length > 0 && (
                      <div className="space-y-2 pt-4 border-t border-theme-border">
                        <p className="text-2xs font-mono uppercase tracking-widest text-theme-text-secondary font-bold">Registrations & Licenses</p>
                        <ul className="space-y-1.5">
                          {credentialsList.map((cred, credIdx) => (
                            <li key={credIdx} className="flex items-start gap-2 text-xs font-semibold text-theme-text-primary font-sans leading-normal">
                              <Award className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                              <span>{cred}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* US Market Experience & Qualifications Block */}
                    {member.usMarketExperience && (
                      <div className="space-y-2 pt-4 border-t border-theme-border">
                        <p className="text-2xs font-mono uppercase tracking-widest text-amber-500 font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          US Market Experience
                        </p>
                        <p className="text-xs text-theme-text-primary bg-amber-500/[0.04] dark:bg-amber-500/[0.02] border border-amber-500/10 p-3 rounded-xl leading-relaxed italic font-sans font-medium">
                          "{member.usMarketExperience}"
                        </p>
                      </div>
                    )}

                  </div>

                </div>


                {/* Secure consultation hooks */}
                <div className="pt-6 mt-8 border-t border-theme-border flex items-center justify-between">
                  <div className="flex gap-2.5">
                    <a
                      href="mailto:partners@suureshusa.com"
                      className="p-1.5 bg-theme-surface text-theme-text-secondary rounded border border-theme-border hover:bg-theme-border hover:text-theme-text-primary outline-none transition-all"
                      title="Direct Partner Mail"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href="tel:+12124599023"
                      className="p-1.5 bg-theme-surface text-theme-text-secondary rounded border border-theme-border hover:bg-theme-border hover:text-theme-text-primary outline-none transition-all"
                      title="Direct Office Extension"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-400/5 border border-emerald-500/10 px-2 py-0.5 rounded-md font-bold flex items-center gap-1 leading-none select-none">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Registered Practitioner
                  </span>
                </div>

              </div>
            );
          })}

        </div>
      </main>

      {/* final banner section */}
      <CTASection />

    </div>
  );
}
