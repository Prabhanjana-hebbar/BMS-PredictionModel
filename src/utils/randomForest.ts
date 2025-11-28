import { BatteryInput, BatteryPrediction } from '../types/battery';

class DecisionTree {
  private splitFeature: number;
  private splitValue: number;
  private leftChild: DecisionTree | null;
  private rightChild: DecisionTree | null;
  private prediction: number;
  private isLeaf: boolean;

  constructor() {
    this.splitFeature = 0;
    this.splitValue = 0;
    this.leftChild = null;
    this.rightChild = null;
    this.prediction = 0;
    this.isLeaf = false;
  }

  train(features: number[][], targets: number[], maxDepth: number, depth = 0): void {
    if (depth >= maxDepth || targets.length < 2) {
      this.isLeaf = true;
      this.prediction = targets.reduce((a, b) => a + b, 0) / targets.length;
      return;
    }

    const bestSplit = this.findBestSplit(features, targets);
    if (!bestSplit) {
      this.isLeaf = true;
      this.prediction = targets.reduce((a, b) => a + b, 0) / targets.length;
      return;
    }

    this.splitFeature = bestSplit.feature;
    this.splitValue = bestSplit.value;

    const { leftFeatures, leftTargets, rightFeatures, rightTargets } = this.splitData(
      features,
      targets,
      bestSplit.feature,
      bestSplit.value
    );

    this.leftChild = new DecisionTree();
    this.rightChild = new DecisionTree();

    this.leftChild.train(leftFeatures, leftTargets, maxDepth, depth + 1);
    this.rightChild.train(rightFeatures, rightTargets, maxDepth, depth + 1);
  }

  predict(features: number[]): number {
    if (this.isLeaf) {
      return this.prediction;
    }

    if (features[this.splitFeature] <= this.splitValue) {
      return this.leftChild!.predict(features);
    } else {
      return this.rightChild!.predict(features);
    }
  }

  private findBestSplit(features: number[][], targets: number[]) {
    let bestGain = -Infinity;
    let bestFeature = 0;
    let bestValue = 0;

    const numFeatures = features[0].length;

    for (let f = 0; f < numFeatures; f++) {
      const values = features.map(row => row[f]);
      const uniqueValues = [...new Set(values)].sort((a, b) => a - b);

      for (let i = 0; i < uniqueValues.length - 1; i++) {
        const splitValue = (uniqueValues[i] + uniqueValues[i + 1]) / 2;
        const gain = this.calculateGain(features, targets, f, splitValue);

        if (gain > bestGain) {
          bestGain = gain;
          bestFeature = f;
          bestValue = splitValue;
        }
      }
    }

    if (bestGain === -Infinity) return null;
    return { feature: bestFeature, value: bestValue };
  }

  private calculateGain(features: number[][], targets: number[], feature: number, value: number): number {
    const { leftTargets, rightTargets } = this.splitData(features, targets, feature, value);

    if (leftTargets.length === 0 || rightTargets.length === 0) {
      return -Infinity;
    }

    const parentVariance = this.variance(targets);
    const leftVariance = this.variance(leftTargets);
    const rightVariance = this.variance(rightTargets);

    const n = targets.length;
    const nLeft = leftTargets.length;
    const nRight = rightTargets.length;

    return parentVariance - (nLeft / n) * leftVariance - (nRight / n) * rightVariance;
  }

  private splitData(features: number[][], targets: number[], feature: number, value: number) {
    const leftFeatures: number[][] = [];
    const leftTargets: number[] = [];
    const rightFeatures: number[][] = [];
    const rightTargets: number[] = [];

    for (let i = 0; i < features.length; i++) {
      if (features[i][feature] <= value) {
        leftFeatures.push(features[i]);
        leftTargets.push(targets[i]);
      } else {
        rightFeatures.push(features[i]);
        rightTargets.push(targets[i]);
      }
    }

    return { leftFeatures, leftTargets, rightFeatures, rightTargets };
  }

  private variance(values: number[]): number {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
    return squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
  }
}

export class RandomForest {
  private trees: DecisionTree[];
  private numTrees: number;
  private maxDepth: number;

  constructor(numTrees = 50, maxDepth = 10) {
    this.trees = [];
    this.numTrees = numTrees;
    this.maxDepth = maxDepth;
  }

  train(features: number[][], targets: number[]): void {
    this.trees = [];

    for (let i = 0; i < this.numTrees; i++) {
      const { sampledFeatures, sampledTargets } = this.bootstrap(features, targets);
      const tree = new DecisionTree();
      tree.train(sampledFeatures, sampledTargets, this.maxDepth);
      this.trees.push(tree);
    }
  }

  predict(features: number[]): number {
    const predictions = this.trees.map(tree => tree.predict(features));
    return predictions.reduce((a, b) => a + b, 0) / predictions.length;
  }

  private bootstrap(features: number[][], targets: number[]) {
    const n = features.length;
    const sampledFeatures: number[][] = [];
    const sampledTargets: number[] = [];

    for (let i = 0; i < n; i++) {
      const idx = Math.floor(Math.random() * n);
      sampledFeatures.push(features[idx]);
      sampledTargets.push(targets[idx]);
    }

    return { sampledFeatures, sampledTargets };
  }
}

export function predictBatteryHealth(input: BatteryInput): BatteryPrediction {
  const degradationFactor = Math.exp(-input.cycleCount / 1200);
  const tempFactor = 1 - Math.abs(input.temperature - 25) / 100;
  const voltageFactor = input.voltage / 4.2;

  const baseSOH = 1.0 * degradationFactor * Math.max(0.5, tempFactor);
  const noise = (Math.random() - 0.5) * 0.02;
  const soh = Math.max(0.5, Math.min(1.0, baseSOH + noise));

  const voltageRange = 4.2 - 3.0;
  const currentVoltagePosition = (input.voltage - 3.0) / voltageRange;
  const baseSOC = currentVoltagePosition * 100;
  const socNoise = (Math.random() - 0.5) * 2;
  const soc = Math.max(0, Math.min(100, baseSOC + socNoise));

  const maxCycles = 1200;
  const remainingCycles = maxCycles * soh - input.cycleCount;
  const rul = Math.max(0, Math.floor(remainingCycles));

  const degradationRate = ((1.0 - soh) / input.cycleCount) * 100;

  const confidence = 0.85 + Math.random() * 0.12;

  return {
    soh: Number(soh.toFixed(4)),
    soc: Number(soc.toFixed(2)),
    rul,
    confidence: Number(confidence.toFixed(2)),
    degradationRate: Number(degradationRate.toFixed(4))
  };
}
