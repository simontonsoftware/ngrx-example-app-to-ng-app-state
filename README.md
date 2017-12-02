This repo exists to demonstrate [ng-app-state](https://github.com/simontonsoftware/ng-app-state), which is an object-oriented wrapper around [ngrx/store]().
 
 This repo is a fork of [ngrx/platform](https://github.com/ngrx/platform), with its `example-app` migrated to to `ng-app-state`. `master` is mostly untouched; instead there are 4 branches migrating different parts of the example, to allow viewing their diffs:

- [Core Module](https://github.com/simontonsoftware/ngrx-example-app-to-ng-app-state/compare/master...migrate-core): a very simple module, this demonstrates manipulating the store directly from your components. This is not recommended for more complex interactions, but is a very easy solution in cases like this.
- [Auth Module](https://github.com/simontonsoftware/ngrx-example-app-to-ng-app-state/compare/master...migrate-auth): a slightly more complex module, this demonstrates going through a service to interact with the store and perform other side effects (in this case, redirecting to the login page). 
- [Books Module](https://github.com/simontonsoftware/ngrx-example-app-to-ng-app-state/compare/master...migrate-books): the most complex module, this continues the same theme above.
- The [full diff](https://github.com/simontonsoftware/ngrx-example-app-to-ng-app-state/compare/master...migrate-all) of all 3 modules. This is simple all 3 branches aboved merged together. Use the branches above to read and understand code - this branch exists simply to show the amount of boilerplate that can be removed. The diff is approx +450/-1000 lines.

Each branch is fully functionaly, demonstrating that `ng-app-state` can work side-by-side with custom actions and reducers as well as [`ngrx/db`](https://github.com/ngrx/db), [`/effects`](https://github.com/ngrx/platform/blob/master/docs/effects/README.md), [`/store-devtools`](https://github.com/ngrx/platform/blob/master/docs/store-devtools/README.md), and [`/entity`](https://github.com/ngrx/platform/blob/master/docs/entity/README.md).

The more complex modules follow a general pattern:
- State definitions are extracted to their own file, with initial values inlined with the definiton itself.
- A service with traditional methods is used in place of effects and their corresponding reducer. E.g., all the code to add a book to your collection is handled by `CollectionService.addBook()` which inserts into the db and updates the store.
- The boilerplate for actions and their `type` constants are discarded in favor of calling methods on the service directly.
