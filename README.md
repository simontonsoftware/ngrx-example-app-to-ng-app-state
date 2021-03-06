This repo exists to demonstrate [ng-app-state](https://github.com/simontonsoftware/ng-app-state), which is an object-oriented wrapper around [ngrx/store](https://github.com/ngrx/platform/blob/master/docs/store/README.md).
 
 This repo is a fork of [ngrx/platform](https://github.com/ngrx/platform), with its [example-app](https://github.com/ngrx/platform/blob/master/example-app/README.md) migrated to `ng-app-state`. `master` is mostly untouched; instead there are 4 branches migrating different parts of the example, to allow viewing their diffs:

- [Core Module](https://github.com/simontonsoftware/ngrx-example-app-to-ng-app-state/compare/master...migrate-core): a very simple module, this demonstrates manipulating the store directly from your components. This is not recommended for more complex interactions, but is a very easy solution in cases like this.
- [Auth Module](https://github.com/simontonsoftware/ngrx-example-app-to-ng-app-state/compare/master...migrate-auth): a slightly more complex module, this demonstrates going through a service to interact with the store and perform other side effects (in this case, redirecting to the login page). 
- [Books Module](https://github.com/simontonsoftware/ngrx-example-app-to-ng-app-state/compare/master...migrate-books): the most complex module, this continues the same theme above.
- The [full diff](https://github.com/simontonsoftware/ngrx-example-app-to-ng-app-state/compare/master...migrate-all) of all 3 modules. This is simply the 3 branches aboved merged into one. It shows the amount of boilerplate that can be removed; the diff is roughly +450/-1000 lines.

Each branch is fully functional, demonstrating that `ng-app-state` can work side-by-side with custom actions and reducers, as well as [`ngrx/db`](https://github.com/ngrx/db), [`/effects`](https://github.com/ngrx/platform/blob/master/docs/effects/README.md), [`/store-devtools`](https://github.com/ngrx/platform/blob/master/docs/store-devtools/README.md), and [`/entity`](https://github.com/ngrx/platform/blob/master/docs/entity/README.md).

The more complex modules follow a general pattern:
- State definitions are extracted to their own file, with initial values inlined with the definiton itself.
- A service with traditional methods is used in place of effects and their corresponding reducer.
- The boilerplate for actions and their `type` constants are discarded in favor of directly calling methods on the services mentioned above.
