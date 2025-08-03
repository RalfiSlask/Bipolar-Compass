import { NextResponse } from 'next/server';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bipolar Compass API',
      version: '1.0.0',
      description:
        'API för Bipolar Compass - en plattform för personer med bipolär sjukdom',
    },
    servers: [
      {
        url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
        description:
          process.env.NODE_ENV === 'production'
            ? 'Produktionsserver'
            : process.env.VERCEL_ENV === 'preview'
            ? 'Staging-server'
            : 'Utvecklingsserver',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/app/api/**/*.ts'], // Sökväg till dina API-filer
};

const specs = swaggerJsdoc(options);

export async function GET() {
  return NextResponse.json(specs);
}
