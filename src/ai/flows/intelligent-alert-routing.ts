'use server';

/**
 * @fileOverview This file implements the IntelligentAlertRouting flow, which uses GenAI to route emergency alerts to the closest and most compatible donors.
 *
 * - intelligentAlertRouting - A function that handles the intelligent alert routing process.
 * - IntelligentAlertRoutingInput - The input type for the intelligentAlertRouting function.
 * - IntelligentAlertRoutingOutput - The return type for the intelligentAlertRouting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentAlertRoutingInputSchema = z.object({
  bloodType: z.string().describe('The blood type of the patient needing blood.'),
  hospitalLocation: z.object({
    latitude: z.number().describe('The latitude of the hospital.'),
    longitude: z.number().describe('The longitude of the hospital.'),
  }).describe('The location of the hospital.'),
  urgency: z.string().describe('The urgency of the request (e.g., critical, high, medium, low).'),
  radiusKm: z.number().describe('The search radius in kilometers to find donors.'),
});
export type IntelligentAlertRoutingInput = z.infer<typeof IntelligentAlertRoutingInputSchema>;

const IntelligentAlertRoutingOutputSchema = z.object({
  donorMatches: z.array(
    z.object({
      donorId: z.string().describe('The unique identifier of the donor.'),
      bloodType: z.string().describe('The blood type of the donor.'),
      location: z.object({
        latitude: z.number().describe('The latitude of the donor.'),
        longitude: z.number().describe('The longitude of the donor.'),
      }).describe('The location of the donor.'),
      distanceKm: z.number().describe('The distance in kilometers between the donor and the hospital.'),
      isCompatible: z.boolean().describe('Whether the donor is compatible with the patient.'),
    })
  ).describe('A list of donors who are compatible and within the specified radius, sorted by distance.'),
});
export type IntelligentAlertRoutingOutput = z.infer<typeof IntelligentAlertRoutingOutputSchema>;

export async function intelligentAlertRouting(input: IntelligentAlertRoutingInput): Promise<IntelligentAlertRoutingOutput> {
  return intelligentAlertRoutingFlow(input);
}

const findNearestDonors = ai.defineTool({
  name: 'findNearestDonors',
  description: 'Finds the nearest blood donors within a specified radius and blood type.',
  inputSchema: z.object({
    bloodType: z.string().describe('The blood type of the patient needing blood.'),
    hospitalLocation: z.object({
      latitude: z.number().describe('The latitude of the hospital.'),
      longitude: z.number().describe('The longitude of the hospital.'),
    }).describe('The location of the hospital.'),
    radiusKm: z.number().describe('The search radius in kilometers to find donors.'),
  }),
  outputSchema: z.array(
    z.object({
      donorId: z.string().describe('The unique identifier of the donor.'),
      bloodType: z.string().describe('The blood type of the donor.'),
      location: z.object({
        latitude: z.number().describe('The latitude of the donor.'),
        longitude: z.number().describe('The longitude of the donor.'),
      }).describe('The location of the donor.'),
    })
  ),
},
async (input) => {
    // TODO: Implement the logic to find nearest donors from a database or external source.
    // This is a placeholder implementation.
    const mockDonors = [
      {
        donorId: 'donor1',
        bloodType: input.bloodType,
        location: {
          latitude: input.hospitalLocation.latitude + 0.01,
          longitude: input.hospitalLocation.longitude + 0.01,
        },
      },
      {
        donorId: 'donor2',
        bloodType: input.bloodType,
        location: {
          latitude: input.hospitalLocation.latitude - 0.01,
          longitude: input.hospitalLocation.longitude - 0.01,
        },
      },
    ];

    return mockDonors;
  }
);

const prompt = ai.definePrompt({
  name: 'intelligentAlertRoutingPrompt',
  tools: [findNearestDonors],
  input: {schema: IntelligentAlertRoutingInputSchema},
  output: {schema: IntelligentAlertRoutingOutputSchema},
  prompt: `You are an AI assistant that helps hospital staff route emergency alerts to the closest and most compatible blood donors.

  The hospital is located at:
  Latitude: {{hospitalLocation.latitude}}
  Longitude: {{hospitalLocation.longitude}}

  The patient needs blood type {{bloodType}} and the urgency is {{urgency}}.
  Find the nearest donors within {{radiusKm}} km using the findNearestDonors tool.

  For each donor found, calculate the distance between the donor and the hospital using the Haversine formula. Sort the donors by distance.

  Return a JSON array of donor matches, including the donorId, bloodType, location (latitude and longitude), distanceKm, and isCompatible flag. The isCompatible flag should indicate whether the donor's blood type is compatible with the patient's blood type.

  Ensure the output is a valid JSON.

  Here is the location of the hospital: {{hospitalLocation}}.
`,
});

const intelligentAlertRoutingFlow = ai.defineFlow(
  {
    name: 'intelligentAlertRoutingFlow',
    inputSchema: IntelligentAlertRoutingInputSchema,
    outputSchema: IntelligentAlertRoutingOutputSchema,
  },
  async input => {
    const nearestDonors = await findNearestDonors({
        bloodType: input.bloodType,
        hospitalLocation: input.hospitalLocation,
        radiusKm: input.radiusKm,
    });

    // TODO: Implement the Haversine formula to calculate distance between hospital and donor.
    const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // Radius of the Earth in kilometers
      const p = Math.PI / 180;
      const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2 + Math.cos(lat1 * p) * Math.cos(lat2 * p) * (1 - Math.cos((lon2 - lon1) * p)) / 2;
      return 2 * R * Math.asin(Math.sqrt(a));
    };

    const donorMatches = nearestDonors.map(donor => ({
      donorId: donor.donorId,
      bloodType: donor.bloodType,
      location: donor.location,
      distanceKm: haversine(
        input.hospitalLocation.latitude,
        input.hospitalLocation.longitude,
        donor.location.latitude,
        donor.location.longitude
      ),
      isCompatible: donor.bloodType === input.bloodType, // Basic blood type compatibility check
    }));

    donorMatches.sort((a, b) => a.distanceKm - b.distanceKm);

    return { donorMatches };
  }
);
