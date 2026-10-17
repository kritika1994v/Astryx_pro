
'use client';

import { Section } from '@astryxdesign/core/Section';
import { Grid } from '@astryxdesign/core/Grid';
import { VStack } from '@astryxdesign/core/Layout';
import { Text } from '@astryxdesign/core/Text';
import { Divider } from '@astryxdesign/core/Divider';
import { Link } from '@astryxdesign/core/Link';
import { Heading } from '@astryxdesign/core/Heading';

export default function Footer() {
  return (
    <Section
      width="100%"
      padding={0}
      variant="transparent"
    >
      <div className="w-full bg-slate-950 px-8 py-14 text-white [&_*]:!text-white">
        <VStack gap="36px">
          <Grid columns={3} gap="32px">

            {/* Company Information */}
            <VStack align="center" gap="22px">
              <Heading level={3}>
                Astryx Project
              </Heading>

              <Text color="#FFFFFF">
                Building digital experiences with accessible
                and modern components, creating better digital
                experiences with accessible and modern components.
              </Text>
            </VStack>

            {/* Explore Links */}
            <VStack align="center" gap="22px">
              <Heading level={4}>
                Explore
              </Heading>

              <Divider />

              <VStack align="center" gap="18px">
                <Link href="/" color="#FFFFFF">
                  Home
                </Link>

                <Link href="/services" color="#FFFFFF">
                  Services
                </Link>

                <Link href="/about" color="#FFFFFF">
                  About Us
                </Link>
              </VStack>
            </VStack>

            {/* Support Links */}
            <VStack align="center" gap="22px">
              <Heading level={4}>
                Support
              </Heading>

              <VStack align="center" gap="14px">
                <Link href="/contact" color="#FFFFFF">
                  Contact Us
                </Link>

                <Link href="/privacy-policy" color="#FFFFFF">
                  Privacy Policy
                </Link>

                <Link href="/login" color="#FFFFFF">
                  Login
                </Link>
              </VStack>
            </VStack>
          </Grid>

          <Divider />

          {/* Copyright */}
          <VStack align="center" >
            <Text color="#FFFFFF"  >
              © {new Date().getFullYear()} Astryx Project.
              All rights reserved.
            </Text>
          </VStack>
        </VStack>
      </div>
    </Section>
  );
}
