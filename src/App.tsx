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
  Mail
} from 'lucide-react';
import { User, WorkerProfile } from './types';

// --- Components ---

const Navbar = ({ user, onLogout, onOpenAuth, onGoHome }: { user: User | null, onLogout: () => void, onOpenAuth: () => void, onGoHome: () => void }) => {
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
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { onGoHome(); setIsMobileMenuOpen(false); }}>
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Hammer size={22} />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-secondary">KRAFTY</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {!user ? (
              <>
                <a href="#benefits" className="text-secondary/60 hover:text-primary font-bold transition-colors">Avantages</a>
                <a href="#faq" className="text-secondary/60 hover:text-primary font-bold transition-colors">FAQ</a>
                <button onClick={onOpenAuth} className="text-secondary/60 hover:text-primary font-bold transition-colors">Se connecter</button>
                <button 
                  onClick={onOpenAuth}
                  className="bg-secondary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary transition-all shadow-lg shadow-secondary/10"
                >
                  S'inscrire
                </button>
              </>
            ) : (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-5 py-2.5 bg-secondary/5 rounded-full border border-secondary/5 hover:bg-secondary/10 transition-all cursor-default">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-secondary shadow-sm">
                    <UserIcon size={16} />
                  </div>
                  <span className="font-bold text-secondary text-sm">{user.full_name}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-secondary/40 hover:text-primary font-bold transition-colors text-sm"
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
                    onClick={() => { onOpenAuth(); setIsMobileMenuOpen(false); }}
                    className="text-left text-2xl font-bold text-secondary"
                  >
                    Connexion / Inscription
                  </button>
                </>
              ) : (
                <>
                  <div className="p-6 bg-secondary/5 rounded-[2rem] mb-4">
                    <p className="text-secondary/40 text-sm font-bold uppercase mb-2">Connecté en tant que</p>
                    <p className="text-2xl font-bold text-secondary">{user.full_name}</p>
                  </div>
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
          
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[1.1] mb-10 text-secondary tracking-tight">
            L'excellence <br />
            <span className="text-primary italic">artisanale</span> <br />
            en un clic.
          </h1>
          
          <p className="text-xl text-secondary/60 mb-14 leading-relaxed max-w-lg">
            Krafty connecte les meilleurs talents locaux aux projets qui comptent. Rapide, vérifié, et à deux pas de chez vous.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onOpenAuth}
              className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-2"
            >
              Commencer maintenant
              <ArrowRight size={20} />
            </button>
            <button className="px-10 py-5 border-2 border-secondary/10 rounded-2xl font-bold text-lg hover:bg-secondary/5 transition-all">
              Voir les artisans
            </button>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/user${i}/100/100`} className="w-12 h-12 rounded-full border-4 border-white object-cover" alt="" referrerPolicy="no-referrer" />
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
    <section className="py-40 bg-surface relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24"
        >
          <Hammer size={300} />
        </motion.div>
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -right-24"
        >
          <Wrench size={300} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 tracking-tight">Pourquoi choisir Krafty ?</h2>
          <p className="text-secondary/60 max-w-2xl mx-auto text-xl leading-relaxed">Nous avons repensé la mise en relation pour offrir une expérience fluide, sécurisée et valorisante pour tous.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {benefits.map((b, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-secondary/5"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8">
                {b.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{b.title}</h3>
              <p className="text-secondary/60 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section className="py-32 border-y border-secondary/5">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-black uppercase tracking-[0.4em] text-secondary/30 mb-16">Ils nous font confiance</p>
        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-40 grayscale">
          {/* Placeholder for partner logos */}
          <div className="text-2xl font-black italic tracking-tighter">BUILDER.CO</div>
          <div className="text-2xl font-black italic tracking-tighter">AFRICA.TECH</div>
          <div className="text-2xl font-black italic tracking-tighter">LOCAL.PRO</div>
          <div className="text-2xl font-black italic tracking-tighter">CRAFT.HUB</div>
        </div>
        
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-secondary text-white p-12 rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="flex gap-1 text-primary mb-6">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <p className="text-2xl font-serif italic mb-8 leading-relaxed">"J'ai trouvé un électricien en 5 minutes pour une urgence un dimanche. Le travail était impeccable et le prix très correct. Je recommande Krafty à tout mon entourage."</p>
            <div className="flex items-center gap-4">
              <img src="https://picsum.photos/seed/test1/100/100" className="w-12 h-12 rounded-full object-cover" alt="" referrerPolicy="no-referrer" />
              <div>
                <p className="font-bold">Amadou Koné</p>
                <p className="text-white/40 text-sm">Client à Dakar</p>
              </div>
            </div>
          </div>
          
          <div className="bg-primary text-white p-12 rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="flex gap-1 text-white mb-6">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <p className="text-2xl font-serif italic mb-8 leading-relaxed">"Depuis que je suis sur Krafty, mon carnet de commandes est toujours plein. La plateforme me permet de montrer mon travail et de gagner la confiance de nouveaux clients."</p>
            <div className="flex items-center gap-4">
              <img src="https://picsum.photos/seed/test2/100/100" className="w-12 h-12 rounded-full object-cover" alt="" referrerPolicy="no-referrer" />
              <div>
                <p className="font-bold">Moussa Diop</p>
                <p className="text-white/60 text-sm">Plombier à Abidjan</p>
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
    <section className="py-40 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-serif font-bold mb-16 text-center tracking-tight">Questions fréquentes</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-secondary/5 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-surface transition-colors"
              >
                <span className="font-bold text-lg">{faq.q}</span>
                <ChevronRight className={`transition-transform ${openIndex === i ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-secondary/60 leading-relaxed"
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
    <footer className="bg-secondary text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <Hammer size={18} />
              </div>
              <span className="text-xl font-bold tracking-tighter">KRAFTY</span>
            </div>
            <p className="text-white/60 max-w-sm mb-8">
              La plateforme qui connecte les meilleurs artisans avec les projets les plus ambitieux. Qualité, confiance et savoir-faire.
            </p>
            <div className="flex gap-4">
              <button onClick={() => onNavigate('privacy')} className="text-white/40 hover:text-primary transition-colors text-sm">Confidentialité</button>
              <button onClick={() => onNavigate('terms')} className="text-white/40 hover:text-primary transition-colors text-sm">Conditions</button>
              <button onClick={() => onNavigate('contact')} className="text-white/40 hover:text-primary transition-colors text-sm">Contact</button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Restez informé</h4>
            <p className="text-white/60 mb-6 text-sm">Inscrivez-vous à notre newsletter pour recevoir nos conseils et actualités.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input 
                type="email" 
                placeholder="votre@email.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
              />
              <button 
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center gap-2 text-sm"
              >
                {subscribed ? "Merci !" : "S'abonner"}
                {!subscribed && <Send size={16} />}
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">© 2026 Krafty. Tous droits réservés.</p>
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

const WorkerFeed = ({ onSelectWorker }: { onSelectWorker: (id: number) => void }) => {
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');

  const specialties = ["Tous", "Plombier", "Électricien", "Maçon", "Peintre", "Menuisier", "Soudeur"];

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (specialty && specialty !== "Tous") params.append('specialty', specialty);
        if (search) params.append('search', search);
        
        const res = await fetch(`/api/workers?${params.toString()}`);
        const data = await res.json();
        setWorkers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white rounded-[3rem] aspect-[3/4] animate-pulse border border-secondary/5" />
            ))}
          </div>
        ) : workers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {workers.map((worker, i) => (
              <motion.div 
                key={worker.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -15 }}
                className="group cursor-pointer"
                onClick={() => onSelectWorker(worker.id)}
              >
                <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden mb-8 shadow-2xl shadow-secondary/10 border border-secondary/5">
                  <img 
                    src={worker.avatar_url || `https://picsum.photos/seed/${worker.id}/800/1066`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt={worker.full_name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-2xl flex items-center gap-2 text-yellow-500 shadow-xl border border-white/20">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-black text-secondary">{worker.rating?.toFixed(1)}</span>
                  </div>

                  {/* Experience Badge */}
                  {worker.experience_years && (
                    <div className="absolute bottom-6 left-6 bg-primary/90 backdrop-blur-xl px-4 py-2 rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-xl">
                      {worker.experience_years} ans d'expérience
                    </div>
                  )}

                  {/* Hover Action */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-white text-secondary px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      Voir le profil
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>

                <div className="px-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-3xl font-serif font-bold text-secondary group-hover:text-primary transition-colors">{worker.full_name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-primary text-xs font-black uppercase tracking-[0.2em]">{worker.specialty}</span>
                        <div className="w-1 h-1 bg-secondary/20 rounded-full" />
                        <div className="flex items-center gap-1.5 text-secondary/40 text-xs font-bold">
                          <MapPin size={12} />
                          <span>{worker.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-secondary/40 text-sm line-clamp-2 leading-relaxed font-medium">
                    {worker.bio || "Artisan passionné avec une solide expérience dans le domaine. Je m'engage à fournir un travail de qualité..."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[4rem] border border-dashed border-secondary/10">
            <div className="w-24 h-24 bg-secondary/5 rounded-full flex items-center justify-center mx-auto mb-8 text-secondary/10">
              <Search size={48} />
            </div>
            <h3 className="text-3xl font-serif font-bold mb-4">Aucun artisan trouvé</h3>
            <p className="text-secondary/40 text-lg max-w-md mx-auto">Nous n'avons pas trouvé d'artisan correspondant à vos critères. Essayez d'élargir votre recherche.</p>
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
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        onAuthSuccess(data);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
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
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 lg:mb-10 leading-tight">Accédez à votre <span className="text-primary italic">espace</span> Krafty.</h2>
            <p className="text-base lg:text-xl text-secondary/60 mb-8 lg:mb-14 leading-relaxed">
              Connectez-vous pour gérer vos projets, discuter avec vos artisans et suivre l'avancement de vos travaux en temps réel.
            </p>
            <div className="space-y-4 lg:space-y-8">
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="w-10 h-10 lg:w-14 lg:h-14 bg-white rounded-xl lg:rounded-2xl shadow-sm flex items-center justify-center text-primary shrink-0">
                  <Zap size={20} className="lg:w-7 lg:h-7" />
                </div>
                <p className="text-sm lg:text-lg font-bold">Suivi en temps réel</p>
              </div>
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="w-10 h-10 lg:w-14 lg:h-14 bg-white rounded-xl lg:rounded-2xl shadow-sm flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck size={20} className="lg:w-7 lg:h-7" />
                </div>
                <p className="text-sm lg:text-lg font-bold">Paiements sécurisés</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center items-center relative overflow-hidden bg-white">
          <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none">
            <Hammer size={600} />
          </div>
          
          <div className="w-full max-w-md relative z-10">
            <div className="mb-8 lg:mb-12 text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-2 lg:mb-4">Bon retour !</h1>
              <p className="text-sm lg:text-base text-secondary/40">Entrez vos identifiants pour continuer.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              <div className="space-y-1 lg:space-y-2">
                <label className="text-xs lg:text-sm font-bold text-secondary/60 ml-1">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-3 lg:px-6 lg:py-4 bg-surface border-none rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm lg:text-base"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-1 lg:space-y-2">
                <label className="text-xs lg:text-sm font-bold text-secondary/60 ml-1">Mot de passe</label>
                <input 
                  type="password" 
                  required
                  className="w-full px-4 py-3 lg:px-6 lg:py-4 bg-surface border-none rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm lg:text-base"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <button 
                disabled={loading}
                className="w-full bg-secondary text-white py-4 lg:py-5 rounded-xl lg:rounded-2xl font-bold text-base lg:text-lg hover:bg-primary transition-all shadow-xl shadow-secondary/10 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {loading && <Loader2 className="animate-spin" size={20} />}
                Se connecter
              </button>
            </form>

            <p className="mt-8 lg:mt-12 text-center text-xs lg:text-base text-secondary/40">
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
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role })
      });
      const data = await res.json();
      if (res.ok) {
        onAuthSuccess(data);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
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
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 lg:mb-10 leading-tight">Rejoignez la <span className="text-primary italic">révolution</span> de l'artisanat.</h2>
            <p className="text-base lg:text-xl text-secondary/60 mb-8 lg:mb-14 leading-relaxed">
              Que vous soyez un client à la recherche d'excellence ou un artisan souhaitant valoriser son savoir-faire, Krafty est fait pour vous.
            </p>
            <div className="grid grid-cols-1 gap-4 lg:gap-8">
              <div className="p-4 lg:p-8 bg-white rounded-xl lg:rounded-[2.5rem] shadow-sm border border-primary/10">
                <h3 className="font-bold text-base lg:text-xl mb-1 lg:mb-3">Pour les Clients</h3>
                <p className="text-xs lg:text-base text-secondary/60 leading-relaxed">Accès gratuit à des milliers d'artisans vérifiés et certifiés près de chez vous.</p>
              </div>
              <div className="p-4 lg:p-8 bg-white rounded-xl lg:rounded-[2.5rem] shadow-sm border border-primary/10">
                <h3 className="font-bold text-base lg:text-xl mb-1 lg:mb-3">Pour les Artisans</h3>
                <p className="text-xs lg:text-base text-secondary/60 leading-relaxed">Boostez votre visibilité, gérez vos avis et trouvez des chantiers qualifiés.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center items-center relative overflow-hidden bg-white">
          <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none">
            <Wrench size={600} />
          </div>

          <div className="w-full max-w-md relative z-10">
            <div className="mb-8 lg:mb-12 text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-2 lg:mb-4">Créer un compte</h1>
              <p className="text-sm lg:text-base text-secondary/40">Choisissez votre profil et commencez l'aventure.</p>
            </div>

            <div className="flex p-1 bg-surface rounded-xl lg:rounded-2xl mb-6 lg:mb-8">
              <button 
                onClick={() => setRole('client')}
                className={`flex-1 py-2 lg:py-3 text-xs lg:text-sm font-bold rounded-lg lg:rounded-xl transition-all ${role === 'client' ? 'bg-white shadow-sm text-primary' : 'text-secondary/40'}`}
              >
                Client
              </button>
              <button 
                onClick={() => setRole('worker')}
                className={`flex-1 py-2 lg:py-3 text-xs lg:text-sm font-bold rounded-lg lg:rounded-xl transition-all ${role === 'worker' ? 'bg-white shadow-sm text-primary' : 'text-secondary/40'}`}
              >
                Artisan
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-5">
              <input 
                type="text" 
                placeholder="Nom complet" 
                required
                className="w-full px-4 py-3 lg:px-6 lg:py-4 bg-surface border-none rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm lg:text-base"
                value={formData.full_name}
                onChange={e => setFormData({...formData, full_name: e.target.value})}
              />
              <input 
                type="email" 
                placeholder="Email" 
                required
                className="w-full px-4 py-3 lg:px-6 lg:py-4 bg-surface border-none rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm lg:text-base"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <input 
                type="password" 
                placeholder="Mot de passe" 
                required
                className="w-full px-4 py-3 lg:px-6 lg:py-4 bg-surface border-none rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm lg:text-base"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Ville / Localisation" 
                required
                className="w-full px-4 py-3 lg:px-6 lg:py-4 bg-surface border-none rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm lg:text-base"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
              {role === 'worker' && (
                <input 
                  type="text" 
                  placeholder="Spécialité" 
                  required
                  className="w-full px-4 py-3 lg:px-6 lg:py-4 bg-surface border-none rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm lg:text-base"
                  value={formData.specialty}
                  onChange={e => setFormData({...formData, specialty: e.target.value})}
                />
              )}
              <button 
                disabled={loading}
                className="w-full bg-primary text-white py-4 lg:py-5 rounded-xl lg:rounded-2xl font-bold text-base lg:text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {loading && <Loader2 className="animate-spin" size={20} />}
                Créer mon compte
              </button>
            </form>

            <p className="mt-8 lg:mt-12 text-center text-xs lg:text-base text-secondary/40">
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
            className="pointer-events-auto bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-primary/40 flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <span>Rejoindre Krafty gratuitement</span>
            <ArrowRight size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AuthModal = ({ isOpen, onClose, onAuthSuccess }: { isOpen: boolean, onClose: () => void, onAuthSuccess: (u: User) => void }) => {
  return null; // Deprecated in favor of full pages
};

const WorkerDetailPage = ({ workerId, onBack }: { workerId: number, onBack: () => void }) => {
  const [worker, setWorker] = useState<WorkerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHiring, setIsHiring] = useState(false);

  useEffect(() => {
    const fetchWorker = async () => {
      setLoading(true);
      const res = await fetch(`/api/workers/${workerId}`);
      const data = await res.json();
      setWorker(data);
      setLoading(false);
      window.scrollTo(0, 0);
    };
    fetchWorker();
  }, [workerId]);

  const handleHire = async () => {
    setIsHiring(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsHiring(false);
    alert("Demande d'engagement envoyée avec succès !");
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
        <button onClick={onBack} className="flex items-center gap-2 text-secondary/40 hover:text-primary transition-colors font-bold mb-8">
          <ArrowRight className="rotate-180" size={20} />
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
            <div className="absolute bottom-10 left-10 text-white lg:hidden">
              <h1 className="text-4xl font-serif font-bold mb-2">{worker.full_name}</h1>
              <p className="text-xl opacity-80">{worker.specialty}</p>
            </div>
          </div>
          
          <div className="flex-1 p-8 lg:p-20">
            <div className="hidden lg:block mb-12">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-4">{worker.full_name}</h1>
                  <div className="flex items-center gap-6">
                    <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold uppercase tracking-widest">{worker.specialty}</span>
                    <div className="flex items-center gap-2 text-yellow-500">
                      <Star size={24} fill="currentColor" />
                      <span className="font-bold text-2xl text-secondary">{worker.rating?.toFixed(1)}</span>
                      <span className="text-secondary/40 text-lg">({worker.reviews.length} avis)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mb-16">
              <div className="p-6 bg-surface rounded-3xl text-center border border-secondary/5">
                <Briefcase className="mx-auto mb-3 text-primary" size={32} />
                <p className="text-xs text-secondary/40 uppercase font-bold tracking-widest mb-1">Expérience</p>
                <p className="text-xl font-bold">{worker.experience_years || 5}+ ans</p>
              </div>
              <div className="p-6 bg-surface rounded-3xl text-center border border-secondary/5">
                <ShieldCheck className="mx-auto mb-3 text-primary" size={32} />
                <p className="text-xs text-secondary/40 uppercase font-bold tracking-widest mb-1">Vérifié</p>
                <p className="text-xl font-bold">Identité OK</p>
              </div>
              <div className="p-6 bg-surface rounded-3xl text-center border border-secondary/5">
                <MapPin className="mx-auto mb-3 text-primary" size={32} />
                <p className="text-xs text-secondary/40 uppercase font-bold tracking-widest mb-1">Localisation</p>
                <p className="text-xl font-bold">{worker.location}</p>
              </div>
            </div>

            <div className="space-y-12">
              <section>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  À propos
                </h3>
                <p className="text-lg text-secondary/70 leading-relaxed">
                  {worker.bio || "Artisan passionné avec une solide expérience dans le domaine. Je m'engage à fournir un travail de qualité, durable et respectueux des normes de sécurité. Disponible pour tous vos projets, petits ou grands."}
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  Réalisations
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="group relative overflow-hidden rounded-2xl aspect-square">
                      <img 
                        src={`https://picsum.photos/seed/work${worker.id}${i}/600/600`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        alt="Travail" 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  Avis Clients
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {worker.reviews.length > 0 ? worker.reviews.map(review => (
                    <div key={review.id} className="p-8 border border-secondary/5 rounded-[2rem] bg-surface relative">
                      <div className="flex justify-between items-center mb-4">
                        <p className="font-bold text-lg">{review.client_name}</p>
                        <div className="flex text-yellow-500 gap-1"><Star size={16} fill="currentColor" /> {review.rating}</div>
                      </div>
                      <p className="text-secondary/60 italic leading-relaxed">"{review.comment}"</p>
                      <p className="text-[10px] text-secondary/20 uppercase font-bold mt-4">Vérifié par Krafty</p>
                    </div>
                  )) : (
                    <p className="text-secondary/40 text-lg italic">Aucun avis pour le moment.</p>
                  )}
                </div>
              </section>
            </div>

            <div className="mt-20 pt-10 border-t border-secondary/5 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleHire}
                disabled={isHiring}
                className="flex-1 bg-primary text-white py-6 rounded-2xl font-bold text-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isHiring && <Loader2 className="animate-spin" size={24} />}
                {isHiring ? "Traitement..." : `Engager ${worker.full_name.split(' ')[0]}`}
              </button>
              <button className="px-10 py-6 border-2 border-secondary/10 rounded-2xl font-bold text-xl hover:bg-secondary/5 transition-all">
                Message
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'landing' | 'login' | 'register' | 'privacy' | 'terms' | 'contact' | 'worker-detail'>('landing');
  const [selectedWorkerId, setSelectedWorkerId] = useState<number | null>(null);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('krafty_user');
    if (stored) setUser(JSON.parse(stored));

    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    return <WorkerDetailPage workerId={selectedWorkerId} onBack={() => setView('landing')} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onOpenAuth={() => setView('register')} 
        onGoHome={() => setView('landing')}
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
