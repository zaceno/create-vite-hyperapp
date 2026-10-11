// Action-free nodes can be used by an app with any state type.
type PassiveProps = import("hyperapp").Props<any> & {
  [K in keyof import("hyperapp").EventActions<any>]?: never
}

type PassiveChild = boolean | null | undefined | import("hyperapp").TextVNode | PassiveVNode
type PassiveChildren = PassiveChild | readonly PassiveChild[]

type PassiveVNode = Omit<
  import("hyperapp").ElementVNode<any>,
  "props" | "children" | "events" | "tag" | "memo"
> & {
  readonly props: PassiveProps
  readonly children: readonly PassiveChild[]
  readonly tag: string
  events?: never
  memo?: never
}

type HyperappChildren<S> =
  | import("hyperapp").MaybeVNode<S>
  | PassiveChild
  | readonly (import("hyperapp").MaybeVNode<S> | PassiveChild)[]

declare module "hyperapp" {
  function h<T extends string>(
    tag: NonEmptyString<T>,
    props: PassiveProps,
    children?: PassiveChildren
  ): PassiveVNode

  function h<S, C = unknown, T extends string = string>(
    tag: NonEmptyString<T>,
    props: CustomPayloads<S, C> & Props<S>,
    children?: HyperappChildren<S>
  ): ElementVNode<S>
}
