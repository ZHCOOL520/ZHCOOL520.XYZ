import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiMail, FiMessageCircle } from 'react-icons/fi';
import { SiBilibili } from 'react-icons/si';
import SectionTitle from './shared/SectionTitle.jsx';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: FiGithub, label: 'GitHub', href: 'https://github.com/ZHCOOL520', hoverColor: 'group-hover:text-gray-800 dark:group-hover:text-white', desc: '查看我的开源项目' },
  { icon: SiBilibili, label: '哔哩哔哩', href: 'https://space.bilibili.com/1414910921', hoverColor: 'group-hover:text-pink-500', desc: '关注我的B站动态' },
  { icon: FiMail, label: 'QQ邮箱', href: 'mailto:ZHCOOL520@qq.com', hoverColor: 'group-hover:text-indigo-500', desc: 'ZHCOOL520@qq.com' },
  { icon: FiMail, label: 'Foxmail', href: 'mailto:ZHCOOL520@foxmail.com', hoverColor: 'group-hover:text-sky-500', desc: 'ZHCOOL520@foxmail.com' },
  { icon: FiMessageCircle, label: 'QQ群', href: 'https://qm.qq.com/q/1125585497', hoverColor: 'group-hover:text-primary', desc: 'QQ群: 1125585497' },
];

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const left = el.querySelector('[data-anim="left"]');
    const links = el.querySelectorAll('[data-anim="link"]');
    gsap.set(left, { opacity: 0, x: -30 });
    links.forEach((l) => gsap.set(l, { opacity: 0, x: -20 }));
    const st1 = ScrollTrigger.create({ trigger: el, start: 'top 90%', onEnter: () => gsap.to(left, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }), once: true });
    const st2 = ScrollTrigger.create({ trigger: el, start: 'top 88%', onEnter: () => gsap.to(links, { opacity: 1, x: 0, duration: 0.4, stagger: 0.12, delay: 0.2, ease: 'power2.out' }), once: true });
    return () => { st1.kill(); st2.kill(); };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 px-6 z-10">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="联系我" subtitle="// Get In Touch" />

        <div className="max-w-lg mx-auto">
          <div data-anim="left" className="text-center">
            <h3 className="text-xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
              一起<span className="text-gradient">创造</span>吧
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8">
              如果你有有趣的项目想法，或者想聊聊技术、开源，欢迎随时联系我！
              我始终对新技术和合作机会保持开放态度。
            </p>
            <div className="space-y-3">
              {socialLinks.map((link, i) => (
                <a key={i} data-anim="link" href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined} className={`glass-card-sm flex items-center gap-4 group transition-all ${link.hoverColor}`}>
                  <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
                    <link.icon size={20} className="text-primary group-hover:text-inherit transition-colors" />
                  </div>
                  <div>
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
