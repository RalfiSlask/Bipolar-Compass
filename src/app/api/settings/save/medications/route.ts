import { IMedication } from '@/app/types/medication';
import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { scheduleMedicationReminder } from '@/app/utils/qstashUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/settings/save/medications:
 *   put:
 *     summary: Save user medications and schedule reminders
 *     description: Updates the user's medication list and schedules QStash reminders for medications with enabled reminders. Handles both new medication scheduling and existing reminder management.
 *     tags:
 *       - Settings
 *       - Medications
 *       - Reminders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - medications
 *               - email
 *             properties:
 *               medications:
 *                 type: array
 *                 description: Array of user medications with reminder settings
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Name of the medication
 *                       example: "Lithium"
 *                     dosage:
 *                       type: string
 *                       description: Dosage information
 *                       example: "300mg"
 *                     frequency:
 *                       type: string
 *                       description: How often the medication is taken
 *                       example: "Twice daily"
 *                     instructions:
 *                       type: string
 *                       description: Special instructions for taking the medication
 *                       example: "Take with food"
 *                     reminder:
 *                       type: object
 *                       description: Reminder settings for this medication
 *                       properties:
 *                         enabled:
 *                           type: boolean
 *                           description: Whether reminders are enabled for this medication
 *                           example: true
 *                         times:
 *                           type: array
 *                           description: Times when reminders should be sent
 *                           items:
 *                             type: string
 *                             format: time
 *                             description: Time in HH:MM format
 *                           example: ["08:00", "20:00"]
 *                         schedule:
 *                           type: array
 *                           description: Existing scheduled reminders (managed by system)
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 description: QStash schedule ID
 *                                 example: "qs_123456789"
 *                               time:
 *                                 type: string
 *                                 format: time
 *                                 description: Scheduled time
 *                                 example: "08:00"
 *                               status:
 *                                 type: string
 *                                 description: Schedule status
 *                                 example: "active"
 *                           example:
 *                             - id: "qs_123456789"
 *                               time: "08:00"
 *                               status: "active"
 *                             - id: "qs_987654321"
 *                               time: "20:00"
 *                               status: "active"
 *                 example:
 *                   - name: "Lithium"
 *                     dosage: "300mg"
 *                     frequency: "Twice daily"
 *                     instructions: "Take with food"
 *                     reminder:
 *                       enabled: true
 *                       times: ["08:00", "20:00"]
 *                       schedule: []
 *                   - name: "Lamotrigine"
 *                     dosage: "100mg"
 *                     frequency: "Once daily"
 *                     instructions: "Take in the morning"
 *                     reminder:
 *                       enabled: true
 *                       times: ["09:00"]
 *                       schedule: []
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address for identification
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Medications saved and reminders scheduled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Medicines saved"
 *                 medications:
 *                   type: array
 *                   description: Updated medications array with scheduled reminders
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Medication name
 *                         example: "Lithium"
 *                       dosage:
 *                         type: string
 *                         description: Dosage information
 *                         example: "300mg"
 *                       frequency:
 *                         type: string
 *                         description: Frequency of administration
 *                         example: "Twice daily"
 *                       instructions:
 *                         type: string
 *                         description: Special instructions
 *                         example: "Take with food"
 *                       reminder:
 *                         type: object
 *                         description: Reminder settings with scheduled reminders
 *                         properties:
 *                           enabled:
 *                             type: boolean
 *                             description: Whether reminders are enabled
 *                             example: true
 *                           times:
 *                             type: array
 *                             description: Reminder times
 *                             items:
 *                               type: string
 *                               format: time
 *                             example: ["08:00", "20:00"]
 *                           schedule:
 *                             type: array
 *                             description: Scheduled QStash reminders
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                   description: QStash schedule ID
 *                                   example: "qs_123456789"
 *                                 time:
 *                                   type: string
 *                                   format: time
 *                                   description: Scheduled time
 *                                   example: "08:00"
 *                                 status:
 *                                   type: string
 *                                   description: Schedule status
 *                                   example: "active"
 *       400:
 *         description: Bad request - Invalid data format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Invalid medication data format"
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "could not save medications"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const medicationData = {
 *             medications: [
 *               {
 *                 name: "Lithium",
 *                 dosage: "300mg",
 *                 frequency: "Twice daily",
 *                 instructions: "Take with food",
 *                 reminder: {
 *                   enabled: true,
 *                   times: ["08:00", "20:00"],
 *                   schedule: []
 *                 }
 *               },
 *               {
 *                 name: "Lamotrigine",
 *                 dosage: "100mg",
 *                 frequency: "Once daily",
 *                 instructions: "Take in the morning",
 *                 reminder: {
 *                   enabled: true,
 *                   times: ["09:00"],
 *                   schedule: []
 *                 }
 *               }
 *             ],
 *             email: "user@example.com"
 *           };
 *
 *           const response = await fetch('/api/settings/save/medications', {
 *             method: 'PUT',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': 'Bearer YOUR_TOKEN'
 *             },
 *             body: JSON.stringify(medicationData)
 *           });
 *
 *           const data = await response.json();
 *           console.log('Medication save result:', data.message);
 *           console.log('Updated medications:', data.medications);
 *       - lang: cURL
 *         source: |
 *           curl -X PUT /api/settings/save/medications \
 *             -H "Content-Type: application/json" \
 *             -H "Authorization: Bearer YOUR_TOKEN" \
 *             -d '{
 *               "medications": [
 *                 {
 *                   "name": "Lithium",
 *                   "dosage": "300mg",
 *                   "frequency": "Twice daily",
 *                   "instructions": "Take with food",
 *                   "reminder": {
 *                     "enabled": true,
 *                     "times": ["08:00", "20:00"],
 *                     "schedule": []
 *                   }
 *                 }
 *               ],
 *               "email": "user@example.com"
 *             }'
 *     x-notes:
 *       - This endpoint automatically schedules QStash reminders for medications with enabled reminders
 *       - Only new reminder times that aren't already scheduled will be added
 *       - The schedule array is managed by the system and contains QStash schedule IDs
 *       - Medications are stored in the user's profile.medications field
 */
