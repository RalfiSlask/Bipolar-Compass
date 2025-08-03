import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/settings/save/healthcare-providers:
 *   put:
 *     summary: Save user healthcare providers
 *     description: Updates the user's healthcare providers information including doctors, therapists, and other medical professionals involved in their care.
 *     tags:
 *       - Settings
 *       - Healthcare Providers
 *       - User Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - healthcare_providers
 *               - email
 *             properties:
 *               healthcare_providers:
 *                 type: array
 *                 description: Array of healthcare providers involved in user's care
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Full name of the healthcare provider
 *                       example: "Dr. Anna Lindström"
 *                     title:
 *                       type: string
 *                       description: Professional title or specialization
 *                       example: "Psykiater"
 *                     organization:
 *                       type: string
 *                       description: Hospital, clinic, or practice name
 *                       example: "Karolinska Universitetssjukhuset"
 *                     phone:
 *                       type: string
 *                       description: Contact phone number
 *                       example: "+468-123 45 67"
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: Contact email address
 *                       example: "anna.lindstrom@karolinska.se"
 *                     address:
 *                       type: string
 *                       description: Physical address of the practice
 *                       example: "Solnavägen 1, 171 64 Solna"
 *                     notes:
 *                       type: string
 *                       description: Additional notes about the provider or care
 *                       example: "Specialist in bipolar disorder, appointments every 3 months"
 *                     isPrimary:
 *                       type: boolean
 *                       description: Whether this is the primary healthcare provider
 *                       example: true
 *                     providerType:
 *                       type: string
 *                       description: Type of healthcare provider
 *                       enum: ["Psykiater", "Psykolog", "Sjuksköterska", "Läkare", "Terapeut", "Annat"]
 *                       example: "Psykiater"
 *                 example:
 *                   - name: "Dr. Anna Lindström"
 *                     title: "Psykiater"
 *                     organization: "Karolinska Universitetssjukhuset"
 *                     phone: "+468-123 45 67"
 *                     email: "anna.lindstrom@karolinska.se"
 *                     address: "Solnavägen 1, 171 64 Solna"
 *                     notes: "Specialist in bipolar disorder, appointments every 3 months"
 *                     isPrimary: true
 *                     providerType: "Psykiater"
 *                   - name: "Maria Johansson"
 *                     title: "Psykolog"
 *                     organization: "Psykologmottagningen Stockholm"
 *                     phone: "+468-987 65 43"
 *                     email: "maria.johansson@psykolog.se"
 *                     address: "Drottninggatan 15, 111 51 Stockholm"
 *                     notes: "KBT-terapeut, veckovisningar"
 *                     isPrimary: false
 *                     providerType: "Psykolog"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address for identification
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Healthcare providers saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Healthcare providers saved"
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
 *                   example: "Invalid healthcare provider data format"
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
 *                   example: "could not save healthcare providers"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const healthcareData = {
 *             healthcare_providers: [
 *               {
 *                 name: "Dr. Anna Lindström",
 *                 title: "Psykiater",
 *                 organization: "Karolinska Universitetssjukhuset",
 *                 phone: "+468-123 45 67",
 *                 email: "anna.lindstrom@karolinska.se",
 *                 address: "Solnavägen 1, 171 64 Solna",
 *                 notes: "Specialist in bipolar disorder, appointments every 3 months",
 *                 isPrimary: true,
 *                 providerType: "Psykiater"
 *               },
 *               {
 *                 name: "Maria Johansson",
 *                 title: "Psykolog",
 *                 organization: "Psykologmottagningen Stockholm",
 *                 phone: "+468-987 65 43",
 *                 email: "maria.johansson@psykolog.se",
 *                 address: "Drottninggatan 15, 111 51 Stockholm",
 *                 notes: "KBT-terapeut, veckovisningar",
 *                 isPrimary: false,
 *                 providerType: "Psykolog"
 *               }
 *             ],
 *             email: "user@example.com"
 *           };
 *
 *           const response = await fetch('/api/settings/save/healthcare-providers', {
 *             method: 'PUT',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': 'Bearer YOUR_TOKEN'
 *             },
 *             body: JSON.stringify(healthcareData)
 *           });
 *
 *           const data = await response.json();
 *           console.log('Healthcare providers save result:', data.message);
 *       - lang: cURL
 *         source: |
 *           curl -X PUT /api/settings/save/healthcare-providers \
 *             -H "Content-Type: application/json" \
 *             -H "Authorization: Bearer YOUR_TOKEN" \
 *             -d '{
 *               "healthcare_providers": [
 *                 {
 *                   "name": "Dr. Anna Lindström",
 *                   "title": "Psykiater",
 *                   "organization": "Karolinska Universitetssjukhuset",
 *                   "phone": "+468-123 45 67",
 *                   "email": "anna.lindstrom@karolinska.se",
 *                   "address": "Solnavägen 1, 171 64 Solna",
 *                   "notes": "Specialist in bipolar disorder, appointments every 3 months",
 *                   "isPrimary": true,
 *                   "providerType": "Psykiater"
 *                 }
 *               ],
 *               "email": "user@example.com"
 *             }'
 *     x-notes:
 *       - Healthcare providers are stored in the user's settings.healthcare_providers field
 *       - This information is used for emergency contacts and care coordination
 *       - Provider types follow Swedish healthcare system classifications
 */
export const PUT = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { healthcare_providers, email } = await req.json();

    const collection = await getCollection('thesis', 'users');

    const user = (await collection.findOne({ email: email })) as IUser | null;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedUser = {
      ...user,
      settings: { ...user.settings, healthcare_providers },
    };

    await collection.updateOne({ email: email }, { $set: updatedUser });

    return NextResponse.json({ message: 'Healthcare providers saved' });
  } catch (err) {
    console.error('could not save healthcare providers: ', err);
    return NextResponse.json(
      { error: 'could not save healthcare providers' },
      { status: 500 }
    );
  }
};
