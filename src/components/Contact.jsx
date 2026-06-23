import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiMail, FiMessageCircle } from 'react-icons/fi';
import { SiBilibili } from 'react-icons/si';
import SectionTitle from './shared/SectionTitle.jsx';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: FiGithub, label: 'GitHub', href: 'https://github.com/ZHCOOL520', hoverColor: 'hover:bg-neutral-800 hover:text-white', desc: '查看我的开源项目' },
  { icon: SiBilibili, label: '哔哩哔哩', href: 'https://space.bilibili.com/1414910921', hoverColor: 'hover:bg-pink-500 hover:text-white', desc: '关注我的B站动态' },
  { icon: FiMail, label: 'QQ邮箱', href: 'mailto:ZHCOOL520@qq.com', hoverColor: 'hover:bg-indigo-500 hover:text-white', desc: 'ZHCOOL520@qq.com' },
  { icon: FiMail, label: 'Foxmail', href: 'mailto:ZHCOOL520@foxmail.com', hoverColor: 'hover:bg-sky-500 hover:text-white', desc: 'ZHCOOL520@foxmail.com' },
  { icon: FiMessageCircle, label: 'QQ群', href: 'https://qm.qq.com/q/1125585497', hoverColor: 'hover:bg-indigo-500 hover:text-white', desc: 'QQ群: 1125585497' },
];

export default function Contact() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;
    const left = el.querySelector('.contact-left');
    const links = el.querySelectorAll('.contact-link');
    gsap.set(left, { autoAlpha: 0, x: -30 });
    gsap.set(links, { autoAlpha: 0, x: -20 });
    const st1 = ScrollTrigger.create({ trigger: el, start: 'top 88%', onEnter: () => gsap.to(left, { autoAlpha: 1, x: 0, duration: 0.6, ease: 'power3.out' }), once: true });
    const st2 = ScrollTrigger.create({ trigger: el, start: 'top 85%', onEnter: () => gsap.to(links, { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.12, delay: 0.2, ease: 'back.out(1.4)' }), once: true });
    return () => { st1.kill(); st2.kill(); };
  }, { scope: sectionRef });

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 px-6 z-10">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="联系我" subtitle="// Get In Touch" />

        <div className="max-w-lg mx-auto">
          <div className="contact-left text-center">
            <h3 className="text-xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
              一起<span className="text-gradient">创造</span>吧
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8">
              如果你有有趣的项目想法，或者想聊聊技术、开源，欢迎随时联系我！
              我始终对新技术和合作机会保持开放态度。
            </p>
            <div className="space-y-3">
              {socialLinks.map((link, i) => (
                <a key={i} className="contact-link glass-card-sm flex items-center gap-4 group transition-all duration-300" href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  <div className={`w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300 ${link.hoverColor}`}>
                    <link.icon size={20} className="text-indigo-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-neutral-800 dark:text-neutral-100 text-sm">{link.label}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">{link.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
