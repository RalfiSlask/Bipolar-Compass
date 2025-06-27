import { PROXY_TEMPLATE_TEXT } from '@/app/data/help/economic';

const ProxyPreview = ({ showPreview }: { showPreview: boolean }) => {
  return (
    <div
      className={`transition-all duration-500 ease-in-out overflow-hidden ${
        showPreview ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      {showPreview && (
        <div className="flex flex-col gap-4 pt-4">
          <h3 className="text-xl font-semibold text-primary-dark">
            Förhandsvisning av mallen
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-primary-border shadow-sm">
            <pre className="text-sm whitespace-pre-wrap font-mono text-primary-dark leading-relaxed">
              {PROXY_TEMPLATE_TEXT}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProxyPreview;
