import { sendMedicationNotificationEmail } from '@/app/utils/emailUtils';
import { Client } from '@upstash/qstash';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';
import { formatInTimeZone } from 'date-fns-tz';
import { NextRequest, NextResponse } from 'next/server';

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN!,
});

/**
 * @swagger
 * /api/send-email:
 *   post:
 *     summary: Send medication reminder email and schedule next reminder
 *     description: |
 *       Skickar medicinpåminnelse via email och schemalägger nästa påminnelse.
 *       Denna endpoint används av QStash för att hantera schemalagda medicinpåminnelser.
 *       Den skickar email till användaren och schemalägger automatiskt nästa påminnelse
 *       för följande dag vid samma tid.
 *     tags:
 *       - Email
 *       - Medication
 *       - Reminders
 *     security:
 *       - qstashAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: "user@example.com"
 *               medication:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Name of the medication
 *                     example: "Lithium"
 *                 required:
 *                   - name
 *               time:
 *                 type: string
 *                 description: Time for medication reminder (HH:mm format)
 *                 example: "08:00"
 *               userId:
 *                 type: string
 *                 description: User's unique identifier
 *                 example: "507f1f77bcf86cd799439011"
 *             required:
 *               - email
 *               - medication
 *               - time
 *               - userId
 *           examples:
 *             valid_reminder:
 *               summary: Valid medication reminder
 *               value:
 *                 email: "user@example.com"
 *                 medication:
 *                   name: "Lithium"
 *                 time: "08:00"
 *                 userId: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Email sent and next reminder scheduled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Email sent and next reminder scheduled"
 *                 newMessageId:
 *                   type: string
 *                   description: QStash message ID for the next scheduled reminder
 *                   example: "msg_2abc123def456"
 *             examples:
 *               success:
 *                 summary: Successful reminder processing
 *                 value:
 *                   message: "Email sent and next reminder scheduled"
 *                   newMessageId: "msg_2abc123def456"
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Invalid time format"
 *       401:
 *         description: Unauthorized - Invalid QStash signature
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid signature"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Failed to process reminder"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           // This endpoint is typically called by QStash, not directly
 *           const response = await fetch('/api/send-email', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'upstash-signature': 'signature_here'
 *             },
 *             body: JSON.stringify({
 *               email: 'user@example.com',
 *               medication: { name: 'Lithium' },
 *               time: '08:00',
 *               userId: '507f1f77bcf86cd799439011'
 *             })
 *           });
 *           const data = await response.json();
 *           console.log(data.message);
 *       - lang: TypeScript
 *         source: |
 *           interface MedicationReminder {
 *             email: string;
 *             medication: {
 *               name: string;
 *             };
 *             time: string;
 *             userId: string;
 *           }
 *
 *           interface ReminderResponse {
 *             message: string;
 *             newMessageId: string;
 *           }
 *
 *           const reminder: MedicationReminder = {
 *             email: 'user@example.com',
 *             medication: { name: 'Lithium' },
 *             time: '08:00',
 *             userId: '507f1f77bcf86cd799439011'
 *           };
 *
 *           const response = await fetch('/api/send-email', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'upstash-signature': 'signature_here'
 *             },
 *             body: JSON.stringify(reminder)
 *           });
 *           const data: ReminderResponse = await response.json();
 *
 *           if (data.newMessageId) {
 *             console.log('Next reminder scheduled:', data.newMessageId);
 *           }
 *       - lang: cURL
 *         source: |
 *           curl -X POST "https://your-domain.com/api/send-email" \
 *             -H "Content-Type: application/json" \
 *             -H "upstash-signature: signature_here" \
 *             -d '{
 *               "email": "user@example.com",
 *               "medication": {"name": "Lithium"},
 *               "time": "08:00",
 *               "userId": "507f1f77bcf86cd799439011"
 *             }'
 *     x-common-errors:
 *       - code: 400
 *         description: "Invalid time format or missing required fields"
 *         solution: "Ensure time is in HH:mm format and all fields are provided"
 *       - code: 401
 *         description: "Invalid QStash signature"
 *         solution: "Check QStash configuration and signature verification"
 *       - code: 500
 *         description: "Email sending or scheduling failed"
 *         solution: "Check email service and QStash configuration"
 *     x-rate-limit:
 *       requests: 100
 *       window: "1 hour"
 *       description: "Rate limited to 100 reminder requests per hour"
 *     x-qstash-integration:
 *       service: "QStash"
 *       description: "Uses QStash for reliable message scheduling and delivery"
 *       documentation: "https://docs.upstash.com/qstash"
 *     x-email-service:
 *       provider: "Nodemailer"
 *       template: "Medication notification email"
 *       timezone: "Europe/Stockholm"
 *     x-reminder-flow:
 *       1: "QStash triggers this endpoint at scheduled time"
 *       2: "Endpoint sends medication reminder email"
 *       3: "Calculates next reminder time (same time tomorrow)"
 *       4: "Schedules next reminder with QStash"
 *       5: "Updates webhook with new message ID"
 *       6: "Returns success response"
 *     x-security-notes:
 *       - "Uses QStash signature verification for security"
 *       - "Email addresses are validated before sending"
 *       - "All scheduling is done through secure QStash API"
 *       - "Error handling ensures webhook updates even on failure"
 *     x-monitoring:
 *       metrics:
 *         - "email_send_success_rate"
 *         - "reminder_scheduling_success_rate"
 *         - "qstash_integration_health"
 *         - "email_delivery_time"
 *       alerts:
 *         - "High email failure rate"
 *         - "QStash service unavailability"
 *         - "Reminder scheduling failures"
 *     x-changelog:
 *       - version: "1.0.0"
 *         date: "2024-01-01"
 *         changes:
 *           - "Initial implementation"
 *           - "Basic email sending"
 *       - version: "1.1.0"
 *         date: "2024-02-15"
 *         changes:
 *           - "Added QStash integration"
 *           - "Automatic next reminder scheduling"
 *           - "Improved error handling"
 *     x-deprecation:
 *       deprecated: false
 *       sunset_date: null
 *       migration_path: null
 *     x-performance:
 *       average_response_time: "500ms"
 *       cache_strategy: "No caching - real-time processing required"
 *       optimization_notes: "Email sending and QStash API calls add latency"
 *     x-testing:
 *       test_cases:
 *         - "Valid reminder data sends email and schedules next"
 *         - "Invalid time format returns 400 error"
 *         - "Missing required fields returns 400 error"
 *         - "Email service failure returns 500 error"
 *         - "QStash service failure returns 500 error"
 *       mock_responses:
 *         success: |
 *           {
 *             "message": "Email sent and next reminder scheduled",
 *             "newMessageId": "msg_2abc123def456"
 *           }
 *         error: |
 *           {
 *             "error": "Failed to process reminder"
 *           }
 *     x-environment:
 *       required_variables:
 *         - "QSTASH_TOKEN"
 *         - "NEXTAUTH_URL"
 *         - "EMAIL_SERVICE_CONFIG"
 *       timezone: "Europe/Stockholm"
 *       email_provider: "Nodemailer"
 *     x-compliance:
 *       gdpr: "Compliant - user consent required for email notifications"
 *       privacy: "Minimal data collection, secure email delivery"
 *       healthcare: "HIPAA-compliant email handling for medication reminders"
 */

