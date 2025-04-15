
interface SecurityCriteria {
  hasStripeIntegration: boolean;
  hasZeroSensitiveData: boolean;
  hasFullTransparency: boolean;
  hasLoginProtection: boolean;
  hasRoleBasedAccess: boolean;
  hasApiAccessControl: boolean;
}

export const calculateSecurityScore = (criteria: SecurityCriteria): number => {
  const weights = {
    hasStripeIntegration: 20,        // Reduced from 25 to accommodate API security
    hasZeroSensitiveData: 20,        // Reduced from 25 to accommodate API security
    hasFullTransparency: 15,         // Reduced from 20
    hasLoginProtection: 15,          // Maintained
    hasRoleBasedAccess: 15,          // Maintained
    hasApiAccessControl: 15,         // New criteria for API access control
  };

  let score = 0;
  
  if (criteria.hasStripeIntegration) score += weights.hasStripeIntegration;
  if (criteria.hasZeroSensitiveData) score += weights.hasZeroSensitiveData;
  if (criteria.hasFullTransparency) score += weights.hasFullTransparency;
  if (criteria.hasLoginProtection) score += weights.hasLoginProtection;
  if (criteria.hasRoleBasedAccess) score += weights.hasRoleBasedAccess;
  if (criteria.hasApiAccessControl) score += weights.hasApiAccessControl;

  return score;
};

export const updateSecurityCriteria = (
  newCriteria: Partial<SecurityCriteria>
): SecurityCriteria => {
  const currentCriteria = getSecurityCriteria();
  const updatedCriteria = { ...currentCriteria, ...newCriteria };
  
  console.log('Security Criteria Updated:', {
    previous: currentCriteria,
    updated: updatedCriteria
  });

  return updatedCriteria;
};

export const getSecurityCriteria = (): SecurityCriteria => {
  return {
    hasStripeIntegration: true,
    hasZeroSensitiveData: true,
    hasFullTransparency: true,
    hasLoginProtection: true,
    hasRoleBasedAccess: true,
    hasApiAccessControl: true,  // New criteria - true because we've implemented API access control
  };
};

export const getSecurityDetails = () => {
  const criteria = getSecurityCriteria();
  return [
    {
      label: "Zero date sensibile",
      isActive: criteria.hasZeroSensitiveData
    },
    {
      label: "Plăți prin Stripe",
      isActive: criteria.hasStripeIntegration
    },
    {
      label: "Transparență totală",
      isActive: criteria.hasFullTransparency
    },
    {
      label: "Protecție login",
      isActive: criteria.hasLoginProtection
    },
    {
      label: "Control acces bazat pe roluri",
      isActive: criteria.hasRoleBasedAccess
    },
    {
      label: "Control acces API",
      isActive: criteria.hasApiAccessControl
    }
  ];
};
