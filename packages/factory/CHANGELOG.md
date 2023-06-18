# @macro-plugin/factory

## 1.2.0

### Minor Changes

- [#37](https://github.com/macro-plugin/macros/pull/37) [`0351dd0`](https://github.com/macro-plugin/macros/commit/0351dd0aea40b9caa498ac4ae2e88312568c00e9) Thanks [@voorjaar](https://github.com/voorjaar)! - feat: support overwrite span in factory macros

### Patch Changes

- [#37](https://github.com/macro-plugin/macros/pull/37) [`74d4a72`](https://github.com/macro-plugin/macros/commit/74d4a72f7ccc04717729990dfd3032798e92cc08) Thanks [@voorjaar](https://github.com/voorjaar)! - feat: add $Span and createSpan apis

- [#37](https://github.com/macro-plugin/macros/pull/37) [`b8c191a`](https://github.com/macro-plugin/macros/commit/b8c191a215edc79c7e3297af3e8f3ed62d716d0a) Thanks [@voorjaar](https://github.com/voorjaar)! - fix: rest and spread span

## 1.1.1

### Patch Changes

- [#35](https://github.com/macro-plugin/macros/pull/35) [`750bad7`](https://github.com/macro-plugin/macros/commit/750bad763a91002e90adcf380d23736cfafd9f8f) Thanks [@voorjaar](https://github.com/voorjaar)! - feat: add missed createImportSpecifier and createExportSpecifier api

- [#35](https://github.com/macro-plugin/macros/pull/35) [`b1e38d3`](https://github.com/macro-plugin/macros/commit/b1e38d3410089f5f2fd3caf913b4358aece08eaa) Thanks [@voorjaar](https://github.com/voorjaar)! - feat: add missed $ImportSpecifier and $ExportSpecifier macros

## 1.1.0

### Minor Changes

- [#33](https://github.com/macro-plugin/macros/pull/33) [`b45063f`](https://github.com/macro-plugin/macros/commit/b45063ff784e513380f43bf8425c4f72eaa5c0b4) Thanks [@voorjaar](https://github.com/voorjaar)! - refactor: rename span to dummySpan

- [#33](https://github.com/macro-plugin/macros/pull/33) [`f6a1941`](https://github.com/macro-plugin/macros/commit/f6a1941317291133a4d11e72690186c26c0b4fa0) Thanks [@voorjaar](https://github.com/voorjaar)! - fix: span lost when using macros

### Patch Changes

- Updated dependencies [[`8c94045`](https://github.com/macro-plugin/macros/commit/8c9404545d207b708ed433328bd383488a3ed0d4), [`b45063f`](https://github.com/macro-plugin/macros/commit/b45063ff784e513380f43bf8425c4f72eaa5c0b4)]:
  - @macro-plugin/core@1.2.0

## 1.0.11

### Patch Changes

- [#31](https://github.com/macro-plugin/macros/pull/31) [`cf954f1`](https://github.com/macro-plugin/macros/commit/cf954f176cec1acb2e23a3e0786d76c77d06d635) Thanks [@voorjaar](https://github.com/voorjaar)! - perf: omit undefined prop when generating ast

- [#31](https://github.com/macro-plugin/macros/pull/31) [`cf954f1`](https://github.com/macro-plugin/macros/commit/cf954f176cec1acb2e23a3e0786d76c77d06d635) Thanks [@voorjaar](https://github.com/voorjaar)! - fix: ctxt of parsed expression causing variable name changed

- [#31](https://github.com/macro-plugin/macros/pull/31) [`cf954f1`](https://github.com/macro-plugin/macros/commit/cf954f176cec1acb2e23a3e0786d76c77d06d635) Thanks [@voorjaar](https://github.com/voorjaar)! - fix: parse ts expression in factory macro

## 1.0.10

### Patch Changes

- Updated dependencies [[`e3ce376`](https://github.com/macro-plugin/macros/commit/e3ce37696e0a21bdddb56804f7dbcfa904f5fd35)]:
  - @macro-plugin/core@1.1.4

## 1.0.9

### Patch Changes

- Updated dependencies []:
  - @macro-plugin/core@1.1.3

## 1.0.8

### Patch Changes

- [#25](https://github.com/macro-plugin/macros/pull/25) [`c92295a`](https://github.com/macro-plugin/macros/commit/c92295a35d8d607df9965954bab3d510bff0d63d) Thanks [@voorjaar](https://github.com/voorjaar)! - feat: new $Computed factory macro

- [#25](https://github.com/macro-plugin/macros/pull/25) [`f2235ed`](https://github.com/macro-plugin/macros/commit/f2235ede72a783c33faaa0c3cf56d3a7ce2c8bc9) Thanks [@voorjaar](https://github.com/voorjaar)! - fix: computed prop name type is computed

- [#25](https://github.com/macro-plugin/macros/pull/25) [`2011422`](https://github.com/macro-plugin/macros/commit/2011422e79e9d941d6991e7177d75c186e658626) Thanks [@voorjaar](https://github.com/voorjaar)! - feat: new createComputed factory

## 1.0.7

### Patch Changes

- Updated dependencies [[`294f675`](https://github.com/macro-plugin/macros/commit/294f67574c5ff168bdeb0a499ea4ab2fd57579cf)]:
  - @macro-plugin/core@1.1.2

## 1.0.6

### Patch Changes

- [#21](https://github.com/macro-plugin/macros/pull/21) [`396472e`](https://github.com/macro-plugin/macros/commit/396472edb4520b33044e9f628807af01e2e5aa35) Thanks [@voorjaar](https://github.com/voorjaar)! - feat: support TsSatisfiesExpression

- [#21](https://github.com/macro-plugin/macros/pull/21) [`b865dd4`](https://github.com/macro-plugin/macros/commit/b865dd493a38c60c9e8f102f7a2373a4bd44b4aa) Thanks [@voorjaar](https://github.com/voorjaar)! - fix: type exports for swc expression

- Updated dependencies [[`b4be79b`](https://github.com/macro-plugin/macros/commit/b4be79be09e8790b95c6a2e9b07dde4ba3822f39), [`df8dcc0`](https://github.com/macro-plugin/macros/commit/df8dcc0ab7f3e09f1157c5c2a7cda4a7f5367991)]:
  - @macro-plugin/core@1.1.1

## 1.0.5

### Patch Changes

- [#16](https://github.com/macro-plugin/macros/pull/16) [`a4515e3`](https://github.com/macro-plugin/macros/commit/a4515e3f5b0a645cdf233a20b0982ba244710d19) Thanks [@voorjaar](https://github.com/voorjaar)! - fix: type for $Constructor macro

- Updated dependencies [[`4155bb4`](https://github.com/macro-plugin/macros/commit/4155bb4de7968a83e62203411bceae6b0602637f), [`6b25910`](https://github.com/macro-plugin/macros/commit/6b25910567e910b7c71c79646f8569a2f3927be6), [`8dd4939`](https://github.com/macro-plugin/macros/commit/8dd493997931d8d91a82ffb1785927d425c17c61), [`14efcb2`](https://github.com/macro-plugin/macros/commit/14efcb2c6461ab3f5d78e0599ec74b422085ce1d), [`7787022`](https://github.com/macro-plugin/macros/commit/7787022f657b7a79cb18a1e8ba947ae2eaeb682e), [`a17b055`](https://github.com/macro-plugin/macros/commit/a17b055d356c285b394add56192c80077ebde2c2)]:
  - @macro-plugin/core@1.1.0

## 1.0.4

### Patch Changes

- Updated dependencies [[`07961a0`](https://github.com/macro-plugin/macros/commit/07961a03b6e82080a2b8c8ab2626c187c34f912e), [`f1e40ea`](https://github.com/macro-plugin/macros/commit/f1e40ead32636d4f2d43c442e70cc208e2d43b28), [`556ca2d`](https://github.com/macro-plugin/macros/commit/556ca2d9addaf36ac84da8c8ea7b5bc465e174b7)]:
  - @macro-plugin/core@1.0.3

## 1.0.3

### Patch Changes

- [#9](https://github.com/macro-plugin/macros/pull/9) [`2f5d29b`](https://github.com/macro-plugin/macros/commit/2f5d29be94a150697a333e326a7a29437dd9ed90) Thanks [@voorjaar](https://github.com/voorjaar)! - feat: support create TsSatisfiesExpression

- [#9](https://github.com/macro-plugin/macros/pull/9) [`38489c4`](https://github.com/macro-plugin/macros/commit/38489c46503b47a87f8e401900f03a61a2e97347) Thanks [@voorjaar](https://github.com/voorjaar)! - feat: support all ast macros

- [#9](https://github.com/macro-plugin/macros/pull/9) [`2c64787`](https://github.com/macro-plugin/macros/commit/2c647875182c5fc6ca41c9e72587a08307ba90ec) Thanks [@voorjaar](https://github.com/voorjaar)! - chore: upgrade to swc 1.3.53

- [#9](https://github.com/macro-plugin/macros/pull/9) [`dcb21b1`](https://github.com/macro-plugin/macros/commit/dcb21b18c39dbf909a7336712d02e770f6c5f6c6) Thanks [@voorjaar](https://github.com/voorjaar)! - fix: types for macros

- [#9](https://github.com/macro-plugin/macros/pull/9) [`c3448ef`](https://github.com/macro-plugin/macros/commit/c3448efa7ddcfdd0b50eb9606ccc2b2f99adea28) Thanks [@voorjaar](https://github.com/voorjaar)! - refactor: use array pattern unwrap args instead of array index

- Updated dependencies [[`2c64787`](https://github.com/macro-plugin/macros/commit/2c647875182c5fc6ca41c9e72587a08307ba90ec)]:
  - @macro-plugin/core@1.0.2

## 1.0.2

### Patch Changes

- 98425cf: build: no longer publish iife
- Updated dependencies [98425cf]
  - @macro-plugin/core@1.0.1

## 1.0.1

### Patch Changes

- c33ebf8: fix: lost span in VariableDeclarator and PrivateMethod
