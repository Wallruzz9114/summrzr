import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState } from 'react';
import { copy, linkIcon, loader, tick } from '../assets';
import { Article } from '../models/article';
import { useLazyGetSummaryQuery } from '../services/articlesService';

const Summary = (): JSX.Element => {
  const [article, setArticle] = useState<Article>({
    url: '',
    summary: '',
  });

  const [articles, setArticles] = useState<Article[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles')!) as Article[];

    if (articlesFromLocalStorage) {
      setArticles(articlesFromLocalStorage);
    }
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const existingArticle = articles.find((item) => item.url === article.url);

    if (existingArticle) {
      return setArticle(existingArticle);
    }

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...articles];

      // update state and local storage
      setArticle(newArticle);
      setArticles(updatedAllArticles);
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  };

  // copy the url and toggle the icon for user feedback
  const handleCopy = (copyUrl: string) => {
    setCopied(true);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLFormElement>) => {
    if (event.key === 'Enter') {
      submit(event as KeyboardEvent<HTMLFormElement>);
    }
  };

  return (
    <section className="w-full max-w-xl mt-16">
      <div className="flex flex-col w-full gap-2">
        <form className="relative flex items-center justify-center w-full" onSubmit={submit}>
          <img src={linkIcon} alt="link-icon" className="absolute left-0 w-5 my-2 ml-3" />
          <input
            type="url"
            placeholder="Paste the article link"
            value={article.url}
            onChange={(event: ChangeEvent) =>
              setArticle({ ...article, url: (event.target as HTMLInputElement).value })
            }
            onKeyDown={handleKeyDown}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 "
          >
            <p>↵</p>
          </button>
        </form>
        <div className="flex flex-col gap-1 overflow-y-auto max-h-60">
          {articles.reverse().map((item, index) => (
            <div key={`link-${index}`} onClick={() => setArticle(item)} className="link_card">
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied ? tick : copy}
                  alt={copied ? 'tick_icon' : 'copy_icon'}
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 text-sm font-medium text-blue-700 truncate font-satoshi">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center max-w-full my-10">
        {isFetching ? (
          <img src={loader} alt="loader" className="object-contain w-20 h-20" />
        ) : error ? (
          <p className="font-bold text-center text-black font-inter">
            Well, that wasn't supposed to happen...
            <br />
            <span className="font-normal text-gray-700 font-satoshi">
              {((error as FetchBaseQueryError)?.data as any)?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-gray-600 font-satoshi">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="text-sm font-medium text-gray-700 font-inter">{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Summary;
