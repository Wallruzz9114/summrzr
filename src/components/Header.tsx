import { logo } from '../assets';

const Header = (): JSX.Element => (
  <header className="flex flex-col items-center justify-center w-full">
    <nav className="flex items-center justify-between w-full pt-3 mb-10">
      <img src={logo} alt="summrzr_logo" className="object-contain w-28" />
      <button
        type="button"
        onClick={() => window.open('https://github.com/Wallruzz9114/summrzr')}
        className="black_btn"
      >
        Github
      </button>
    </nav>

    <h1 className="head_text">
      Summarize articles with <br className="max-md:hidden" />
      <span className="orange_gradient">OpenAI GPT-4</span>
    </h1>
    <h2 className="desc">
      Too busy to read through an article? This tool allows you to get a consise summary powered by
      AI.
    </h2>
  </header>
);

export default Header;
