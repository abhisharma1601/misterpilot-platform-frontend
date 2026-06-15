# Privacy Policy

**Last updated: June 15, 2026**

This Privacy Policy explains how MisterPilot ("Company", "we", "us", or "our") collects, uses, shares, and protects information in connection with the MisterPilot application programming interface, dashboard, and related services (collectively, the "Service"). This Policy should be read together with our Terms and Conditions.

We are committed to handling personal data in accordance with India's Digital Personal Data Protection Act, 2023 ("DPDP Act") and other applicable laws.

By using the Service, you agree to the practices described in this Policy.

---

## 1. Who We Are (Data Fiduciary)

For the purposes of the DPDP Act, MisterPilot is the Data Fiduciary responsible for the personal data described in this Policy. Our contact details are in Section 12.

---

## 2. Information We Collect

We deliberately collect as little personal data as possible. We collect:

**2.1 Account information.** When you register, we collect and store your **name** and **email address** in our database. This is used to create and manage your account, authenticate you, and communicate with you about the Service.

**2.2 Payment information.** Payments are processed by Razorpay. We do **not** store your card numbers, UPI details, or bank account details. Razorpay handles that information under its own privacy policy. We may retain limited transaction metadata (such as a transaction ID, amount, and status) for accounting and reconciliation.

**2.3 Inputs and Outputs.** Data you send to the API ("Input") and the content returned ("Output") are **processed in real time and are not stored by us**. They pass through our system, through our PII-reduction proxy, to the LLM provider, and the result is returned to you. We do not retain copies of your Inputs or Outputs after the request is served. (See Section 4 for how the proxy works.)

**2.4 Technical/usage data.** To meter usage and bill Credits, we record minimal request metadata such as timestamp, request count, token or unit counts, and the API Key used. This metadata is used for billing, security, and Service operation, and does not include the content of your Inputs or Outputs.

**2.5 Cookies and analytics.** We do **not** use cookies or third-party analytics on our dashboard or website beyond what is strictly necessary to keep you logged in and operate the Service securely.

---

## 3. How We Use Your Information

We use personal data to:

- create, authenticate, and manage your account;
- process recharges and maintain your Credit balance;
- provide, operate, secure, and support the Service;
- meter usage and prevent abuse, fraud, and security incidents;
- communicate service-related notices (such as billing, security, or policy updates);
- comply with legal obligations and enforce our Terms.

We rely on the lawful bases available under the DPDP Act, primarily the performance of our contract with you and your consent where applicable.

---

## 4. How the PII-Reduction Proxy Works

A core part of our Service is a proxy designed to **reduce personally identifiable information (PII)** in your Input before it is transmitted to the LLM provider. The intended flow is:

> Your Input → our PII-reduction proxy → LLM provider → response back to you

The proxy attempts to detect and minimize common categories of PII before transmission. However, **automated PII reduction is not perfect and we do not guarantee that all PII will be detected or removed.** You remain responsible for the content you submit and should not rely solely on the proxy to sanitize sensitive data. Do not submit data you are not lawfully permitted to process or transmit.

---

## 5. Sharing and Disclosure

We do not sell your personal data. We share data only as follows:

**5.1 LLM providers (Data Processors / sub-processors).** Your Input (after PII reduction) is transmitted to one or more third-party LLM providers to generate Output. These providers process the data under their own terms and policies, which we do not control. We encourage you to review the relevant provider's policies. We do not transmit your account name or email to LLM providers as part of API requests.

**5.2 Payment processor.** Razorpay processes your payment information to complete recharges.

**5.3 Legal and safety.** We may disclose information where required by law, court order, or governmental request, or where necessary to protect the rights, safety, or security of the Company, our users, or the public.

**5.4 Business transfers.** If we are involved in a merger, acquisition, or sale of assets, personal data may be transferred as part of that transaction, subject to this Policy.

---

## 6. Cross-Border Transfers

The LLM providers and certain infrastructure we rely on may be located outside India. Where personal data is transferred outside India, we do so in accordance with the DPDP Act and any restrictions notified by the Government of India. Because Inputs are PII-reduced and not stored by us, the personal data we hold (name and email) is generally retained within our own systems.

---

## 7. Data Retention

**7.1 Account data.** We retain your name and email for as long as your account is active. After you close your account, we retain this data for as long as required by applicable law and then delete or anonymize it, unless a longer period is required for legal, tax, accounting, or dispute-resolution purposes.

**7.2 Inputs and Outputs.** Not retained — processed in real time and discarded after the request is served.

**7.3 Transaction and usage metadata.** Retained for the period required for accounting, tax, and audit obligations under applicable law.

---

## 8. Your Rights

Subject to the DPDP Act, you have the right to:

- **access** a summary of the personal data we process about you and how it is processed;
- **correct, complete, or update** inaccurate or incomplete data;
- **erase** your personal data where it is no longer necessary for the purpose it was collected;
- **withdraw consent** where processing is based on consent (this does not affect prior lawful processing);
- **nominate** another individual to exercise your rights in the event of death or incapacity;
- **grievance redressal** through our Grievance Officer (Section 12).

To exercise any right, contact us at support@misterpilot.online. We may need to verify your identity before acting on a request, and we will respond within the timelines required by law.

---

## 9. Security

We implement reasonable technical and organizational measures to protect personal data, including access controls, encryption in transit, and the PII-reduction proxy described above. However, no system is completely secure, and we cannot guarantee absolute security. You are responsible for keeping your API Key and account credentials confidential.

In the event of a personal data breach, we will notify the Data Protection Board of India and affected users as required by the DPDP Act.

---

## 10. Children

The Service is not intended for individuals under 18 years of age. We do not knowingly process the personal data of children. If you believe a child has provided us personal data, contact us and we will delete it.

---

## 11. Changes to This Policy

We may update this Policy from time to time. The updated version takes effect when posted with a revised "Last updated" date. Material changes may be notified via the Service or by email. Continued use after changes take effect constitutes acceptance.

---

## 12. Contact and Grievance Officer

For questions, requests, or complaints regarding this Policy or your personal data, contact:

- **MisterPilot**
- **Email:** support@misterpilot.online
- **Address:** 4th floor, Sunshine Building, Rajhana, New Shimla, Shimla – 171009, Himachal Pradesh

In accordance with the DPDP Act and the Information Technology Act, 2000 and rules thereunder, the contact details of our Grievance Officer / Data Protection Officer are:

- **Name:** Abhishek Sharma
- **Email:** 4abhi45@gmail.com
- **Address:** 4th floor, Sunshine Building, Rajhana, New Shimla, Shimla – 171009, Himachal Pradesh

We will acknowledge complaints within 24 hours and aim to resolve them within the timelines prescribed by law.
