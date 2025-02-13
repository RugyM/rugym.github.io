export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  python: "3.10.0",
  rscript: "4.1.1",
  // nextflow: "22.04.0",
  bash: "5.2.0",
};

export const CODE_SNIPPETS = {
  javascript: `function greet(name) {\n  console.log("Hello, " + name + "!");\n}\n\ngreet("World");`,
  python: `def greet(name):\n  print(f"Hello, {name}!")\n\ngreet("World")`,
  rscript: `greet <- function(name) {\n  print(paste("Hello,", name, "!"))\n}\ngreet("World")`,
  // nextflow: `process hello {\n  output:\n    stdout()\n  script:\n    "echo Hello World"\n}\n\nworkflow {\n  hello()\n}`,
  bash: `#!/bin/bash\necho "Hello, World!"`,
};
