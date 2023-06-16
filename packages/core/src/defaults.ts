import { TsFunctionType, TsType } from "@swc/core"

export const dummySpan = {
  start: 0,
  end: 0,
  ctxt: 0,
}

export const defaultGlobalExpr = {
  type: "TsFunctionType",
  span: dummySpan,
  params: [
    {
      type: "RestElement",
      span: dummySpan,
      rest: dummySpan,
      argument: {
        type: "Identifier",
        span: dummySpan,
        value: "args",
        optional: false,
      },
      typeAnnotation: {
        type: "TsTypeAnnotation",
        span: dummySpan,
        typeAnnotation: {
          type: "TsArrayType",
          span: dummySpan,
          elemType: {
            type: "TsTypeReference",
            span: dummySpan,
            typeName: {
              type: "Identifier",
              span: dummySpan,
              value: "T",
              optional: false
            },
          }
        }
      }
    }
  ],
  typeParams: {
    type: "TsTypeParameterDeclaration",
    span: dummySpan,
    parameters: [
      {
        type: "TsTypeParameter",
        span: dummySpan,
        name: {
          type: "Identifier",
          span: dummySpan,
          value: "T",
          optional: false
        },
        in: false,
        out: false,
      }
    ]
  },
  typeAnnotation: {
    type: "TsTypeAnnotation",
    span: dummySpan,
    typeAnnotation: {
      type: "TsTypeReference",
      span: dummySpan,
      typeName: {
        type: "Identifier",
        span: dummySpan,
        value: "T",
        optional: false
      },
    }
  }
} as TsFunctionType

export const defaultGlobalType = {
  type: "TsFunctionType",
  span: dummySpan,
  params: [],
  typeParams: {
    type: "TsTypeParameterDeclaration",
    span: dummySpan,
    parameters: [
      {
        type: "TsTypeParameter",
        span: dummySpan,
        name: {
          type: "Identifier",
          span: dummySpan,
          value: "T",
          optional: false
        },
        in: false,
        out: false,
      }
    ]
  },
  typeAnnotation: {
    type: "TsTypeAnnotation",
    span: dummySpan,
    typeAnnotation: {
      type: "TsTypeReference",
      span: dummySpan,
      typeName: {
        type: "Identifier",
        span: dummySpan,
        value: "T",
        optional: false
      },
    }
  }
} as TsFunctionType

export const defaultGlobalTmpl = {
  type: "TsKeywordType",
  span: dummySpan,
  kind: "string"
} as TsType
