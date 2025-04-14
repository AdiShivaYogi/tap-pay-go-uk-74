
interface SecurityCriteria {
  hasStripeIntegration: boolean;
  hasZeroSensitiveData: boolean;
  hasFullTransparency: boolean;
  hasLoginProtection: boolean;
  hasRoleBasedAccess: boolean;
}

export const calculateSecurityScore = (criteria: SecurityCriteria): number => {
  const weights = {
    hasStripeIntegration: 25,
    hasZeroSensitiveData: 25,
    hasFullTransparency: 20,
    hasLoginProtection: 15,
    hasRoleBasedAccess: 15,
  };

  let score = 0;
  
  if (criteria.hasStripeIntegration) score += weights.hasStripeIntegration;
  if (criteria.hasZeroSensitiveData) score += weights.hasZeroSensitiveData;
  if (criteria.hasFullTransparency) score += weights.hasFullTransparency;
  if (criteria.hasLoginProtection) score += weights.hasLoginProtection;
  if (criteria.hasRoleBasedAccess) score += weights.hasRoleBasedAccess;

  return score;
};

// Nouă funcție pentru a raporta și actualiza criteriile de securitate
export const updateSecurityCriteria = (
  newCriteria: Partial<SecurityCriteria>
): SecurityCriteria => {
  const currentCriteria = getSecurityCriteria();
  const updatedCriteria = { ...currentCriteria, ...newCriteria };
  
  // Înregistrăm modificările într-un jurnal sau sistem de monitorizare
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
    }
  ];
};

// Export pentru a permite utilizarea în alte componente
export const SecurityCriteriaReporter = {
  updateCriteria: updateSecurityCriteria,
  getCurrentScore: () => calculateSecurityScore(getSecurityCriteria()),
  getCurrentDetails: getSecurityDetails
};

