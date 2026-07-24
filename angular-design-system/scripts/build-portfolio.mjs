import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

import {
  angularDefineArguments,
  resolvePortfolioDeployment,
} from './portfolio-deployment-config.mjs';
import { preparePortfolioStaticOutput } from './portfolio-static-output.mjs';
import { validatePortfolioStaticOutput } from './validate-portfolio-static-output.mjs';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptDirectory, '..');
const angularCli = join(workspaceRoot, 'node_modules/@angular/cli/bin/ng.js');
const requestedContext = process.argv[2] ?? 'development';
const deployment = await resolvePortfolioDeployment({ requestedContext });

console.log(`Building the Portfolio for ${deployment.context} at ${deployment.siteUrl}.`);

await run(process.execPath, [
  angularCli,
  'build',
  'portfolio',
  '--configuration',
  'production',
  ...angularDefineArguments(deployment),
]);
await preparePortfolioStaticOutput(deployment);
await validatePortfolioStaticOutput(deployment);

function run(command, args) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, {
      cwd: workspaceRoot,
      env: process.env,
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('exit', (code, signal) => {
      if (code === 0) {
        resolvePromise();
        return;
      }

      reject(
        new Error(
          signal
            ? `Portfolio build terminated with signal ${signal}.`
            : `Portfolio build exited with code ${code}.`,
        ),
      );
    });
  });
}
