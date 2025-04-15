
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, MessageSquare, Star, AlertTriangle } from "lucide-react";

export const BetaUsersMonitoring = () => {
  const maxBetaUsers = 20;
  const currentBetaUsers = 3; // Pentru demo
  const activeUsers = 2; // Pentru demo
  const usersWithFeedback = 1; // Pentru demo

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Monitorizare Program Beta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Progres Înscrieri Beta</span>
                <span className="text-sm text-muted-foreground">
                  {currentBetaUsers} / {maxBetaUsers} utilizatori
                </span>
              </div>
              <Progress value={(currentBetaUsers / maxBetaUsers) * 100} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-medium">Utilizatori Activi</span>
                </div>
                <div className="text-2xl font-bold">{activeUsers}</div>
              </div>

              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span className="font-medium">Feedback Primit</span>
                </div>
                <div className="text-2xl font-bold">{usersWithFeedback}</div>
              </div>

              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="font-medium">Satisfacție Medie</span>
                </div>
                <div className="text-2xl font-bold">4.5/5</div>
              </div>
            </div>

            {currentBetaUsers < maxBetaUsers && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Încă {maxBetaUsers - currentBetaUsers} locuri disponibile în programul beta.
                  Distribuiți codul de invitație pentru a recruta mai mulți utilizatori.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
