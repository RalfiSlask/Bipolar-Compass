import { IMoodLog } from '../types/moodlog';
export class MoodLog implements IMoodLog {
  constructor(
    public user_id: string = '',
    public date: string = new Date().toISOString(),
    public time: string = '',
    public ai_image_id: string = '',
    public mood_score: number = 0,
    public sleep_hours: number = 0,
    public anxiety_level: number = 0,
    public energy_level: number = 0,
    public stress_level: number = 0,
    public physical_level: number = 0
  ) {}
}
