// add listener if user is on phone/tablet and cannot hover over
// cards
document.addEventListener('DOMContentLoaded', () => {
  const websiteList: HTMLDivElement[] = Array.from(
    document.querySelectorAll('.website-card')
  );
  websiteList.forEach((website) => {
    const overlay = website.querySelector('.overlay');
    const links: HTMLAnchorElement[] = Array.from(
      website.querySelectorAll('a')
    );

    links.forEach((link) => {
      link.addEventListener('touchend', (e) => {
        e.stopPropagation(); // stop overlay code from running
      });
    });
    website.addEventListener('touchend', (e) => {
      e.preventDefault();
      overlay?.classList.toggle('hidden');
    });
  });
});
