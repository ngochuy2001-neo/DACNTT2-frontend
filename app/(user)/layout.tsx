import React from 'react'
import Footer from '../components/common/Footer';
import HeaderBar from '../components/common/Header';

function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <HeaderBar />
        {children}
        <Footer />
        </div>
  )
}

export default UserLayout