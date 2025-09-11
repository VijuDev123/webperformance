import React from "react";
import styled from "styled-components";
import logoWhite from "../assets/logo-white.png";
import settings from "../settings"; // Assuming settings is in the parent directory

export default function Footer() {
  return (
    <FooterContainer>
      <Nav aria-label="Footer navigation">
        <FooterLink href="https://www.youtube.com" aria-label="Visit our YouTube channel" data-testid="footer-link-youtube">Youtube</FooterLink>
        <FooterLink href="https://www.linkedin.com" aria-label="Connect on LinkedIn" data-testid="footer-link-linkedin">LinkedIn</FooterLink>
        <FooterLink href="https://www.theseniordev.com" aria-label="Visit our website" data-testid="footer-link-website">Website</FooterLink>
        <FooterLink href="https://dev.to" aria-label="Read our posts on Dev.to" data-testid="footer-link-devto">Dev.to</FooterLink>
        <FooterLink href="https://www.medium.com" aria-label="Follow us on Medium" data-testid="footer-link-medium">Medium</FooterLink>
      </Nav>
      <LogoSection>
        <FooterLogo src={logoWhite} alt="theSeniorDev Logo" data-testid="footer-logo" />
        <CopyrightText data-testid="footer-copyright">© {new Date().getFullYear()} by theSeniorDev.com</CopyrightText>
      </LogoSection>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  color: ${settings.colors.backgroundSecondary};
  background-color: ${settings.colors.foreground};
  color: ${settings.colors.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 10px;
  @media (max-width: ${settings.breakpoints.md}) {
    text-align: center;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: ${settings.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterLink = styled.a`
  height: 40px;
  margin: 10px;
  text-decoration: none;
  color: ${settings.colors.backgroundSecondary};
  font-weight: 300;
`;

const FooterLogo = styled.img`
  height: 30px;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CopyrightText = styled.span`
  margin-top: 20px;
`;
