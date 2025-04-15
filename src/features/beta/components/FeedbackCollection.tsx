
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MessageSquare } from "lucide-react";
import { useState } from "react";

export const FeedbackCollection = () => {
  const [feedback, setFeedback] = useState("");
  const [category, setCategory] = useState<string>("general");
  const [rating, setRating] = useState<string>("5");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aici vom implementa logica de trimitere a feedback-ului
    console.log({ feedback, category, rating });
    setFeedback("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Feedback Program Beta
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Categoria Feedback</Label>
              <RadioGroup
                value={category}
                onValueChange={setCategory}
                className="grid grid-cols-2 gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general" id="general" />
                  <Label htmlFor="general">General</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bugs" id="bugs" />
                  <Label htmlFor="bugs">Probleme Tehnice</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="features" id="features" />
                  <Label htmlFor="features">Funcționalități</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ux" id="ux" />
                  <Label htmlFor="ux">Experiență Utilizator</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Evaluare Generală</Label>
              <RadioGroup
                value={rating}
                onValueChange={setRating}
                className="flex space-x-4 mt-2"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value.toString()} id={`rating-${value}`} />
                    <Label htmlFor={`rating-${value}`}>{value}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Detalii Feedback</Label>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Împărtășește-ne experiența ta cu aplicația..."
                className="min-h-[100px]"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Trimite Feedback
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
