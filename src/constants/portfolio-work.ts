import type { PortfolioItem } from '../types/portfolio-item';
import AtmosphereImage from '../images/work/atmosphere/atmosphere.png';
import AtmosphereImageTwo from '../images/work/atmosphere/atmosphere-running.png';
import TodoLightImage from '../images/work/todo/lightmode.png';
import TodoDarkImage from '../images/work/todo/darkmode.png';
import TodoLightImageCloseup from '../images/work/todo/lightmode-closeup.png';
import TodoDarkImageCloseup from '../images/work/todo/darkmode-closeup.png';
import IrishNetworkHomePage from '../images/work/irish-network/home.png';
import IrishNetworkNewsPage from '../images/work/irish-network/news.png';
import IrishNetworkTeamImage from '../images/work/irish-network/team.png';

const websiteList: PortfolioItem[] = [
  {
    title: 'Atmosphere',
    description: 'A web app for making music',
    websiteLink: 'https://atmosphere.fly.dev/',
    codeLink: 'https://github.com/michael-duren/atmosphere',
    images: [AtmosphereImage, AtmosphereImageTwo],
  },
  {
    title: 'Irish Network',
    description: 'A web app for making music',
    websiteLink: 'https://irish-network-mn.vercel.app/',
    codeLink: 'https://github.com/michael-duren/Irish-Network-MN',
    images: [IrishNetworkHomePage, IrishNetworkNewsPage, IrishNetworkTeamImage],
  },
  {
    title: 'Todos',
    description:
      "A simple yet elegant todo app for user to keep track of their tasks. Todos lets you prioritze your busy life with priority, category, and deadline views and settings. Undo items, view how many you've completed per day. Available in both light and dark mode, ToDos respect your system settings and will automatically switch with your system between light and dark mode.",
    websiteLink: 'https://todos-michael-d-08c36acec5cc.herokuapp.com/',
    codeLink: 'https://github.com/michael-duren/todos',
    images: [
      TodoLightImage,
      TodoLightImageCloseup,
      TodoDarkImage,
      TodoDarkImageCloseup,
    ],
  },
];

export default websiteList;
