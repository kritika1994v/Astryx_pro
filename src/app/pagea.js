
'use client';

import './page.css';

import Header from '../components/layout/Header';

import { Carousel } from '@astryxdesign/core/Carousel';
import { Card } from '@astryxdesign/core/Card';
import { VStack } from '@astryxdesign/core/Layout';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Section } from '@astryxdesign/core/Section';
import { Divider } from '@astryxdesign/core/Divider';
import { Grid } from '@astryxdesign/core/Grid';

// ============================================================
// HERO SLIDES
// ============================================================

const slides = [
  {
    title: 'Build Better Digital Experiences',
    description:
      'Create modern and accessible applications using Next.js and Astryx.',
    image:
      'https://images.pexels.com/photos/8606292/pexels-photo-8606292.jpeg?auto=compress&cs=tinysrgb&w=2000',
  },
  {
    title: 'Powerful API Integration',
    description:
      'Connect your application with APIs and handle multiple response scenarios.',
    image:
      'https://images.pexels.com/photos/36985767/pexels-photo-36985767.jpeg?auto=compress&cs=tinysrgb&w=2000',
  },
  {
    title: 'Modern Web Development',
    description:
      'Build scalable and production-ready applications with modern technologies.',
    image:
      'https://images.pexels.com/photos/33827307/pexels-photo-33827307.jpeg?auto=compress&cs=tinysrgb&w=2000',
  },
];

// ============================================================
// SERVICES
// ============================================================

const services = [
  {
    icon: 'N',
    title: 'Next.js Development',
    description:
      'Build fast, scalable and modern web applications using Next.js.',
  },
  {
    icon: 'A',
    title: 'API Integration',
    description:
      'Integrate REST APIs and manage success, business and technical errors.',
  },
  {
    icon: 'U',
    title: 'Modern UI Design',
    description:
      'Create clean and responsive interfaces using Astryx components.',
  },
];

// ============================================================
// HOME PAGE
// ============================================================

export default function Home() {
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* ======================================================
          ASTRYX CAROUSEL
      ====================================================== */}

      <Section width="100%" padding={0}>
        <div className="carousel-center">
          <Carousel
            gap="1"
            hasButtons
            hasEdgeFade
            hasLoop={false}
            hasSnap={false}
            aria-label="Carousel"
          >
            {slides.map((slide) => (
              <Card key={slide.title} padding={4}>
                <VStack gap={3} align="center">
                  <img
                    className="carousel-image"
                    src={slide.image}
                    alt={slide.title}
                  />

                  <Text type="heading-2" as="h2">
                    {slide.title}
                  </Text>

                  <Text type="body" color="secondary">
                    {slide.description}
                  </Text>

                  <Button
                    label="Explore Now"
                    variant="primary"
                    onClick={() => {
                      window.location.href = '/form-two-column';
                    }}
                  />
                </VStack>
              </Card>
            ))}
          </Carousel>
        </div>
      </Section>

      {/* ======================================================
          WELCOME SECTION
      ====================================================== */}

      <Section width="100%" padding={10}>
        <VStack gap={4} align="center">
          <Text type="display-2" as="h2">
            Welcome to Our Platform
          </Text>

          <Text type="body" color="secondary">
            A modern application built with Next.js, Astryx and API
            integration.
          </Text>

          <Text type="body" color="secondary">
            We use reusable components, API chaining, validation and
            proper error handling to build a production-ready
            application.
          </Text>
        </VStack>
      </Section>

      {/* DIVIDER */}
      <Section width="100%" padding={3}>
        <Divider />
      </Section>

      {/* ======================================================
          SERVICES SECTION
      ====================================================== */}

      <Section width="100%" padding={10}>
        <VStack gap={7} align="center">
          <VStack gap={2} align="center">
            <Text type="display-2" as="h2">
              What We Do
            </Text>

            <Text type="body" color="secondary">
              Modern solutions for building powerful and scalable
              web applications.
            </Text>
          </VStack>

          <Grid columns={3} gap={5}>
            {services.map((service) => (
              <Card key={service.title} padding={7}>
                <VStack gap={4} align="center">
                  <Text type="heading-2">
                    {service.icon}
                  </Text>

                  <Text type="heading-3">
                    {service.title}
                  </Text>

                  <Text type="body" color="secondary">
                    {service.description}
                  </Text>

                  <Button
                    label="Learn More"
                    variant="secondary"
                    onClick={() => {
                      window.location.href = '/services';
                    }}
                  />
                </VStack>
              </Card>
            ))}
          </Grid>
        </VStack>
      </Section>

      {/* ======================================================
          API INTEGRATION SECTION
      ====================================================== */}

      <Section width="100%" padding={10}>
        <VStack gap={6} align="center">
          <VStack gap={2} align="center">
            <Text type="display-2" as="h2">
              Powerful API Integration
            </Text>

            <Text type="body" color="secondary">
              Complete API chaining from client request to final
              user profile response.
            </Text>
          </VStack>

          <Grid columns={4} gap={4}>
            <Card padding={6}>
              <VStack gap={2} align="center">
                <Text type="heading-3">Client</Text>
                <Text type="body" color="secondary">
                  User Request
                </Text>
              </VStack>
            </Card>

            <Card padding={6}>
              <VStack gap={2} align="center">
                <Text type="heading-3">API 1</Text>
                <Text type="body" color="secondary">
                  Registration
                </Text>
              </VStack>
            </Card>

            <Card padding={6}>
              <VStack gap={2} align="center">
                <Text type="heading-3">API 2</Text>
                <Text type="body" color="secondary">
                  Welcome Email
                </Text>
              </VStack>
            </Card>

            <Card padding={6}>
              <VStack gap={2} align="center">
                <Text type="heading-3">API 3</Text>
                <Text type="body" color="secondary">
                  User Profile
                </Text>
              </VStack>
            </Card>
          </Grid>
        </VStack>
      </Section>

      {/* ======================================================
          CALL TO ACTION
      ====================================================== */}

      <Section width="100%" padding={10}>
        <VStack align="center">
          <Card padding={10}>
            <VStack gap={5} align="center">
              <Text type="display-2" as="h2">
                Ready to Get Started?
              </Text>

              <Text type="body" color="secondary">
                Create your account and experience our modern
                application.
              </Text>

              <Button
                label="Create Account"
                variant="primary"
                onClick={() => {
                  window.location.href = '/form-two-column';
                }}
              />
            </VStack>
          </Card>
        </VStack>
      </Section>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Section width="100%" padding={5}>
        <VStack align="center">
          <Text type="body">
            © 2026 Astryx Project. All rights reserved.
          </Text>
        </VStack>
      </Section>
    </>
  );
}
