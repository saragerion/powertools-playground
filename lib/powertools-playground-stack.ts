import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PowertoolsPlayground } from './powertools-playground';

export class PowertoolsPlaygroundStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    new PowertoolsPlayground(this, 'powertools-playground');
  }
}