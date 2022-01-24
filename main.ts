import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import * as hcloud from "./.gen/providers/hcloud";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new hcloud.HcloudProvider(this, "CloudProvider", {
      token: "the-token",
    });

    new hcloud.SshKey(this, "HetznerSshKey", {
      name: "My Key",
      publicKey: "ecdsa-sha2-nistp521 AAAAE..",
    });

    // define more resources here ...
  }
}

const app = new App();
new MyStack(app, "inconsistent-name-bug");
app.synth();
