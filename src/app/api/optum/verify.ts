// pages/api/optum/verify.ts

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { firstName, lastName, address, email, policyNumber, groupNumber } = req.body;

  // Validate incoming data
  if (!firstName || !lastName || !address || !email || !policyNumber || !groupNumber) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Integrate with Optum Eligible API 1
    // Replace with actual API endpoint and authentication
    const response = await fetch('https://api.optum.com/eligible', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_OPTUM_API_TOKEN`, // Securely store and access tokens
      },
      body: JSON.stringify({
        firstName,
        lastName,
        address,
        email,
        policyNumber,
        groupNumber,
        // Add other necessary fields
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ message: errorData.message || 'Optum API Error' });
    }

    await response.json();

    // Process the response as needed
    return res.status(200).json({ message: 'Insurance information verified successfully.' });
  } catch (error) {
    console.error('Optum API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
