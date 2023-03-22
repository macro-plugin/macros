import { TsFunctionType, TsType } from "@swc/core"

export const defaultGlobalExpr = {
  type: "TsFunctionType",
  span: {
    start: 199,
    end: 221,
    ctxt: 0
  },
  params: [
    {
      type: "RestElement",
      span: {
        start: 203,
        end: 215,
        ctxt: 0
      },
      rest: {
        start: 5691,
        end: 5694,
        ctxt: 0
      },
      argument: {
        type: "Identifier",
        span: {
          start: 206,
          end: 210,
          ctxt: 4
        },
        value: "args",
        optional: false,
      },
      typeAnnotation: {
        type: "TsTypeAnnotation",
        span: {
          start: 210,
          end: 215,
          ctxt: 0
        },
        typeAnnotation: {
          type: "TsArrayType",
          span: {
            start: 212,
            end: 215,
            ctxt: 0
          },
          elemType: {
            type: "TsTypeReference",
            span: {
              start: 212,
              end: 213,
              ctxt: 0
            },
            typeName: {
              type: "Identifier",
              span: {
                start: 212,
                end: 213,
                ctxt: 4
              },
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
    span: {
      start: 199,
      end: 202,
      ctxt: 0
    },
    parameters: [
      {
        type: "TsTypeParameter",
        span: {
          start: 200,
          end: 201,
          ctxt: 0
        },
        name: {
          type: "Identifier",
          span: {
            start: 200,
            end: 201,
            ctxt: 4
          },
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
    span: {
      start: 217,
      end: 221,
      ctxt: 0
    },
    typeAnnotation: {
      type: "TsTypeReference",
      span: {
        start: 220,
        end: 221,
        ctxt: 0
      },
      typeName: {
        type: "Identifier",
        span: {
          start: 220,
          end: 221,
          ctxt: 4
        },
        value: "T",
        optional: false
      },
    }
  }
} as TsFunctionType

export const defaultGlobalType = {
  type: "TsFunctionType",
  span: {
    start: 182,
    end: 192,
    ctxt: 0
  },
  params: [],
  typeParams: {
    type: "TsTypeParameterDeclaration",
    span: {
      start: 182,
      end: 185,
      ctxt: 0
    },
    parameters: [
      {
        type: "TsTypeParameter",
        span: {
          start: 183,
          end: 184,
          ctxt: 0
        },
        name: {
          type: "Identifier",
          span: {
            start: 183,
            end: 184,
            ctxt: 4
          },
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
    span: {
      start: 188,
      end: 192,
      ctxt: 0
    },
    typeAnnotation: {
      type: "TsTypeReference",
      span: {
        start: 191,
        end: 192,
        ctxt: 0
      },
      typeName: {
        type: "Identifier",
        span: {
          start: 191,
          end: 192,
          ctxt: 4
        },
        value: "T",
        optional: false
      },
    }
  }
} as TsFunctionType

export const defaultGlobalTmpl = {
  type: "TsKeywordType",
  span: {
    start: 236,
    end: 242,
    ctxt: 0
  },
  kind: "string"
} as TsType
