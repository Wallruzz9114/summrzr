import { linkIcon } from '../assets';

const Summary = (): JSX.Element => (
  <section className="w-full max-w-xl mt-16">
    <div className="flex flex-col w-full gap-2">
      <form className="relative flex items-center justify-center w-full" onSubmit={() => {}}>
        <img src={linkIcon} alt="link-icon" className="absolute left-0 w-5 my-2 ml-3" />
        <input
          type="url"
          placeholder="Paste the article link"
          value=""
          onChange={() => {}}
          onKeyDown={() => {}}
          required
          className="url_input peer" // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
        />
        <button
          type="submit"
          className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 "
        >
          <p>↵</p>
        </button>
      </form>
    </div>
  </section>
);

export default Summary;
