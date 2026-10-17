'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/layout/Header';
import { Center } from '@astryxdesign/core/Center';
import { Section } from '@astryxdesign/core/Section';
import { Card } from '@astryxdesign/core/Card';
import { VStack } from '@astryxdesign/core/Layout';
import { Text } from '@astryxdesign/core/Text';
import { Divider } from '@astryxdesign/core/Divider';
import { Button } from '@astryxdesign/core/Button';
import { Avatar } from '@astryxdesign/core/Avatar';



type Profile = {
  userId: number;
  fullName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone?: string;
  inquiryReason?: string;
  budget?: string;
  details?: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      // =====================================
      // CHECK LOGIN
      // =====================================

      const storedUser =
        localStorage.getItem('loggedInUser');

      if (!storedUser) {
        router.push('/login');
        return;
      }

      const user = JSON.parse(storedUser);

      // =====================================
      // PROFILE API
      // =====================================

      const response = await fetch(
        'http://localhost:3001/profile',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.userId,
            fullName: user.fullName,
            email: user.email,
            company: user.company,
            jobTitle: user.jobTitle,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || 'Unable to load profile'
        );
        setLoading(false);
        return;
      }

      // =====================================
      // MERGE USER DATA
      // =====================================

      const profileData = {
        ...user,
        ...data.profile,
      };

      setProfile(profileData);

    } catch (error) {
      console.error(error);

      setError(
        'Technical error: Unable to load profile'
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // LOGOUT
  // =====================================

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');

    router.push('/login');
  };
  
  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <>
        <Header />

        <Center
          style={{
            minHeight: '80vh',
          }}
        >
          <Text type="heading-3">
            Loading profile...
          </Text>
        </Center>
      </>
    );
  }

  // =====================================
  // ERROR
  // =====================================

  if (error) {
    return (
      <>
        <Header />

        <Center
          style={{
            minHeight: '80vh',
            padding: '30px',
          }}
        >
          <VStack gap={4}>
            <Text type="heading-3">
              {error}
            </Text>

            <Button
              label="Go to Login"
              variant="primary"
              onClick={() =>
                router.push('/login')
              }
            />
          </VStack>
        </Center>
      </>
    );
  }

  // =====================================
  // PROFILE UI
  // =====================================

  return (
    <>
      <Header />

      <Section
        style={{
          minHeight:
            'calc(100vh - 80px)',

          padding: '60px 20px',

          background:
            'linear-gradient(135deg, #eef2ff, #f8fafc)',
        }}
      >
        <Center>
          <Card
            style={{
              width: '100%',
              maxWidth: '650px',

              padding: '40px',

              borderRadius: '24px',

              boxShadow:
                '0 20px 60px rgba(15, 23, 42, 0.12)',
            }}
          >
            <VStack gap={5}>

              {/* AVATAR */}

              <Center>
                <Avatar
                  size="lg"
                  src={`https://i.pravatar.cc/300?img=${
                    (profile?.userId || 101) % 70 + 1
                  }`}
                  alt={
                    profile?.fullName ||
                    'User Avatar'
                  }
                />
              </Center>

              {/* NAME */}

              <Center>
                <VStack gap={1}>
                  <Text type="heading-2">
                    {profile?.fullName}
                  </Text>

                  <Text type="body">
                    {profile?.jobTitle ||
                      'Software Developer'}
                  </Text>
                </VStack>
              </Center>

              <Divider />

              {/* USER ID */}

             <VStack gap={3}>
  <Text type="heading-3" weight="bold">
    User Information
  </Text>

  <Text type="body">
    <Text type="body" weight="bold">User ID: </Text>
    {profile?.userId}
  </Text>

  <Text type="body">
    <Text type="body" weight="bold">Email: </Text>
    {profile?.email}
  </Text>

  <Text type="body">
    <Text type="body" weight="bold">Company: </Text>
    {profile?.company}
  </Text>

  <Text type="body">
    <Text type="body" weight="bold">Job Title: </Text>
    {profile?.jobTitle}
  </Text>

  {profile?.phone && (
    <Text type="body">
      <Text type="body" weight="bold">Phone: </Text>
      {profile.phone}
    </Text>
  )}

  {profile?.inquiryReason && (
    <Text type="body">
      <Text type="body" weight="bold">
        Inquiry Reason:{' '}
      </Text>
      {profile.inquiryReason}
    </Text>
  )}

  {profile?.budget && (
    <Text type="body">
      <Text type="body" weight="bold">Budget: </Text>
      {profile.budget}
    </Text>
  )}

  {profile?.details && (
    <Text type="body">
      <Text type="body" weight="bold">Details: </Text>
      {profile.details}
    </Text>
  )}
</VStack>

              <Divider />

              {/* LOGOUT */}

              <Button
                label="Logout"
                variant="secondary"
                onClick={handleLogout}
              />

            </VStack>
          </Card>
        </Center>
      </Section>
    </>
  );
}