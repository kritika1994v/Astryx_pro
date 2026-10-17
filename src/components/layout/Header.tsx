
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import {
  TopNav,
  TopNavHeading,
  TopNavItem,
} from '@astryxdesign/core/TopNav';

import { NavIcon } from '@astryxdesign/core/NavIcon';
import { Button } from '@astryxdesign/core/Button';
import { Icon } from '@astryxdesign/core/Icon';
import { Section } from '@astryxdesign/core/Section';
import { House } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('loggedInUser'));
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    router.push('/login');
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const isActive = (path: string) => pathname === path;

  return (
    
      <Section variant="transparent" padding={0} width="100%" className="w-full bg-slate-950 text-white">
        <div className="w-full bg-slate-950 text-white [&_*]:!text-white">
          <TopNav
            label="Main navigation"
            heading={
              <TopNavHeading
                heading="My App"
                logo={
                  <NavIcon
                    icon={
                      <Icon
                        icon={House}
                        size="sm"
                        color="inherit"
                      />
                    }
                  />
                }
                headingHref="/"
              />
            }
            centerContent={
              <>
                <TopNavItem
                  label="Home"
                  href="/"
                  isSelected={isActive('/')}
                />

                <TopNavItem
                  label="Services"
                  href="/services"
                  isSelected={isActive('/services')}
                />

                <TopNavItem
                  label="About"
                  href="/about"
                  isSelected={isActive('/about')}
                />
              </>
            }
            endContent={
              <>
                <Button
                  label="Search"
                  variant="ghost"
                  icon={<Icon icon="search" color="inherit" />}
                  isIconOnly
                  onClick={() => navigateTo('/search')}
                />

                {isLoggedIn ? (
                  <>
                    <Button
                      label="Profile"
                      variant={isActive('/profile') ? 'primary' : 'ghost'}
                      onClick={() => navigateTo('/profile')}
                    />

                    <Button
                      label="Logout"
                      variant="secondary"
                      onClick={handleLogout}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      label="Login"
                      variant={isActive('/login') ? 'primary' : 'ghost'}
                      onClick={() => navigateTo('/login')}
                    />

                    <Button
                      label="Register"
                      variant={
                        isActive('/form-two-column')
                          ? 'primary'
                          : 'ghost'
                      }
                      onClick={() => navigateTo('/form-two-column')}
                    />
                  </>
                )}
              </>
            }
          />
        </div>
      </Section>
    
  );
}
