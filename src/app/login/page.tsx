'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Section } from '@astryxdesign/core/Section';
import { Card } from '@astryxdesign/core/Card';
import { VStack } from '@astryxdesign/core/Layout';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Link } from '@astryxdesign/core/Link';
import { TextInput } from '@astryxdesign/core/TextInput';
import { Divider } from '@astryxdesign/core/Divider';

export default function LoginPage() {
  const router = useRouter();

  // FORM STATE
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // UI STATE
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // LOGIN HANDLER
  const handleLogin = async () => {
    setError('');
    setSuccess('');

    // VALIDATION
    if (!email.trim() || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);

    try {
      // GET REGISTERED USER
      const storedUser = localStorage.getItem('registeredUser');

      if (!storedUser) {
        setError('No registered user found. Please register first.');
        return;
      }

      const registeredUser = JSON.parse(storedUser);

      // CHECK EMAIL
      if (
        registeredUser.email?.trim().toLowerCase() !==
        email.trim().toLowerCase()
      ) {
        setError('Email is not registered');
        return;
      }

      // CHECK PASSWORD
      if (registeredUser.password !== password) {
        setError('Incorrect password');
        return;
      }

      // LOGIN API
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
          fullName: registeredUser.fullName,
          company: registeredUser.company,
          jobTitle: registeredUser.jobTitle,
        }),
      });

      // CHECK RESPONSE CONTENT TYPE
      const contentType = response.headers.get('content-type');

      if (!contentType?.includes('application/json')) {
        console.error('Non-JSON response:', await response.text());

        setError(
          `Login API returned a non-JSON response (${response.status})`
        );
        return;
      }

      // READ API RESPONSE
      const data = await response.json();

      // HANDLE API ERROR
      if (!response.ok || !data.success) {
        setError(data.message || 'Login failed');
        return;
      }

      // CREATE LOGGED-IN USER
      const loggedInUser = {
        userId: registeredUser.userId,
        fullName: registeredUser.fullName,
        email: registeredUser.email,
        company: registeredUser.company,
        jobTitle: registeredUser.jobTitle,
        phone: registeredUser.phone,
        city: registeredUser.city,
        budget: registeredUser.budget,
        details: registeredUser.details,
      };

      // SAVE LOGIN SESSION
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify(loggedInUser)
      );

      setSuccess('Login successful');

      // REDIRECT TO PROFILE
      router.push('/profile');
    } catch (error) {
      console.error('Login error:', error);
      setError('Technical error: Unable to connect to API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* LOGIN SECTION */}
      <Section width="100%" padding={0}>
       <div className="w-full bg-sky-100">
          <VStack gap={8} align="center" padding={10}>
            {/* LOGIN CARD */}
            <Card padding={8} width="520px">
              <VStack gap={6} align="stretch" width="100%">
                {/* TITLE */}
                <VStack gap={3} align="center" width="100%">
                  <Text type="display-2" as="h1">
                    Welcome Back
                  </Text>

                  <Text type="body" color="secondary">
                    Login to access your profile
                  </Text>
                </VStack>

                <Divider />

                {/* EMAIL FIELD */}
                <TextInput
                  label="Email"
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={setEmail}
                  width="100%"
                />

                {/* PASSWORD FIELD */}
                <TextInput
                  label="Password"
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={setPassword}
                  width="100%"
                />

                {/* ERROR MESSAGE */}
                {error && (
                  <Card padding={4} width="100%">
                    <Text type="body">{error}</Text>
                  </Card>
                )}

                {/* SUCCESS MESSAGE */}
                {success && (
                  <Card padding={4} width="100%">
                    <Text type="body">{success}</Text>
                  </Card>
                )}

                {/* LOGIN BUTTON */}
                <VStack align="center">
                  <Button
                    label={loading ? 'Logging in...' : 'Login'}
                    variant="primary"
                    onClick={handleLogin}
                    disabled={loading}
                  />
                </VStack>

                <Divider />

                {/* REGISTER LINK */}
                <VStack align="center" width="100%">
                  <Text type="body">
                    Don't have an account?{' '}
                    <Link href="/form-two-column">Register</Link>
                  </Text>
                </VStack>
              </VStack>
            </Card>
          </VStack>
        </div>
      </Section>
    </>
  );
}