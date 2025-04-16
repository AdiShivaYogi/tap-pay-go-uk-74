
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { StyledCard, StyledCardHeader, StyledCardContent, StyledCardTitle } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserCircle, Mail, Save, Camera } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";

const UserProfile = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: user?.email || "",
    phone: "+40 712 345 678",
    company: "TapPayGo SRL"
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProfile = () => {
    setIsLoading(true);
    
    // Simulăm un request către backend
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profil actualizat",
        description: "Datele profilului tău au fost actualizate cu succes.",
      });
    }, 1000);
  };
  
  if (!user) {
    return (
      <Layout>
        <Section>
          <AccessRestrictionAlert role="vizitator" />
        </Section>
      </Layout>
    );
  }
  
  const userInitial = user.email ? user.email.charAt(0).toUpperCase() : "U";
  
  return (
    <Layout>
      <Section>
        <PageHeader
          icon={UserCircle}
          title="Profilul meu"
          description="Gestionează informațiile personale și setările contului tău"
          gradient={true}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coloana stângă - Avatar și informații principale */}
          <div className="lg:col-span-1">
            <StyledCard>
              <StyledCardHeader>
                <StyledCardTitle>Fotografie profil</StyledCardTitle>
              </StyledCardHeader>
              <StyledCardContent className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${userInitial}&size=96&background=6e59a5&color=ffffff`} alt="Avatar profil" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">{userInitial}</AvatarFallback>
                  </Avatar>
                  <Button size="sm" variant="secondary" className="absolute bottom-0 right-0 rounded-full p-1 h-auto">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold">{formData.firstName} {formData.lastName}</h4>
                  <p className="text-sm text-muted-foreground">{formData.email}</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Schimbă fotografia
                    </Button>
                  </div>
                </div>
              </StyledCardContent>
            </StyledCard>
          </div>
          
          {/* Coloana dreaptă - Detalii și formular */}
          <div className="lg:col-span-2">
            <StyledCard>
              <StyledCardHeader>
                <StyledCardTitle>Informații personale</StyledCardTitle>
              </StyledCardHeader>
              <StyledCardContent>
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveProfile();
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">Prenume</label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">Nume</label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <div className="flex">
                      <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="flex-1"
                        readOnly
                      />
                      <Button type="button" variant="outline" className="ml-2">
                        <Mail className="h-4 w-4 mr-1" /> Schimbă
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Adresa de email este folosită pentru autentificare și notificări
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Telefon</label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">Companie</label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        "Se salvează..."
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Salvează modificările
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </StyledCardContent>
            </StyledCard>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default UserProfile;
