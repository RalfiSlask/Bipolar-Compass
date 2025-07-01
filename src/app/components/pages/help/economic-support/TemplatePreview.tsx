interface ITemplatePreviewProps {
  templateText: string;
  showPreview?: boolean;
  title?: string;
}

const TemplatePreview = ({
  templateText,
  showPreview = true,
  title = 'Förhandsvisning av mallen',
}: ITemplatePreviewProps) => {
  return (
    <div
      className={`transition-all duration-500 ease-in-out overflow-hidden ${
        showPreview ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      {showPreview && (
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-primary-dark">{title}</h3>
          <div className="bg-white p-4 rounded-lg border border-primary-border shadow-sm">
            <pre className="text-sm whitespace-pre-wrap font-mono text-dark leading-relaxed">
              {templateText}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatePreview;
