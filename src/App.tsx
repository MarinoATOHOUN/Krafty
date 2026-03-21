import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Star, 
  Hammer, 
  Paintbrush, 
  Wrench, 
  Zap, 
  ChevronRight, 
  User as UserIcon,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  Menu,
  X,
  Loader2,
  Send,
  Mail,
  MessageSquare,
  ArrowLeft,
  Clock,
  CheckCheck,
  Calendar,
  Bell,
  LayoutDashboard,
  TrendingUp,
  Users,
  CreditCard,
  Activity,
  Plus,
  Settings,
  LogOut,
  ChevronDown,
  Camera
} from 'lucide-react';
import { User, WorkerProfile, Message, Conversation, Notification, Job, Project } from './types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

// --- Components ---

const Navbar = ({ user, onLogout, onOpenAuth, onOpenLogin, onGoHome, onGoMessages, onGoNotifications, onGoDashboard, onGoProfile, unreadNotificationsCount }: { user: User | null, onLogout: () => void, onOpenAuth: () => void, onOpenLogin: () => void, onGoHome: () => void, onGoMessages: () => void, onGoNotifications: () => void, onGoDashboard: () => void, onGoProfile: () => void, unreadNotificationsCount: number }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'bg-white/80 backdrop-blur-xl py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => { onGoHome(); setIsMobileMenuOpen(false); }}>
            <div className="w-12 h-12 bg-[#5D2E17] rounded-xl flex items-center justify-center text-white shadow-2xl shadow-secondary/20 group-hover:rotate-12 transition-transform duration-500">
              <Hammer size={24} />
            </div>
            <span className="text-2xl font-serif font-black tracking-tighter text-secondary">KRAFTY</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {!user ? (
              <>
                <a href="#benefits" className="text-secondary/60 hover:text-primary font-bold transition-colors text-sm">Avantages</a>
                <a href="#faq" className="text-secondary/60 hover:text-primary font-bold transition-colors text-sm">FAQ</a>
                <button onClick={onOpenLogin} className="text-secondary/60 hover:text-primary font-bold transition-colors text-sm">Se connecter</button>
                <button 
                  onClick={onOpenAuth}
                  className="bg-secondary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary transition-all shadow-lg shadow-secondary/10 text-sm"
                >
                  S'inscrire
                </button>
              </>
            ) : (
              <div className="flex items-center gap-6">
                <button 
                  onClick={onGoDashboard}
                  className="text-secondary/60 hover:text-primary font-bold transition-colors flex items-center gap-2 group"
                >
                  <div className="p-2 group-hover:bg-primary/5 rounded-lg transition-colors">
                    <LayoutDashboard size={20} className="text-secondary/40 group-hover:text-primary" />
                  </div>
                  <span className="text-sm">Tableau de bord</span>
                </button>

                <button 
                  onClick={onGoMessages}
                  className="text-secondary/60 hover:text-primary font-bold transition-colors flex items-center gap-2 group"
                >
                  <div className="p-2 group-hover:bg-primary/5 rounded-lg transition-colors">
                    <MessageSquare size={20} className="text-secondary/40 group-hover:text-primary" />
                  </div>
                  <span className="text-sm">Messages</span>
                </button>

                <button 
                  onClick={onGoNotifications}
                  className="text-secondary/60 hover:text-primary font-bold transition-colors flex items-center gap-2 group"
                >
                  <div className="p-2 group-hover:bg-primary/5 rounded-lg transition-colors relative">
                    <Bell size={20} className="text-secondary/40 group-hover:text-primary" />
                    {unreadNotificationsCount > 0 && (
                      <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white translate-x-1/4 -translate-y-1/4">
                        {unreadNotificationsCount}
                      </span>
                    )}
                  </div>
                  <span className="text-sm">Notifications</span>
                </button>

                <button 
                  onClick={onGoProfile}
                  className="flex items-center gap-3 px-4 py-2 bg-secondary/5 rounded-full border border-secondary/5 hover:bg-secondary/10 transition-all cursor-pointer group"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-secondary shadow-lg group-hover:scale-110 transition-transform">
                    <UserIcon size={16} />
                  </div>
                  <span className="font-bold text-secondary text-sm">{user.full_name}</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="text-secondary/40 hover:text-primary font-bold transition-colors text-xs"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>

          <button 
            className="md:hidden p-2 text-secondary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {!user ? (
                <>
                  <a href="#benefits" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-secondary">Avantages</a>
                  <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-secondary">FAQ</a>
                  <button 
                    onClick={() => { onOpenLogin(); setIsMobileMenuOpen(false); }}
                    className="text-left text-2xl font-bold text-secondary"
                  >
                    Connexion
                  </button>
                  <button 
                    onClick={() => { onOpenAuth(); setIsMobileMenuOpen(false); }}
                    className="text-left text-2xl font-bold text-secondary"
                  >
                    Inscription
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => { onGoProfile(); setIsMobileMenuOpen(false); }}
                    className="p-6 bg-secondary/5 rounded-[2rem] mb-4 w-full text-left group hover:bg-secondary/10 transition-all"
                  >
                    <p className="text-secondary/40 text-sm font-bold uppercase mb-2">Connecté en tant que</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-secondary">{user.full_name}</p>
                      <UserIcon className="text-secondary/20 group-hover:text-primary transition-colors" size={24} />
                    </div>
                  </button>
                  <button 
                    onClick={() => { onGoDashboard(); setIsMobileMenuOpen(false); }}
                    className="text-left text-2xl font-bold text-secondary"
                  >
                    Tableau de bord
                  </button>
                  <button 
                    onClick={() => { onGoMessages(); setIsMobileMenuOpen(false); }}
                    className="text-left text-2xl font-bold text-secondary"
                  >
                    Messages
                  </button>
                  <button 
                    onClick={() => { onGoNotifications(); setIsMobileMenuOpen(false); }}
                    className="text-left text-2xl font-bold text-secondary"
                  >
                    Notifications {unreadNotificationsCount > 0 && `(${unreadNotificationsCount})`}
                  </button>
                  <button 
                    onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                    className="text-left text-2xl font-bold text-red-500"
                  >
                    Déconnexion
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = ({ onOpenAuth }: { onOpenAuth: () => void }) => {
  const { scrollY } = useScroll();
  const yBg1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const yBg2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const yIcons = useTransform(scrollY, [0, 1000], [0, 150]);

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-white">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          style={{ y: yBg1 }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"
        />
        <motion.div 
          style={{ y: yBg2 }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-40 -left-20 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px]"
        />

        {/* Floating Icons */}
        {[
          { Icon: Hammer, top: '15%', left: '10%', delay: 0, speed: 0.5 },
          { Icon: Wrench, top: '25%', left: '85%', delay: 1, speed: 0.8 },
          { Icon: Paintbrush, top: '75%', left: '15%', delay: 2, speed: 0.4 },
          { Icon: Zap, top: '85%', left: '75%', delay: 1.5, speed: 0.6 },
          { Icon: Star, top: '45%', left: '92%', delay: 0.5, speed: 0.7 },
          { Icon: ShieldCheck, top: '10%', left: '45%', delay: 2.5, speed: 0.3 },
        ].map((item, i) => {
          // Create unique parallax for each icon
          const yIcon = useTransform(scrollY, [0, 1000], [0, 200 * item.speed]);
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.2, 0],
                y: [0, -40, 0],
                x: [0, 20, 0],
                rotate: [0, 45, 0]
              }}
              transition={{ 
                duration: 8 + i, 
                repeat: Infinity, 
                delay: item.delay,
                ease: "easeInOut"
              }}
              className="absolute text-primary pointer-events-none"
              style={{ top: item.top, left: item.left, y: yIcon }}
            >
              <item.Icon size={32 + (i % 3) * 8} />
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface rounded-full mb-8 border border-secondary/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary/60">Disponible partout en Afrique</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-8 text-secondary tracking-tight">
            L'excellence <br />
            <span className="text-primary italic">artisanale</span> <br />
            en un clic.
          </h1>
          
          <p className="text-lg text-secondary/60 mb-10 leading-relaxed max-w-lg">
            Krafty connecte les meilleurs talents locaux aux projets qui comptent. Rapide, vérifié, et à deux pas de chez vous.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onOpenAuth}
              className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-base hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
            >
              Commencer maintenant
              <ArrowRight size={18} />
            </button>
            <button className="px-8 py-4 border-2 border-secondary/10 rounded-xl font-bold text-base hover:bg-secondary/5 transition-all">
              Voir les artisans
            </button>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/user${i}/100/100`} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="" referrerPolicy="no-referrer" />
              ))}
            </div>
            <div className="text-sm">
              <p className="font-bold text-secondary">10,000+ Utilisateurs</p>
              <p className="text-secondary/40">Confiance renouvelée chaque jour</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white">
            <img 
              src="https://picsum.photos/seed/craft/800/1000" 
              className="w-full aspect-[4/5] object-cover" 
              alt="Artisan au travail"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating dynamic cards */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-xl z-20 hidden md:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-secondary/40 uppercase">Vérifié</p>
                <p className="font-bold">Profil Certifié</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl z-20 hidden md:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <Star size={24} fill="currentColor" />
              </div>
              <div>
                <p className="text-xs font-bold text-secondary/40 uppercase">Satisfaction</p>
                <p className="font-bold">4.9/5 Moyenne</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Benefits = () => {
  const benefits = [
    {
      title: "Gagnez un temps précieux",
      desc: "Plus besoin de chercher pendant des heures. Trouvez l'artisan idéal en moins de 2 minutes grâce à notre recherche intelligente.",
      icon: <Zap className="text-primary" size={32} />
    },
    {
      title: "Tranquillité d'esprit",
      desc: "Tous nos artisans sont rigoureusement vérifiés. Identité, compétences et antécédents sont passés au crible pour votre sécurité.",
      icon: <ShieldCheck className="text-primary" size={32} />
    },
    {
      title: "Qualité Garantie",
      desc: "Consultez les avis réels et le portfolio de chaque artisan avant de l'engager. Pas de mauvaises surprises, que du travail pro.",
      icon: <Star className="text-primary" size={32} />
    }
  ];

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24"
        >
          <Hammer size={200} />
        </motion.div>
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -right-24"
        >
          <Wrench size={200} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 tracking-tight">Pourquoi choisir Krafty ?</h2>
          <p className="text-secondary/60 max-w-2xl mx-auto text-lg leading-relaxed">Nous avons repensé la mise en relation pour offrir une expérience fluide, sécurisée et valorisante pour tous.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((b, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-secondary/5"
            >
              <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6">
                {b.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{b.title}</h3>
              <p className="text-sm text-secondary/60 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section className="py-20 border-y border-secondary/5">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-secondary/30 mb-12">Ils nous font confiance</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
          {/* Placeholder for partner logos */}
          <div className="text-xl font-black italic tracking-tighter">BUILDER.CO</div>
          <div className="text-xl font-black italic tracking-tighter">AFRICA.TECH</div>
          <div className="text-xl font-black italic tracking-tighter">LOCAL.PRO</div>
          <div className="text-xl font-black italic tracking-tighter">CRAFT.HUB</div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-secondary text-white p-10 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="flex gap-1 text-primary mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-xl font-serif italic mb-6 leading-relaxed">"J'ai trouvé un électricien en 5 minutes pour une urgence un dimanche. Le travail était impeccable et le prix très correct. Je recommande Krafty à tout mon entourage."</p>
            <div className="flex items-center gap-3">
              <img src="https://picsum.photos/seed/test1/100/100" className="w-10 h-10 rounded-full object-cover" alt="" referrerPolicy="no-referrer" />
              <div>
                <p className="font-bold text-sm">Amadou Koné</p>
                <p className="text-white/40 text-xs">Client à Dakar</p>
              </div>
            </div>
          </div>
          
          <div className="bg-primary text-white p-10 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="flex gap-1 text-white mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-xl font-serif italic mb-6 leading-relaxed">"Depuis que je suis sur Krafty, mon carnet de commandes est toujours plein. La plateforme me permet de montrer mon travail et de gagner la confiance de nouveaux clients."</p>
            <div className="flex items-center gap-3">
              <img src="https://picsum.photos/seed/test2/100/100" className="w-10 h-10 rounded-full object-cover" alt="" referrerPolicy="no-referrer" />
              <div>
                <p className="font-bold text-sm">Moussa Diop</p>
                <p className="text-white/60 text-xs">Plombier à Abidjan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "Comment sont vérifiés les artisans ?", a: "Nous vérifions systématiquement les pièces d'identité, les diplômes ou certifications professionnelles, et nous effectuons des appels de référence pour chaque nouvel inscrit." },
    { q: "Est-ce gratuit pour les clients ?", a: "Oui, la recherche et la prise de contact avec les artisans sont totalement gratuites pour les clients." },
    { q: "Comment se passe le paiement ?", a: "Le paiement se fait directement entre vous et l'artisan. Nous recommandons de toujours demander un devis écrit avant le début des travaux." },
    { q: "Que faire en cas de litige ?", a: "Notre service client est là pour arbitrer et vous aider à trouver une solution amiable. Nous pouvons également suspendre les profils ne respectant pas notre charte qualité." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold mb-12 text-center tracking-tight">Questions fréquentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-secondary/5 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-5 text-left flex justify-between items-center hover:bg-surface transition-colors"
              >
                <span className="font-bold text-base">{faq.q}</span>
                <ChevronRight className={`transition-transform ${openIndex === i ? 'rotate-90' : ''}`} size={20} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 text-sm text-secondary/60 leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (view: 'privacy' | 'terms' | 'contact') => void }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-secondary text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white">
                <Hammer size={16} />
              </div>
              <span className="text-lg font-bold tracking-tighter uppercase">KRAFTY</span>
            </div>
            <p className="text-white/60 max-w-sm mb-6 text-sm">
              La plateforme qui connecte les meilleurs artisans avec les projets les plus ambitieux. Qualité, confiance et savoir-faire.
            </p>
            <div className="flex gap-4">
              <button onClick={() => onNavigate('privacy')} className="text-white/40 hover:text-primary transition-colors text-xs">Confidentialité</button>
              <button onClick={() => onNavigate('terms')} className="text-white/40 hover:text-primary transition-colors text-xs">Conditions</button>
              <button onClick={() => onNavigate('contact')} className="text-white/40 hover:text-primary transition-colors text-xs">Contact</button>
            </div>
          </div>
          
          <div>
            <h4 className="text-base font-bold mb-4">Restez informé</h4>
            <p className="text-white/60 mb-4 text-xs">Inscrivez-vous à notre newsletter pour recevoir nos conseils et actualités.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input 
                type="email" 
                placeholder="votre@email.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary transition-colors text-xs"
              />
              <button 
                type="submit"
                className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center gap-2 text-xs"
              >
                {subscribed ? "Merci !" : "S'abonner"}
                {!subscribed && <Send size={14} />}
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-[10px]">© 2026 Krafty. Tous droits réservés.</p>
          <div className="flex gap-6">
            {/* Social icons could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

const PrivacyPage = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-surface py-20 px-6">
    <div className="max-w-3xl mx-auto bg-white p-12 lg:p-20 rounded-[3rem] shadow-xl border border-secondary/5">
      <button onClick={onBack} className="flex items-center gap-2 text-secondary/40 hover:text-primary transition-colors font-bold mb-12">
        <ArrowRight className="rotate-180" size={20} />
        Retour
      </button>
      <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-10">Politique de Confidentialité</h1>
      <div className="prose prose-stone max-w-none text-secondary/70 space-y-6">
        <p>Chez Krafty, nous accordons une importance capitale à la protection de vos données personnelles. Cette politique détaille comment nous collectons, utilisons et protégeons vos informations.</p>
        <h2 className="text-2xl font-bold text-secondary mt-8">1. Collecte des données</h2>
        <p>Nous collectons les informations que vous nous fournissez lors de votre inscription (nom, email, localisation) ainsi que les données liées à votre utilisation de la plateforme.</p>
        <h2 className="text-2xl font-bold text-secondary mt-8">2. Utilisation des données</h2>
        <p>Vos données sont utilisées pour assurer le bon fonctionnement du service, faciliter la mise en relation entre clients et artisans, et améliorer votre expérience utilisateur.</p>
        <h2 className="text-2xl font-bold text-secondary mt-8">3. Sécurité</h2>
        <p>Nous mettons en œuvre des mesures de sécurité robustes pour protéger vos données contre tout accès non autorisé ou divulgation.</p>
      </div>
    </div>
  </div>
);

const TermsPage = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-surface py-20 px-6">
    <div className="max-w-3xl mx-auto bg-white p-12 lg:p-20 rounded-[3rem] shadow-xl border border-secondary/5">
      <button onClick={onBack} className="flex items-center gap-2 text-secondary/40 hover:text-primary transition-colors font-bold mb-12">
        <ArrowRight className="rotate-180" size={20} />
        Retour
      </button>
      <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-10">Conditions Générales d'Utilisation</h1>
      <div className="prose prose-stone max-w-none text-secondary/70 space-y-6">
        <p>Bienvenue sur Krafty. En utilisant notre plateforme, vous acceptez les présentes conditions générales d'utilisation.</p>
        <h2 className="text-2xl font-bold text-secondary mt-8">1. Objet du service</h2>
        <p>Krafty est une plateforme de mise en relation entre des clients et des artisans professionnels.</p>
        <h2 className="text-2xl font-bold text-secondary mt-8">2. Responsabilité</h2>
        <p>Krafty agit en tant qu'intermédiaire. Les artisans sont responsables de la qualité de leurs travaux et du respect des engagements pris auprès des clients.</p>
        <h2 className="text-2xl font-bold text-secondary mt-8">3. Utilisation interdite</h2>
        <p>Il est interdit d'utiliser la plateforme pour des activités illégales, frauduleuses ou nuisibles à autrui.</p>
      </div>
    </div>
  </div>
);

const ContactPage = ({ onBack }: { onBack: () => void }) => {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-surface py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-[3rem] shadow-xl overflow-hidden border border-secondary/5">
        <div className="bg-primary p-12 lg:p-20 text-white flex flex-col justify-center">
          <button onClick={onBack} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-bold mb-12">
            <ArrowRight className="rotate-180" size={20} />
            Retour
          </button>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-8">Contactez-nous</h1>
          <p className="text-white/80 text-lg mb-12">Une question ? Un besoin d'assistance ? Notre équipe est là pour vous aider.</p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"><Mail size={24} /></div>
              <div>
                <p className="text-sm text-white/60">Email</p>
                <p className="font-bold">contact@krafty.fr</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"><MapPin size={24} /></div>
              <div>
                <p className="text-sm text-white/60">Bureaux</p>
                <p className="font-bold">123 Rue de l'Artisanat, Paris</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-12 lg:p-20 flex flex-col justify-center">
          {sent ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Message envoyé !</h2>
              <p className="text-secondary/60 mb-8">Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
              <button onClick={onBack} className="text-primary font-bold hover:underline">Retour à l'accueil</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary/60">Nom complet</label>
                <input type="text" required className="w-full px-6 py-4 bg-surface border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Jean Dupont" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary/60">Email</label>
                <input type="email" required className="w-full px-6 py-4 bg-surface border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all" placeholder="jean@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary/60">Message</label>
                <textarea required rows={4} className="w-full px-6 py-4 bg-surface border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all resize-none" placeholder="Comment pouvons-nous vous aider ?"></textarea>
              </div>
              <button type="submit" className="w-full bg-secondary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary transition-all shadow-xl shadow-secondary/10">
                Envoyer le message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const MOCK_WORKERS: WorkerProfile[] = [
  { id: 1, email: "moussa@example.com", role: "worker", full_name: "Moussa Diop", location: "Dakar, Sénégal", specialty: "Plombier", bio: "Expert en plomberie sanitaire et industrielle avec 10 ans d'expérience.", experience_years: 10, rating: 4.8, avatar_url: "https://picsum.photos/seed/moussa/400/400", reviews: [] },
  { id: 2, email: "fatou@example.com", role: "worker", full_name: "Fatou Sow", location: "Abidjan, Côte d'Ivoire", specialty: "Électricienne", bio: "Spécialisée en installation solaire et maintenance électrique.", experience_years: 7, rating: 4.9, avatar_url: "https://picsum.photos/seed/fatou/400/400", reviews: [] },
  { id: 3, email: "kofi@example.com", role: "worker", full_name: "Kofi Mensah", location: "Accra, Ghana", specialty: "Maçon", bio: "Maître maçon spécialisé dans la construction écologique.", experience_years: 15, rating: 4.7, avatar_url: "https://picsum.photos/seed/kofi/400/400", reviews: [] },
  { id: 4, email: "amina@example.com", role: "worker", full_name: "Amina Traoré", location: "Bamako, Mali", specialty: "Peintre", bio: "Artiste peintre et décoratrice d'intérieur.", experience_years: 5, rating: 4.6, avatar_url: "https://picsum.photos/seed/amina/400/400", reviews: [] },
  { id: 5, email: "jean@example.com", role: "worker", full_name: "Jean Kabore", location: "Ouagadougou, Burkina Faso", specialty: "Menuisier", bio: "Création de meubles sur mesure et charpente.", experience_years: 12, rating: 4.9, avatar_url: "https://picsum.photos/seed/jean/400/400", reviews: [] },
  { id: 6, email: "sarah@example.com", role: "worker", full_name: "Sarah Okafor", location: "Lagos, Nigeria", specialty: "Soudeuse", bio: "Soudure de précision et structures métalliques.", experience_years: 8, rating: 4.5, avatar_url: "https://picsum.photos/seed/sarah/400/400", reviews: [] },
];

const WorkerFeed = ({ onSelectWorker }: { onSelectWorker: (id: number) => void }) => {
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');

  const specialties = ["Tous", "Plombier", "Électricien", "Maçon", "Peintre", "Menuisier", "Soudeur"];

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true);
      
      // Simulation logic
      setTimeout(() => {
        let filtered = [...MOCK_WORKERS];
        if (specialty && specialty !== "Tous") {
          filtered = filtered.filter(w => w.specialty === specialty);
        }
        if (search) {
          const s = search.toLowerCase();
          filtered = filtered.filter(w => 
            w.full_name.toLowerCase().includes(s) || 
            w.specialty.toLowerCase().includes(s)
          );
        }
        setWorkers(filtered);
        setLoading(false);
      }, 800);
    };
    fetchWorkers();
  }, [specialty, search]);

  return (
    <div className="min-h-screen bg-surface pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-serif font-bold mb-6 tracking-tight leading-none"
          >
            Trouvez votre <span className="text-primary italic">expert</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-secondary/50 text-xl lg:text-2xl font-light"
          >
            Découvrez les meilleurs artisans qualifiés près de chez vous.
          </motion.p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-20 space-y-8">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/10 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-white rounded-2xl shadow-2xl shadow-secondary/5 overflow-hidden border border-secondary/5">
              <Search className="ml-8 text-secondary/20" size={24} />
              <input 
                type="text" 
                placeholder="Rechercher un artisan ou une spécialité..."
                className="w-full px-6 py-7 bg-transparent border-none focus:ring-0 text-xl placeholder:text-secondary/20 font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {specialties.map((s, i) => (
              <motion.button
                key={s}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSpecialty(s)}
                className={`px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 border ${
                  specialty === s || (s === "Tous" && !specialty) 
                    ? 'bg-secondary text-white border-secondary shadow-xl shadow-secondary/20 scale-105' 
                    : 'bg-white text-secondary/40 border-secondary/5 hover:border-primary/20 hover:text-primary'
                }`}
              >
                {s}
              </motion.button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white rounded-2xl aspect-[4/5] animate-pulse border border-secondary/5" />
            ))}
          </div>
        ) : workers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {workers.map((worker, i) => (
              <motion.div 
                key={worker.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => onSelectWorker(worker.id)}
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 shadow-xl shadow-secondary/5 border border-secondary/5">
                  <img 
                    src={worker.avatar_url || `https://picsum.photos/seed/${worker.id}/800/1000`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt={worker.full_name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xl px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-yellow-500 shadow-lg border border-white/20">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-black text-secondary">{worker.rating?.toFixed(1)}</span>
                  </div>

                  {/* Experience Badge */}
                  {worker.experience_years && (
                    <div className="absolute bottom-4 left-4 bg-primary/90 backdrop-blur-xl px-3 py-1.5 rounded-lg text-[9px] font-black text-white uppercase tracking-widest shadow-lg">
                      {worker.experience_years} ans d'expérience
                    </div>
                  )}

                  {/* Hover Action */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-white text-secondary px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 text-sm">
                      Voir le profil
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

                <div className="px-2">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-secondary group-hover:text-primary transition-colors">{worker.full_name}</h3>
                      <div className="flex items-center gap-2.5 mt-0.5">
                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">{worker.specialty}</span>
                        <div className="w-1 h-1 bg-secondary/20 rounded-full" />
                        <div className="flex items-center gap-1 text-secondary/40 text-[10px] font-bold">
                          <MapPin size={10} />
                          <span>{worker.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-secondary/40 text-xs line-clamp-2 leading-relaxed font-medium">
                    {worker.bio || "Artisan passionné avec une solide expérience dans le domaine. Je m'engage à fournir un travail de qualité..."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-secondary/10">
            <div className="w-16 h-16 bg-secondary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary/10">
              <Search size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-3">Aucun artisan trouvé</h3>
            <p className="text-secondary/40 text-base max-w-md mx-auto">Nous n'avons pas trouvé d'artisan correspondant à vos critères. Essayez d'élargir votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const LoginPage = ({ onBack, onAuthSuccess, onSwitchToRegister }: { onBack: () => void, onAuthSuccess: (u: User) => void, onSwitchToRegister: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulation logic
    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('krafty_simulated_users') || '[]');
      const user = storedUsers.find((u: any) => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        onAuthSuccess(user);
      } else {
        // Default admin user for demo
        if (formData.email === 'admin@krafty.com' && formData.password === 'admin') {
          const adminUser: User = { id: 999, email: 'admin@krafty.com', full_name: 'Admin Krafty', role: 'client' };
          onAuthSuccess(adminUser);
        } else {
          alert("Identifiants incorrects. (Utilisez admin@krafty.com / admin pour tester)");
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 lg:p-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-7xl bg-white rounded-3xl lg:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-secondary/10 min-h-fit lg:min-h-[80vh]"
      >
        {/* Left: Description */}
        <div className="w-full lg:w-1/2 bg-surface p-8 lg:p-20 flex flex-col justify-center relative">
          <button onClick={onBack} className="absolute top-6 left-6 lg:top-12 lg:left-12 flex items-center gap-2 text-secondary/60 hover:text-primary transition-colors font-bold text-sm lg:text-base">
            <ArrowRight className="rotate-180" size={20} />
            <span>Retour à l'accueil</span>
          </button>
          
          <div className="max-w-md mx-auto lg:mx-0 mt-12 lg:mt-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 lg:mb-8 leading-tight">Accédez à votre <span className="text-primary italic">espace</span> Krafty.</h2>
            <p className="text-sm lg:text-base text-secondary/60 mb-8 lg:mb-10 leading-relaxed">
              Connectez-vous pour gérer vos projets, discuter avec vos artisans et suivre l'avancement de vos travaux en temps réel.
            </p>
            <div className="space-y-4 lg:space-y-6">
              <div className="flex items-center gap-4 lg:gap-5">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-xl lg:rounded-2xl shadow-sm flex items-center justify-center text-primary shrink-0">
                  <Zap size={18} className="lg:w-6 lg:h-6" />
                </div>
                <p className="text-sm lg:text-base font-bold">Suivi en temps réel</p>
              </div>
              <div className="flex items-center gap-4 lg:gap-5">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-xl lg:rounded-2xl shadow-sm flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck size={18} className="lg:w-6 lg:h-6" />
                </div>
                <p className="text-sm lg:text-base font-bold">Paiements sécurisés</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center items-center relative overflow-hidden bg-white">
          <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none">
            <Hammer size={400} />
          </div>
          
          <div className="w-full max-w-md relative z-10">
            <div className="mb-8 lg:mb-10 text-center lg:text-left">
              <h1 className="text-2xl lg:text-3xl font-serif font-bold mb-2 lg:mb-3">Bon retour !</h1>
              <p className="text-xs lg:text-sm text-secondary/40">Entrez vos identifiants pour continuer.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
              <div className="space-y-1 lg:space-y-1.5">
                <label className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-secondary/40 ml-1">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-3 bg-surface border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-1 lg:space-y-1.5">
                <label className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-secondary/40 ml-1">Mot de passe</label>
                <input 
                  type="password" 
                  required
                  className="w-full px-4 py-3 bg-surface border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <button 
                disabled={loading}
                className="w-full bg-secondary text-white py-4 rounded-xl font-bold text-sm hover:bg-primary transition-all shadow-xl shadow-secondary/10 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {loading && <Loader2 className="animate-spin" size={18} />}
                Se connecter
              </button>
            </form>

            <p className="mt-8 lg:mt-10 text-center text-xs lg:text-sm text-secondary/40">
              Pas encore de compte ? 
              <button onClick={onSwitchToRegister} className="ml-2 text-primary font-bold hover:underline">Inscrivez-vous</button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const RegisterPage = ({ onBack, onAuthSuccess, onSwitchToLogin }: { onBack: () => void, onAuthSuccess: (u: User) => void, onSwitchToLogin: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'client' | 'worker'>('client');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    location: '',
    specialty: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulation logic
    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('krafty_simulated_users') || '[]');
      
      if (storedUsers.some((u: any) => u.email === formData.email)) {
        alert("Cet email est déjà utilisé.");
        setLoading(false);
        return;
      }

      const newUser: User = {
        id: Date.now(),
        email: formData.email,
        full_name: formData.full_name,
        role
      };

      storedUsers.push(newUser);
      localStorage.setItem('krafty_simulated_users', JSON.stringify(storedUsers));
      
      onAuthSuccess(newUser);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 lg:p-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-7xl bg-white rounded-3xl lg:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-secondary/10 min-h-fit lg:min-h-[80vh]"
      >
        {/* Left: Description */}
        <div className="w-full lg:w-1/2 bg-primary/5 p-8 lg:p-20 flex flex-col justify-center relative">
          <button onClick={onBack} className="absolute top-6 left-6 lg:top-12 lg:left-12 flex items-center gap-2 text-secondary/60 hover:text-primary transition-colors font-bold text-sm lg:text-base">
            <ArrowRight className="rotate-180" size={20} />
            <span>Retour à l'accueil</span>
          </button>
          
          <div className="max-w-md mx-auto lg:mx-0 mt-12 lg:mt-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 lg:mb-8 leading-tight">Rejoignez la <span className="text-primary italic">révolution</span> de l'artisanat.</h2>
            <p className="text-sm lg:text-base text-secondary/60 mb-8 lg:mb-10 leading-relaxed">
              Que vous soyez un client à la recherche d'excellence ou un artisan souhaitant valoriser son savoir-faire, Krafty est fait pour vous.
            </p>
            <div className="grid grid-cols-1 gap-4 lg:gap-6">
              <div className="p-4 lg:p-6 bg-white rounded-xl lg:rounded-[2rem] shadow-sm border border-primary/10">
                <h3 className="font-bold text-base lg:text-lg mb-1 lg:mb-2">Pour les Clients</h3>
                <p className="text-xs lg:text-sm text-secondary/60 leading-relaxed">Accès gratuit à des milliers d'artisans vérifiés et certifiés près de chez vous.</p>
              </div>
              <div className="p-4 lg:p-6 bg-white rounded-xl lg:rounded-[2rem] shadow-sm border border-primary/10">
                <h3 className="font-bold text-base lg:text-lg mb-1 lg:mb-2">Pour les Artisans</h3>
                <p className="text-xs lg:text-sm text-secondary/60 leading-relaxed">Boostez votre visibilité, gérez vos avis et trouvez des chantiers qualifiés.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center items-center relative overflow-hidden bg-white">
          <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none">
            <Wrench size={400} />
          </div>

          <div className="w-full max-w-md relative z-10">
            <div className="mb-8 lg:mb-10 text-center lg:text-left">
              <h1 className="text-2xl lg:text-3xl font-serif font-bold mb-2 lg:mb-3">Créer un compte</h1>
              <p className="text-xs lg:text-sm text-secondary/40">Choisissez votre profil et commencez l'aventure.</p>
            </div>

            <div className="flex p-1 bg-surface rounded-xl lg:rounded-2xl mb-6 lg:mb-8">
              <button 
                onClick={() => setRole('client')}
                className={`flex-1 py-2 lg:py-2.5 text-xs font-bold rounded-lg lg:rounded-xl transition-all ${role === 'client' ? 'bg-white shadow-sm text-primary' : 'text-secondary/40'}`}
              >
                Client
              </button>
              <button 
                onClick={() => setRole('worker')}
                className={`flex-1 py-2 lg:py-2.5 text-xs font-bold rounded-lg lg:rounded-xl transition-all ${role === 'worker' ? 'bg-white shadow-sm text-primary' : 'text-secondary/40'}`}
              >
                Artisan
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4">
              <input 
                type="text" 
                placeholder="Nom complet" 
                required
                className="w-full px-4 py-3 bg-surface border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                value={formData.full_name}
                onChange={e => setFormData({...formData, full_name: e.target.value})}
              />
              <input 
                type="email" 
                placeholder="Email" 
                required
                className="w-full px-4 py-3 bg-surface border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <input 
                type="password" 
                placeholder="Mot de passe" 
                required
                className="w-full px-4 py-3 bg-surface border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Ville / Localisation" 
                required
                className="w-full px-4 py-3 bg-surface border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
              {role === 'worker' && (
                <input 
                  type="text" 
                  placeholder="Spécialité" 
                  required
                  className="w-full px-4 py-3 bg-surface border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  value={formData.specialty}
                  onChange={e => setFormData({...formData, specialty: e.target.value})}
                />
              )}
              <button 
                disabled={loading}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {loading && <Loader2 className="animate-spin" size={18} />}
                Créer mon compte
              </button>
            </form>

            <p className="mt-8 lg:mt-10 text-center text-xs lg:text-sm text-secondary/40">
              Déjà inscrit ? 
              <button onClick={onSwitchToLogin} className="ml-2 text-primary font-bold hover:underline">Connectez-vous</button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const StickyCTA = ({ onOpenAuth, show }: { onOpenAuth: () => void, show: boolean }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-0 right-0 z-40 px-6 flex justify-center pointer-events-none"
        >
          <button
            onClick={onOpenAuth}
            className="pointer-events-auto bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-2xl shadow-primary/40 flex items-center gap-2 hover:scale-105 transition-transform text-sm"
          >
            <span>Rejoindre Krafty gratuitement</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AuthModal = ({ isOpen, onClose, onAuthSuccess }: { isOpen: boolean, onClose: () => void, onAuthSuccess: (u: User) => void }) => {
  return null; // Deprecated in favor of full pages
};

const RecruitmentModal = ({ worker, onClose, onConfirm }: { worker: WorkerProfile, onClose: () => void, onConfirm: (details: any) => void }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    title: '',
    description: '',
    date: '',
    address: '',
    budget: ''
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    onConfirm(details);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-secondary/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-secondary/5 flex justify-between items-center bg-surface/50">
          <div>
            <h2 className="text-xl font-serif font-bold text-secondary">Engager {worker.full_name.split(' ')[0]}</h2>
            <p className="text-xs text-secondary/40">Étape {step} sur 3</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-secondary/5 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-secondary/40">Titre de la mission</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Réparation fuite évier" 
                    className="w-full px-4 py-3 bg-surface border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                    value={details.title}
                    onChange={e => setDetails({...details, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-secondary/40">Description détaillée</label>
                  <textarea 
                    placeholder="Décrivez précisément ce que vous attendez..." 
                    rows={4}
                    className="w-full px-4 py-3 bg-surface border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none"
                    value={details.description}
                    onChange={e => setDetails({...details, description: e.target.value})}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-secondary/40">Date souhaitée</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={18} />
                    <input 
                      type="date" 
                      className="w-full pl-12 pr-4 py-3 bg-surface border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      value={details.date}
                      onChange={e => setDetails({...details, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-secondary/40">Adresse de la mission</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={18} />
                    <input 
                      type="text" 
                      placeholder="Rue, Ville, Code postal"
                      className="w-full pl-12 pr-4 py-3 bg-surface border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      value={details.address}
                      onChange={e => setDetails({...details, address: e.target.value})}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <ShieldCheck size={18} />
                    Récapitulatif
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-secondary/40">Mission:</span>
                      <span className="font-bold text-secondary">{details.title || "Non spécifié"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary/40">Date:</span>
                      <span className="font-bold text-secondary">{details.date || "À convenir"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary/40">Lieu:</span>
                      <span className="font-bold text-secondary">{details.address || "Non spécifié"}</span>
                    </div>
                    <div className="pt-2 border-t border-primary/10 flex justify-between">
                      <span className="text-secondary/40">Tarif horaire:</span>
                      <span className="font-bold text-primary">{worker.price_per_hour || 25}€/h</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-secondary/40 text-center italic">
                  En confirmant, une demande sera envoyée à l'artisan qui pourra l'accepter ou vous proposer un créneau différent.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 bg-surface/50 border-t border-secondary/5 flex gap-3">
          {step > 1 && (
            <button 
              onClick={handleBack}
              className="px-6 py-3 border border-secondary/10 rounded-xl font-bold text-sm hover:bg-secondary/5 transition-all"
            >
              Retour
            </button>
          )}
          {step < 3 ? (
            <button 
              onClick={handleNext}
              disabled={step === 1 && !details.title}
              className="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              Continuer
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? "Envoi en cours..." : "Confirmer l'engagement"}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const WorkerDetailPage = ({ workerId, onBack, onMessage }: { workerId: number, onBack: () => void, onMessage: (worker: WorkerProfile) => void }) => {
  const [worker, setWorker] = useState<WorkerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRecruitmentModal, setShowRecruitmentModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hired, setHired] = useState(false);

  useEffect(() => {
    const fetchWorker = async () => {
      setLoading(true);
      
      // Simulation logic
      setTimeout(() => {
        const w = MOCK_WORKERS.find(w => w.id === workerId);
        if (w) {
          setWorker({
            ...w,
            reviews: [
              { id: 1, worker_id: w.id, client_id: 101, rating: 5, comment: "Excellent travail, très professionnel !", client_name: "Alice Dupont", created_at: "2024-01-15" },
              { id: 2, worker_id: w.id, client_id: 102, rating: 4, comment: "Ponctuel et efficace.", client_name: "Bob Martin", created_at: "2024-02-10" }
            ]
          });
        }
        setLoading(false);
        window.scrollTo(0, 0);
      }, 600);
    };
    fetchWorker();
  }, [workerId]);

  const handleHireConfirm = (details: any) => {
    setShowRecruitmentModal(false);
    setHired(true);
    // In a real app, we'd save the recruitment details to the database
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-secondary/40 font-medium">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!worker) return null;

  return (
    <div className="min-h-screen bg-surface pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <button onClick={onBack} className="flex items-center gap-2 text-secondary/40 hover:text-primary transition-colors font-bold mb-6 text-sm">
          <ArrowRight className="rotate-180" size={16} />
          Retour au flux
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-secondary/5"
        >
          <div className="lg:w-2/5 h-[400px] lg:h-auto relative">
            <img 
              src={worker.avatar_url || `https://picsum.photos/seed/${worker.id}/800/1200`} 
              className="w-full h-full object-cover"
              alt={worker.full_name}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
              <h1 className="text-xl md:text-2xl font-serif font-bold mb-0.5 leading-tight">{worker.full_name}</h1>
              <p className="text-xs opacity-90 font-medium">{worker.specialty}</p>
            </div>
          </div>
          
          <div className="flex-1 p-6 lg:p-12">
            <div className="hidden lg:block mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-2">{worker.full_name}</h1>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[9px] font-black uppercase tracking-widest">{worker.specialty}</span>
                    <div className="flex items-center gap-1.5 text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="font-bold text-lg text-secondary">{worker.rating?.toFixed(1)}</span>
                      <span className="text-secondary/40 text-sm">({worker.reviews.length} avis)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 mb-10">
              <div className="p-3 bg-surface rounded-xl text-center border border-secondary/5">
                <Briefcase className="mx-auto mb-1.5 text-primary" size={18} />
                <p className="text-[9px] text-secondary/40 uppercase font-black tracking-widest mb-0.5">Expérience</p>
                <p className="text-base font-bold">{worker.experience_years || 5}+ ans</p>
              </div>
              <div className="p-3 bg-surface rounded-xl text-center border border-secondary/5">
                <ShieldCheck className="mx-auto mb-1.5 text-primary" size={18} />
                <p className="text-[9px] text-secondary/40 uppercase font-black tracking-widest mb-0.5">Vérifié</p>
                <p className="text-base font-bold">Identité OK</p>
              </div>
              <div className="p-3 bg-surface rounded-xl text-center border border-secondary/5">
                <MapPin className="mx-auto mb-1.5 text-primary" size={18} />
                <p className="text-[9px] text-secondary/40 uppercase font-black tracking-widest mb-0.5">Localisation</p>
                <p className="text-base font-bold">{worker.location}</p>
              </div>
            </div>

            <div className="space-y-10">
              <section>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  À propos
                </h3>
                <p className="text-sm text-secondary/70 leading-relaxed">
                  {worker.bio || "Artisan passionné avec une solide expérience dans le domaine. Je m'engage à fournir un travail de qualité, durable et respectueux des normes de sécurité. Disponible pour tous vos projets, petits ou grands."}
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  Réalisations
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[1,2,3,4,5,6].map(i => {
                    const mockProject: Project = {
                      id: i,
                      worker_id: worker.id,
                      title: `Projet de ${worker.specialty} #${i}`,
                      description: "Une réalisation exemplaire démontrant notre savoir-faire et notre attention aux détails. Ce projet a été mené à bien en respectant tous les délais et les exigences du client.",
                      image_url: `https://picsum.photos/seed/work${worker.id}${i}/800/800`,
                      category: worker.specialty || 'Artisanat',
                      date: 'Octobre 2025'
                    };
                    return (
                      <button 
                        key={i} 
                        onClick={() => setSelectedProject(mockProject)}
                        className="group relative overflow-hidden rounded-xl aspect-square"
                      >
                        <img 
                          src={mockProject.image_url} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          alt={mockProject.title} 
                          referrerPolicy="no-referrer" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Plus className="text-white" size={32} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  Avis Clients
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {worker.reviews.length > 0 ? worker.reviews.map(review => (
                    <div key={review.id} className="p-5 border border-secondary/5 rounded-2xl bg-surface relative">
                      <div className="flex justify-between items-center mb-3">
                        <p className="font-bold text-base">{review.client_name}</p>
                        <div className="flex text-yellow-500 gap-1 text-sm"><Star size={14} fill="currentColor" /> {review.rating}</div>
                      </div>
                      <p className="text-secondary/60 text-xs italic leading-relaxed">"{review.comment}"</p>
                      <p className="text-[9px] text-secondary/20 uppercase font-bold mt-3">Vérifié par Krafty</p>
                    </div>
                  )) : (
                    <p className="text-secondary/40 text-sm italic">Aucun avis pour le moment.</p>
                  )}
                </div>
              </section>
            </div>

            <div className="mt-16 pt-8 border-t border-secondary/5 flex flex-col sm:flex-row gap-3">
              {hired ? (
                <div className="flex-1 bg-green-500/10 text-green-600 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 border border-green-500/20">
                  <ShieldCheck size={20} />
                  Demande envoyée
                </div>
              ) : (
                <button 
                  onClick={() => setShowRecruitmentModal(true)}
                  className="flex-1 bg-primary text-white py-4 rounded-xl font-bold text-base hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                >
                  Engager {worker.full_name.split(' ')[0]}
                </button>
              )}
              <button 
                onClick={() => worker && onMessage(worker)}
                className="px-8 py-4 border-2 border-secondary/10 rounded-xl font-bold text-base hover:bg-secondary/5 transition-all"
              >
                Message
              </button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showRecruitmentModal && worker && (
            <RecruitmentModal 
              worker={worker} 
              onClose={() => setShowRecruitmentModal(false)}
              onConfirm={handleHireConfirm}
            />
          )}
          {selectedProject && (
            <ProjectDetailModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ProjectDetailModal = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-[3rem] max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col lg:flex-row shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="lg:w-1/2 h-[300px] lg:h-auto relative">
          <img 
            src={project.image_url} 
            className="w-full h-full object-cover" 
            alt={project.title} 
            referrerPolicy="no-referrer"
          />
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/40 transition-all lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">
                {project.category}
              </span>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-secondary">{project.title}</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-surface rounded-2xl text-secondary/40 hover:text-secondary transition-all hidden lg:block"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-8">
            <section>
              <h3 className="text-xs font-black uppercase tracking-widest text-secondary/40 mb-4">Description du projet</h3>
              <p className="text-secondary/70 leading-relaxed text-lg">
                {project.description}
              </p>
            </section>
            
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-secondary/5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-secondary/40 mb-1">Date de réalisation</p>
                <p className="font-bold text-secondary">{project.date}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-secondary/40 mb-1">Statut</p>
                <div className="flex items-center gap-2 text-green-500 font-bold">
                  <CheckCheck size={16} />
                  Terminé
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const NotificationsPage = ({ notifications, onMarkAsRead, onBack }: { notifications: Notification[], onMarkAsRead: (id: number) => void, onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-surface pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <button onClick={onBack} className="flex items-center gap-2 text-secondary/40 hover:text-primary transition-colors font-bold mb-8 text-sm">
          <ArrowRight className="rotate-180" size={16} />
          Retour
        </button>

        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-secondary mb-2">Notifications</h1>
          <p className="text-secondary/40">Restez informé de vos activités sur Krafty.</p>
        </div>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map(notif => (
              <motion.div 
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl border transition-all ${notif.isRead ? 'bg-white border-secondary/5' : 'bg-white border-primary/20 shadow-lg shadow-primary/5'}`}
                onClick={() => onMarkAsRead(notif.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    notif.type === 'recruitment' ? 'bg-blue-50 text-blue-500' :
                    notif.type === 'message' ? 'bg-green-50 text-green-500' :
                    notif.type === 'review' ? 'bg-yellow-50 text-yellow-500' :
                    'bg-secondary/5 text-secondary/40'
                  }`}>
                    {notif.type === 'recruitment' ? <Briefcase size={20} /> :
                     notif.type === 'message' ? <MessageSquare size={20} /> :
                     notif.type === 'review' ? <Star size={20} /> :
                     <Bell size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`font-bold ${notif.isRead ? 'text-secondary/60' : 'text-secondary'}`}>{notif.title}</h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-secondary/20">{notif.timestamp}</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${notif.isRead ? 'text-secondary/40' : 'text-secondary/70'}`}>{notif.content}</p>
                    {!notif.isRead && (
                      <div className="mt-3 flex items-center gap-2 text-primary font-bold text-xs">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        Nouveau
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 opacity-40">
              <Bell size={48} className="mx-auto mb-4" />
              <p className="text-lg font-serif italic">Aucune notification pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardPage = ({ user, onBack }: { user: User, onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'analytics' | 'settings' | 'support' | 'new_job' | 'reviews' | 'projects' | 'add_project'>('overview');
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const workerStats = [
    { name: 'Lun', value: 450 },
    { name: 'Mar', value: 300 },
    { name: 'Mer', value: 600 },
    { name: 'Jeu', value: 800 },
    { name: 'Ven', value: 500 },
    { name: 'Sam', value: 900 },
    { name: 'Dim', value: 200 },
  ];

  const clientStats = [
    { name: 'Jan', value: 1200 },
    { name: 'Fév', value: 800 },
    { name: 'Mar', value: 1500 },
    { name: 'Avr', value: 2200 },
    { name: 'Mai', value: 1800 },
    { name: 'Juin', value: 2500 },
  ];

  const mockJobs: Job[] = [
    { id: 1, title: 'Réparation Plomberie', description: 'Fuite sous évier cuisine', status: 'in_progress', date: '2024-03-22', address: '12 Rue de la Paix, Paris', client_id: 1, worker_id: 101, worker_name: 'Moussa Diop', price: 150 },
    { id: 2, title: 'Installation Électrique', description: 'Pose de 4 prises salon', status: 'pending', date: '2024-03-25', address: '45 Avenue des Champs, Paris', client_id: 1, worker_id: 102, worker_name: 'Kofi Mensah', price: 280 },
    { id: 3, title: 'Peinture Chambre', description: 'Peinture murs et plafond', status: 'completed', date: '2024-03-15', address: '8 Boulevard Haussmann, Paris', client_id: 1, worker_id: 103, worker_name: 'Fatou Sow', price: 450 },
  ];

  return (
    <div className="min-h-screen bg-surface pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-2">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'overview' ? 'bg-secondary text-white shadow-xl shadow-secondary/20' : 'text-secondary/40 hover:bg-secondary/5 hover:text-secondary'}`}
            >
              <Activity size={20} />
              Vue d'ensemble
            </button>
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'jobs' ? 'bg-secondary text-white shadow-xl shadow-secondary/20' : 'text-secondary/40 hover:bg-secondary/5 hover:text-secondary'}`}
            >
              <Briefcase size={20} />
              Missions
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'analytics' ? 'bg-secondary text-white shadow-xl shadow-secondary/20' : 'text-secondary/40 hover:bg-secondary/5 hover:text-secondary'}`}
            >
              <TrendingUp size={20} />
              Analyses
            </button>

            <button 
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'reviews' ? 'bg-secondary text-white shadow-xl shadow-secondary/20' : 'text-secondary/40 hover:bg-secondary/5 hover:text-secondary'}`}
            >
              <Star size={20} />
              Avis
            </button>

            {user.role === 'worker' && (
              <>
                <button 
                  onClick={() => setActiveTab('projects')}
                  className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'projects' ? 'bg-secondary text-white shadow-xl shadow-secondary/20' : 'text-secondary/40 hover:bg-secondary/5 hover:text-secondary'}`}
                >
                  <Paintbrush size={20} />
                  Mes Projets
                </button>
                <button 
                  onClick={() => setActiveTab('add_project')}
                  className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'add_project' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-primary/60 hover:bg-primary/5 hover:text-primary'}`}
                >
                  <Plus size={20} />
                  Nouveau Projet
                </button>
              </>
            )}
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'settings' ? 'bg-secondary text-white shadow-xl shadow-secondary/20' : 'text-secondary/40 hover:bg-secondary/5 hover:text-secondary'}`}
            >
              <Settings size={20} />
              Paramètres
            </button>

            <button 
              onClick={() => setActiveTab('support')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'support' ? 'bg-secondary text-white shadow-xl shadow-secondary/20' : 'text-secondary/40 hover:bg-secondary/5 hover:text-secondary'}`}
            >
              <MessageSquare size={20} />
              Support
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <button 
                    onClick={() => setActiveTab('analytics')}
                    className="p-6 bg-white rounded-3xl border border-secondary/5 shadow-sm text-left hover:border-primary/20 transition-all group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                      <CreditCard size={24} />
                    </div>
                    <p className="text-secondary/40 text-xs font-black uppercase tracking-widest mb-1">
                      {user.role === 'worker' ? 'Revenus Totaux' : 'Dépenses Totales'}
                    </p>
                    <h3 className="text-2xl font-bold text-secondary">
                      {user.role === 'worker' ? '3,450€' : '1,280€'}
                    </h3>
                    <div className="mt-2 flex items-center gap-1 text-green-500 text-xs font-bold">
                      <TrendingUp size={12} />
                      +12% vs mois dernier
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveTab('jobs')}
                    className="p-6 bg-white rounded-3xl border border-secondary/5 shadow-sm text-left hover:border-blue-500/20 transition-all group"
                  >
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                      <Briefcase size={24} />
                    </div>
                    <p className="text-secondary/40 text-xs font-black uppercase tracking-widest mb-1">Missions Actives</p>
                    <h3 className="text-2xl font-bold text-secondary">4</h3>
                    <div className="mt-2 flex items-center gap-1 text-secondary/40 text-xs font-bold">
                      2 en attente
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className="p-6 bg-white rounded-3xl border border-secondary/5 shadow-sm text-left hover:border-yellow-500/20 transition-all group"
                  >
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500 mb-4 group-hover:scale-110 transition-transform">
                      <Star size={24} />
                    </div>
                    <p className="text-secondary/40 text-xs font-black uppercase tracking-widest mb-1">Note Moyenne</p>
                    <h3 className="text-2xl font-bold text-secondary">4.9</h3>
                    <div className="mt-2 flex items-center gap-1 text-secondary/40 text-xs font-bold">
                      Basé sur 24 avis
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveTab('analytics')}
                    className="p-6 bg-white rounded-3xl border border-secondary/5 shadow-sm text-left hover:border-purple-500/20 transition-all group"
                  >
                    <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mb-4 group-hover:scale-110 transition-transform">
                      <Users size={24} />
                    </div>
                    <p className="text-secondary/40 text-xs font-black uppercase tracking-widest mb-1">Vues Profil</p>
                    <h3 className="text-2xl font-bold text-secondary">156</h3>
                    <div className="mt-2 flex items-center gap-1 text-green-500 text-xs font-bold">
                      <TrendingUp size={12} />
                      +24% cette semaine
                    </div>
                  </button>
                </div>

                {/* Chart Section */}
                <div className="p-8 bg-white rounded-[3rem] border border-secondary/5 shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-secondary">Activité Financière</h3>
                      <p className="text-sm text-secondary/40">Aperçu de vos flux sur les 7 derniers jours</p>
                    </div>
                    <select className="bg-surface border-none rounded-xl text-xs font-bold px-4 py-2 focus:ring-2 focus:ring-primary/20">
                      <option>7 derniers jours</option>
                      <option>30 derniers jours</option>
                    </select>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={user.role === 'worker' ? workerStats : clientStats}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#5D2E17" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#5D2E17" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#94a3b8', fontSize: 12 }}
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#94a3b8', fontSize: 12 }}
                          dx={-10}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            borderRadius: '16px', 
                            border: 'none', 
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' 
                          }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#5D2E17" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorValue)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Jobs */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="p-8 bg-white rounded-[3rem] border border-secondary/5 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-serif font-bold text-secondary">Missions Récentes</h3>
                      <button onClick={() => setActiveTab('jobs')} className="text-primary text-xs font-bold hover:underline">Voir tout</button>
                    </div>
                    <div className="space-y-4">
                      {mockJobs.slice(0, 3).map(job => (
                        <div key={job.id} className="flex items-center gap-4 p-4 bg-surface rounded-2xl border border-secondary/5">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            job.status === 'completed' ? 'bg-green-100 text-green-600' :
                            job.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
                            'bg-yellow-100 text-yellow-600'
                          }`}>
                            <Briefcase size={20} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-secondary">{job.title}</h4>
                            <p className="text-[10px] text-secondary/40">{job.worker_name || job.client_name}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sm text-secondary">{job.price}€</p>
                            <p className="text-[10px] text-secondary/40">{job.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 bg-white rounded-[3rem] border border-secondary/5 shadow-sm">
                    <h3 className="text-xl font-serif font-bold text-secondary mb-6">Actions Rapides</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {user.role === 'worker' ? (
                        <button 
                          onClick={() => setActiveTab('add_project')}
                          className="p-6 bg-primary text-white rounded-3xl border border-primary/10 text-center group hover:scale-105 transition-all shadow-xl shadow-primary/20"
                        >
                          <Paintbrush className="mx-auto mb-3 text-white" size={24} />
                          <p className="text-xs font-bold text-white">Ajouter une Réalisation</p>
                        </button>
                      ) : (
                        <button 
                          onClick={() => setActiveTab('new_job')}
                          className="p-6 bg-primary/5 rounded-3xl border border-primary/10 text-center group hover:bg-primary transition-all"
                        >
                          <Plus className="mx-auto mb-3 text-primary group-hover:text-white" size={24} />
                          <p className="text-xs font-bold text-primary group-hover:text-white">Nouvelle Mission</p>
                        </button>
                      )}
                      <button 
                        onClick={() => setActiveTab('support')}
                        className="p-6 bg-secondary/5 rounded-3xl border border-secondary/10 text-center group hover:bg-secondary transition-all"
                      >
                        <MessageSquare className="mx-auto mb-3 text-secondary group-hover:text-white" size={24} />
                        <p className="text-xs font-bold text-secondary group-hover:text-white">Contacter Support</p>
                      </button>
                      <button 
                        onClick={() => setActiveTab('settings')}
                        className="p-6 bg-surface rounded-3xl border border-secondary/5 text-center group hover:bg-secondary/5 transition-all"
                      >
                        <UserIcon className="mx-auto mb-3 text-secondary/40" size={24} />
                        <p className="text-xs font-bold text-secondary/40">Modifier Profil</p>
                      </button>
                      <button 
                        onClick={() => setActiveTab('settings')}
                        className="p-6 bg-surface rounded-3xl border border-secondary/5 text-center group hover:bg-secondary/5 transition-all"
                      >
                        <Settings className="mx-auto mb-3 text-secondary/40" size={24} />
                        <p className="text-xs font-bold text-secondary/40">Paramètres</p>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'jobs' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-serif font-bold text-secondary">Gestion des Missions</h2>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-secondary/5 rounded-xl text-xs font-bold text-secondary/40 hover:text-secondary transition-all">Toutes</button>
                    <button className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/20">En cours</button>
                  </div>
                </div>
                <div className="space-y-4">
                  {mockJobs.map(job => (
                    <div key={job.id} className="p-6 bg-white rounded-[2rem] border border-secondary/5 shadow-sm flex flex-col md:flex-row md:items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                        job.status === 'completed' ? 'bg-green-50 text-green-500' :
                        job.status === 'in_progress' ? 'bg-blue-50 text-blue-500' :
                        'bg-yellow-50 text-yellow-500'
                      }`}>
                        <Briefcase size={32} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-secondary">{job.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            job.status === 'completed' ? 'bg-green-100 text-green-600' :
                            job.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
                            'bg-yellow-100 text-yellow-600'
                          }`}>
                            {job.status === 'completed' ? 'Terminé' :
                             job.status === 'in_progress' ? 'En cours' : 'En attente'}
                          </span>
                        </div>
                        <p className="text-sm text-secondary/60 mb-3">{job.description}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-secondary/40 font-medium">
                          <div className="flex items-center gap-1.5"><MapPin size={14} /> {job.address}</div>
                          <div className="flex items-center gap-1.5"><Calendar size={14} /> {job.date}</div>
                          <div className="flex items-center gap-1.5"><UserIcon size={14} /> {job.worker_name || job.client_name}</div>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-secondary/5">
                        <p className="text-2xl font-serif font-bold text-secondary">{job.price}€</p>
                        <button className="px-6 py-2 bg-secondary text-white rounded-xl text-xs font-bold hover:bg-primary transition-all">Détails</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="p-8 bg-white rounded-[3rem] border border-secondary/5 shadow-sm">
                    <h3 className="text-xl font-serif font-bold text-secondary mb-8">Performance Mensuelle</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={user.role === 'worker' ? workerStats : clientStats}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                          <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }} />
                          <Bar dataKey="value" fill="#5D2E17" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="p-8 bg-white rounded-[3rem] border border-secondary/5 shadow-sm">
                    <h3 className="text-xl font-serif font-bold text-secondary mb-8">Répartition des Services</h3>
                    <div className="space-y-6">
                      {[
                        { label: 'Plomberie', value: 65, color: 'bg-primary' },
                        { label: 'Électricité', value: 25, color: 'bg-blue-500' },
                        { label: 'Peinture', value: 10, color: 'bg-yellow-500' },
                      ].map((item, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-sm font-bold">
                            <span className="text-secondary">{item.label}</span>
                            <span className="text-secondary/40">{item.value}%</span>
                          </div>
                          <div className="h-3 bg-surface rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${item.value}%` }}
                              transition={{ duration: 1, delay: i * 0.2 }}
                              className={`h-full ${item.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 bg-white rounded-[3rem] border border-secondary/5 shadow-sm">
                <h2 className="text-2xl font-serif font-bold text-secondary mb-8">Paramètres du Compte</h2>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-secondary/40">Nom Complet</label>
                      <input type="text" defaultValue={user.full_name} className="w-full px-6 py-4 bg-surface border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-secondary/40">Email</label>
                      <input type="email" defaultValue={user.email} className="w-full px-6 py-4 bg-surface border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-secondary/40">Bio Professionnelle</label>
                    <textarea rows={4} defaultValue={user.bio} className="w-full px-6 py-4 bg-surface border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 resize-none" />
                  </div>
                  <div className="pt-6 border-t border-secondary/5 flex justify-end gap-4">
                    <button className="px-8 py-4 border-2 border-secondary/10 rounded-2xl font-bold text-sm hover:bg-secondary/5 transition-all">Annuler</button>
                    <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">Enregistrer les modifications</button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'new_job' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-white rounded-[3rem] border border-secondary/5 shadow-sm">
                <h2 className="text-2xl font-serif font-bold text-secondary mb-8">Créer une Nouvelle Mission</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-secondary/40">Titre de la mission</label>
                      <input type="text" placeholder="Ex: Réparation évier" className="w-full px-6 py-4 bg-surface border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-secondary/40">Catégorie</label>
                      <select className="w-full px-6 py-4 bg-surface border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20">
                        <option>Plomberie</option>
                        <option>Électricité</option>
                        <option>Peinture</option>
                        <option>Menuiserie</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-secondary/40">Description détaillée</label>
                    <textarea rows={4} placeholder="Décrivez votre besoin..." className="w-full px-6 py-4 bg-surface border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 resize-none" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-secondary/40">Adresse</label>
                      <input type="text" placeholder="Votre adresse" className="w-full px-6 py-4 bg-surface border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-secondary/40">Date souhaitée</label>
                      <input type="date" className="w-full px-6 py-4 bg-surface border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div className="pt-6 border-t border-secondary/5 flex justify-end gap-4">
                    <button type="button" onClick={() => setActiveTab('overview')} className="px-8 py-4 border-2 border-secondary/10 rounded-2xl font-bold text-sm hover:bg-secondary/5 transition-all">Annuler</button>
                    <button type="submit" className="px-8 py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">Publier la mission</button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-serif font-bold text-secondary">Avis Clients</h2>
                  <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 text-yellow-600 rounded-xl font-bold text-sm">
                    <Star size={16} fill="currentColor" />
                    4.9 / 5.0
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { name: 'Sophie L.', date: 'Il y a 2 jours', rating: 5, comment: 'Travail impeccable et très professionnel. Je recommande vivement !' },
                    { name: 'Marc D.', date: 'Il y a 1 semaine', rating: 4, comment: 'Très bon service, ponctuel et efficace.' },
                    { name: 'Julie M.', date: 'Il y a 2 semaines', rating: 5, comment: 'Une perle rare ! Très méticuleux et sympathique.' },
                  ].map((review, i) => (
                    <div key={i} className="p-6 bg-white rounded-[2rem] border border-secondary/5 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-secondary/5 rounded-full flex items-center justify-center font-bold text-secondary">
                            {review.name[0]}
                          </div>
                          <div>
                            <h4 className="font-bold text-secondary">{review.name}</h4>
                            <p className="text-[10px] text-secondary/40 font-medium uppercase tracking-widest">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5 text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-secondary/70 italic">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-serif font-bold text-secondary">Mes Réalisations</h2>
                  <button 
                    onClick={() => setActiveTab('add_project')}
                    className="px-6 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Ajouter un projet
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => {
                    const mockProject: Project = {
                      id: i,
                      worker_id: user.id,
                      title: `Rénovation complète #${i}`,
                      description: "Une réalisation exemplaire démontrant notre savoir-faire et notre attention aux détails. Ce projet a été mené à bien en respectant tous les délais et les exigences du client.",
                      image_url: `https://picsum.photos/seed/dashproject${i}/600/400`,
                      category: user.specialty || 'Artisanat',
                      date: 'Octobre 2025'
                    };
                    return (
                      <div key={i} className="bg-white rounded-[2rem] border border-secondary/5 overflow-hidden shadow-sm group">
                        <div className="h-48 relative overflow-hidden">
                          <img 
                            src={mockProject.image_url} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            alt={mockProject.title} 
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-secondary">
                            {mockProject.category}
                          </div>
                          <button 
                            onClick={() => setSelectedProject(mockProject)}
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <Plus className="text-white" size={32} />
                          </button>
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold text-secondary mb-2">{mockProject.title}</h3>
                          <p className="text-xs text-secondary/60 mb-4 line-clamp-2">{mockProject.description}</p>
                          <div className="flex justify-between items-center pt-4 border-t border-secondary/5">
                            <span className="text-[10px] font-black uppercase tracking-widest text-secondary/20">{mockProject.date}</span>
                            <div className="flex gap-3">
                              <button onClick={() => setSelectedProject(mockProject)} className="text-primary font-bold text-xs hover:underline">Voir</button>
                              <button className="text-secondary/40 font-bold text-xs hover:underline">Modifier</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </motion.div>
            )}

            {activeTab === 'add_project' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-white rounded-[3rem] border border-secondary/5 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={() => setActiveTab('projects')} className="p-2 hover:bg-secondary/5 rounded-xl transition-all text-secondary/40 hover:text-secondary">
                    <ArrowLeft size={20} />
                  </button>
                  <h2 className="text-2xl font-serif font-bold text-secondary">Ajouter une Nouvelle Réalisation</h2>
                </div>
                
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-secondary/40 ml-1">Titre du projet</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Rénovation Loft Haussmannien" 
                        className="w-full px-6 py-4 bg-surface border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-secondary/40 ml-1">Catégorie</label>
                      <select className="w-full px-6 py-4 bg-surface border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all">
                        <option>{user.specialty || 'Plomberie'}</option>
                        <option>Électricité</option>
                        <option>Peinture</option>
                        <option>Menuiserie</option>
                        <option>Maçonnerie</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-secondary/40 ml-1">Description détaillée</label>
                    <textarea 
                      rows={6} 
                      placeholder="Décrivez les défis relevés, les matériaux utilisés et le résultat final..." 
                      className="w-full px-6 py-4 bg-surface border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-secondary/40 ml-1">Photos du projet</label>
                      <div className="relative group">
                        <div className="w-full h-48 bg-surface border-2 border-dashed border-secondary/10 rounded-[2rem] flex flex-col items-center justify-center gap-3 group-hover:border-primary/40 transition-all cursor-pointer overflow-hidden">
                          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <Plus size={24} />
                          </div>
                          <div className="text-center px-6">
                            <p className="text-sm font-bold text-secondary mb-1">Glissez vos photos ici</p>
                            <p className="text-[10px] text-secondary/40 uppercase tracking-widest font-black">ou cliquez pour parcourir</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-secondary/40 ml-1">Date de réalisation</label>
                        <input 
                          type="month" 
                          className="w-full px-6 py-4 bg-surface border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all" 
                        />
                      </div>
                      <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                            <Star size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-primary mb-1">Conseil d'expert</p>
                            <p className="text-[10px] text-primary/60 leading-relaxed">Les projets avec des descriptions détaillées et des photos de haute qualité reçoivent 3x plus de demandes de devis.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-secondary/5 flex flex-col sm:flex-row justify-end gap-4">
                    <button 
                      type="button" 
                      onClick={() => setActiveTab('projects')} 
                      className="px-10 py-4 border-2 border-secondary/10 rounded-2xl font-bold text-sm hover:bg-secondary/5 transition-all order-2 sm:order-1"
                    >
                      Annuler
                    </button>
                    <button 
                      type="submit" 
                      className="px-10 py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 order-1 sm:order-2"
                    >
                      Publier la réalisation
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeTab === 'support' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 bg-white rounded-[3rem] border border-secondary/5 shadow-sm text-center">
                <div className="w-20 h-20 bg-secondary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                  <MessageSquare size={40} className="text-secondary" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-secondary mb-4">Besoin d'aide ?</h2>
                <p className="text-secondary/60 mb-12 max-w-md mx-auto">Notre équipe de support est disponible 24/7 pour vous aider avec vos projets ou répondre à vos questions.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="p-6 bg-surface rounded-3xl border border-secondary/5">
                    <Mail className="mx-auto mb-4 text-primary" size={24} />
                    <h4 className="font-bold text-sm mb-1">Email</h4>
                    <p className="text-xs text-secondary/40">support@krafty.com</p>
                  </div>
                  <div className="p-6 bg-surface rounded-3xl border border-secondary/5">
                    <MessageSquare className="mx-auto mb-4 text-primary" size={24} />
                    <h4 className="font-bold text-sm mb-1">Chat Live</h4>
                    <p className="text-xs text-secondary/40">Temps de réponse: 5min</p>
                  </div>
                  <div className="p-6 bg-surface rounded-3xl border border-secondary/5">
                    <ShieldCheck className="mx-auto mb-4 text-primary" size={24} />
                    <h4 className="font-bold text-sm mb-1">FAQ</h4>
                    <p className="text-xs text-secondary/40">Consultez nos guides</p>
                  </div>
                </div>

                <button className="bg-secondary text-white px-12 py-4 rounded-2xl font-bold hover:bg-primary transition-all shadow-xl shadow-secondary/20">
                  Démarrer une conversation
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

const ReviewModal = ({ workerName, onClose, onSubmit }: { workerName: string, onClose: () => void, onSubmit: (rating: number, comment: string) => void }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSubmit(rating, comment);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-secondary/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-[3rem] shadow-2xl overflow-hidden p-8"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-yellow-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
            <Star size={40} className="text-yellow-500" fill="currentColor" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-secondary mb-2">Laisser un avis</h2>
          <p className="text-sm text-secondary/40">Partagez votre expérience avec {workerName}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1 transition-transform hover:scale-110"
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
              >
                <Star 
                  size={32} 
                  className={star <= (hover || rating) ? "text-yellow-500" : "text-secondary/10"} 
                  fill={star <= (hover || rating) ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-secondary/40 ml-1">Votre commentaire</label>
            <textarea 
              rows={4} 
              placeholder="Qu'avez-vous pensé de la prestation ?" 
              className="w-full px-6 py-4 bg-surface border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-4 border-2 border-secondary/10 rounded-2xl font-bold text-sm hover:bg-secondary/5 transition-all"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              disabled={rating === 0 || isSubmitting}
              className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Publier"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const MessagesPage = ({ user, initialWorker, onBack, onViewProfile }: { user: User, initialWorker?: WorkerProfile, onBack: () => void, onViewProfile: (workerId: number) => void }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    // Load from localStorage or use defaults
    const stored = localStorage.getItem('krafty_conversations');
    if (stored) {
      setConversations(JSON.parse(stored));
      setLoading(false);
      
      if (initialWorker) {
        const convs = JSON.parse(stored) as Conversation[];
        const existing = convs.find(c => c.participant.id === initialWorker.id);
        if (existing) {
          setActiveConvId(existing.id);
        } else {
          const newConv: Conversation = {
            id: Date.now(),
            participant: initialWorker,
            lastMessage: "",
            unreadCount: 0,
            messages: []
          };
          const updated = [newConv, ...convs];
          setConversations(updated);
          localStorage.setItem('krafty_conversations', JSON.stringify(updated));
          setActiveConvId(newConv.id);
        }
      } else {
        const convs = JSON.parse(stored) as Conversation[];
        if (convs.length > 0) setActiveConvId(convs[0].id);
      }
      return;
    }

    // Initial mock data if nothing in localStorage
    setTimeout(() => {
      const mockConvs: Conversation[] = [
        {
          id: 1,
          participant: { ...MOCK_WORKERS[0], full_name: "Moussa Diop", specialty: "PLOMBIER" },
          lastMessage: "C'est parfait, je serai là à 9h.",
          unreadCount: 0,
          messages: [
            { id: 1, senderId: MOCK_WORKERS[0].id, text: "Bonjour, j'ai bien reçu votre demande.", timestamp: "09:00" },
            { id: 2, senderId: user.id, text: "Super, quand seriez-vous disponible ?", timestamp: "09:05" },
            { id: 3, senderId: MOCK_WORKERS[0].id, text: "C'est parfait, je serai là à 9h.", timestamp: "09:10" },
          ]
        },
        {
          id: 2,
          participant: { ...MOCK_WORKERS[1], full_name: "Kofi Mensah", specialty: "ÉLECTRICIEN" },
          lastMessage: "Nouvelle conversation",
          unreadCount: 0,
          messages: []
        },
        {
          id: 3,
          participant: { ...MOCK_WORKERS[2], full_name: "Fatou Sow", specialty: "MENUISIER" },
          lastMessage: "Pouvez-vous m'envoyer des photos ?",
          unreadCount: 2,
          messages: [
            { id: 1, senderId: MOCK_WORKERS[2].id, text: "Bonjour ! Pourriez-vous m'en dire plus sur votre projet ?", timestamp: "Hier" },
            { id: 2, senderId: MOCK_WORKERS[2].id, text: "Pouvez-vous m'envoyer des photos ?", timestamp: "Hier" },
          ]
        }
      ];

      let finalConvs = [...mockConvs];
      if (initialWorker) {
        const existing = finalConvs.find(c => c.participant.id === initialWorker.id);
        if (existing) {
          setActiveConvId(existing.id);
        } else {
          const newConv: Conversation = {
            id: Date.now(),
            participant: initialWorker,
            lastMessage: "",
            unreadCount: 0,
            messages: []
          };
          finalConvs.unshift(newConv);
          setActiveConvId(newConv.id);
        }
      } else if (finalConvs.length > 0) {
        setActiveConvId(finalConvs[0].id);
      }

      setConversations(finalConvs);
      localStorage.setItem('krafty_conversations', JSON.stringify(finalConvs));
      setLoading(false);
    }, 800);
  }, [initialWorker, user.id]);

  const activeConv = conversations.find(c => c.id === activeConvId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConvId) return;

    const msg: Message = {
      id: Date.now(),
      senderId: user.id,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedConvs = conversations.map(c => {
      if (c.id === activeConvId) {
        return {
          ...c,
          messages: [...c.messages, msg],
          lastMessage: newMessage
        };
      }
      return c;
    });

    setConversations(updatedConvs);
    localStorage.setItem('krafty_conversations', JSON.stringify(updatedConvs));
    setNewMessage('');

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: Date.now() + 1,
        senderId: activeConv!.participant.id,
        text: "Entendu, je reviens vers vous très vite !",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setConversations(prev => {
        const next = prev.map(c => {
          if (c.id === activeConvId) {
            return {
              ...c,
              messages: [...c.messages, response],
              lastMessage: response.text
            };
          }
          return c;
        });
        localStorage.setItem('krafty_conversations', JSON.stringify(next));
        return next;
      });
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pt-24 pb-10 px-6">
      <div className="max-w-7xl mx-auto mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-secondary/40 hover:text-primary transition-colors font-bold">
          <ArrowRight className="rotate-180" size={20} />
          Retour à l'accueil
        </button>
      </div>
      <div className="max-w-7xl mx-auto h-[80vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex border border-secondary/5">
        {/* Sidebar */}
        <div className="w-full md:w-80 lg:w-96 border-r border-secondary/5 flex flex-col bg-surface/30">
          <div className="p-6 border-b border-secondary/5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 -ml-2 text-secondary/40 hover:text-primary transition-colors bg-surface rounded-xl">
                  <ArrowRight className="rotate-180" size={20} />
                </button>
                <h2 className="text-2xl font-serif font-bold tracking-tight">Messages</h2>
              </div>
              <button onClick={onBack} className="md:hidden text-secondary/40 hover:text-primary transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/20 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="w-full pl-12 pr-4 py-3.5 bg-surface border-none rounded-xl text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:bg-white focus:shadow-xl transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations
              .filter(conv => 
                conv.participant.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                conv.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map(conv => (
                <button
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`w-full p-6 flex items-center gap-4 transition-all border-b border-secondary/5 text-left ${activeConvId === conv.id ? 'bg-white shadow-xl shadow-secondary/5 border-r-4 border-r-[#5D2E17] z-10' : 'hover:bg-surface'}`}
              >
                <div className="relative">
                  <img 
                    src={conv.participant.avatar_url || `https://picsum.photos/seed/${conv.participant.id}/100/100`} 
                    className="w-14 h-14 rounded-2xl object-cover shadow-md" 
                    alt="" 
                    referrerPolicy="no-referrer"
                  />
                  {conv.unreadCount > 0 && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      {conv.unreadCount}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-lg font-serif font-bold truncate">{conv.participant.full_name}</p>
                    <span className="text-[10px] text-secondary/20 font-black uppercase tracking-widest">12:45</span>
                  </div>
                  <p className="text-sm text-secondary/40 truncate font-medium">{conv.lastMessage || "Nouvelle conversation"}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-[#F8F9FA]">
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div className="p-6 bg-white border-b border-secondary/5 flex items-center justify-between">
                <button 
                  onClick={() => activeConv.participant.id && onViewProfile(activeConv.participant.id)}
                  className="flex items-center gap-4 hover:opacity-80 transition-opacity text-left"
                >
                  <div className="relative">
                    <img 
                      src={activeConv.participant.avatar_url || `https://picsum.photos/seed/${activeConv.participant.id}/100/100`} 
                      className="w-12 h-12 rounded-2xl object-cover shadow-md" 
                      alt="" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <p className="text-lg font-serif font-bold mb-0.5">{activeConv.participant.full_name}</p>
                    <p className="text-[10px] text-primary font-black uppercase tracking-widest">{activeConv.participant.specialty || "CLIENT"}</p>
                  </div>
                </button>
                <div className="flex items-center gap-3">
                  <button className="p-3 text-secondary/40 hover:text-primary transition-colors bg-surface rounded-xl shadow-sm"><Mail size={20} /></button>
                  <button 
                    onClick={() => setShowReviewModal(true)}
                    className="p-3 text-secondary/40 hover:text-yellow-500 transition-colors bg-surface rounded-xl shadow-sm"
                  >
                    <Star size={20} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeConv.messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                    <MessageSquare size={48} className="mb-4" />
                    <p className="text-lg font-serif italic">Commencez la discussion avec {activeConv.participant.full_name.split(' ')[0]}</p>
                  </div>
                ) : (
                  activeConv.messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                      <div className="relative group max-w-[70%]">
                        <div className={`relative z-10 p-6 bg-white text-secondary shadow-2xl shadow-secondary/5 transform ${
                          msg.senderId === user.id 
                            ? '-skew-x-6 rounded-2xl' 
                            : 'skew-x-6 rounded-2xl'
                        }`}>
                          <div className={msg.senderId === user.id ? 'skew-x-6' : '-skew-x-6'}>
                            <p className="text-sm lg:text-base leading-relaxed font-medium">{msg.text}</p>
                            <div className="flex items-center gap-2 mt-3 text-[10px] font-black uppercase tracking-widest text-secondary/20">
                              <Clock size={10} />
                              {msg.timestamp}
                              {msg.senderId === user.id && <CheckCheck size={10} className="text-primary" />}
                            </div>
                          </div>
                        </div>
                        {/* Shadow/Glow effect */}
                        <div className="absolute inset-0 blur-2xl opacity-10 -z-10 bg-secondary/10" />
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white border-t border-secondary/5">
                <form onSubmit={handleSendMessage} className="relative">
                  <input 
                    type="text" 
                    placeholder="Écrivez votre message..." 
                    className="w-full pl-6 pr-16 py-4 bg-surface border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-[#5D2E17] text-white rounded-xl shadow-xl hover:scale-105 transition-transform"
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-40">
              <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl">
                <MessageSquare size={48} className="text-primary" />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">Vos conversations</h3>
              <p className="text-lg max-w-sm">Sélectionnez une discussion pour commencer à échanger avec vos artisans.</p>
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {showReviewModal && activeConv && (
          <ReviewModal 
            workerName={activeConv.participant.full_name}
            onClose={() => setShowReviewModal(false)}
            onSubmit={(rating, comment) => {
              console.log('Review submitted:', { rating, comment });
              setShowReviewModal(false);
              // In a real app, we'd send this to the server
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ProfilePage = ({ user, onBack, onUpdateUser }: { user: User, onBack: () => void, onUpdateUser: (updated: User) => void }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const coverInputRef = React.useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [formData, setFormData] = useState({
    full_name: user.full_name,
    email: user.email,
    location: user.location || '',
    bio: user.bio || ''
  });

  const [settings, setSettings] = useState({
    language: 'Français (FR)',
    currency: 'Euro (€)',
    darkMode: false
  });

  const [contactPrefs, setContactPrefs] = useState([
    { id: 'email', label: 'Notifications par email', desc: 'Recevoir les mises à jour par mail', checked: true },
    { id: 'messages', label: 'Messages directs', desc: 'Autoriser les artisans à vous contacter', checked: true },
    { id: 'sms', label: 'Alertes SMS', desc: 'Pour les urgences uniquement', checked: false },
    { id: 'newsletter', label: 'Newsletter Krafty', desc: 'Conseils et promotions', checked: true },
  ]);

  const togglePref = (id: string) => {
    setContactPrefs(prev => prev.map(p => p.id === id ? { ...p, checked: !p.checked } : p));
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
      // In a real app we'd save settings and prefs too
    };
    onUpdateUser(updatedUser);
    setIsEditing(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      alert('Les nouveaux mots de passe ne correspondent pas.');
      return;
    }
    if (passwordData.new.length < 6) {
      alert('Le nouveau mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    
    // Mock API call
    console.log('Password changed:', passwordData);
    alert('Votre mot de passe a été mis à jour avec succès !');
    setIsChangingPassword(false);
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onUpdateUser({ ...user, avatar_url: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onUpdateUser({ ...user, cover_url: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = [
    { label: 'Missions postées', value: '12', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Dépenses totales', value: '1,250€', icon: CreditCard, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Avis laissés', value: '8', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  ];

  return (
    <div className="min-h-screen bg-surface pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative mb-12 group">
          <input 
            type="file" 
            ref={coverInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleCoverChange}
          />
          <div className="h-64 w-full bg-secondary/5 rounded-[3rem] overflow-hidden shadow-inner border border-secondary/5 relative">
            {user.cover_url ? (
              <img src={user.cover_url} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-secondary/5 to-primary/5 flex items-center justify-center">
                <Briefcase size={48} className="text-secondary/10" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="bg-white/90 backdrop-blur-sm text-secondary px-6 py-3 rounded-2xl font-bold text-sm shadow-xl flex items-center gap-2">
                <Camera size={18} />
                Changer la photo de couverture
              </span>
            </div>
          </div>
          <button 
            onClick={() => coverInputRef.current?.click()}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        <button onClick={onBack} className="flex items-center gap-2 text-secondary/40 hover:text-primary transition-colors font-bold mb-8 text-sm group">
          <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} />
          Retour au tableau de bord
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2.5rem] shadow-xl border border-secondary/5 overflow-hidden"
            >
              <div className="p-8 text-center border-b border-secondary/5">
                <div className="relative inline-block mb-6 group">
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleAvatarChange}
                  />
                  <div className="w-32 h-32 bg-secondary/5 rounded-[2.5rem] flex items-center justify-center text-secondary shadow-inner overflow-hidden">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                    ) : (
                      <UserIcon size={48} className="text-secondary/20" />
                    )}
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-3 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 transition-transform border-4 border-white"
                  >
                    <Camera size={18} />
                  </button>
                </div>
                <h2 className="text-2xl font-serif font-bold text-secondary mb-1">{user.full_name}</h2>
                <p className="text-secondary/40 text-sm font-medium mb-4">{user.email}</p>
                <div className="flex justify-center">
                  <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                    Compte {user.role === 'worker' ? 'Artisan' : 'Client'}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <nav className="space-y-2">
                  {[
                    { id: 'profile', label: 'Mon Profil', icon: UserIcon },
                    { id: 'security', label: 'Sécurité', icon: ShieldCheck },
                    { id: 'settings', label: 'Paramètres', icon: Settings },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all text-left ${
                        activeTab === tab.id 
                          ? 'bg-secondary text-white shadow-lg shadow-secondary/20' 
                          : 'text-secondary/40 hover:bg-surface hover:text-secondary'
                      }`}
                    >
                      <tab.icon size={20} />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Stats for Client */}
            {user.role === 'client' && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[2.5rem] shadow-xl border border-secondary/5 p-8"
              >
                <h3 className="text-sm font-black uppercase tracking-widest text-secondary/40 mb-6">Activité</h3>
                <div className="space-y-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                        <stat.icon size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-secondary/40 font-bold uppercase tracking-wider">{stat.label}</p>
                        <p className="text-lg font-bold text-secondary">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-white rounded-[3rem] shadow-xl border border-secondary/5 p-8 lg:p-12">
                    <div className="flex items-center justify-between mb-10">
                      <h3 className="text-2xl font-serif font-bold text-secondary">Informations personnelles</h3>
                      {!isEditing ? (
                        <button 
                          onClick={() => setIsEditing(true)}
                          className="text-primary font-bold text-sm hover:underline"
                        >
                          Modifier
                        </button>
                      ) : (
                        <div className="flex gap-4">
                          <button 
                            onClick={() => {
                              setIsEditing(false);
                              setFormData({
                                full_name: user.full_name,
                                email: user.email,
                                location: user.location || '',
                                bio: user.bio || ''
                              });
                            }}
                            className="text-secondary/40 font-bold text-sm hover:text-secondary"
                          >
                            Annuler
                          </button>
                          <button 
                            onClick={handleSave}
                            className="text-primary font-bold text-sm hover:underline"
                          >
                            Enregistrer
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Nom complet</label>
                          {isEditing ? (
                            <input 
                              type="text"
                              value={formData.full_name}
                              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                              className="mt-2 w-full p-4 bg-surface rounded-2xl border border-secondary/5 font-medium text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                          ) : (
                            <div className="mt-2 p-4 bg-surface rounded-2xl border border-secondary/5 font-medium text-secondary flex items-center gap-3">
                              <UserIcon size={18} className="text-secondary/20" />
                              {user.full_name}
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Email</label>
                          {isEditing ? (
                            <input 
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="mt-2 w-full p-4 bg-surface rounded-2xl border border-secondary/5 font-medium text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                          ) : (
                            <div className="mt-2 p-4 bg-surface rounded-2xl border border-secondary/5 font-medium text-secondary flex items-center gap-3">
                              <Mail size={18} className="text-secondary/20" />
                              {user.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Localisation</label>
                          {isEditing ? (
                            <input 
                              type="text"
                              value={formData.location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                              className="mt-2 w-full p-4 bg-surface rounded-2xl border border-secondary/5 font-medium text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                              placeholder="Ville, Pays"
                            />
                          ) : (
                            <div className="mt-2 p-4 bg-surface rounded-2xl border border-secondary/5 font-medium text-secondary flex items-center gap-3">
                              <MapPin size={18} className="text-secondary/20" />
                              {user.location || "Non renseignée"}
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Date d'inscription</label>
                          <div className="mt-2 p-4 bg-surface rounded-2xl border border-secondary/5 font-medium text-secondary flex items-center gap-3">
                            <Calendar size={18} className="text-secondary/20" />
                            Mars 2024
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10">
                      <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Bio / Description</label>
                      {isEditing ? (
                        <textarea 
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          rows={4}
                          className="mt-2 w-full p-6 bg-surface rounded-2xl border border-secondary/5 text-secondary/70 outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                          placeholder="Parlez-nous de vous..."
                        />
                      ) : (
                        <div className="mt-2 p-6 bg-surface rounded-2xl border border-secondary/5 text-secondary/70 leading-relaxed italic">
                          {user.bio || "Aucune bio renseignée. Ajoutez une description pour aider les artisans à mieux vous connaître."}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-[3rem] shadow-xl border border-secondary/5 p-8 lg:p-12">
                    <h3 className="text-2xl font-serif font-bold text-secondary mb-8">Préférences de contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {contactPrefs.map((pref) => (
                        <div key={pref.id} className="flex items-center justify-between p-4 bg-surface rounded-2xl border border-secondary/5">
                          <div>
                            <p className="font-bold text-secondary text-sm">{pref.label}</p>
                            <p className="text-[10px] text-secondary/40 font-medium">{pref.desc}</p>
                          </div>
                          <button 
                            onClick={() => togglePref(pref.id)}
                            className={`w-12 h-6 rounded-full relative transition-colors ${pref.checked ? 'bg-primary' : 'bg-secondary/10'}`}
                          >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${pref.checked ? 'right-1' : 'left-1'}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-[3rem] shadow-xl border border-secondary/5 p-8 lg:p-12"
                >
                  <h3 className="text-2xl font-serif font-bold text-secondary mb-10">Sécurité du compte</h3>
                  <div className="space-y-8">
                    {!isChangingPassword ? (
                      <>
                        <div className="flex items-start gap-6 p-6 bg-green-50 rounded-[2rem] border border-green-100">
                          <div className="p-4 bg-green-500 text-white rounded-2xl shadow-lg">
                            <ShieldCheck size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-green-900 mb-1">Votre compte est sécurisé</h4>
                            <p className="text-sm text-green-700/70 leading-relaxed">
                              Nous utilisons le chiffrement de bout en bout pour protéger vos données et vos conversations.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <button 
                            onClick={() => setIsChangingPassword(true)}
                            className="w-full flex items-center justify-between p-6 bg-surface rounded-2xl border border-secondary/5 hover:bg-white hover:shadow-xl transition-all group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-white rounded-xl text-secondary/40 group-hover:text-primary transition-colors">
                                <Zap size={20} />
                              </div>
                              <div className="text-left">
                                <p className="font-bold text-secondary">Changer le mot de passe</p>
                                <p className="text-xs text-secondary/40">Dernière modification il y a 3 mois</p>
                              </div>
                            </div>
                            <ChevronRight size={20} className="text-secondary/20" />
                          </button>

                          <button className="w-full flex items-center justify-between p-6 bg-surface rounded-2xl border border-secondary/5 hover:bg-white hover:shadow-xl transition-all group">
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-white rounded-xl text-secondary/40 group-hover:text-primary transition-colors">
                                <Bell size={20} />
                              </div>
                              <div className="text-left">
                                <p className="font-bold text-secondary">Double authentification (2FA)</p>
                                <p className="text-xs text-secondary/40">Renforcez la sécurité de votre compte</p>
                              </div>
                            </div>
                            <span className="px-3 py-1 bg-secondary/5 text-secondary/40 rounded-full text-[10px] font-black uppercase tracking-widest">Désactivé</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <form onSubmit={handlePasswordSubmit} className="space-y-6">
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Mot de passe actuel</label>
                          <input 
                            type="password"
                            required
                            value={passwordData.current}
                            onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                            className="mt-2 w-full p-4 bg-surface rounded-2xl border border-secondary/5 font-medium text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Nouveau mot de passe</label>
                          <input 
                            type="password"
                            required
                            value={passwordData.new}
                            onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                            className="mt-2 w-full p-4 bg-surface rounded-2xl border border-secondary/5 font-medium text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Confirmer le nouveau mot de passe</label>
                          <input 
                            type="password"
                            required
                            value={passwordData.confirm}
                            onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                            className="mt-2 w-full p-4 bg-surface rounded-2xl border border-secondary/5 font-medium text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                        <div className="flex gap-4 pt-4">
                          <button 
                            type="button"
                            onClick={() => setIsChangingPassword(false)}
                            className="flex-1 py-4 bg-surface text-secondary font-bold rounded-2xl hover:bg-secondary/5 transition-all"
                          >
                            Annuler
                          </button>
                          <button 
                            type="submit"
                            className="flex-1 py-4 bg-secondary text-white rounded-2xl font-bold hover:bg-primary transition-all shadow-xl shadow-secondary/20"
                          >
                            Mettre à jour
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="pt-8 border-t border-secondary/5">
                      <h4 className="text-xs font-black uppercase tracking-widest text-red-500 mb-6">Zone de danger</h4>
                      <button className="flex items-center gap-3 text-red-500 font-bold hover:bg-red-50 px-6 py-3 rounded-xl transition-all">
                        <LogOut size={20} />
                        Supprimer mon compte définitivement
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-[3rem] shadow-xl border border-secondary/5 p-8 lg:p-12"
                >
                  <h3 className="text-2xl font-serif font-bold text-secondary mb-10">Paramètres généraux</h3>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Langue de l'interface</label>
                        <select 
                          value={settings.language}
                          onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                          className="mt-2 w-full p-4 bg-surface rounded-2xl border border-secondary/5 font-bold text-secondary appearance-none outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option>Français (FR)</option>
                          <option>English (US)</option>
                          <option>Wolof (SN)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Devise par défaut</label>
                        <select 
                          value={settings.currency}
                          onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                          className="mt-2 w-full p-4 bg-surface rounded-2xl border border-secondary/5 font-bold text-secondary appearance-none outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option>Euro (€)</option>
                          <option>Franc CFA (XOF)</option>
                          <option>Dollar ($)</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-6 bg-surface rounded-[2rem] border border-secondary/5">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-secondary">Mode sombre</h4>
                        <button 
                          onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
                          className={`w-12 h-6 rounded-full relative transition-colors ${settings.darkMode ? 'bg-primary' : 'bg-secondary/10'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.darkMode ? 'right-1' : 'left-1'}`} />
                        </button>
                      </div>
                      <p className="text-xs text-secondary/40 leading-relaxed">
                        Adaptez l'apparence de Krafty pour réduire la fatigue oculaire dans les environnements sombres.
                      </p>
                    </div>

                    <div className="pt-8 border-t border-secondary/5 flex justify-end gap-4">
                      <button 
                        onClick={() => {
                          setSettings({
                            language: 'Français (FR)',
                            currency: 'Euro (€)',
                            darkMode: false
                          });
                        }}
                        className="px-8 py-4 text-secondary/40 font-bold hover:text-secondary transition-colors"
                      >
                        Réinitialiser
                      </button>
                      <button 
                        onClick={() => {
                          handleSave();
                          alert('Paramètres enregistrés avec succès !');
                        }}
                        className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                      >
                        Enregistrer les modifications
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'landing' | 'login' | 'register' | 'privacy' | 'terms' | 'contact' | 'worker-detail' | 'messages' | 'notifications' | 'dashboard' | 'profile'>('landing');
  const [selectedWorkerId, setSelectedWorkerId] = useState<number | null>(null);
  const [activeConversationWorker, setActiveConversationWorker] = useState<WorkerProfile | undefined>(undefined);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('krafty_user');
    if (stored) setUser(JSON.parse(stored));

    const storedNotifs = localStorage.getItem('krafty_notifications');
    if (storedNotifs) {
      setNotifications(JSON.parse(storedNotifs));
    } else {
      // Mock notifications
      const mockNotifs: Notification[] = [
        {
          id: 1,
          type: 'recruitment',
          title: 'Nouvelle demande d\'engagement',
          content: 'Un client souhaite vous engager pour une mission de plomberie.',
          timestamp: 'Il y a 2h',
          isRead: false
        },
        {
          id: 2,
          type: 'message',
          title: 'Nouveau message',
          content: 'Moussa Diop vous a envoyé un message concernant votre projet.',
          timestamp: 'Il y a 5h',
          isRead: true
        },
        {
          id: 3,
          type: 'review',
          title: 'Nouvel avis reçu',
          content: 'Alice Dupont a laissé un avis 5 étoiles sur votre profil.',
          timestamp: 'Hier',
          isRead: false
        }
      ];
      setNotifications(mockNotifs);
      localStorage.setItem('krafty_notifications', JSON.stringify(mockNotifs));
    }

    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMarkAsRead = (id: number) => {
    const updated = notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    setNotifications(updated);
    localStorage.setItem('krafty_notifications', JSON.stringify(updated));
  };

  const handleGoProfile = () => {
    if (!user) return;
    if (user.role === 'worker') {
      setSelectedWorkerId(user.id);
      setView('worker-detail');
    } else {
      setView('profile');
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleAuthSuccess = (u: User) => {
    setUser(u);
    localStorage.setItem('krafty_user', JSON.stringify(u));
    setView('landing');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('krafty_user');
    setView('landing');
  };

  const isLanding = view === 'landing';

  if (view === 'login') {
    return <LoginPage onBack={() => setView('landing')} onAuthSuccess={handleAuthSuccess} onSwitchToRegister={() => setView('register')} />;
  }

  if (view === 'register') {
    return <RegisterPage onBack={() => setView('landing')} onAuthSuccess={handleAuthSuccess} onSwitchToLogin={() => setView('login')} />;
  }

  if (view === 'privacy') {
    return <PrivacyPage onBack={() => setView('landing')} />;
  }

  if (view === 'terms') {
    return <TermsPage onBack={() => setView('landing')} />;
  }

  if (view === 'contact') {
    return <ContactPage onBack={() => setView('landing')} />;
  }

  if (view === 'worker-detail' && selectedWorkerId) {
    return (
      <WorkerDetailPage 
        workerId={selectedWorkerId} 
        onBack={() => setView('landing')} 
        onMessage={(worker) => {
          setActiveConversationWorker(worker);
          setView('messages');
        }}
      />
    );
  }

  if (view === 'messages' && user) {
    return (
      <div className="min-h-screen">
        <Navbar 
          user={user} 
          onLogout={handleLogout} 
          onOpenAuth={() => setView('register')} 
          onOpenLogin={() => setView('login')}
          onGoHome={() => setView('landing')}
          onGoMessages={() => setView('messages')}
          onGoNotifications={() => setView('notifications')}
          onGoDashboard={() => setView('dashboard')}
          onGoProfile={handleGoProfile}
          unreadNotificationsCount={unreadCount}
        />
        <MessagesPage 
          user={user} 
          initialWorker={activeConversationWorker} 
          onBack={() => setView('landing')} 
          onViewProfile={(id) => {
            setSelectedWorkerId(id);
            setView('worker-detail');
          }}
        />
      </div>
    );
  }

  if (view === 'notifications' && user) {
    return (
      <div className="min-h-screen">
        <Navbar 
          user={user} 
          onLogout={handleLogout} 
          onOpenAuth={() => setView('register')} 
          onOpenLogin={() => setView('login')}
          onGoHome={() => setView('landing')}
          onGoMessages={() => setView('messages')}
          onGoNotifications={() => setView('notifications')}
          onGoDashboard={() => setView('dashboard')}
          onGoProfile={handleGoProfile}
          unreadNotificationsCount={unreadCount}
        />
        <NotificationsPage 
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onBack={() => setView('landing')}
        />
      </div>
    );
  }

  if (view === 'dashboard' && user) {
    return (
      <div className="min-h-screen">
        <Navbar 
          user={user} 
          onLogout={handleLogout} 
          onOpenAuth={() => setView('register')} 
          onOpenLogin={() => setView('login')}
          onGoHome={() => setView('landing')}
          onGoMessages={() => setView('messages')}
          onGoNotifications={() => setView('notifications')}
          onGoDashboard={() => setView('dashboard')}
          onGoProfile={handleGoProfile}
          unreadNotificationsCount={unreadCount}
        />
        <DashboardPage 
          user={user}
          onBack={() => setView('landing')}
        />
      </div>
    );
  }

  if (view === 'profile' && user) {
    return (
      <div className="min-h-screen">
        <Navbar 
          user={user} 
          onLogout={handleLogout} 
          onOpenAuth={() => setView('register')} 
          onOpenLogin={() => setView('login')}
          onGoHome={() => setView('landing')}
          onGoMessages={() => setView('messages')}
          onGoNotifications={() => setView('notifications')}
          onGoDashboard={() => setView('dashboard')}
          onGoProfile={handleGoProfile}
          unreadNotificationsCount={unreadCount}
        />
        <ProfilePage 
          user={user}
          onBack={() => setView('landing')}
          onUpdateUser={handleAuthSuccess}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onOpenAuth={() => setView('register')} 
        onOpenLogin={() => setView('login')}
        onGoHome={() => setView('landing')}
        onGoMessages={() => setView('messages')}
        onGoNotifications={() => setView('notifications')}
        onGoDashboard={() => setView('dashboard')}
        onGoProfile={handleGoProfile}
        unreadNotificationsCount={unreadCount}
      />
      
      <main>
        {user ? (
          <WorkerFeed onSelectWorker={(id) => {
            setSelectedWorkerId(id);
            setView('worker-detail');
          }} />
        ) : (
          <>
            <Hero onOpenAuth={() => setView('register')} />
            <SocialProof />
            <Benefits />
            
            {/* Features / Details Section */}
            <section className="py-40 bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-48">
                  <div className="order-2 lg:order-1">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] -rotate-3" />
                      <img src="https://picsum.photos/seed/feature1/800/600" className="relative rounded-[2.5rem] shadow-2xl z-10" alt="" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <span className="text-primary font-black uppercase tracking-widest text-xs mb-4 block">Pour les clients</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">Trouvez l'artisan idéal en un clin d'œil.</h2>
                    <ul className="space-y-6">
                      {[
                        "Recherche par spécialité et localisation précise.",
                        "Consultation des portfolios et réalisations passées.",
                        "Système de notation et avis clients vérifiés.",
                        "Messagerie directe pour discuter de vos projets."
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="mt-1 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <ArrowRight size={14} className="text-primary" />
                          </div>
                          <span className="text-lg text-secondary/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                  <div>
                    <span className="text-primary font-black uppercase tracking-widest text-xs mb-4 block">Pour les artisans</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">Valorisez votre savoir-faire et trouvez des clients.</h2>
                    <ul className="space-y-6">
                      {[
                        "Créez un profil professionnel attractif.",
                        "Mettez en avant vos meilleures réalisations.",
                        "Gérez vos disponibilités et vos tarifs.",
                        "Développez votre réputation grâce aux avis clients."
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="mt-1 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <ArrowRight size={14} className="text-primary" />
                          </div>
                          <span className="text-lg text-secondary/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-secondary/5 rounded-[3rem] rotate-3" />
                    <img src="https://picsum.photos/seed/feature2/800/600" className="relative rounded-[2.5rem] shadow-2xl z-10" alt="" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>
            </section>

            <FAQ />

            {/* Final CTA */}
            <section className="py-40 bg-surface px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-5xl md:text-6xl font-serif font-bold mb-10 tracking-tight">Prêt à commencer ?</h2>
                <p className="text-xl md:text-2xl text-secondary/60 mb-16 leading-relaxed">Rejoignez la communauté Krafty et donnez vie à vos projets avec les meilleurs artisans.</p>
                <button 
                  onClick={() => setView('register')}
                  className="bg-secondary text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-primary transition-all shadow-2xl shadow-secondary/20"
                >
                  Créer mon compte gratuitement
                </button>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer onNavigate={(v) => {
        setView(v);
        window.scrollTo(0, 0);
      }} />
      
      {!user && <StickyCTA onOpenAuth={() => setView('register')} show={showStickyCTA} />}
    </div>
  );
}
