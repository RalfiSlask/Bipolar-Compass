import SectionTitle from "../../components/shared/headings/SectionTitle";
import { FaHandsHelping } from "react-icons/fa";
import { RELATIVE_TIPS } from "../../data/relatives";

const RoleAsRelative = () => {
  return (
    <div className="content-container">
      <SectionTitle icon={<FaHandsHelping />}>
        Din roll som anhörig
      </SectionTitle>
      <p className="mt-4">
        Din närstående behöver både kärlek och praktiskt stöd, men din roll som
        anhörig handlar också om att hitta en balans mellan att hjälpa andra och
        ta hand om dig själv. Här är några konkreta sätt du kan göra skillnad:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {RELATIVE_TIPS.map((item, index) => (
          <div
            key={index}
            className="bg-primary-light rounded-lg p-4 shadow-md"
          >
            <h4 className="text-lg mb-2 text-primary-dark font-semibold">
              {item.title}
            </h4>
            <p className="text-base">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleAsRelative;
