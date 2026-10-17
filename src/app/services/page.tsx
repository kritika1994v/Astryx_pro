'use client';

import { Section } from '@astryxdesign/core/Section';
import { Card } from '@astryxdesign/core/Card';
import { VStack } from '@astryxdesign/core/Layout';
import { Grid } from '@astryxdesign/core/Grid';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Divider } from '@astryxdesign/core/Divider';

import Header from '../../components/layout/Header';


// ============================================================
// SERVICES DATA
// ============================================================

const services = [
  {
    icon: 'N',
    title: 'Next.js Development',
    description:
      'Build fast, scalable and modern web applications using Next.js and React.',
    features: [
      'Responsive applications',
      'Reusable components',
      'Client-side interactions',
    ],
    variant:'blue'
  },

  {
    icon: 'A',
    title: 'Astryx UI Development',
    description:
      'Create consistent and accessible interfaces using reusable Astryx components.',
    features: [
      'Cards and layouts',
      'Forms and buttons',
      'Custom UI experiences',
    ],
    variant:'pink'
  },

  {
    icon: 'API',
    title: 'REST API Integration',
    description:
      'Connect frontend applications with REST APIs and handle real-world response scenarios.',
    features: [
      'GET / POST requests',
      'API chaining',
      'Success and error handling',
    ],
    variant:'gray'
  },

  {
    icon: 'E',
    title: 'Error Handling',
    description:
      'Handle business errors, technical errors and API failures in a user-friendly way.',
    features: [
      '400 validation errors',
      '401 / 403 authentication errors',
      '500 server errors',
    ],
    variant:'green'
  },

  {
    icon: 'F',
    title: 'Form Development',
    description:
      'Build professional forms with validation, submission handling and API integration.',
    features: [
      'Input validation',
      'Required fields',
      'Success and error states',
    ],
    variant:'purple'
  },

  {
    icon: 'D',
    title: 'Modern UI Design',
    description:
      'Design clean, responsive and professional interfaces for modern applications.',
    features: [
      'Responsive layouts',
      'Custom styling',
      'Professional user experience',
    ],
    variant:'red'
  },
];


// ============================================================
// SERVICES PAGE
// ============================================================

export default function ServicesPage() {
  return (
    <>
      {/* =====================================================
          HEADER
      ====================================================== */}



      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <Section
        width="100%"
        padding={10}
      >
        <VStack
          gap={5}
          align="center"
        >

          <Text
            type="heading-2"
            as="h1"
          >
            
          </Text>

          <Text
            type="display-1"
            as="h1"
          >
            Our Services
          </Text>

          <Text
            type="body"
            color="secondary"
          >
            Modern development solutions powered by Next.js,
            Astryx components and REST API integration.
          </Text>

        </VStack>
      </Section><Divider />


      {/* =====================================================
          SERVICES SECTION
      ====================================================== */}

    <Section width="100%" padding={0}>

        <VStack
          gap={8}
          align="center"
        >

          {/* SECTION HEADING */}

          <VStack
            gap={2}
            align="center"
          >

            <Text
              type="display-2"
              as="h2"
            >
              What We Offer
            </Text>

            <Text
              type="body"
              color="secondary"
            >
              Everything you need to build a modern web application.
            </Text>

          </VStack>


          {/* SERVICES GRID */}

          <Grid
            columns={3}
            gap={5}
          >

            {services.map((service) => (

              <Card
                key={service.title}
                padding={7}
                variant={service.variant}
              >

                <VStack
                  gap={5}
                  align="center"
                >

                  {/* SERVICE ICON */}

                  <Text
                    type="heading-2"
                  >
                    {service.icon}
                  </Text>


                  {/* SERVICE TITLE */}

                  <Text
                  type="body" weight="bold"
                  >
                    {service.title}
                  </Text>


                  {/* SERVICE DESCRIPTION */}

                  <Text
                    type="body"
                    color="secondary"
                  >
                    {service.description}
                  </Text>


                  {/* DIVIDER */}

                  <Divider />


                  {/* FEATURES */}

                  <VStack
                    gap={2}
                    align="center"
                  >

                    {service.features.map(
                      (feature) => (

                        <Text
                          key={feature}
                          type="body"
                        >
                          ✓ {feature}
                        </Text>

                      )
                    )}

                  </VStack>

                </VStack>

              </Card>

            ))}

          </Grid>

        </VStack>
      
      </Section>


      {/* =====================================================
          API INTEGRATION WORKFLOW
      ====================================================== */}

      <Section
        width="100%"
        padding={10}
      >
        

        <VStack
          gap={7}
          align="center"
        >

          {/* API SECTION HEADING */}

          <VStack
            gap={2}
            align="center"
          >

            <Text
              type="display-2"
              as="h2"
            >
              API Integration Workflow
            </Text>

            <Text
              type="body"
              color="secondary"
            >
              A complete request flow from frontend to backend services.
            </Text>

          </VStack>


          {/* API WORKFLOW */}

          <Grid
            columns={4}
            gap={4}
          >

            {[
              ['01', 'Client', 'User Request'],
              ['02', 'API 1', 'Registration'],
              ['03', 'API 2', 'Welcome Email'],
              ['04', 'API 3', 'Profile'],
            ].map(
              ([number, title, description]) => (

                <Card
                  key={number}
                  padding={6}
                >

                  <VStack
                    gap={3}
                    align="center"
                  >

                    <Text
                      type="label"
                    >
                      {number}
                    </Text>

                    <Text
                      type="heading-3"
                    >
                      {title}
                    </Text>

                    <Text
                      type="body"
                      color="secondary"
                    >
                      {description}
                    </Text>

                  </VStack>

                </Card>

              )
            )}

          </Grid>

        </VStack>

      </Section>


      {/* =====================================================
          CTA SECTION
      ====================================================== */}

      <Section
        width="100%"
        padding={10}
      >

        <VStack
          align="center"
        >

          <Card
            padding={10}
          >

            <VStack
              gap={5}
              align="center"
            >

              <Text
                type="display-2"
                as="h2"
              >
                Let's Work Together
              </Text>

              <Text
                type="body"
                color="secondary"
              >
                Have a project in mind? Create your account
                and get started.
              </Text>

              <Button
                label="Get Started"
                variant="primary"
                onClick={() => {
                  window.location.href = '/form-two-column';
                }}
              />

            </VStack>

          </Card>

        </VStack>

      </Section>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Section
        width="100%"
        padding={5}
      >

        <VStack
          align="center"
        >

          <Text
            type="body"
          >
            © 2026 Astryx Project. All rights reserved.
          </Text>

        </VStack>

      </Section>

    </>
  );
}