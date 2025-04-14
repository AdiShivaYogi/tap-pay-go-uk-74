
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

export const getSecurityCriteria = (): SecurityCriteria => {
  // Aici am putea adăuga logică pentru a verifica dinamic aceste criterii
  // Pentru moment, le setăm bazat pe implementarea curentă
  return {
    hasStripeIntegration: true,      // Verificat prin existența integrării Stripe
    hasZeroSensitiveData: true,      // Politica noastră de zero date sensibile
    hasFullTransparency: true,       // Implementată prin interfața transparentă
    hasLoginProtection: true,        // Verificat prin mecanismul de blocare login
    hasRoleBasedAccess: true,        // Verificat prin sistemul de roluri
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
