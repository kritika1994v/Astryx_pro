'use client';

import { Section } from '@astryxdesign/core/Section';
import { Card } from '@astryxdesign/core/Card';
import { VStack, HStack } from '@astryxdesign/core/Layout';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Divider } from '@astryxdesign/core/Divider';

export default function AboutPage() {
  return (
    <>
      {/* HERO SECTION */}
      <Section width="100%" padding={0}>
        <div className="w-full bg-sky-100">
          <VStack gap={5} align="center" padding={5}>
            <Text type="heading-2"></Text>

            <Text type="display-1" as="h1">
              About Our Platform
            </Text>

            <Text type="body" color="secondary">
              We build modern, scalable and user-friendly digital
              experiences using Next.js, Astryx and reliable API
              integrations.
            </Text>

            <Button
              label="Explore Our Services"
              variant="primary"
              onClick={() => {
                window.location.href = '/services';
              }}
            />
          </VStack>
        </div>
      </Section>

      <Divider />

      {/* BUILT FOR MODERN WEB SECTION */}
      <Section width="100%" padding={0}>
        <div className="w-full bg-sky-100">
          <VStack gap={7} align="center" padding={5}>
            <Card padding={8}>
              <VStack gap={1} align="center">
                <Text type="display-2" as="h2">
                  Built for Modern Web
                </Text>
                  <Divider />


                <HStack gap={3} align="center">
                  <Card padding={4}>
                    <Text type="heading-3">Next.js</Text>
                  </Card>

                  <Card padding={4}>
                    <Text type="heading-3">Astryx</Text>
                  </Card>
                </HStack>

                <Text type="body" color="secondary">
                  We focus on clean layouts, maintainable code and
                  consistent user interfaces across the application.
                  modern frontend development,
                  reusable UI components and API-driven architecture
                  to create reliable digital experiences.modern frontend development,
                  reusable UI components and API-driven architecture
                  to create reliable digital experiences.modern frontend development,
                  reusable UI components and API-driven architecture
                  to create reliable digital experiences.modern frontend development,
                  reusable UI components and API-driven architecture
                  to create reliable digital experiences.modern frontend development,
                  reusable UI components and API-driven architecture
                  to create reliable digital experiences.modern frontend development,
                  reusable UI components and API-driven architecture
                  to create reliable digital experiences.modern frontend development,
                  reusable UI components and API-driven architecture
                  to create reliable digital experiences.modern frontend development,
                  reusable UI components and API-driven architecture
                  to create reliable digital experiences.modern frontend development,
                 
                </Text>
              </VStack>
            </Card>
          </VStack>
        </div>
      </Section>

      <Divider />

      {/* WHO WE ARE SECTION */}
      {/* WHO WE ARE SECTION */}
<Section width="100%" padding={0}>
  <div className="w-full bg-slate-900">
    <VStack gap={8} align="center" padding={10}>
      {/* SECTION HEADING */}
      <VStack gap={4} align="center">
        <Text type="display-2" as="h2" color='disabled'>
          Who We Are
        </Text><Divider />

        <Text type="body" color='disabled'>
          A technology-focused platform designed to demonstrate
          production-ready application development.
        </Text>

      
      </VStack>

    {/* FEATURE CARDS */}
{/* FEATURE CARDS */}
<Grid columns={3} gap={6}>
  <Card padding={7}>
    <VStack gap={4} align="center">
     
         <Text type="heading-3">
         <Heading  level={3}>
         Modern Technology
        </Heading>
        
      </Text>
    
<Divider />
      <Text type="body" color="secondary">
        We use modern technologies to create fast,
        scalable and maintainable applications.
         We use modern technologies to create fast,
        scalable and maintainable applications.
         We use modern technologies to create fast,
        scalable and maintainable applications.
      </Text>
    </VStack>
  </Card>

  <Card padding={7}>
    <VStack gap={4} align="center">
      <Text type="heading-3" as="h3">
          <Heading  level={3}>
        Reusable Components
        </Heading>
      </Text>
<Divider />
      <Text type="body" color="secondary">
        Astryx components help us build consistent
        interfaces and reduce repeated UI code.
         We use modern technologies to create fast,
        scalable and maintainable applications.
         We use modern technologies to create fast,
        scalable and maintainable applications.
      </Text>
    </VStack>
  </Card>

  <Card padding={7}>
    <VStack gap={4} align="center">
      <Text type="heading-3" as="h3">
        <Heading  level={3}>
        API First</Heading>
      </Text>
<Divider />
      <Text type="body" color="secondary">
        Our application communicates through REST APIs
        with structured responses and proper error handling.
         We use modern technologies to create fast,
        scalable and maintainable applications.
         We use modern technologies to create fast,
        scalable and maintainable applications.
      </Text>
    </VStack>
  </Card>
</Grid>
    </VStack>
  </div>
</Section>
    

      {/* OUR MISSION SECTION */}
      <Section width="100%" padding={0}>
        <div className="w-full bg-slate-900">
          <VStack gap={7} align="center" padding={10}>
            <Card padding={9}>
              <VStack gap={4} align="center">
                <Text type="display-2" as="h2">
                  Our Mission
                </Text>

                <Divider />

                <Text type="body" color="secondary">
                  Our goal is to create reliable digital experiences
                  where clean UI, reusable components, API integration
                  and proper error handling work together.
                </Text>

                <Text type="body" color="secondary">
                  We aim to keep applications easy to understand,
                  maintain and extend as requirements evolve.
                </Text>
              </VStack>
            </Card>
          </VStack>
        </div>
      </Section>

      <Divider />

      {/* CTA SECTION */}
      <Section width="100%" padding={0}>
        <div className="w-full bg-sky-100">
          <VStack gap={5} align="center" padding={10}>
            <Card padding={9}>
              <VStack gap={4} align="center">
                <Text type="display-2" as="h2">
                  Ready to Build?
                </Text>
<Divider />
                <Text type="body" color="secondary">
                  Explore our services and discover what we can build
                  together.
                </Text>

                <Text type="body" color="secondary">
                  Let us turn your ideas into a reliable and
                  user-friendly digital experience.
                </Text>

                <Button
                  label="View Services"
                  variant="primary"
                  onClick={() => {
                    window.location.href = '/services';
                  }}
                />
              </VStack>
            </Card>
          </VStack>
        </div>
      </Section>
    </>
  );
}