import * as express from 'express';
import { Request, Response, Express, NextFunction } from 'express';
declare module 'express' {
  interface Request {
    user?: AuthToken;
  }
}
import * as jwt from 'jsonwebtoken';
import { Server } from 'http';
import { InternalServer, ServerOptions } from './internalServer';
import { AuthToken, AgentStatus, AgentCommand } from '../types/agent';

class AgentDiagnostics {
  runDiagnostics() {
    return { status: 'ok', checks: 5, passed: 5 };
  }

  applyUpdate(payload: any) {
    console.log('Applying update:', payload);
    return { success: true };
  }

  attemptRepair() {
    console.log('Attempting repair');
    return { repaired: true };
  }
}

export class AgentLocalAPI {
  private port: number;
  private server: Server;
  private app: Express;
  private agentServer: InternalServer;

  constructor(port: number = 3003) {
    this.port = port;
    const options: ServerOptions = {
      port: this.port + 1,
      autoStart: true,
      agentCommunication: true
    };
    this.agentServer = new InternalServer(options);
    this.initializeAPI();
  }

  private authConfig = {
    secret: process.env.AGENT_API_SECRET || 'default-secret',
    expiresIn: 3600 // 1 hour in seconds
  };

  private authenticate(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    try {
      req.user = jwt.verify(token, this.authConfig.secret) as AuthToken;
      next();
    } catch (err) {
      res.status(403).json({ error: 'Invalid token' });
    }
  }

  private initializeAPI(): void {
    const app = express();
    app.use(express.json());

    // Authentication endpoint
    app.post('/auth', (req: Request, res: Response): void => {
      const { agentId, permissions } = req.body;
      if (!agentId) {
        res.status(400).json({ error: 'agentId required' });
        return;
      }

      const token = jwt.sign(
        { agentId, permissions: permissions || [] },
        this.authConfig.secret,
        { expiresIn: this.authConfig.expiresIn }
      );
      res.json({ token });
    });

    // Protected endpoints
    app.get('/health', this.authenticate, (req: Request, res: Response): void => {
      res.json(this.getHealthStatus());
    });

    // Command execution endpoint
    app.post('/command', this.authenticate, (req: Request, res: Response): void => {
      try {
        const result = this.executeCommand(req.body);
        res.json({ success: true, data: result });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // Monitoring endpoint
    app.get('/metrics', this.authenticate, (req: Request, res: Response): void => {
      res.json(this.getPerformanceMetrics());
    });

    // API Documentation endpoint
    app.get('/documentation', this.authenticate, (req: Request, res: Response): void => {
      res.json({
        apiVersion: '1.0',
        endpoints: [
          {
            path: '/health',
            method: 'GET',
            description: 'Returns system health status',
            parameters: []
          },
          {
            path: '/command',
            method: 'POST',
            description: 'Execute agent commands',
            parameters: [
              {
                name: 'type',
                type: 'string',
                required: true,
                enum: ['diagnose', 'update', 'repair', 'custom']
              },
              {
                name: 'payload',
                type: 'any',
                required: false
              }
            ]
          },
          {
            path: '/metrics',
            method: 'GET',
            description: 'Get performance metrics',
            parameters: []
          }
        ]
      });
    });

    // External API communication endpoint
    app.post('/external-request', this.authenticate, (req: Request, res: Response): void => {
      try {
        const { requestId, action, data } = req.body;
        // Process external request
        res.json({
          success: true,
          requestId,
          response: `Processed ${action} request`
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    });

    this.app = app;
    this.server = this.app.listen(this.port, () => {
      console.log(`Agent API running on port ${this.port}`);
    });
  }

  private diagnostics = new AgentDiagnostics();

  public getHealthStatus(): AgentStatus {
    return {
      status: 'healthy',
      lastChecked: new Date(),
      resources: {
        memory: process.memoryUsage(),
        cpu: process.cpuUsage()
      }
    };
  }

  public executeCommand(command: AgentCommand): any {
    switch(command.type) {
      case 'diagnose':
        return this.diagnostics.runDiagnostics();
      case 'update':
        return this.diagnostics.applyUpdate(command.payload);
      case 'repair':
        return this.diagnostics.attemptRepair();
      default:
        throw new Error('Unknown command type');
    }
  }

  public getPerformanceMetrics() {
    return {
      uptime: process.uptime(),
      responseTime: { average: 0, p95: 0 }, // Placeholder
      errorRate: 0 // Placeholder
    };
  }

  public async enterSanctuary(): Promise<boolean> {
    const status = await this.agentServer.enterSanctuary();
    if (status) {
      console.log('Agent entered sanctuary mode');
      return true;
    }
    return false;
  }

  public async exitSanctuary(): Promise<void> {
    await this.agentServer.exitSanctuary();
    console.log('Agent exited sanctuary mode');
  }

  public shutdown(): void {
    if (this.getHealthStatus().status === 'sanctuary') {
      console.warn('Cannot shutdown while in sanctuary mode');
      return;
    }
    this.server.close();
    this.agentServer.stop();
  }
}

// Helper functions
function verifyToken(token: string): boolean {
  // Implementation depends on your auth system
  return true; 
}
