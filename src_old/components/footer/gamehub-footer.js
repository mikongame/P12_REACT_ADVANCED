import './gamehub-footer.css';
import linkedinIcon from '../../assets/icons/linkedin-icon.png';
import emailIcon from '../../assets/icons/email-icon.png';
import githubIcon from '../../assets/icons/github-icon.png';

export function createGameHubFooter() {
  const footer = document.createElement('footer');
  footer.classList.add('gamehub-footer');

  const text = document.createElement('p');
  text.textContent = `© ${new Date().getFullYear()} Miguel García Melgar · Built with ❤️ using Vanilla JS & Vite`;

  const icons = document.createElement('div');
  icons.classList.add('gamehub-social-icons');

  const links = [
    { href: 'https://linkedin.com/in/mikongame', src: linkedinIcon, alt: 'LinkedIn' },
    { href: 'mailto:mikongame@gmail.com', src: emailIcon, alt: 'Email' },
    { href: 'https://github.com/mikongame', src: githubIcon, alt: 'GitHub' },
  ];

  links.forEach(({ href, src, alt }) => {
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;

    a.appendChild(img);
    icons.appendChild(a);
  });

  footer.append(text, icons);
  return footer;
}
