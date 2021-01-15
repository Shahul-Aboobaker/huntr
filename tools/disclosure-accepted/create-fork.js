"use strict";
import { Octokit } from "@octokit/rest";
const octokit = new Octokit({
  auth: process.env.HUNTR_HELPER_TOKEN,
});

console.log(
  "process.env.HUNTR_HELPER_TOKEN.length > 0",
  process.env.HUNTR_HELPER_TOKEN.length > 0
);

const vulnerabilityJson = JSON.parse(process.env.VULNERABILITY_JSON);
const repoOwner = vulnerabilityJson.Repository.Owner;
const repoName = vulnerabilityJson.Repository.Name;

console.log(
  "Forking repository:",
  `${repoOwner}/${repoName} > 418sec/${repoName}`
);
octokit.repos
  .createFork({
    owner: repoOwner,
    repo: repoName,
    organization: "418sec",
  })
  .then(() =>
    console.log(
      "Fork created successfully:",
      `${repoOwner}/${repoName} > 418sec/${repoName}`
    )
  )
  .catch((error) => {
    console.log("Error while creating fork:", error);
    // TODO: Check if error is due to existing repo, otherwise setFailed
    // core.setFailed("Error while creating fork:", error);
  });