import { useEffect, useState } from 'react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface IRequirement {
  regex: RegExp;
  text: string;
  met: boolean;
}

const PasswordStrengthIndicator = ({
  password,
}: PasswordStrengthIndicatorProps) => {
  const [strength, setStrength] = useState(0);
  const [message, setMessage] = useState('');
  const [requirements, setRequirements] = useState<IRequirement[]>([
    { regex: /.{8,}/, text: 'Minst 8 tecken', met: false },
    { regex: /[A-Z]/, text: 'En stor bokstav', met: false },
    { regex: /[a-z]/, text: 'En liten bokstav', met: false },
    { regex: /[0-9]/, text: 'En siffra', met: false },
    { regex: /[^A-Za-z0-9]/, text: 'Ett specialtecken', met: false },
  ]);

  useEffect(() => {
    const updatedRequirements = requirements.map((req) => ({
      ...req,
      met: req.regex.test(password),
    }));
    setRequirements(updatedRequirements);

    const currentStrength = updatedRequirements.filter((req) => req.met).length;
    setStrength(currentStrength);

    const messages = {
      0: 'Mycket svagt',
      1: 'Svagt',
      2: 'Medel',
      3: 'Bra',
      4: 'Starkt',
      5: 'Godkänt',
    };
    setMessage(messages[currentStrength as keyof typeof messages] || '');
  }, [password]);

  const getColor = () => {
    const colors = {
      0: 'bg-red-500',
      1: 'bg-orange-500',
      2: 'bg-yellow-500',
      3: 'bg-lime-500',
      4: 'bg-green-700',
      5: 'bg-primary-medium',
    };
    return colors[strength as keyof typeof colors] || 'bg-gray-200';
  };

  const getTextColor = () => {
    const colors = {
      0: 'text-red-700',
      1: 'text-orange-700',
      2: 'text-yellow-700',
      3: 'text-lime-700',
      4: 'text-green-700',
      5: 'text-primary-medium',
    };
    return colors[strength as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            Lösenordsstyrka:
          </span>
          <span className={`text-sm font-medium ${getTextColor()}`}>
            {message}
          </span>
        </div>
        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
          <div
            className={`transition-all duration-500 ease-out ${getColor()}`}
            style={{ width: `${(strength / 5) * 100}%`, height: '100%' }}
            role="progressbar"
            aria-valuenow={(strength / 5) * 100}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Lösenordsstyrka"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Lösenordet måste innehålla:
        </h3>
        <ul className="space-y-2">
          {requirements.map((requirement, index) => (
            <li
              key={index}
              className={`flex items-center gap-2 text-sm transition-colors duration-200
                ${requirement.met ? 'text-primary-medium' : 'text-gray-600'}`}
            >
              <span className="w-4 h-4 inline-flex items-center justify-center">
                {requirement.met ? (
                  <span className="text-primary-medium">✓</span>
                ) : (
                  <span className="text-red-500">×</span>
                )}
              </span>
              {requirement.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
