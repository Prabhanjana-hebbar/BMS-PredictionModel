export interface BatteryInput {
  current: number;
  voltage: number;
  temperature: number;
  cycleCount: number;
  dischargeTime?: number;
  maxVoltage?: number;
  minVoltage?: number;
}

export interface BatteryPrediction {
  soh: number;
  soc: number;
  rul: number;
  confidence: number;
  degradationRate: number;
}

export interface BatteryMetrics {
  dischargeTime: number;
  chargingTime: number;
  voltageDecrement: number;
  timeAt415V: number;
  timeConstantCurrent: number;
}

export interface DegradationPoint {
  cycle: number;
  soh: number;
  temperature?: number;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
}
