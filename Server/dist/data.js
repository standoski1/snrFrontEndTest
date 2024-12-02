"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialRecommendations = void 0;
const types_1 = require("./types");
// Define constants for random generation
const CLOUD_PROVIDERS = [types_1.CloudProvider.AWS, types_1.CloudProvider.AZURE];
const RECOMMENDATION_CLASSES = [
    types_1.RecommendationClass.COMPUTE_RECOMMENDATION,
    types_1.RecommendationClass.NETWORKING_RECOMMENDATION,
    types_1.RecommendationClass.DATA_PROTECTION_RECOMMENDATION,
    types_1.RecommendationClass.AUTHENTICATION_RECOMMENDATION,
    types_1.RecommendationClass.APPLICATION_RECOMMENDATION,
    types_1.RecommendationClass.COMPLIANCE_RECOMMENDATION,
];
const COMPLIANCE_FRAMEWORKS = [
    { name: 'CIS AWS Foundations', sections: ['1', '2', '3', '4', '5'] },
    { name: 'CIS Azure', sections: ['1', '2', '3', '4', '5', '6', '7', '8'] },
    { name: 'CIS GCP', sections: ['1', '2', '3', '4', '5'] },
    { name: 'NIST 800-53', sections: ['AC', 'AU', 'SC', 'SI', 'IA'] },
    { name: 'ISO 27001', sections: ['A.5', 'A.9', 'A.12', 'A.13', 'A.14', 'A.17'] },
    { name: 'SOC 2', sections: ['CC1', 'CC2', 'CC3', 'CC4', 'CC5', 'CC6', 'CC7'] },
    { name: 'PCI DSS', sections: ['1', '2', '3', '4', '5', '6', '7', '8'] },
    { name: 'HIPAA', sections: ['164.308', '164.310', '164.312', '164.314'] },
    { name: 'GDPR', sections: ['Article 25', 'Article 32', 'Article 35'] },
    { name: 'AWS Well-Architected', sections: ['Security', 'Reliability', 'Performance'] },
    { name: 'Azure Security Benchmark', sections: ['1', '2', '3', '4', '5', '6', '7', '8', '9'] },
    { name: 'OWASP Top 10', sections: ['A1', 'A2', 'A3', 'A4', 'A5'] },
];
const RESOURCE_TYPES = {
    [types_1.CloudProvider.UNSPECIFIED]: [],
    [types_1.CloudProvider.AWS]: [
        'EC2 Instance',
        'S3 Bucket',
        'RDS Instance',
        'Lambda Function',
        'ECS Task',
        'EKS Cluster',
        'DynamoDB Table',
        'CloudFront Distribution',
        'API Gateway',
        'SNS Topic',
        'SQS Queue',
        'ElastiCache Cluster',
    ],
    [types_1.CloudProvider.AZURE]: [
        'Virtual Machine',
        'Storage Account',
        'SQL Database',
        'Function App',
        'App Service',
        'Container Instance',
        'AKS Cluster',
        'Cosmos DB',
        'Application Gateway',
        'Service Bus',
        'Event Hub',
        'Redis Cache',
    ],
};
// Helper functions
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function getRandomElements(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}
// Main generator function
function generateRecommendations(count) {
    const recommendations = [];
    const securityDomains = [
        'Encryption',
        'Access Control',
        'Network Security',
        'Compliance',
        'Authentication',
        'Monitoring',
        'Data Protection',
        'Identity Management',
        'Vulnerability Management',
        'Configuration Management',
    ];
    const resourceNames = [
        'production',
        'staging',
        'development',
        'testing',
        'integration',
        'backup',
        'primary',
        'secondary',
        'disaster-recovery',
        'analytics',
    ];
    for (let i = 1; i <= count; i++) {
        const provider = getRandomElement(CLOUD_PROVIDERS);
        const domain = getRandomElement(securityDomains);
        const resourceType = getRandomElement(RESOURCE_TYPES[provider]);
        const recommendationClass = getRandomElement(RECOMMENDATION_CLASSES);
        const title = `${types_1.CloudProvider[provider]} ${resourceType} ${domain} Configuration`;
        const description = `Implement comprehensive ${domain.toLowerCase()} controls for ${types_1.CloudProvider[provider]} ${resourceType} including security best practices, monitoring, and compliance requirements.`;
        const frameworks = getRandomElements(COMPLIANCE_FRAMEWORKS, 2).map((framework) => ({
            name: framework.name,
            section: getRandomElement(framework.sections),
            subsection: `${getRandomElement(framework.sections)}.${getRandomInt(1, 5)}`,
        }));
        const recommendation = {
            tenantId: 'tenant-001',
            recommendationId: `rec-${String(i).padStart(3, '0')}`,
            title,
            slug: generateSlug(title),
            description,
            score: getRandomInt(80, 95),
            provider: [provider],
            frameworks,
            reasons: [
                `Enhances ${domain.toLowerCase()} security`,
                'Reduces security risks',
                'Ensures compliance requirements',
            ],
            furtherReading: [
                {
                    name: `${types_1.CloudProvider[provider]} ${resourceType} Security Guide`,
                    href: `https://docs.example.com/${types_1.CloudProvider[provider].toLowerCase()}/${resourceType.toLowerCase()}/security`,
                },
            ],
            totalHistoricalViolations: getRandomInt(100, 200),
            affectedResources: getRandomElements(resourceNames, 2).map((name) => ({
                name: `${name}-${resourceType.toLowerCase().replace(/\s+/g, '-')}`,
            })),
            impactAssessment: {
                totalViolations: getRandomInt(50, 100),
                mostImpactedScope: {
                    name: `${getRandomElement(resourceNames)}-${resourceType.toLowerCase().replace(/\s+/g, '-')}`,
                    type: resourceType,
                    count: getRandomInt(30, 60),
                },
            },
            class: recommendationClass,
        };
        recommendations.push(recommendation);
    }
    return recommendations;
}
// Generate initial recommendations
exports.initialRecommendations = generateRecommendations(50);
