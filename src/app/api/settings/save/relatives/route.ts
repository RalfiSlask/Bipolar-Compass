import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/settings/save/relatives:
 *   put:
 *     summary: Save user relatives settings
 *     description: Updates the user's relatives information in their settings. This stores contact information and details about family members or caregivers.
 *     tags:
 *       - Settings
 *       - Relatives
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
 *               - relatives
 *               - email
 *             properties:
 *               relatives:
 *                 type: array
 *                 description: Array of relative/caregiver information
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Full name of the relative
 *                       example: "Anna Andersson"
 *                     relationship:
 *                       type: string
 *                       description: Relationship to the user
 *                       example: "Partner"
 *                     phone:
 *                       type: string
 *                       description: Phone number
 *                       example: "+46701234567"
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: Email address
 *                       example: "anna.andersson@example.com"
 *                     address:
 *                       type: string
 *                       description: Physical address
 *                       example: "Storgatan 1, 12345 Stockholm"
 *                     isEmergencyContact:
 *                       type: boolean
 *                       description: Whether this person is an emergency contact
 *                       example: true
 *                     notes:
 *                       type: string
 *                       description: Additional notes about this relative
 *                       example: "Primary caregiver, available 24/7"
 *                 example:
 *                   - name: "Anna Andersson"
 *                     relationship: "Partner"
 *                     phone: "+46701234567"
 *                     email: "anna.andersson@example.com"
 *                     address: "Storgatan 1, 12345 Stockholm"
 *                     isEmergencyContact: true
 *                     notes: "Primary caregiver, available 24/7"
 *                   - name: "Erik Eriksson"
 *                     relationship: "Brother"
 *                     phone: "+46709876543"
 *                     email: "erik.eriksson@example.com"
 *                     address: "Lillgatan 5, 54321 Göteborg"
 *                     isEmergencyContact: false
 *                     notes: "Backup contact"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address for identification
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Relatives settings saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Relatives saved"
 *       400:
 *         description: Bad request - Invalid data format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid relatives data format"
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
 *                   example: "could not save relatives"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const relativesData = [
 *             {
 *               name: "Anna Andersson",
 *               relationship: "Partner",
 *               phone: "+46701234567",
 *               email: "anna.andersson@example.com",
 *               address: "Storgatan 1, 12345 Stockholm",
 *               isEmergencyContact: true,
 *               notes: "Primary caregiver, available 24/7"
 *             },
 *             {
 *               name: "Erik Eriksson",
 *               relationship: "Brother",
 *               phone: "+46709876543",
 *               email: "erik.eriksson@example.com",
 *               address: "Lillgatan 5, 54321 Göteborg",
 *               isEmergencyContact: false,
 *               notes: "Backup contact"
 *             }
 *           ];
 *
 *           const response = await fetch('/api/settings/save/relatives', {
 *             method: 'PUT',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': 'Bearer YOUR_TOKEN'
 *             },
 *             body: JSON.stringify({
 *               relatives: relativesData,
 *               email: 'user@example.com'
 *             })
 *           });
 *
 *           const data = await response.json();
 *           console.log('Relatives save result:', data.message);
 *       - lang: cURL
 *         source: |
 *           curl -X PUT /api/settings/save/relatives \
 *             -H "Content-Type: application/json" \
 *             -H "Authorization: Bearer YOUR_TOKEN" \
 *             -d '{
 *               "relatives": [
 *                 {
 *                   "name": "Anna Andersson",
 *                   "relationship": "Partner",
 *                   "phone": "+46701234567",
 *                   "email": "anna.andersson@example.com",
 *                   "address": "Storgatan 1, 12345 Stockholm",
 *                   "isEmergencyContact": true,
 *                   "notes": "Primary caregiver, available 24/7"
 *                 }
 *               ],
 *               "email": "user@example.com"
 *             }'
 */
export const PUT = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { relatives, email } = await req.json();

    const collection = await getCollection('thesis', 'users');

    const user = (await collection.findOne({ email: email })) as IUser | null;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedUser = { ...user, settings: { ...user.settings, relatives } };

    await collection.updateOne({ email: email }, { $set: updatedUser });

    console.log('relatives: ', relatives);
    return NextResponse.json({ message: 'Relatives saved' });
  } catch (err) {
    console.error('could not save relatives: ', err);
    return NextResponse.json(
      { error: 'could not save relatives' },
      { status: 500 }
    );
  }
};
