---
title: "OIDC vs SAML Authentication Flows"
description: "A simple step-by-step comparison of OIDC and SAML login flows."
pubDate: 2025-06-23
pubDatetime: 2025-06-23T16:53:04.145455
draft: false
---

## OIDC Flow (Authorization Code Flow)

1. User requests login → Redirects to Identity Provider (IdP).
2. User authenticates → IdP verifies credentials.
3. Authorization Code issued → Sent to the app.
4. App exchanges code for tokens → Sends the code to IdP.
5. IdP responds with ID Token & Access Token → App receives tokens.
6. App uses tokens → Validates and authorizes access.

---

## SAML Flow

1. User requests login → Redirects to Identity Provider (IdP).
2. User authenticates → IdP verifies credentials.
3. IdP generates SAML Assertion → Encodes user info in XML format.
4. Assertion sent to Service Provider (SP) → Redirects user with SAML response.
5. SP validates assertion → Grants access if valid.
