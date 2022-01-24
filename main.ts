import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import * as digitalocean from "./.gen/providers/digitalocean";
import * as hcloud from "./.gen/providers/hcloud";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new hcloud.HcloudProvider(this, "CloudProvider", {
      token: "the-token",
    });

    // OOPS: SshKey became SshKeyA??
    new hcloud.SshKeyA(this, "HetznerSshKey", {
      name: "My Key",
      publicKey: "ecdsa-sha2-nistp521 AAAAE..",
    });

    new digitalocean.DigitaloceanProvider(this, "CloudProvider", {
      token: "the-token",
    });

    new digitalocean.SshKey(this, "SshKey", {
      name: `My Key`,
      publicKey: "ecdsa-sha2-nistp521 AAAAE..",
    });

    // define more resources here ...
  }
}

const app = new App();
new MyStack(app, "inconsistent-name-bug");
app.synth();
