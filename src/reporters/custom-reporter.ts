import { Reporter, TestCase, TestResult, TestStep } from '@playwright/test/reporter';

export default class CustomReporter implements Reporter {
  private testResults: Map<string, TestResultData> = new Map();
  
  onBegin(config: any, suite: any) {
    console.log('\nTest Suite Started:', new Date().toISOString());
    console.log('Total Tests:', suite.allTests().length);
  }

  onTestBegin(test: TestCase) {
    this.testResults.set(test.id, {
      name: test.title,
      startTime: Date.now(),
      steps: [],
      status: 'running'
    });
    console.log(`\n▶️ Starting: ${test.title}`);
  }

  onStepEnd(test: TestCase, result: TestResult, step: TestStep) {
    const testData = this.testResults.get(test.id);
    if (testData) {
      testData.steps.push({
        name: step.title,
        duration: step.duration,
        status: step.error ? 'failed' : 'passed'
      });
    }
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const testData = this.testResults.get(test.id);
    if (testData) {
      testData.duration = Date.now() - testData.startTime;
      testData.status = result.status;
      
      const emoji = result.status === 'passed' ? '✅' : '❌';
      console.log(`${emoji} ${test.title} (${testData.duration}ms)`);
      testData.steps.forEach((step) => {
        console.log(`   ${step.status === 'passed' ? '✓' : '✗'} ${step.name}`);
      });
    }
  }

  async onEnd(result: { status: string }) {
    const endTime = new Date().toISOString();
    const summary = {
      timestamp: endTime,
      totalTests: this.testResults.size,
      passed: Array.from(this.testResults.values()).filter(t => t.status === 'passed').length,
      failed: Array.from(this.testResults.values()).filter(t => t.status === 'failed').length
    };

    console.log('\nTest Suite Summary:');
    console.log(JSON.stringify(summary, null, 2));
    
    // Save detailed results to file
    const fs = require('fs');
    const reportPath = './test-results/custom-report.json';
    fs.writeFileSync(reportPath, JSON.stringify({
      summary,
      details: Array.from(this.testResults.values())
    }, null, 2));
  }
}