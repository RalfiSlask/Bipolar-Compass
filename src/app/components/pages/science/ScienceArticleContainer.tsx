import { IScienceArticle } from '@/app/types/science';
import ScienceAuthors from './ScienceAuthors';

interface ScienceArticleContainerProps {
  article: IScienceArticle;
}

const ScienceArticleContainer = ({ article }: ScienceArticleContainerProps) => {
  const {
    title,
    authors,
    pubDate,
    journal,
    volume,
    issue,
    pages,
    doi,
    pmid,
    publicationType,
  } = article;

  return (
    <div className="flex flex-col gap-2 p-4 border rounded-lg bg-white">
      <h3 className="font-bold text-primary-dark">
        <a
          href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 hover:underline"
        >
          {title}
        </a>
      </h3>
      <ScienceAuthors authors={authors} />
      <p className="text-sm text-primary-dark">
        {journal}. {pubDate}
        {volume && `; ${volume}`}
        {issue && `(${issue})`}
        {pages && `:${pages}`}.{doi && ` doi: ${doi}`}
      </p>
      <p className="text-sm text-gray-500">
        <a
          href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 hover:underline"
        >
          PMID: {pmid}
        </a>
        {publicationType && ` ${publicationType}`}.
      </p>
      {article.abstract && (
        <p className="text-sm mt-2 text-black">
          {article.abstract.substring(0, 300)}
          {article.abstract.length > 300 ? '...' : ''}
        </p>
      )}
    </div>
  );
};

export default ScienceArticleContainer;
