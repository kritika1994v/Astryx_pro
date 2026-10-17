'use client';

import { useState } from 'react';

import { Section } from '@astryxdesign/core/Section';
import { Card } from '@astryxdesign/core/Card';
import { VStack } from '@astryxdesign/core/Layout';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Divider } from '@astryxdesign/core/Divider';
import { TextInput } from '@astryxdesign/core/TextInput';
import { TextArea } from '@astryxdesign/core/TextArea';
import { Typeahead } from '@astryxdesign/core/Typeahead';
import type {
  SearchableItem,
  SearchSource,
} from '@astryxdesign/core/Typeahead';

const cities: SearchableItem[] = [
  { id: '1', label: 'Delhi' },
  { id: '2', label: 'Mumbai' },
  { id: '3', label: 'Bengaluru' },
  { id: '4', label: 'Hyderabad' },
  { id: '5', label: 'Chennai' },
  { id: '6', label: 'Kolkata' },
  { id: '7', label: 'Pune' },
  { id: '8', label: 'Noida' },
  { id: '9', label: 'Gurugram' },
  { id: '10', label: 'Lucknow' },
  { id: '11', label: 'Jaipur' },
  { id: '12', label: 'Ahmedabad' },
  { id: '13', label: 'Chandigarh' },
  { id: '14', label: 'Dehradun' },
  { id: '15', label: 'Gorakhpur' },
];

type FormErrors = {
  fullName: string;
  email: string;
  password: string;
  company: string;
  jobTitle: string;
  phone: string;
  city: string;
  details: string;
};

