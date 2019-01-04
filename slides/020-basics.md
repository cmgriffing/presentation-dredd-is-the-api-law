##

<h1>Basics</h1>

## What is Dredd?

Automated API Documentation Testing

##

![](./assets/dredd-pointing-gun.jpeg)

## Multi-format Support

- API Blueprint [https://apiblueprint.org/](https://apiblueprint.org/)
- OpenAPI 2 [https://swagger.io/](https://swagger.io/)

## Hooks

Run various functions before or after some or all requests.

- Token handling
- Newly created IDs and other State

## Hooks (Events Part 1)

- `beforeAll` called at the beginning of the whole test run
- `beforeEach` called before each HTTP transaction
- `before` called before some specific HTTP transaction
- `beforeEachValidation` called before each HTTP transaction is validated
- `beforeValidation` called before some specific HTTP transaction is validated

## Hooks (Events Part 2)

- `after` called after some specific HTTP transaction regardless of its result
- `afterEach` called after each HTTP transaction
- `afterAll` called after the whole test run

## Hooks (Languages)

- Go
- Node.js (JavaScript)
- Perl
- PHP
- Python
- Ruby
- Rust
- Didn’t find your favorite language? Add a new one!

---
