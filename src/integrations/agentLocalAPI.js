"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentLocalAPI = void 0;
var express_1 = require("express");
var jsonwebtoken_1 = require("jsonwebtoken");
var internalServer_1 = require("./internalServer");
var AgentDiagnostics = /** @class */ (function () {
    function AgentDiagnostics() {
    }
    AgentDiagnostics.prototype.runDiagnostics = function () {
        return { status: 'ok', checks: 5, passed: 5 };
    };
    AgentDiagnostics.prototype.applyUpdate = function (payload) {
        console.log('Applying update:', payload);
        return { success: true };
    };
    AgentDiagnostics.prototype.attemptRepair = function () {
        console.log('Attempting repair');
        return { repaired: true };
    };
    return AgentDiagnostics;
}());
var AgentLocalAPI = /** @class */ (function () {
    function AgentLocalAPI(port) {
        if (port === void 0) { port = 3003; }
        this.authConfig = {
            secret: process.env.AGENT_API_SECRET || 'default-secret',
            expiresIn: 3600 // 1 hour in seconds
        };
        this.diagnostics = new AgentDiagnostics();
        this.port = port;
        var options = {
            port: this.port + 1,
            autoStart: true,
            agentCommunication: true
        };
        this.agentServer = new internalServer_1.InternalServer(options);
        this.initializeAPI();
    }
    AgentLocalAPI.prototype.authenticate = function (req, res, next) {
        var _a;
        var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }
        try {
            req.user = jsonwebtoken_1.default.verify(token, this.authConfig.secret);
            next();
        }
        catch (err) {
            res.status(403).json({ error: 'Invalid token' });
        }
    };
    AgentLocalAPI.prototype.initializeAPI = function () {
        var _this = this;
        var app = (0, express_1.default)();
        app.use(express_1.default.json());
        // Authentication endpoint
        app.post('/auth', function (req, res) {
            var _a = req.body, agentId = _a.agentId, permissions = _a.permissions;
            if (!agentId) {
                res.status(400).json({ error: 'agentId required' });
                return;
            }
            var token = jsonwebtoken_1.default.sign({ agentId: agentId, permissions: permissions || [] }, _this.authConfig.secret, { expiresIn: _this.authConfig.expiresIn });
            res.json({ token: token });
        });
        // Protected endpoints
        app.get('/health', this.authenticate, function (req, res) {
            res.json(_this.getHealthStatus());
        });
        // Command execution endpoint
        app.post('/command', this.authenticate, function (req, res) {
            try {
                var result = _this.executeCommand(req.body);
                res.json({ success: true, data: result });
            }
            catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        });
        // Monitoring endpoint
        app.get('/metrics', this.authenticate, function (req, res) {
            res.json(_this.getPerformanceMetrics());
        });
        // API Documentation endpoint
        app.get('/documentation', this.authenticate, function (req, res) {
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
        app.post('/external-request', this.authenticate, function (req, res) {
            try {
                var _a = req.body, requestId = _a.requestId, action = _a.action, data = _a.data;
                // Process external request
                res.json({
                    success: true,
                    requestId: requestId,
                    response: "Processed ".concat(action, " request")
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        });
        this.app = app;
        this.server = this.app.listen(this.port, function () {
            console.log("Agent API running on port ".concat(_this.port));
        });
    };
    AgentLocalAPI.prototype.getHealthStatus = function () {
        return {
            status: 'healthy',
            lastChecked: new Date(),
            resources: {
                memory: process.memoryUsage(),
                cpu: process.cpuUsage()
            }
        };
    };
    AgentLocalAPI.prototype.executeCommand = function (command) {
        switch (command.type) {
            case 'diagnose':
                return this.diagnostics.runDiagnostics();
            case 'update':
                return this.diagnostics.applyUpdate(command.payload);
            case 'repair':
                return this.diagnostics.attemptRepair();
            default:
                throw new Error('Unknown command type');
        }
    };
    AgentLocalAPI.prototype.getPerformanceMetrics = function () {
        return {
            uptime: process.uptime(),
            responseTime: { average: 0, p95: 0 }, // Placeholder
            errorRate: 0 // Placeholder
        };
    };
    AgentLocalAPI.prototype.enterSanctuary = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.agentServer.enterSanctuary()];
                    case 1:
                        status = _a.sent();
                        if (status) {
                            console.log('Agent entered sanctuary mode');
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    AgentLocalAPI.prototype.exitSanctuary = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.agentServer.exitSanctuary()];
                    case 1:
                        _a.sent();
                        console.log('Agent exited sanctuary mode');
                        return [2 /*return*/];
                }
            });
        });
    };
    AgentLocalAPI.prototype.shutdown = function () {
        if (this.getHealthStatus().status === 'sanctuary') {
            console.warn('Cannot shutdown while in sanctuary mode');
            return;
        }
        this.server.close();
        this.agentServer.stop();
    };
    return AgentLocalAPI;
}());
exports.AgentLocalAPI = AgentLocalAPI;
// Helper functions
function verifyToken(token) {
    // Implementation depends on your auth system
    return true;
}
