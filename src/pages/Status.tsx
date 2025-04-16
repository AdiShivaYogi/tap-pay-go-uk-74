import React from "react";
import { Layout } from "@/components/layout/layout";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Section } from "@/components/ui/layout/section";
import { Grid2Cols } from "@/components/ui/layout/grid";
import { Progress } from "@/components/ui/progress";
import { StyledCard } from "@/components/ui/cards";
import { Activity, Server, CheckCircle, AlertTriangle } from "lucide-react";

const Status = () => {
  const serverStatus = {
    database: {
      status: "online",
      uptime: "99.99%",
      lastBackup: "2024-04-15 03:00",
    },
    api: {
      status: "online",
      responseTime: "25ms",
      requestsPerMinute: 1250,
    },
    paymentGateway: {
      status: "online",
      transactionsProcessed: 5248,
      successRate: "99.95%",
    },
  };

  return (
    <Layout>
      <Section>
        <PageHeader
          icon={Activity}
          title="Status Sistem"
          description="Monitorizare în timp real a stării serviciilor și a componentelor critice"
        />

        <Grid2Cols>
          <StyledCard>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Server className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Bază de date</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <span className="font-medium">
                    {serverStatus.database.status === "online" ? (
                      <span className="text-green-500 flex items-center gap-1">
                        Online <CheckCircle className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center gap-1">
                        Offline <AlertTriangle className="h-4 w-4" />
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Uptime:</span>
                  <span className="font-medium">{serverStatus.database.uptime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Ultima copie de rezervă:</span>
                  <span className="font-medium">{serverStatus.database.lastBackup}</span>
                </div>
              </div>
            </div>
          </StyledCard>

          <StyledCard>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Activity className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">API</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <span className="font-medium">
                    {serverStatus.api.status === "online" ? (
                      <span className="text-green-500 flex items-center gap-1">
                        Online <CheckCircle className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center gap-1">
                        Offline <AlertTriangle className="h-4 w-4" />
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Timp de răspuns:</span>
                  <span className="font-medium">{serverStatus.api.responseTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Request-uri pe minut:</span>
                  <span className="font-medium">{serverStatus.api.requestsPerMinute}</span>
                </div>
              </div>
            </div>
          </StyledCard>

          <StyledCard>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <CheckCircle className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Payment Gateway</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <span className="font-medium">
                    {serverStatus.paymentGateway.status === "online" ? (
                      <span className="text-green-500 flex items-center gap-1">
                        Online <CheckCircle className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center gap-1">
                        Offline <AlertTriangle className="h-4 w-4" />
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tranzacții procesate:</span>
                  <span className="font-medium">
                    {serverStatus.paymentGateway.transactionsProcessed}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Rată de succes:</span>
                  <span className="font-medium">
                    {serverStatus.paymentGateway.successRate}
                  </span>
                </div>
              </div>
            </div>
          </StyledCard>

          <StyledCard>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Server className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Infrastructură</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Utilizare CPU:</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
                <div className="flex items-center justify-between">
                  <span>Utilizare memorie:</span>
                  <span className="font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2" />
                <div className="flex items-center justify-between">
                  <span>Spațiu disc:</span>
                  <span className="font-medium">80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </div>
          </StyledCard>
        </Grid2Cols>
      </Section>
    </Layout>
  );
};

export default Status;