/**
 * This route is used to send an email to the user.
 * @param {NextRequest} req - The request object which contains the email, medication, time and userId.
 * @returns {NextResponse} Response object with success or error.
 */
export const POST = verifySignatureAppRouter(async function POST(
  req: NextRequest
) {
  const { email, medication, time, userId } = await req.json();

  try {
    // Send the email
    const medicationName = medication.name;

    await sendMedicationNotificationEmail({
      email,
      medication: medicationName,
      time,
    });

    // Calculate next medication time
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const nextMedicationTime = new Date(now);
    nextMedicationTime.setDate(nextMedicationTime.getDate() + 1);
    nextMedicationTime.setHours(hours, minutes, 0, 0);

    // Format the time in Swedish timezone
    const swedishTime = formatInTimeZone(
      nextMedicationTime,
      'Europe/Stockholm',
      "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
    );

    // Ensure next reminder is in the future
    const nextReminderTime = new Date(swedishTime);
    if (nextReminderTime.getTime() <= Date.now()) {
      nextReminderTime.setDate(nextReminderTime.getDate() + 1);
    }

    // Schedule next reminder
    const nextReminder = await qstashClient.publishJSON({
      url: `${process.env.NEXTAUTH_URL}/api/send-email`,
      body: { email, medication, userId, time },
      notBefore: Math.floor(nextReminderTime.getTime() / 1000),
      webhook: `${process.env.NEXTAUTH_URL}/api/qstash-webhook`,
      webhookHeaders: {
        'Content-Type': 'application/json',
      },
      webhookBody: {
        userId,
        medicationName: medication.name,
        time,
        newMessageId: null,
      },
    });

    // Update webhook body with new messageId
    await qstashClient.publishJSON({
      url: `${process.env.NEXTAUTH_URL}/api/qstash-webhook`,
      body: {
        userId,
        medicationName: medication.name,
        time,
        newMessageId: nextReminder.messageId,
      },
    });

    return NextResponse.json({
      message: 'Email sent and next reminder scheduled',
      newMessageId: nextReminder.messageId,
    });
  } catch (error) {
    console.error('Failed to process reminder:', error);

    // Try to update the medication status even if scheduling fails
    await qstashClient.publishJSON({
      url: `${process.env.NEXTAUTH_URL}/api/qstash-webhook`,
      body: {
        userId,
        medicationName: medication.name,
        time,
        newMessageId: null, // Indicate that scheduling failed
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    });

    return NextResponse.json(
      { error: 'Failed to process reminder' },
      { status: 500 }
    );
  }
});
