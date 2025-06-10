import { ICustomSession } from '@/app/types/authoptions';
import { IUserWithMoodTracker } from '@/app/types/user';
import { moodScoreColor, renderMessage } from '@/app/utils/dashboardUtils';

interface IMoodScoreContainerProps {
  moodScore: number;
  userData: IUserWithMoodTracker | null;
  user: ICustomSession['user'];
}

const MoodScoreContainer = ({
  moodScore,
  userData,
  user,
}: IMoodScoreContainerProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 lg:pr-20 relative overflow-hidden ">
      <div className="relative z-10">
        <h1 className="text-3xl font-semibold text-secondary-dark mb-3">
          Välkommen tillbaka, {user?.name}!
        </h1>
        <p className="text-gray-600 text-lg w-full">
          Ta en stund att reflektera över hur du mår idag. Din mentala hälsa är
          viktig.
        </p>
        <div className="flex flex-col">
          <div className="mt-6 flex-col sm:flex-row flex items-center">
            <span
              style={{ color: moodScoreColor(moodScore) }}
              className={`text-2xl font-semibold mr-4 `}
            >
              Moodscore: {moodScore}
            </span>

            <div className="h-2 flex-grow bg-primary-medium/60 rounded-full mt-4 sm:mt-0 w-full sm:w-auto overflow-hidden">
              <div
                className={`h-full w-full `}
                style={{
                  width: `${moodScore}%`,
                  backgroundColor: moodScoreColor(moodScore),
                }}
              ></div>
            </div>
          </div>
          {userData?.moodTrackerData && (
            <p className="text-gray-600 text-sm mt-1">
              {renderMessage(moodScore, userData?.moodTrackerData)}
            </p>
          )}
        </div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light rounded-full  transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-tertiary-light rounded-full  transform translate-x-8 translate-y-8"></div>
    </div>
  );
};

export default MoodScoreContainer;
