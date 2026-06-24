import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Layers, Globe, ShieldCheck, ExternalLink } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function useScrollReveal() {
  const [hasRevealed, setHasRevealed] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          if (elementRef.current) observer.unobserve(elementRef.current);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' } 
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return [elementRef, hasRevealed];
}

function CapabilityCard({ icon: Icon, title, description, delay }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div 
      ref={ref}
      style={{ 
        backgroundColor: '#111827', 
        padding: '30px', 
        borderRadius: '12px', 
        border: '1px solid #1e293b',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`
      }}
    >
      <Icon style={{ color: '#38bdf8', marginBottom: '15px' }} size={32} />
      <h3 style={{ marginBottom: '10px', fontSize: '1.25rem', fontWeight: '600' }}>{title}</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5' }}>{description}</p>
    </div>
  );
}

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('portfolio_leads')
        .insert([formData]);

      if (error) throw error;

      alert('🎉 Message sent successfully! I will reach out to you shortly.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0b0f19', color: '#f3f4f6', fontFamily: 'sans-serif', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* 1. HERO BANNER HEADER PANEL */}
      <header style={{ 
  display: 'flex', 
  flexDirection: 'row', 
  flexWrap: 'wrap-reverse', 
  alignItems: 'center',
  justifyContent: 'center', 
  gap: '60px',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '100px 20px 80px', 
  borderBottom: '1px solid #1e293b',
  position: 'relative' 
}}>

  <div style={{
      position: 'absolute',
      top: '10%',
      left: '15%',
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(0,0,0,0) 70%)',
      zIndex: 0,
      pointerEvents: 'none'
    }}/>

  {/* Left Column: Image & Personal Bio */}
  <div style={{ 
    flex: '1 1 350px', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    textAlign: 'center',
    backgroundColor: '#111827',
    padding: '30px 40px',
    borderRadius: '34px', 
    border: '1px solid #1e293b',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    zIndex: 1 
    }}>
      <div style={{
        position: 'relative',
        marginBottom: '24px',
      }}
      >
    <div style={{
      position: 'absolute',
      top: '-4px', left: '-4px', right: '-4px', bottom: '-4px',
      borderRadius: '50px',
      background: 'linear-gradient(135deg, #38bde1, #818cc9)',
      zIndex: -1
    }}
    />
    <img 
      src="https://scontent-sea5-1.xx.fbcdn.net/v/t39.30808-6/511296655_9987679384613351_2192164889376400409_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=3lSVk-JE_JgQ7kNvwEyzFDQ&_nc_oc=AdoSsmNrLHuLrlMg70N1Sa-QluWBnIDAaLPilhK35zO2Xhx_-j7-urhoZLryRBttxSat4ksrowqaTbOQ4nIff4nY&_nc_zt=23&_nc_ht=scontent-sea5-1.xx&_nc_gid=yq8UDCypYrm_2FJaT-qxIQ&_nc_ss=7b2a8&oh=00_Af-7_I7z97qdCyXnIjAXf56o3e24OPJb09gD-s_x41zvmQ&oe=6A3FC104" // Replace with your image URL
      alt="Full-Stack Developer Portrait" 
      style={{ 
        width: '100%', 
        maxWidth: '270px',
        height: 'auto',
        objectFit: 'cover', 
        borderRadius: '50%', 
        display: 'block'
      }} 
    />
    </div>
    {/* Personal Bio Under Image */}
    <p style={{ fontSize: '.95rem', color: '#94a3b8', lineHeight: '1.6', maxWidth: '300px', margin: '0', fontStyle: 'italic' }}>
      "I build websites and navigate the digital world, but my favorite trails are the ones in the high terrains. Off-screen, you'll find me on the soccer field or enjoying a park sunset with my fiancée and our two faithful pups."
    </p>
  </div>

  {/* Right Column: Professional Headline & Core Info */}
  <div style={{ flex: '1 1 500px', textAlign: 'left', zIndex: 1 }}>
    <div style={{
      display: 'inline-block',
      padding: '6px 14px',
      borderRadius: '20px',
      backgroundColor: 'rgba(56, 189, 248, 0.1)',
      border: '1px solid rgba(56, 189, 248, 0.2)',
      color: '#38bdf8',
      fontSize: '0.75rem',
      fontWeight: '600px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '16px'
    }}>
      Open for Opportunities
    </div>
    <h1 style={{ 
      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
      fontWeight: '800', 
      marginBottom: '20px', 
      background: 'linear-gradient(90deg, #38bdf8, #818cf8)', 
      WebkitBackgroundClip: 'text', 
      WebkitTextFillColor: 'transparent',
      display: 'block',
      lineHeight: '1.2',
      letterSpacing: '-0.02em'
    }}>
      Full-Stack Web Developer
    </h1>
    
    <p style={{ fontSize: '1.15rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '36px', maxWidth: '540px' }}>
      Building secure, hour-precise booking engines, responsive client storefronts, and optimized database architectures.
    </p>
    
    <a href="#contact" style={{ 
      display: 'inline-block',
      backgroundColor: '#2563eb', 
      color: '#fff', 
      padding: '14px 28px', 
      borderRadius: '8px', 
      textDecoration: 'none', 
      fontWeight: '600', 
      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.6)',
      transition: '0.2s'}}>
      Let's Build Something Great
    </a>
    <div className="social-links" style={{
      paddingTop: '40px',
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      color: '#cbd5e1'
      }}> Let's Connect: 
      <a 
    href="https://linkedin.com" 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label="LinkedIn Profile"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50px',
      height: '50px',
      borderRadius: '12px',
      backgroundColor: '#111827',
      border: '1px solid #1e293b',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
    }}
    // Inline hover effect simulations for React
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = '#38bdf8';
      e.currentTarget.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.4)';
      e.currentTarget.firstChild.style.color = '#38bdf8';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = '#1e293b';
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      e.currentTarget.firstChild.style.color = '#94a3b8';
    }}
  >
    <FaLinkedin size={24} style={{ color: '#94a3b8', transition: 'color 0.2s ease' }} />
  </a>
    </div>
  </div>
  
</header>

      {/* 2. SERVICES & FREELANCE VALUE TIERS */}
      <section style={{ padding: '80px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '50px', fontWeight: '700' }}>Freelance Capabilities</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          
          <CapabilityCard 
            icon={Layers} 
            title="Custom Booking Platforms" 
            description="Hour-precise calendars built with robust database exclusion rules to completely block multi-tenant scheduling collisions."
            delay={0.15}
          />

          <CapabilityCard 
            icon={Globe} 
            title="Local SEO Engineering" 
            description="Optimizing business profiles to list accurately on search tools, map directories, and structuring background tags so search engines rank platforms higher."
            delay={0.3} 
          />

          <CapabilityCard 
            icon={ShieldCheck} 
            title="Full-Stack Integrations" 
            description="Connecting secure third-party checkout networks like Stripe seamlessly with backends like Supabase and PostgreSQL."
            delay={0.45} 
          />

        </div>
      </section>

      {/* 3. CASE STUDIES GRID PANEL */}
      <section style={{ backgroundColor: '#0b0f19', padding: '100px 20px', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b' }}>
  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
    
    {/* Section Header with Gradient Underline Accent */}
    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
      <h2 style={{ fontSize: '2.25rem', marginBottom: '12px', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em' }}>
        Featured Projects & Apps
      </h2>
      <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #38bdf8, #818cf8)', borderRadius: '2px', margin: '0 auto' }}></div>
    </div>

    {/* Project Grid */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', justifyContent: 'center' }}>
      
      {/* PROJECT 1: RENTAL APPLICATION */}
      <div 
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 30px 40px -10px rgba(56, 189, 248, 0.2)';
          e.currentTarget.style.borderColor = '#38bdf8';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.4)';
          e.currentTarget.style.borderColor = '#1e293b';
        }}
        style={{ 
          backgroundColor: '#111827', 
          borderRadius: '16px', 
          overflow: 'hidden', 
          border: '1px solid #1e293b',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease'
        }}
      >
        <div style={{ height: '4px', width: '100%', background: 'linear-gradient(90deg, #38bdf8, #818cf8)' }}></div>
        <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', fontWeight: '700', color: '#fff' }}>Kenji Auto Rentals</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px', flexGrow: 1 }}>
            Full-stack rental hub featuring safe user authentication pathways, conditional home-delivery parameters, and strict backend booking protections.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {['React', 'Vite', 'Supabase', 'PostgreSQL'].map(tech => (
              <span key={tech} style={{ backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '500' }}>{tech}</span>
            ))}
          </div>
          <a href="https://final-web-dev-project-sage.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#2563eb', color: '#fff', textAlign: 'center', padding: '12px', borderRadius: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600', fontSize: '0.95rem', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}>
            Launch App Demo <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* PROJECT 2: COSMETICS SALON APPLICATION */}
      <div 
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 30px 40px -10px rgba(236, 72, 153, 0.2)';
          e.currentTarget.style.borderColor = '#ec4899';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.4)';
          e.currentTarget.style.borderColor = '#1e293b';
        }}
        style={{ 
          backgroundColor: '#111827', 
          borderRadius: '16px', 
          overflow: 'hidden', 
          border: '1px solid #1e293b',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease'
        }}
      >
        <div style={{ height: '4px', width: '100%', background: 'linear-gradient(90deg, #ec4899, #a855f7)' }}></div>
        <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', fontWeight: '700', color: '#fff' }}>Cosmetics & Salon Storefront</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px', flexGrow: 1 }}>
            Sleek retail display featuring fast client category sorting filters, relational database records for individual stylists, and a responsive shopping checkout drawer.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {['React 19', 'Vite', 'Dynamic Arrays', 'CSS Grid'].map(tech => (
              <span key={tech} style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', color: '#f472b6', border: '1px solid rgba(236, 72, 153, 0.2)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '500' }}>{tech}</span>
            ))}
          </div>
          <div style={{ backgroundColor: '#1f2937', color: '#f472b6', border: '1px solid rgba(236, 72, 153, 0.3)', textAlign: 'center', padding: '12px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.95rem', fontWeight: '600' }}>
            Production Phase
          </div>
        </div>
      </div>
      
      {/* PROJECT 3: LEGACY PORTFOLIO */}
      <div 
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 30px 40px -10px rgba(16, 185, 129, 0.2)';
          e.currentTarget.style.borderColor = '#10b981';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.4)';
          e.currentTarget.style.borderColor = '#1e293b';
        }}
        style={{ 
          backgroundColor: '#111827', 
          borderRadius: '16px', 
          overflow: 'hidden', 
          border: '1px solid #1e293b',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease'
        }}
      >
        <div style={{ height: '4px', width: '100%', background: 'linear-gradient(90deg, #10b981, #06b6d4)' }}></div>
        <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', fontWeight: '700', color: '#fff' }}>Legacy Portfolio</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px', flexGrow: 1 }}>
            My previous personal archive showcasing my early design foundations, original interactive layouts, and core frontend engineering milestones.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {['HTML5', 'CSS3', 'JavaScript', 'Responsive'].map(tech => (
              <span key={tech} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '500' }}>{tech}</span>
            ))}
          </div>
          <a href="https://my-developer-portfolio-lemon.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#10b981', color: '#fff', textAlign: 'center', padding: '12px', borderRadius: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600', fontSize: '0.95rem', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}>
            View Legacy Site <ExternalLink size={16} />
          </a>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* 4. CONTACT PANEL */}
                  <section id="contact" style={{ padding: '60px 15px', maxWidth: '600px', margin: '0 auto', boxSizing: 'border-box' }}>
  <h2 style={{ fontSize: '1.75rem', textAlign: 'center', marginBottom: '15px' }}>Let's Start Your Project</h2>
  <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '40px', fontSize: '0.95rem', lineHeight: '1.5' }}>
    Need a custom booking setup or localized out-of-state SEO architecture? Send a message directly into my system.
  </p>
  
  <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', boxSizing: 'border-box' }}>
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#94a3b8' }}>Your Name</label>
      <input 
        type="text" 
        required 
        value={formData.name} 
        onChange={e => setFormData({...formData, name: e.target.value})} 
        style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#111827', border: '1px solid #1e293b', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }} 
      />
    </div>
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#94a3b8' }}>Email Address</label>
      <input 
        type="email" 
        required 
        value={formData.email} 
        onChange={e => setFormData({...formData, email: e.target.value})} 
        style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#111827', border: '1px solid #1e293b', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }} 
      />
    </div>
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#94a3b8' }}>Project Specifications</label>
      <textarea 
        rows="5" 
        required 
        value={formData.message} 
        onChange={e => setFormData({...formData, message: e.target.value})} 
        style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#111827', border: '1px solid #1e293b', color: '#fff', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box' }} 
        placeholder="Tell me about your business goals..."
      ></textarea>
    </div>
    <button 
      type="submit" 
      disabled={isSubmitting} 
      style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', padding: '14px', borderRadius: '8px', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: '0.3s', boxSizing: 'border-box' }}
    >
      {isSubmitting ? 'Transmitting...' : 'Send Message'}
    </button>
  </form>
</section>

    </div>
  )
}