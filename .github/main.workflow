workflow "Semantic Release" {
  on = "push"
  resolves = ["Release"]
}

action "Build" {
  uses = "actions/npm@master"
  args = "install"
}

action "Release Dry" {
  needs = "Build"
  uses = "actions/npm@master"
  args = "run release:dryrun"
  secrets = [
    "GITHUB_TOKEN",
    "GH_TOKEN",
  ]
}

# Filter for master branch
action "Master" {
  needs = "Release Dry"
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Release" {
  needs = ["Master"]
  uses = "actions/npm@master"
  args = "run release"
  secrets = [
    "GITHUB_TOKEN",
    "GH_TOKEN",
  ]
}