export const PUT = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { medications, email } = await req.json();
    const collection = await getCollection('thesis', 'users');
    const user = (await collection.findOne({ email })) as IUser | null;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('medications', medications);

    // Schedule qstash reminders for the medications
    const updatedMedications = await Promise.all(
      medications.map(async (medication: IMedication) => {
        if (medication.reminder.enabled) {
          try {
            console.log('medication', medication);
            // Check if we need to schedule new reminders
            const existingSchedules = medication.reminder.schedule || [];
            const scheduledTimes = existingSchedules.map((s) => s.time);
            const timesNeedingScheduling = medication.reminder.times.filter(
              (time) => !scheduledTimes.includes(time)
            );
            if (timesNeedingScheduling.length > 0) {
              const newSchedules = await scheduleMedicationReminder(
                user._id?.toString() || '',
                {
                  ...medication,
                  reminder: {
                    ...medication.reminder,
                    times: timesNeedingScheduling,
                  },
                },
                email
              );

              console.log('newSchedules', newSchedules);

              return {
                ...medication,
                reminder: {
                  ...medication.reminder,
                  schedule: [...existingSchedules, ...newSchedules],
                },
              };
            }
          } catch (error) {
            console.error(
              `Failed to schedule reminder for ${medication.name}:`,
              error
            );
          }
        }
        return medication;
      })
    );

    const updatedUser = {
      ...user,
      profile: { ...user.profile, medications: updatedMedications },
    };
    await collection.updateOne({ email }, { $set: updatedUser });

    return NextResponse.json({
      message: 'Medicines saved',
      medications: updatedMedications,
    });
  } catch (err) {
    console.error('could not save medications: ', err);
    return NextResponse.json(
      { error: 'could not save medications' },
      { status: 500 }
    );
  }
};
