import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Layers, Globe, ShieldCheck, ExternalLink } from 'lucide-react';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Custom hook to detect when elements enter the screen
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

// Reusable card component that slides in dynamically
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
        // Animation CSS states
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
  flexWrap: 'wrap', 
  alignItems: 'flex-start', // Changed to top-align the columns
  justifyContent: 'center', 
  gap: '50px',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '120px 20px 80px', 
  borderBottom: '1px solid #1e293b' 
}}>
  {/* Left Column: Image & Personal Bio */}
  <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
    <img 
      src="https://scontent-sea5-1.xx.fbcdn.net/v/t39.30808-6/511296655_9987679384613351_2192164889376400409_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=3lSVk-JE_JgQ7kNvwEyzFDQ&_nc_oc=AdoSsmNrLHuLrlMg70N1Sa-QluWBnIDAaLPilhK35zO2Xhx_-j7-urhoZLryRBttxSat4ksrowqaTbOQ4nIff4nY&_nc_zt=23&_nc_ht=scontent-sea5-1.xx&_nc_gid=yq8UDCypYrm_2FJaT-qxIQ&_nc_ss=7b2a8&oh=00_Af-7_I7z97qdCyXnIjAXf56o3e24OPJb09gD-s_x41zvmQ&oe=6A3FC104" // Replace with your image URL
      alt="Full-Stack Developer Portrait" 
      style={{ 
        width: '100%', 
        maxWidth: '300px', // Slightly smaller to balance the text below
        height: 'auto', 
        borderRadius: '50%', 
        border: '4px solid #1e293b',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
        marginBottom: '20px' // Space between image and bio
      }} 
    />
    {/* Personal Bio Under Image */}
    <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: '1.5', maxWidth: '300px', margin: '0' }}>
      "I build websites and navigate the digital world, but my favorite trails are the ones in the high terrains. Off-screen, you'll find me on the soccer field or enjoying a park sunset with my fiancée and our two faithful pups."
    </p>
  </div>

  {/* Right Column: Professional Headline & Core Info */}
  <div style={{ flex: '1 1 500px', textAlign: 'left', paddingTop: '100px' }}>
    <h1 style={{ 
      fontSize: '3rem', 
      fontWeight: '800', 
      marginBottom: '20px', 
      background: 'linear-gradient(90deg, #38bdf8, #818cf8)', 
      WebkitBackgroundClip: 'text', 
      WebkitTextFillColor: 'transparent',
      display: 'inline-block',
      lineHeight: '1.3',
      paddingBottom: '10px'
    }}>
      Full-Stack Web Developer
    </h1>
    
    <p style={{ fontSize: '1.25rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '30px' }}>
      Building secure, hour-precise booking engines, responsive client storefronts, and optimized database architectures.
    </p>
    
    <a href="#contact" style={{ backgroundColor: '#2563eb', color: '#fff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', transition: 'background-color 0.3s ease' }}>
      Let's Build Something Great
    </a>
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
            delay={0.15} // First card reveals instantly
          />

          <CapabilityCard 
            icon={Globe} 
            title="Local SEO Engineering" 
            description="Optimizing business profiles to list accurately on search tools, map directories, and structuring background tags so search engines rank platforms higher."
            delay={0.3} // Slight delay for stagger effect
          />

          <CapabilityCard 
            icon={ShieldCheck} 
            title="Full-Stack Integrations" 
            description="Connecting secure third-party checkout networks like Stripe seamlessly with backends like Supabase and PostgreSQL."
            delay={0.45} // Longest delay
          />

        </div>
      </section>

      {/* 3. CASE STUDIES GRID PANEL */}
      <section style={{ backgroundColor: '#0f172a', padding: '80px 20px', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '50px', fontWeight: '700' }}>Featured Projects & Apps</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px', justifyContent: 'center', alignItems: 'center' }}>
            
            {/* PROJECT 1: RENTAL APPLICATION */}
            <div style={{ backgroundColor: '#111827', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b' }}>
              <div style={{ padding: '25px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', fontWeight: '600' }}>Kenji Auto Rentals</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  Full-stack rental hub featuring safe user authentication pathways, conditional home-delivery parameters, and strict backend booking protections.
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {['React', 'Vite', 'Supabase', 'PostgreSQL'].map(tech => (
                    <span key={tech} style={{ backgroundColor: '#1e293b', color: '#38bdf8', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>{tech}</span>
                  ))}
                </div>
                <a href="https://final-web-dev-project-sage.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: '500' }}>
                  Launch App Demo <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* PROJECT 2: COSMETICS SALON APPLICATION */}
            <div style={{ backgroundColor: '#111827', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b' }}>
              <div style={{ padding: '25px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', fontWeight: '600' }}>Cosmetics & Salon Storefront</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  Sleek retail display featuring fast client category sorting filters, relational database records for individual stylists, and a responsive shopping checkout drawer.
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {['React 19', 'Vite', 'Dynamic Arrays', 'CSS Grid'].map(tech => (
                    <span key={tech} style={{ backgroundColor: '#1e293b', color: '#38bdf8', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>{tech}</span>
                  ))}
                </div>
                <span style={{ color: '#a1a1aa', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', fontStyle: 'italic' }}>
                  Development Phase
                </span>
              </div>
            </div>
            
            <div style={{ backgroundColor: '#111827', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b' }}>
              <div style={{ padding: '25px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', fontWeight: '600' }}>Legacy Portfolio</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  My previous personal archive showcasing my early design foundations, original interactive layouts, and core frontend engineering milestones.
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {['HTML5', 'CSS3', 'JavaScript', 'Responsive'].map(tech => (
                    <span key={tech} style={{ backgroundColor: '#1e293b', color: '#38bdf8', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>{tech}</span>
                  ))}
                </div>
                <a href="https://my-developer-portfolio-lemon.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: '500' }}>
                  View Legacy Site <ExternalLink size={16} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CONTACT PANEL */}
      <section id="contact" style={{ padding: '80px 20px', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '15px' }}>Let's Start Your Project</h2>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '40px' }}>Need a custom booking setup or localized out-of-state SEO architecture? Send a message directly into my system.</p>
        
        <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#94a3b8' }}>Your Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#111827', border: '1px solid #1e293b', color: '#fff', fontSize: '1rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#94a3b8' }}>Email Address</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#111827', border: '1px solid #1e293b', color: '#fff', fontSize: '1rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#94a3b8' }}>Project Specifications</label>
            <textarea rows="5" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#111827', border: '1px solid #1e293b', color: '#fff', fontSize: '1rem', resize: 'vertical' }} placeholder="Tell me about your business goals..."></textarea>
          </div>
          <button type="submit" disabled={isSubmitting} style={{ backgroundColor: '#2563eb', color: '#fff', padding: '14px', borderRadius: '8px', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: '0.3s' }}>
            {isSubmitting ? 'Transmitting...' : 'Send Message'}
          </button>
        </form>
      </section>

    </div>
  )
}