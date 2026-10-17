
'use client';

import './page.css';

import { Card } from '@astryxdesign/core/Card';
import { VStack } from '@astryxdesign/core/Layout';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Section } from '@astryxdesign/core/Section';
import { Divider } from '@astryxdesign/core/Divider';
import { Grid } from '@astryxdesign/core/Grid';
import { Icon } from '@astryxdesign/core/Icon';

import { Code, Plug, Palette } from 'lucide-react';

// HERO SLIDES DATA
const slides = [
  {
    title: 'Build Better Digital Experiences',
    description:
      'Create modern and accessible applications using Next.js and Astryx.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=85',
  }
];

// SERVICES DATA
const services = [
  {
    icon: Code,
    title: 'Next.js Development',
    description:
      'Build fast, scalable and modern web applications using scalable and modern web applications using scalable and modern web applications using Next.js.',
  },
  {
    icon: Plug,
    title: 'API Integration',
    description:
      'Integrate REST APIs and manage success, business and technical errors manage success, business and technical errors manage success, business and technical errors.',
  },
  {
    icon: Palette,
    title: 'Modern UI Design',
    description:
      'Create clean and responsive interfaces using Astryx components and responsive interfaces using Astryx components.',
  },
];

export default function Home() {
  return (
    <Section width="100%" padding={0} variant="transparent">
      <div className="bg-slate-100 text-slate-900">
        {/* HERO SECTION */}
        <Section width="100%" padding={0}>
          <div className="fullscreen-hero">
            {slides.map((slide) => (
              <div
                className="fullscreen-slide"
                key={slide.title}
              >
                {/* Image intentionally remains a native img */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="fullscreen-hero-image"
                />

                <div className="fullscreen-hero-overlay">
                  <div className="fullscreen-hero-content">
                    <Text type="display-2" as="h1">
                      {slide.title}
                    </Text>

                    <Text type="body" as="p">
                      {slide.description}
                    </Text>
<Divider />
                    <Button
                      label="Explore Now"
                      className="hero-button"
                      variant="primary"
                      onClick={() => {
                        window.location.href = '/form-two-column';
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* WELCOME SECTION */}
        <Section width="100%" padding={0}>
          <div className="w-full bg-sky-100 px-6 py-10 text-slate-900">
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
          </div>
        </Section>

        {/* DIVIDER */}
        <Section width="100%" padding={0}>
          <div className="w-full bg-sky-200 px-3 py-1">
            <Divider />
          </div>
        </Section>

        {/* WHAT WE DO SECTION */}
        <Section width="100%" padding={0}>
          <div className="w-full bg-slate-900 px-6 py-10">
            <VStack gap={5} align="center">
              <VStack gap={2} align="center">
                <Text
                  type="display-2"
                  as="h2"
                  color="disabled"
                >
                  What We Do
                </Text>

                <Text type="body" color="disabled">
                  Modern solutions for building powerful and scalable
                  web applications solutions for building powerful and scalable
                  web applications.
                </Text>
              </VStack>

              <Grid columns={3} gap={5}>
                {services.map((service) => (
                  <Card key={service.title} padding={7}>
                    <VStack gap={4} align="center">
                      <Icon
                        icon={service.icon}
                        size="lg"
                        color="primary"
                      />

                      <Divider />

                      <Text type="heading-3" as="h3">
                        {service.title}
                      </Text>

                      <Divider />

                      <Text type="body" color="secondary">
                        {service.description}
                      </Text>

                      <Button
                        label="Learn More"
                        variant="primary"
                        onClick={() => {
                          window.location.href = '/services';
                        }}
                      />
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>
          </div>
        </Section>

        {/* API INTEGRATION SECTION */}
        <Section width="100%" padding={0}>
          <div className="w-full bg-sky-100 px-6 py-10 text-slate-900">
            <VStack gap={6} align="center">
              <VStack gap={2} align="center">
                <Text type="display-2" as="h2">
                  Powerful API Integration
                </Text>

                <Text type="body" color="secondary">
                  Complete API chaining from client request to final
                  user profile response. Complete API chaining from client
                  request to final user profile response.
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

                {Array.from({ length: 9 }, (_, index) => (
                  <Card key={index} padding={6}>
                    <VStack gap={2} align="center">
                      <Text type="heading-3">API 3</Text>
                      <Text type="body" color="secondary">
                        User Profile
                      </Text>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>
          </div>
        </Section>

        {/* CALL TO ACTION */}
        <Section width="100%" padding={0}>
          <div className="w-full bg-slate-800 px-6 py-10 text-white">
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
          </div>
        </Section>
      </div>
    </Section>
  );
}