export default function RegistrationPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState<SearchableItem | null>(null);
  const [budget, setBudget] = useState('$50k – $100k');
  const [details, setDetails] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const searchSource: SearchSource = {
    search: (query: string) =>
      cities.filter((item) =>
        item.label.toLowerCase().includes(query.trim().toLowerCase())
      ),
    bootstrap: () => cities.slice(0, 5),
  };

  const validateFullName = () => {
    const value = fullName.trim();

    if (!value) return 'Full name is required';
    if (value.length < 2 || value.length > 100) {
      return 'Name must contain 2–100 characters';
    }
    if (!/^[\p{L}]+(?:[\s'-][\p{L}]+)*$/u.test(value)) {
      return 'Enter a valid full name';
    }

    return '';
  };

  const validateEmail = () => {
    const value = email.trim();

    if (!value) return 'Email address is required';

    const emailPattern =
      /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;

    if (!emailPattern.test(value)) {
      return 'Enter a valid email address';
    }

    return '';
  };

  const validatePassword = () => {
    if (!password) return 'Password is required';
    if (password.length < 8 || password.length > 128) {
      return 'Password must contain 8–128 characters';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Add at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Add at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Add at least one number';
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return 'Add at least one special character';
    }

    return '';
  };

  const validateCompany = () => {
    const value = company.trim();

    if (!value) return 'Company name is required';
    if (value.length < 2 || value.length > 100) {
      return 'Company name must contain 2–100 characters';
    }

    return '';
  };

  const validateJobTitle = () => {
    const value = jobTitle.trim();

    if (!value) return 'Job title is required';
    if (value.length < 2 || value.length > 100) {
      return 'Job title must contain 2–100 characters';
    }

    return '';
  };

  const validatePhone = () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return 'Enter a valid 10-digit Indian mobile number';
    }

    return '';
  };

  const validateDetails = () => {
    const words = details.trim().split(/\s+/).filter(Boolean);

    if (!details.trim()) return 'Project details are required';
    if (words.length < 10) return 'Enter at least 10 words';
    if (words.length > 100) return 'Maximum 100 words allowed';

    return '';
  };

  const errors: FormErrors = {
    fullName: validateFullName(),
    email: validateEmail(),
    password: validatePassword(),
    company: validateCompany(),
    jobTitle: validateJobTitle(),
    phone: validatePhone(),
    city: city ? '' : 'Please select a city',
    details: validateDetails(),
  };

  const showError = (message: string) => submitted && Boolean(message);

  const handleSubmit = async () => {
    setSubmitted(true);
    setError('');
    setSuccess('');

    if (Object.values(errors).some(Boolean)) {
      setError('Please correct the highlighted fields.');
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          password,
          company: company.trim(),
          jobTitle: jobTitle.trim(),
          phone,
          city: city?.label,
          budget,
          details: details.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || 'Registration failed');
        return;
      }

      const registeredUser = {
        ...data.user,
        fullName: fullName.trim(),
        email: email.trim(),
        company: company.trim(),
        jobTitle: jobTitle.trim(),
        phone,
        city: city?.label,
        budget,
        details: details.trim(),
      };

      localStorage.setItem(
        'registeredUser',
        JSON.stringify(registeredUser)
      );

      setSuccess('Registration successful!');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Unable to connect to the registration API.');
    } finally {
      setLoading(false);
    }
  };

  const wordCount = details.trim()
    ? details.trim().split(/\s+/).filter(Boolean).length
    : 0;

  return (
    <>
      {/* REGISTRATION SECTION */}
      <Section width="100%" padding={0}>
        <div className="w-full min-h-screen bg-sky-100">
        
          <VStack gap={8} align="center" padding={10}>
            {/* REGISTRATION CARD */}
            <Card padding={8} width="700px">
              <VStack gap={5}>
                {/* FORM HEADING */}
                <VStack gap={2} align="start">
                  <Text type="display-2" as="h1">
                    Create your account
                  </Text>

                  <Text type="body" color="secondary">
                    Fill in your details and we will get everything ready for you.
                  </Text>
                </VStack>

                <Divider />

                {/* FULL NAME */}
                <VStack gap={2} align="stretch">
                  <TextInput
                    label="Full Name"
                    value={fullName}
                    onChange={setFullName}
                    placeholder="Enter your full name"
                    width="100%"
                  />
                  {showError(errors.fullName) && (
                    <Text type="body">{errors.fullName}</Text>
                  )}
                </VStack>

                {/* EMAIL */}
                <VStack gap={2} align="stretch">
                  <TextInput
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@example.com"
                    width="100%"
                  />
                  {showError(errors.email) && (
                    <Text type="body">{errors.email}</Text>
                  )}
                </VStack>

                {/* PASSWORD */}
                <VStack gap={2} align="stretch">
                  <TextInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Create a strong password"
                    width="100%"
                  />
                  {showError(errors.password) && (
                    <Text type="body">{errors.password}</Text>
                  )}
                </VStack>

                {/* COMPANY */}
                <VStack gap={2} align="stretch">
                  <TextInput
                    label="Company"
                    value={company}
                    onChange={setCompany}
                    placeholder="Enter company name"
                    width="100%"
                  />
                  {showError(errors.company) && (
                    <Text type="body">{errors.company}</Text>
                  )}
                </VStack>

                {/* JOB TITLE */}
                <VStack gap={2} align="stretch">
                  <TextInput
                    label="Job Title"
                    value={jobTitle}
                    onChange={setJobTitle}
                    placeholder="Enter your job title"
                    width="100%"
                  />
                  {showError(errors.jobTitle) && (
                    <Text type="body">{errors.jobTitle}</Text>
                  )}
                </VStack>

                {/* MOBILE NUMBER */}
                <VStack gap={2} align="stretch">
                  <TextInput
                    label="Mobile Number"
                    type="tel"
                    value={phone}
                    onChange={(value) => {
                      setPhone(value.replace(/\D/g, '').slice(0, 10));
                    }}
                    placeholder="9876543210"
                    width="100%"
                  />
                  {showError(errors.phone) && (
                    <Text type="body">{errors.phone}</Text>
                  )}
                </VStack>

                {/* CITY */}
                <VStack gap={2} align="stretch">
                  <Typeahead
                    label="City"
                    placeholder="Search and select a city..."
                    searchSource={searchSource}
                    value={city}
                    onChange={setCity}
                    hasEntriesOnFocus
                    maxMenuItems={5}
                  />
                  {showError(errors.city) && (
                    <Text type="body">{errors.city}</Text>
                  )}
                </VStack>

                {/* BUDGET */}
                {/* <div style={{ width: '100%' }}>
                  <label
                    htmlFor="budget"
                    style={{ display: 'block', marginBottom: 8 }}
                  >
                    Budget
                  </label>

                  <select
                    id="budget"
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                    style={{
                      width: '100%',
                      padding: 12,
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <option value="Below $50k">Below $50k</option>
                    <option value="$50k – $100k">$50k – $100k</option>
                    <option value="$100k – $250k">$100k – $250k</option>
                    <option value="$250k+">$250k+</option>
                  </select>
                </div> */}

                {/* PROJECT DETAILS */}
                <VStack gap={2} align="stretch">
                  <TextArea
                    label="Project Details"
                    value={details}
                    onChange={setDetails}
                    placeholder="Describe your project in at least 10 words"
                    width="100%"
                  />

                  <Text type="body" color="secondary">
                    {wordCount}/100 words (Minimum 10 words)
                  </Text>

                  {showError(errors.details) && (
                    <Text type="body">{errors.details}</Text>
                  )}
                </VStack>

                {/* API MESSAGES */}
                {error && (
                  <Card padding={4} width="100%">
                    <Text type="body">{error}</Text>
                  </Card>
                )}

                {success && (
                  <Card padding={4} width="100%">
                    <Text type="body">{success}</Text>
                  </Card>
                )}

                {/* SUBMIT BUTTON */}
                <Button
                  label={loading ? 'Processing...' : 'Create Account'}
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={loading}
                />
              </VStack>
            </Card>
          </VStack>
        </div>
      </Section>
    </>
  );
}