import { IHealthcareProvider } from "@/app/types/healthcareProvider";
import { IRelative } from "@/app/types/relative";
interface CaregiverInfoContainerProps {
    caregiver: IHealthcareProvider | IRelative;
    typeLabel: string;
}

const CaregiverInfoContainer = ( { caregiver, typeLabel }: CaregiverInfoContainerProps) => {

 const { name, type, email, email_frequency, email_enabled } = caregiver;

  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
            <p className="text-base font-medium md:text-primary-dark">Namn</p>
            <p className={`text-base ${name ? 'md:text-gray-900' : 'text-gray-500'}`}>
                {name || 'Namn saknas'}
            </p>
        </div>
        <div>
            <p className="text-base font-medium md:text-primary-dark">Typ</p>
            <p className={`text-base ${type ? 'md:text-gray-900' : 'text-gray-500'}`}>
                {typeLabel}
            </p>
        </div>
        <div className="col-span-2">
            <p className="text-base font-medium md:text-primary-dark">E-post</p>
            <p className={`text-base ${email ? 'md:text-gray-900' : 'text-gray-500'} break-words`}>
                {email || 'E-post saknas'}
            </p>
        </div>
        <div>
            <p className="text-base font-medium md:text-primary-dark">Frekvens</p>
            <p className="text-base md:text-gray-900">
                {email_frequency === 'weekly' && 'Varje vecka'}
                {email_frequency === 'biweekly' && 'Varannan vecka'}
                {email_frequency === 'monthly' && 'Månadsvis'}
            </p>
        </div>
        <div>
            <p className="text-base font-medium md:text-primary-dark">Påminnelser</p>
            <p className="text-base md:text-gray-900">
                {email_enabled ? (
                <span className="text-green-700">Aktiverad</span>
                ) : (
                <span className="text-gray-500">Inaktiverad</span>
                )}
            </p>
        </div>
    </div>
  )
}

export default CaregiverInfoContainer