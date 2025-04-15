
import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HelpCircle, MessageCircle, FileText, Video, BookOpen, PhoneCall } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Cum procesez o plată?",
    answer: "Pentru a procesa o plată, accesați secțiunea Dashboard sau Plăți, introduceți suma și descrierea, apoi apăsați butonul de procesare plată. Dacă dispozitivul dvs. este compatibil cu NFC, veți putea utiliza funcția Tap to Pay pentru a accepta plăți contactless."
  },
  {
    question: "Este telefonul meu compatibil cu Tap to Pay?",
    answer: "În prezent, funcția Tap to Pay este disponibilă pe dispozitivele iPhone cu iOS 15.4 sau mai recent care au capacitate NFC. Dispozitivele Android nu sunt încă compatibile cu această funcție, dar lucrăm la extinderea suportului."
  },
  {
    question: "Cum îmi conectez contul Stripe?",
    answer: "Navigați la pagina Cont, apoi selectați opțiunea de conectare Stripe. Veți fi redirecționat către pagina Stripe pentru a vă autentifica sau a crea un cont nou. După conectare, veți reveni automat în aplicație cu contul Stripe conectat."
  },
  {
    question: "Ce comisioane se aplică pentru procesarea plăților?",
    answer: "Comisioanele standard sunt de 2.5% + 0.30 Lei per tranzacție. Puteți consulta pagina de Prețuri pentru mai multe detalii despre planurile disponibile și posibilele reduceri pentru volume mari."
  },
  {
    question: "Cum pot obține un raport al tranzacțiilor?",
    answer: "Accesați secțiunea Rapoarte din meniul principal, selectați intervalul de timp dorit, apoi generați raportul. Acesta poate fi exportat în format PDF sau CSV pentru contabilitate."
  }
];

const Help = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <HelpCircle className="h-8 w-8 text-primary" />
              Centru de Ajutor
            </h1>
            <p className="text-muted-foreground mt-1">
              Găsește răspunsuri la întrebările frecvente și obține asistență
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Chat Asistență
                </CardTitle>
                <CardDescription>Discută cu echipa de suport</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="default" className="w-full">
                  Începe chat
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Tutoriale video
                </CardTitle>
                <CardDescription>Învață cum să folosești aplicația</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Vezi tutoriale
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Documentație
                </CardTitle>
                <CardDescription>Ghiduri și documentație detaliată</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Consultă documentația
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Întrebări Frecvente</CardTitle>
              <CardDescription>
                Răspunsuri la cele mai comune întrebări
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PhoneCall className="h-5 w-5 text-primary" />
                Contact direct
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Dacă nu ai găsit răspunsul la întrebarea ta, ne poți contacta direct:</p>
              <div className="space-y-2">
                <p className="text-sm">Email: <span className="font-medium">support@tapaygo.ro</span></p>
                <p className="text-sm">Telefon: <span className="font-medium">0800 123 456</span> (Luni-Vineri, 9:00-18:00)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
