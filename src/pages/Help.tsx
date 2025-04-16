
import { Layout } from "@/components/layout/layout";
import { HelpCircle, MessageSquare, Search, ChevronRight, FileText, Phone, Mail, Globe, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { StyledCard } from "@/components/ui/card-variants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Grid3Cols } from "@/components/ui/themed-components";
import { Link } from "react-router-dom";

const helpCategories = [
  {
    title: "Configurare cont",
    questions: [
      { 
        q: "Cum îmi creez un cont TapPayGo?",
        a: "Pentru a crea un cont TapPayGo, accesează pagina de înregistrare, completează datele tale și urmează instrucțiunile de verificare a emailului."
      },
      { 
        q: "Cum îmi conectez contul Stripe?",
        a: "Accesează secțiunea 'Conectare Stripe' din meniul principal și urmează pașii indicați pentru conectarea contului tău Stripe existent sau pentru crearea unui cont nou."
      },
      { 
        q: "Ce informații trebuie să furnizez pentru verificare?",
        a: "Procesul de verificare necesită informații de bază despre tine și afacerea ta: numele complet, adresa, date de contact și, în unele cazuri, informații despre firma ta."
      }
    ]
  },
  {
    title: "Procesare plăți",
    questions: [
      { 
        q: "Cum procesez o plată prin TapPayGo?",
        a: "Accesează secțiunea 'Plăți' din dashboard, introdu suma și descrierea opțională, apoi folosește funcția Tap to Pay sau generează un link de plată pentru clientul tău."
      },
      { 
        q: "Ce tipuri de carduri sunt acceptate?",
        a: "TapPayGo, prin Stripe, acceptă toate cardurile majore: Visa, MasterCard, American Express, Discover, JCB și multe altele, inclusiv carduri contactless."
      },
      { 
        q: "Ce se întâmplă dacă o plată eșuează?",
        a: "Vei primi o notificare imediată dacă o plată eșuează, împreună cu motivul eșecului. Poți încerca din nou sau poți contacta clientul pentru o metodă alternativă de plată."
      }
    ]
  },
  {
    title: "Finanțe și raportare",
    questions: [
      { 
        q: "Când voi primi banii în contul meu bancar?",
        a: "Plățile sunt procesate imediat, iar transferul către contul tău bancar se realizează în 2-3 zile lucrătoare, în funcție de banca ta și de setările contului Stripe."
      },
      { 
        q: "Cum pot genera rapoarte pentru contabilitate?",
        a: "În secțiunea 'Statistici' sau 'Rapoarte' poți genera rapoarte detaliate pentru orice perioadă dorită. Acestea pot fi exportate în format CSV sau PDF pentru contabilitate."
      },
      { 
        q: "Ce comisioane percepe TapPayGo?",
        a: "TapPayGo folosește structura de comisioane Stripe: 1.4% + 0.25€ pentru carduri europene și 2.9% + 0.25€ pentru carduri non-europene. Nu există taxe ascunse suplimentare."
      }
    ]
  }
];

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredCategories = searchQuery.trim() 
    ? helpCategories.map(category => ({
        ...category,
        questions: category.questions.filter(
          q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
               q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : helpCategories;
  
  return (
    <Layout>
      <SectionContainer>
        <PageHeader
          icon={HelpCircle}
          title="Centru de Ajutor"
          description="Află cum să folosești TapPayGo și găsește răspunsuri la întrebările tale"
        />
        
        <div className="space-y-6">
          <StyledCard className="border-primary/10">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Caută în întrebările frecvente..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Discută cu suportul
                </Button>
              </div>
              
              {searchQuery && filteredCategories.length === 0 && (
                <div className="mt-6 text-center py-8">
                  <p className="text-muted-foreground">Nu am găsit răspunsuri pentru "{searchQuery}"</p>
                  <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                    Resetează căutarea
                  </Button>
                </div>
              )}
              
              {!searchQuery && (
                <div className="mt-6 flex flex-wrap gap-2">
                  <Button 
                    variant={activeCategory === "all" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setActiveCategory("all")}
                  >
                    Toate
                  </Button>
                  {helpCategories.map((category, index) => (
                    <Button 
                      key={index}
                      variant={activeCategory === category.title ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setActiveCategory(category.title)}
                    >
                      {category.title}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </StyledCard>
          
          <div className="space-y-6">
            {filteredCategories.map((category, index) => (
              (activeCategory === "all" || activeCategory === category.title) && (
                <StyledCard key={index} className="border-primary/10">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
                    
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((item, qIndex) => (
                        <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                          <AccordionTrigger>{item.q}</AccordionTrigger>
                          <AccordionContent>
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </StyledCard>
              )
            ))}
          </div>
          
          <Grid3Cols>
            <StyledCard className="border-primary/10 h-full">
              <div className="p-6 h-full flex flex-col">
                <div className="mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Documentație</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Accesează ghidul complet de utilizare și FAQ-ul detaliat pentru toate funcționalitățile.
                </p>
                <div className="mt-auto">
                  <Button variant="outline" className="w-full flex justify-between">
                    Ghid de utilizare 
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </StyledCard>
            
            <StyledCard className="border-primary/10 h-full">
              <div className="p-6 h-full flex flex-col">
                <div className="mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Suport Tehnic</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Contactează echipa noastră de suport pentru asistență personalizată și rezolvarea problemelor tehnice.
                </p>
                <div className="mt-auto">
                  <Button variant="outline" className="w-full flex justify-between">
                    Deschide un tichet
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </StyledCard>
            
            <StyledCard className="border-primary/10 h-full">
              <div className="p-6 h-full flex flex-col">
                <div className="mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Comunitate</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Alătură-te comunității noastre pentru sfaturi, idei și pentru a împărtăși experiența ta cu alți utilizatori.
                </p>
                <div className="mt-auto">
                  <Link to="https://community.tappaygo.com" target="_blank">
                    <Button variant="outline" className="w-full flex justify-between items-center">
                      Accesează forumul
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </StyledCard>
          </Grid3Cols>
          
          <StyledCard className="border-primary/10">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Contactează-ne</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">support@tappaygo.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Telefon</p>
                    <p className="text-sm text-muted-foreground">+40 700 000 000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-muted-foreground">Disponibil 9:00-18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </StyledCard>
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default Help;
