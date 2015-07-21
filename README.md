# dojo-build-perf-test

This is a simple Dojo project for the purpose of performance testing Dojo builds.

The project uses the following Dojo packages:

- dojo
- dijit
- dojox

The reason for using all three packages is so that the build has something non-trivial to do.  E.g. `dojox` has over 2500 JS files which will be involved in the build's `copy` and `writeOptimized` transforms, and these transforms tend to take the most time.

It doesn't really matter what the project does, but it shows a `dojox` chart and a `dijit` Calendar on its `index.html` page.

# Setup the project

Firstly, clone the project.

`git clone https://github.com/gitgrimbo/dojo-build-perf-test.git`

And then update the submodules. The test project uses Git submodules for the Dojo packages.

````
cd dojo-build-perf-test
git submodule init
git submodule update
````

Using `git submodule` we can check which submodule versions are checked out. E.g. version `1.10.4`:

````
git submodule
 03e1c2418c1eae2aa96bb536cc778499827e07aa src/dijit (1.10.4)
 4e4ecaf38c4786a007fb7710223c3c80e62ee0b1 src/dojo (1.10.4)
 20513e1d561fff41bc1d408e37181fb075bf20a1 src/dojox (1.10.4)
 7c8888210ab1abef19d46886142f13d0179753cc src/util (1.10.4)
````

# Run the build

## No optimisation

The build can be run with no optimisation by providing empty command line values for `optimize` and `layerOptimize`.

`node src/dojo/dojo.js load=build --profile profiles/app.profile.js optimize= layerOptimize=`

## Custom optimisation

Using `useFsCopy` optimisation [1].

`node src/dojo/dojo.js load=build --profile profiles/app.profile.js useFsCopy=1 optimize= layerOptimize=`

[1] Requires non-standard Git branch, see below.

# Non-standard Git branch

Some of the custom build switches need to point at a different fork/branch of `dojo/util`.

1) Edit `.gitmodules` file to point `util` at new repository (i.e. replace `https://github.com/dojo/util.git` with `https://github.com/gitgrimbo/util.git`, for example).

````
[submodule "src/util"]
	path = src/util
	url = https://github.com/gitgrimbo/util.git
````

2) Sync the submodule from the project root.

````
git submodule sync
````

3) Fetch the fork's custom branches for the submodule and select the required branch.

````
cd src/util
git fetch --all
git checkout use-nodefs-for-copy-transform
````

## Back to standard

If the custom `dojo/util` fork is up-to-date with the standard `https://github.com/dojo/util.git` repo, it will have all of `dojo/util`'s tags/branches, and you can simply checkout a standard tag/branch as follows:

````
cd src/util
git fetch --all
git checkout 1.10.4
````

If the custom fork is not up-to-date with the standard Dojo repo, then you need to change the `.gitmodules` file back to the standard repo (`https://github.com/dojo/util.git`) and perform step (2) before checking out the appropriate tag/branch.
