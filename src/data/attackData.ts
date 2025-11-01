export interface AttackInfo {
  name: string;
  cve: string;
  cvss: number;
  vectors: string[];
  description: string;
  mitigation: string[];
}

export const attackDatabase: Record<string, AttackInfo> = {
  "DDoS Attack": {
    name: "DDoS Attack",
    cve: "CVE-2024-1337",
    cvss: 7.5,
    vectors: ["Network flooding", "Amplification attacks", "Application layer floods"],
    description: "Distributed Denial of Service attack overwhelming target systems with traffic from multiple sources",
    mitigation: [
      "Deploy DDoS mitigation services",
      "Implement rate limiting",
      "Use CDN with DDoS protection",
      "Configure auto-scaling infrastructure"
    ]
  },
  "SQL Injection": {
    name: "SQL Injection",
    cve: "CVE-2024-2156",
    cvss: 9.8,
    vectors: ["User input fields", "URL parameters", "HTTP headers", "Cookies"],
    description: "Code injection technique exploiting SQL vulnerabilities to access database contents",
    mitigation: [
      "Use parameterized queries",
      "Implement input validation",
      "Apply principle of least privilege",
      "Deploy WAF with SQL injection rules"
    ]
  },
  "XSS Attack": {
    name: "Cross-Site Scripting",
    cve: "CVE-2024-3421",
    cvss: 6.1,
    vectors: ["DOM manipulation", "Stored XSS", "Reflected XSS", "Client-side injection"],
    description: "Injection of malicious scripts into web pages viewed by other users",
    mitigation: [
      "Sanitize user inputs",
      "Implement Content Security Policy",
      "Use HTTPOnly cookies",
      "Enable XSS protection headers"
    ]
  },
  "Phishing": {
    name: "Phishing Attack",
    cve: "CVE-2024-4892",
    cvss: 5.3,
    vectors: ["Email spoofing", "Social engineering", "Fake login pages", "SMS phishing"],
    description: "Social engineering attack attempting to steal credentials through deceptive communications",
    mitigation: [
      "Implement email authentication (SPF, DKIM, DMARC)",
      "Deploy anti-phishing filters",
      "Conduct security awareness training",
      "Use multi-factor authentication"
    ]
  },
  "Ransomware": {
    name: "Ransomware",
    cve: "CVE-2024-5673",
    cvss: 8.9,
    vectors: ["Email attachments", "Drive-by downloads", "RDP exploitation", "Supply chain"],
    description: "Malware that encrypts data and demands ransom payment for decryption key",
    mitigation: [
      "Maintain offline backups",
      "Deploy endpoint protection",
      "Implement network segmentation",
      "Regular security patches"
    ]
  },
  "Man-in-the-Middle": {
    name: "MITM Attack",
    cve: "CVE-2024-6234",
    cvss: 7.4,
    vectors: ["ARP spoofing", "DNS hijacking", "SSL stripping", "WiFi eavesdropping"],
    description: "Interception attack where attacker secretly relays and alters communication between parties",
    mitigation: [
      "Enforce HTTPS everywhere",
      "Use VPN for sensitive connections",
      "Implement certificate pinning",
      "Deploy DNSSEC"
    ]
  },
  "Zero-Day Exploit": {
    name: "Zero-Day Exploit",
    cve: "CVE-2024-7891",
    cvss: 9.1,
    vectors: ["Unpatched vulnerabilities", "Advanced persistent threats", "Targeted attacks"],
    description: "Exploitation of previously unknown security vulnerabilities before patches are available",
    mitigation: [
      "Implement virtual patching",
      "Deploy behavioral analysis tools",
      "Use threat intelligence feeds",
      "Enable advanced endpoint detection"
    ]
  },
  "Brute Force": {
    name: "Brute Force Attack",
    cve: "CVE-2024-8012",
    cvss: 6.5,
    vectors: ["Password guessing", "Credential stuffing", "Dictionary attacks", "Rainbow tables"],
    description: "Systematic attempt to guess passwords or encryption keys through exhaustive trial",
    mitigation: [
      "Enforce strong password policies",
      "Implement account lockout",
      "Use CAPTCHA challenges",
      "Deploy rate limiting"
    ]
  },
  "DNS Poisoning": {
    name: "DNS Cache Poisoning",
    cve: "CVE-2024-9347",
    cvss: 7.2,
    vectors: ["Cache manipulation", "Response spoofing", "Transaction ID guessing"],
    description: "Attack corrupting DNS resolver cache to redirect traffic to malicious servers",
    mitigation: [
      "Enable DNSSEC validation",
      "Use secure DNS resolvers",
      "Implement response rate limiting",
      "Monitor DNS query patterns"
    ]
  },
  "Credential Stuffing": {
    name: "Credential Stuffing",
    cve: "CVE-2024-1045",
    cvss: 8.3,
    vectors: ["Leaked credentials", "Automated bots", "Password reuse exploitation"],
    description: "Automated injection of breached credentials to gain unauthorized access",
    mitigation: [
      "Implement multi-factor authentication",
      "Monitor for credential leaks",
      "Deploy bot detection",
      "Use behavioral analytics"
    ]
  }
};
